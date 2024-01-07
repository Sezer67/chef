import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LoginScreen from '../screens/auth/LoginScreen';
import { AuthStackParamList } from './navigation.type';
import { StatusBar } from 'expo-status-bar';
import useAppTheme from '../hooks/useAppTheme';
import RegisterScreen from '../screens/auth/RegisterScreen';

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthStack = () => {

  const {theme, themeColors} = useAppTheme();

  return (
    <>
      <StatusBar style={theme === 'dark' ? 'light' : 'dark'} backgroundColor={themeColors.backgroundColor} />
      <Stack.Navigator screenOptions={{
        headerShown: false,
      }} >
        <Stack.Screen name='Login' component={LoginScreen} />
        <Stack.Screen name='Register' component={RegisterScreen} />
      </Stack.Navigator>
    </>
  )
}

export default AuthStack

const styles = StyleSheet.create({})