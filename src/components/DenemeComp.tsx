import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import useTheme from '../hooks/useTheme'
import { Sizes } from '../constans';
import { language } from '../languages';
import auth from '@react-native-firebase/auth';
import { GoogleSigninButton, GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin'

const DenemeComp = () => {
  const {themeColors, changeTheme} = useTheme();

  const createAccount = async () => {
    try {
      const res = await auth().createUserWithEmailAndPassword('sezer@gmail.com','123456');
      console.log("gelen res : ",res);
    } catch (error: any) {
      if(error.code === 'auth/email-already-in-use') {
        console.log("email zaten kullanılıyor");
      }
    }
  }

  const login = async () => {
    try {
      const res = await auth().signInWithEmailAndPassword('sezer@gmail.com','123456')
      console.log("login success : ",res);
    } catch (error: any) {
      switch(error.code) {
        case 'auth/invalid-email':
          console.log("geçersiz email");
          break;
        case 'auth/invalid-credential':
          console.log("şifre ve kullanıcı adı yanlış");
          break;
        default:
          console.log("Bir sorun ile karşılaşıldı tekrar deneyiniz");
      }
    }
  }

  const getCurentUser = async() => {
    const user = auth().currentUser;
    console.log(user);
  }

  const logout = async () => {
    const out = await auth().signOut();
    console.log("out : ",out);
  }

  useEffect(() => {
  },[])

  const loginWithGoogle = async () => {
    try {
      // Check if your device supports Google Play
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      // Get the users ID token
      const { idToken } = await GoogleSignin.signIn();
      console.log("id token : ",idToken);
      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      console.log("credential  : ",googleCredential);
      // Sign-in the user with the credential
      return auth().signInWithCredential(googleCredential);
    } catch (error: any) {
      if(error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if(error.code === statusCodes.IN_PROGRESS) {
        // operation in progress already
      } else if(error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE){
        // play service not avaliable
      } else {
        // some error happened
      }
    }
  }

  return (
    <View style={[{ flex: 1 ,backgroundColor: themeColors.backgroundColor, }]}>
        <Text style={{ fontSize: Sizes.header }} >Header</Text>
        <Text style={{ fontSize: Sizes.subHeader, color: themeColors.textColor }} >Sub Header</Text>
        <Text style={{ fontSize: Sizes.body }} >Body</Text>
        <Text style={{ fontSize: Sizes.caption }} >Caption</Text>
        <Text style={{ fontSize: Sizes.small }} >Small</Text>
        <Text>{language('hello')}</Text>
        <Button title='Renk Değiştir' onPress={() => {changeTheme()}} />
        <Button title='Firebase Create Account' onPress={() => {createAccount()}} />
        <Button title='Firebase Login' onPress={() => {login()}} />
        <Button title='Log Out' onPress={() => {logout()}} />
        <Button title='Get Current User' onPress={() => {getCurentUser()}} />
        <GoogleSigninButton 
          onPress={() => {
            loginWithGoogle().then((val) => {
              console.log("success :" ,val?.user);
            }).catch((error) => {
              console.log("error : ",error);
            })
          }}
        />
        
    </View>
  )
}

export default DenemeComp

const styles = StyleSheet.create({})