import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AuthStack from './AuthStack';
import { RootStackParamList } from './navigation.type';


const Stack = createNativeStackNavigator<RootStackParamList>();

const RootStack = () => {
  return (
    <>
      <Stack.Navigator screenOptions={{
        headerShown: false,
      }} >
        <Stack.Screen name='Auth' component={AuthStack} />
      </Stack.Navigator>
    </>
  )
}

export default RootStack;

const styles = StyleSheet.create({})