import React, { useEffect } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AuthStack from './AuthStack';
import { RootStackParamList } from './navigation.type';
import { authService } from '../firebase';
import AccountComplete from '../screens/AccountComplete';
import TabStack from './TabStack';
import { useDispatch, useSelector } from 'react-redux';
import { RootReduxType } from '../types/reducer.type';
import { userActions } from '../redux/user.reducer';
import { useAppNavigaton } from '../hooks/useAppNavigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootStack = () => {

  const userState = useSelector((state: RootReduxType) => state.user);
  const dispatch = useDispatch();
  const navigation = useAppNavigaton();

  const getUser = async() => {
    if(userState.isAuth){
      const user = await authService.getCurrentUser();
      dispatch(userActions.login(user));
      navigation.navigate('App');
    }
  }

  useEffect(() => {
    getUser();
  },[]);

  return (
    <>
      <Stack.Navigator screenOptions={{
        headerShown: false,
      }} >
        <Stack.Screen name='Auth' component={AuthStack} />
        <Stack.Screen name='AccountComplete' component={AccountComplete} />
        <Stack.Screen name='App' component={TabStack} />
      </Stack.Navigator>
    </>
  )
}

export default RootStack;