import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { RootReduxType } from '../../types/reducer.type';
import { scale } from 'react-native-size-matters';
import { FontAwesome, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constans';

type Props = {
  isChangable?: boolean;
}

const ProfilePicture:React.FC<Props> = ({isChangable = false}) => {
  const [uri, setUri] = useState<string | undefined>(undefined);
  const userState = useSelector((state: RootReduxType) => state.user);

  useEffect(() => {
    // debugger;
    if(userState.photoURL){
      console.log("user : ",userState);
      setUri(userState.photoURL);
    }
  },[userState]);
  // redux kurulacak. user bilgisi redux dan okunacak. Burayı görüyorsa kesin logindir
  // avatarlardan seç
  // camera
  // galery

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
          <View style={styles.changeContainer}>
            <MaterialCommunityIcons name="image-edit" size={scale(16)} color={Colors.primary} />
          </View>
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