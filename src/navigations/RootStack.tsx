import React, { useEffect } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AuthStack from './AuthStack';
import { RootStackParamList } from './navigation.type';
import { authService } from '../firebase';
import AccountComplete from '../screens/AccountComplete';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootStack = () => {

  const getUser = async() => {
    const user = await authService.getCurrentUser();
    console.log("user: ",user);
  }

  useEffect(() => {
    getUser();
  },[])

  return (
    <>
      <Stack.Navigator screenOptions={{
        headerShown: false,
      }} >
        <Stack.Screen name='Auth' component={AuthStack} />
        <Stack.Screen name='AccountComplete' component={AccountComplete} />
      </Stack.Navigator>
    </>
  )
}

export default RootStack;