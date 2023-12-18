import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import useTheme from '../hooks/useTheme'
import { Sizes } from '../constans';
import { language } from '../languages';
import auth from '@react-native-firebase/auth';

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
      const res = await auth().signInWithEmailAndPassword('sezer@gmail.m','1234567')
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
    </View>
  )
}

export default DenemeComp

const styles = StyleSheet.create({})