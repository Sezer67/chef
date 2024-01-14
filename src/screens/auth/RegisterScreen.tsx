import { Dimensions, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { scale } from 'react-native-size-matters';
import useAppTheme from '../../hooks/useAppTheme';
import CustomText from '../../components/UI/CustomText';
import { language } from '../../languages';
import CustomInput from '../../components/UI/CustomInput';
import CustomButton from '../../components/UI/CustomButton';
import { useAppNavigaton } from '../../hooks/useAppNavigation';
import useAppForm from '../../hooks/useAppForm';
import { errorUtil } from '../../utils';
import { authService } from '../../firebase';
import { useDispatch } from 'react-redux';
import { userActions } from '../../redux/user.reducer';
import { appActions } from '../../redux/app.reducer';
import { modalTypes } from '../../types';
const { width, height } = Dimensions.get('window');

const RegisterScreen = () => {
    const { themeColors } = useAppTheme();
    const dispatch = useDispatch();
    const navigation = useAppNavigaton();
    const username = useAppForm({ type: 'username' });
    const email = useAppForm({ type: 'email' });
    const phoneNumber = useAppForm({ type: 'phone' });
    const password = useAppForm({ type: 'password' });

    const handleRegisterPress = async () => {
        const empty = errorUtil.isIncludeEmptyFieldToStates([username, password, email, phoneNumber]);
        if(empty) {
            dispatch(appActions.showModal({ activeModal: modalTypes.Variables.Message, data: {
                message: language('emptyFieldError'),
                status: 'error',
            }}));
        }
        const error = errorUtil.isIncludeErrorToStates([username, password, email, phoneNumber]);
        if(error) {
            dispatch(appActions.showModal({ activeModal: modalTypes.Variables.Message, data: {
                message: error,
                status: 'error',
            }}))
        }
        try {
            const user = await authService.registerEmailAndPassword({
                email: email.value,
                password: password.value,
                username: username.value,
                phoneNumber: phoneNumber.value
            });
            dispatch(userActions.firstLogin({
                id: user.user.uid,
                email: email.value,
                username: username.value,
                withGoogle: false,
                phoneNumber: phoneNumber.value,
                emailVerified: false,
            }))
            navigation.navigate('AccountComplete');
        } catch (error: any) {
            if(!(language(error).includes('missing') && language(error).includes('translation'))) {
                dispatch(appActions.showModal({ activeModal: modalTypes.Variables.Message, data: {
                    message: language(error),
                    status: 'error',
                }}))
            } else {
                console.log("yok ",error);
            }
        }
    }

    return (
        <ScrollView contentContainerStyle={[styles.container, { backgroundColor: themeColors.backgroundColor }]}>
            <View style={[styles.card, {backgroundColor: themeColors.loginCardbg}]}>
                <CustomText 
                    text={language('signup')}
                    variant='subHeader'
                    family='poppins-medium'
                />
                <CustomText 
                    text={language('signupDesc')}
                    variant='small'
                    color={themeColors.gray}
                    family={'poppins-light'}
                    style={{marginTop: scale(6), marginBottom: scale(16)}}
                />
                <CustomInput 
                    label={language('username')}
                    placeholder='myusername'
                    error={!!username.error}
                    value={username.value}
                    onChangeText={username.onChange}
                />
                <CustomInput 
                    label={language('email')}
                    keyboardType='email-address'
                    placeholder='myemail@host.com'
                    value={email.value}
                    error={!!email.error}
                    onChangeText={email.onChange}
                />
                <CustomInput 
                    label={language('phoneNumber')}
                    placeholder='555 555 55 55'
                    error={!!phoneNumber.error}
                    value={phoneNumber.value}
                    onChangeText={phoneNumber.onChange}
                />
                <CustomInput 
                    label={language('password')}
                    placeholder='******'
                    secureTextEntry
                    error={!!password.error}
                    value={password.value}
                    onChangeText={password.onChange}
                />
                <CustomButton
                    title={language('signup')} 
                    onPress={handleRegisterPress}
                    shadow='small'
                    variant='filled'
                    style={{ marginBottom: scale(16), marginTop: scale(8) }}
                />
                <CustomButton
                    title={language('singin')} 
                    variant='ghost'
                    titleColor={themeColors.textColor}
                    onPress={() => navigation.goBack()}
                />
            </View>
        </ScrollView>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({
    container: {
        width: width,
        height: height,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: scale(16),
    },
    card: {
        width: '100%',
        borderRadius: 20,
        paddingHorizontal: scale(16),
        paddingVertical: scale(24),
        alignItems: 'center',
        justifyContent: 'space-between',
    },
})