import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import useTheme from '../hooks/useTheme'
import { Fonts, Sizes } from '../constans';
import { language } from '../languages';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin'
import { authService } from '../firebase';
import CustomText from './UI/CustomText';


const DenemeComp = () => {
  const {themeColors, changeTheme} = useTheme();
  const [mail, setMail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const createAccount = async () => {
    try {
      await authService.registerEmailAndPassword({
        email: 'deneme1@gmail.com',
        firstName: 'Deneme1',
        lastName: 'DenemeLast1',
        password: '123456',
        username: 'deneme1',
      })
    } catch (error: any) {
      console.log("gelen error",error);
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
    await GoogleSignin.signOut();
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
      const res = await auth().signInWithCredential(googleCredential);
      // yeni kullanıcı mı ? 
      if(res.additionalUserInfo?.isNewUser) {
        await firestore().collection('users').doc(res.user.uid).set({
          id: res.user.uid,
          email: res.user.email,
          password: password,
          photoURL: res.user.photoURL,
          phoneNumber: res.user.phoneNumber,
          firstName: res.additionalUserInfo.profile?.given_name || null,
          lastName: res.additionalUserInfo.profile?.family_name || null,
        });
      }
      
      console.log("res : ",JSON.stringify(res));
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
        <TextInput 
          style={{
            backgroundColor: 'white',
            marginVertical: 5,
          }}
          value={mail}
          onChangeText={(val) => setMail(val)}
        />
        <TextInput 
          style={{
            backgroundColor: 'white'
          }}
          value={password}
          onChangeText={(val) => setPassword(val)}
        />
        {/* <Button title='Renk Değiştir' onPress={() => {changeTheme()}} />
        <Button title='Firebase Create Account' onPress={() => {createAccount()}} />
        <Button title='Firebase Login' onPress={() => {login()}} />
        <Button title='Log Out' onPress={() => {logout()}} />
        <Button title='Get Current User' onPress={() => {getCurentUser()}} />
        <Button title='Googlew Sign in' onPress={() => {loginWithGoogle()}} />
        <Button title='Get User By username' onPress={() => {
          authService.getUsername();
        }} /> */}
        <View style={{ justifyContent: 'center', alignItems:'center' }}>
          <Text>Poppins</Text>
          <CustomText text='Black' family={Fonts.poppins.black} variant='subHeader' />
          <CustomText text='Bold' family={Fonts.poppins.bold} variant='subHeader' />
          <CustomText text='Semibold' family={Fonts.poppins.semiBold} variant='subHeader' />
          <CustomText text='Medium' family={Fonts.poppins.medium} variant='subHeader' />
          <CustomText text='Regular' family={Fonts.poppins.regular} variant='subHeader' />
          <CustomText text='Thin' family={Fonts.poppins.thin} variant='subHeader' />
          <CustomText text='Light' family={Fonts.poppins.light} variant='subHeader' />
        </View>
    </View>
  )
}

export default DenemeComp

const styles = StyleSheet.create({})