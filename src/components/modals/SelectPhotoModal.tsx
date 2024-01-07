import { ActivityIndicator, Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { FC, useState } from 'react'
import useAppTheme from '../../hooks/useAppTheme'
import { scale } from 'react-native-size-matters'
import { Feather,Entypo, AntDesign, Octicons } from '@expo/vector-icons';
import { modalTypes } from '../../types'
import CustomText from '../UI/CustomText'
import { Colors } from '../../constans';
import { initialWindowMetrics } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { appActions } from '../../redux/app.reducer';
import * as ImagePicker from 'expo-image-picker/src/ImagePicker';
import storage from '@react-native-firebase/storage';
import { userService } from '../../firebase';
import { RootReduxType } from '../../types/reducer.type';
import { userActions } from '../../redux/user.reducer';
import { language } from '../../languages';

const { width, height } = Dimensions.get('window');

const SelectPhotoModal: FC<modalTypes.SelectPhotoDataType> = ({isRemovableButton, removeAction, headerText}) => {
  const [transferred, setTransferred] = useState<number>(0);
  const [uploading, setUploading] = useState<boolean>(false);

  const { themeColors } = useAppTheme();
  const dispatch = useDispatch();
  const userState = useSelector((state: RootReduxType) => state.user);

  const handleClose = () => {
    dispatch(appActions.hideModal());
  }

  const clearCurrentPhoto = () => {
    
  }

  const selectFromCamera = async() => {
    try {
      await ImagePicker.requestCameraPermissionsAsync();
      let result = await ImagePicker.launchCameraAsync({
        cameraType: ImagePicker.CameraType.front,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if(!result.canceled) {
        // save image
        const fileName = result.assets[0].fileName + '-' + new Date().getTime();
        storage().ref(`images/pp/${fileName}`).putFile(result.assets[0].uri);
        console.log("result : ",result);
      }

    } catch (error) {
      console.log("select from camrea error : ",error);
    }
  }

  const selectFromGalery = async () => {
    try {
      const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        aspect: [1,1],
        quality: 1,
        selectionLimit: 1,
        allowsEditing: true,
      });
      console.log("result : ",result)
      if(!result.canceled) {
        // save image
        await uploadImage(result.assets[0]);
      }

    } catch (error) {
      console.log("error : ",error);
    }
  }

  const uploadImage = async (image: ImagePicker.ImagePickerAsset) => {
    try {
      setUploading(true);
      const fileName = image.fileName + '-' + new Date().getTime();
      const task = storage().ref(`images/pp/${fileName}`).putFile(image.uri);
      task.on('state_changed', snap => {
        setTransferred(
          Math.round(snap.bytesTransferred / snap.totalBytes * 100) 
        );
      });
      await task;
      task.then(async (res) => {
        userService.updateProfilePicture(userState.id, res.metadata.fullPath);
        const url = await storage().ref(res.metadata.fullPath).getDownloadURL();
        dispatch(userActions.setUser({ photoURL: url }));
      });
      setUploading(false);
      handleClose();
    } catch (error) {
      console.log("hata oldu : ",error);
    } finally {
      setUploading(false);
    }
  }

  if(uploading) {
    return (
      <View style={{ height: height, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator
          size='large'
          color='white'
        />
        <CustomText 
          text={language('imageUploading') + ' %' + transferred}
          variant='caption'
          color='white'
        />
      </View>
    )
  }

  return (
    <View style={[
      styles.container,
      {
        backgroundColor: themeColors.loginCardbg,
        paddingBottom: initialWindowMetrics?.insets.bottom ? initialWindowMetrics?.insets.bottom + scale(16) : scale(16),
      }
    ]}>
      <View style={styles.header}>
        <CustomText 
          text={headerText}
        />
        <TouchableOpacity onPress={handleClose}>
          <AntDesign name="closecircle" size={24} color={themeColors.textColor} />
        </TouchableOpacity>
      </View>
      <View style={{ backgroundColor: themeColors.backgroundColor, borderRadius: 8, paddingHorizontal: scale(12) }}>
        <TouchableOpacity onPress={selectFromCamera} style={[styles.row]}>
          <CustomText 
            text={language('selectFromCamera')}
            variant='button'
          />
          <Feather name="camera" size={24} color={themeColors.textColor} />
        </TouchableOpacity>
        <View style={[styles.seperator, { backgroundColor: themeColors.gray }]} />
        <TouchableOpacity onPress={selectFromGalery} style={[styles.row]}>
          <CustomText 
            variant='button'
            text={language('selectFromGalery')}
          />
          <Entypo name="images" size={24} color={themeColors.textColor} />
        </TouchableOpacity>
        {
          isRemovableButton && (
            <>
              <View style={[styles.seperator, { backgroundColor: themeColors.gray }]} />
              <TouchableOpacity onPress={clearCurrentPhoto} style={[styles.row]}>
                <CustomText 
                  variant='button'
                  text={language('clearImage')}
                  color={Colors.error}
                />
                <Octicons name="trash" size={24} color={Colors.error} />
              </TouchableOpacity>
            </>
          )
        }
      </View>
    </View>
  )
}

export default SelectPhotoModal

const styles = StyleSheet.create({
  row: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: scale(12),
    paddingHorizontal: scale(4),
  },
  container: {
    width: width,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    padding: scale(16),
    marginTop: 'auto',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: scale(12),
  },
  seperator: {
    height: 0.5,
    width: '100%',
  }
})