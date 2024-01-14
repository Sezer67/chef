import { Dimensions, Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import useAppTheme from '../hooks/useAppTheme';
import { scale } from 'react-native-size-matters';
import CustomInput from '../components/UI/CustomInput';
import useAppForm from '../hooks/useAppForm';
import { language } from '../languages';
import { useRoute } from '@react-navigation/native';
import { RootStackScreenProps } from '../navigations/navigation.type';
import CustomText from '../components/UI/CustomText';
import CustomButton from '../components/UI/CustomButton';
import { StatusBar } from 'expo-status-bar';
import ProfilePicture from '../components/Profile/ProfilePicture';
import { authService } from '../firebase';
import { useDispatch, useSelector } from 'react-redux';
import { RootReduxType } from '../types/reducer.type';
import { userActions } from '../redux/user.reducer';
import { appActions } from '../redux/app.reducer';
import { modalTypes } from '../types';

const { width, height } = Dimensions.get('window');

const AccountComplete = () => {
  const { themeColors, theme } = useAppTheme();
  const userState = useSelector((state: RootReduxType) => state.user);
  const route = useRoute<RootStackScreenProps<"AccountComplete">['route']>();
  const dispatch = useDispatch();

  const username = useAppForm({ type: 'username', defaultValue: route.params.username });
  const firstName = useAppForm({ defaultValue: route.params.firstName });
  const lastName = useAppForm({ defaultValue: route.params.lastName });
  const phoneNumber = useAppForm({ type: 'phone', defaultValue: route.params.phoneNumber });
  const description = useAppForm({ });
  

  const handleContinuePress = async () => {
    try {
      const info = {
        id: userState.id,
        email: userState.email,
        phoneNumber: phoneNumber.value,
        username: username.value,
        description: description.value,
        firstName: firstName.value,
        lastName: lastName.value,
        withGoogle: route.params.withGoogle,
      };
      await authService.completeProfile(info);
      dispatch(userActions.firstLogin(info as never));
      // navigate to home
    } catch (error: any) {
      let message = '';
      if(!(language(error).includes('missing') && language(error).includes('translation'))) {
        message = language(error);
      } else {
        message = error;
      }
      dispatch(appActions.showModal({ activeModal: modalTypes.Variables.Message, data: {
        message: message,
        status: 'error'
      }}));
    }
  }

  return (
    <ScrollView 
      contentContainerStyle={[styles.container, { backgroundColor: themeColors.backgroundColor }]}
    >
      <StatusBar style={theme === 'dark' ? 'light' : 'dark'} backgroundColor={themeColors.backgroundColor} />
      <View style={[ styles.card, { backgroundColor: themeColors.loginCardbg } ]}>
        <CustomText 
          text={language('completeInfo')}
          variant='subHeader'
          family='poppins-medium'
        />
        <CustomText 
          text={language('completeInfoDesc')}
          variant='small'
          color={themeColors.gray}
          family={'poppins-light'}
          style={{ marginTop: scale(6), marginBottom: scale(8) }}
        />
        <View style={{ marginVertical: scale(8) }} >
          <ProfilePicture isChangable />
        </View>
        <CustomInput 
          label={language('username')}
          value={username.value}
          onChangeText={username.onChange}
          error={!!username.error}
          placeholder='myusername'
          editable={!(!!route.params.username)}
          successIcon={!!route.params.username}
        />
        <View style={{ width: '100%' ,flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View style={{ width: '45%' }}>
            <CustomInput
              label={language('firstName')}
              value={firstName.value}
              onChangeText={firstName.onChange}
              error={!!firstName.error}
              placeholder='Sezer'
            />
          </View>
          <View style={{ width: '45%' }}>
            <CustomInput
              label={language('lastName')}
              value={lastName.value}
              onChangeText={lastName.onChange}
              error={!!lastName.error}
              placeholder='Kenar'
            />
          </View>
        </View>
        <CustomInput
          label={language('description')}
          value={description.value}
          onChangeText={description.onChange}
          error={!!description.error}
          placeholder='aşçı, ev hanımı, mühendis'
          maxLength={50}
        />
        <CustomInput 
          label={language('phoneNumber')}
          value={phoneNumber.value}
          onChangeText={phoneNumber.onChange}
          error={!!phoneNumber.error}
          placeholder='555 555 55 55'
          editable={!(!!route.params.phoneNumber)}
          successIcon={!!route.params.phoneNumber}
        />
        <CustomButton 
          onPress={handleContinuePress}
          title={language('contuniue')} 
          shadow='small'
          variant='filled'
          style={{ marginBottom: scale(16), marginTop: scale(8) }}
        />
      </View>
    </ScrollView>
  )
}

export default AccountComplete

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: scale(16),
    paddingVertical: scale(16),
  },
  card: {
    width: '100%',
    borderRadius: 20,
    paddingHorizontal: scale(16),
    paddingVertical: scale(16),
    alignItems: 'center',
    justifyContent: 'space-between',
  },
})