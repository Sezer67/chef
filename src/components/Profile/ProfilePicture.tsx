import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootReduxType } from '../../types/reducer.type';
import { scale } from 'react-native-size-matters';
import { FontAwesome, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constans';
import { appActions } from '../../redux/app.reducer';
import { modalTypes } from '../../types';
import { language } from '../../languages';

type Props = {
  isChangable?: boolean;
}

const ProfilePicture:React.FC<Props> = ({isChangable = false}) => {
  const [uri, setUri] = useState<string | undefined>(undefined);
  const userState = useSelector((state: RootReduxType) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if(userState.photoURL){
      setUri(userState.photoURL);
    }
  },[userState]);

  const handlePressChangePhoto = () => {
    dispatch(appActions.showModal({
      activeModal: modalTypes.Variables.SelectPhoto,
       data: {
        isRemovableButton: true, 
        removeAction: () => {console.log("remove click")},
        headerText: language('changeProfilePhoto'),
      }}));
  }
  
  return (
    <View style={[styles.imageContainer, !uri ? {borderWidth: 0.5} : {}]}>
      {
        uri ? (
          <Image
            source={{ uri }}
            style={{ width: scale(96), height: scale(96), borderRadius: scale(48) }}
            resizeMode='contain'
          />
        ) : (
          <FontAwesome name="user" size={scale(64)} color="black" />
        )
      }
      {
        isChangable && (
          <TouchableOpacity onPress={handlePressChangePhoto} style={styles.changeContainer}>
            <MaterialCommunityIcons name="image-edit" size={scale(16)} color={Colors.primary} />
          </TouchableOpacity>
        )
      }
    </View>
  )
}

export default ProfilePicture

const styles = StyleSheet.create({
  imageContainer: {
    width: scale(96), 
    height: scale(96), 
    borderRadius: scale(48),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderColor: Colors.primary,
  },
  changeContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: scale(28),
    height: scale(28),
    borderRadius: scale(24),
    borderWidth: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderColor: Colors.primary,
    zIndex: 1,
  }
})