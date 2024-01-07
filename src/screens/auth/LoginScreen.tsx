import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect } from 'react'
import useAppTheme from '../../hooks/useAppTheme'
import CustomInput from '../../components/UI/CustomInput';
import CustomText from '../../components/UI/CustomText';
import CustomButton from '../../components/UI/CustomButton';
import { scale } from 'react-native-size-matters';
import { Colors, Sizes, images } from '../../constans';
import { useAppNavigaton } from '../../hooks/useAppNavigation';
import { language } from '../../languages';
import useAppForm from '../../hooks/useAppForm';
import { errorUtil } from '../../utils';
import { authService } from '../../firebase';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../redux/user.reducer';
import { appActions } from '../../redux/app.reducer';
import { modalTypes } from '../../types';

const { width, height } = Dimensions.get('window');

const LoginScreen = () => {
    const navigation = useAppNavigaton();
    const {themeColors} = useAppTheme();
    const dispatch = useDispatch();
    const userState = useSelector((state) => state);
    useEffect(() => {
        console.log("redux : ",userState);
    },[userState]);
    const username = useAppForm({ type: 'email-username'});
    const password = useAppForm({ type: 'password' });

    const handleLoginPress = async () => {
        const empty = errorUtil.isIncludeEmptyFieldToStates([ username, password ]);
        if(empty) {
            dispatch(appActions.showModal({ activeModal: modalTypes.Variables.Message, data: {
                message: language('emptyFieldError'),
                status: 'error',
            }}))
            return;
        }
        const error = errorUtil.isIncludeErrorToStates([ username, password ]);
        if(error){
            dispatch(appActions.showModal({ activeModal: modalTypes.Variables.Message, data: {
                message: error,
                status: 'error',
            }}))
            return;
        }
        try {
            console.log("username : ",username.value);
            console.log("password : ",password.value);
            const res = await authService.normalSignIn({ username: username.value, password: password.value });
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

    const handleGoogleSignin = async() => {
        try {
            const result = await authService.googleSignIn();
            if(result.additionalUserInfo?.isNewUser) {
                dispatch(userActions.firstLogin({
                    id: result.user.uid,
                    email: result.user.email!,
                    withGoogle: true,
                    photoURL: result.user.photoURL || undefined,
                    phoneNumber: result.user.phoneNumber || undefined,
                    firstName: result.additionalUserInfo?.profile?.given_name || undefined,
                    lastName: result.additionalUserInfo?.profile?.family_name || undefined,
                }));
                navigation.navigate('AccountComplete',{
                    photoURL: result.user.photoURL || undefined,
                    phoneNumber: result.user.phoneNumber || undefined,
                    firstName: result.additionalUserInfo?.profile?.given_name || undefined,
                    lastName: result.additionalUserInfo?.profile?.family_name || undefined,
                    withGoogle: true,
                })
                // profilimi tamamla ekranına yönlendir. 
                // Burdan gidildiğinde firstName,lastName,photo, phoneNumber (default doldur) - username  iste
                // bilgilerini aldıktan sonra usernames koleksiyonuna ekle
            } else {
                // normal login
                console.log("kaydolmuş zaten : ",result);
                // login sayfasına yönlendir
            }
        } catch (error) {
            console.log("error : ",error);
        }
    }

    const handleForgotPasswordPress = () => {
        authService.logout();
        dispatch(userActions.logout());
    }

    return (
        <ScrollView 
            contentContainerStyle={[
                styles.container, 
                { backgroundColor: themeColors.backgroundColor }
            ]}
        >
            <View style={{ ...styles.card, backgroundColor: themeColors.loginCardbg }}>
                <CustomText 
                    text={language('singin')}
                    variant='subHeader'
                    family='poppins-medium'
                />
                <CustomText 
                    text={language('signinDesc')}
                    variant='small'
                    color={themeColors.gray}
                    family={'poppins-light'}
                    style={{marginTop: scale(6), marginBottom: scale(16)}}
                />
                <CustomInput 
                    label={language('username')}
                    placeholder='@myusername'
                    value={username.value}
                    onChangeText={username.onChange}
                />
                <CustomInput 
                    label={language('password')}
                    placeholder='******'
                    secureTextEntry
                    value={password.value}
                    onChangeText={password.onChange}
                />
                <CustomButton 
                    title={language('singin')} 
                    onPress={handleLoginPress}
                    shadow='small'
                    variant='filled'
                    style={{ marginBottom: scale(16), marginTop: scale(8) }}
                />
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '98%' }}>
                    <CustomButton
                        style={{ width: 'auto' }}
                        onPress={handleForgotPasswordPress}
                        title={language('forgotPassword')}
                        variant='text'
                        titleColor={themeColors.gray}
                        titleSize={Sizes.label}
                    />
                    <CustomButton
                        style={{ width: 'auto', paddingHorizontal: 24, height: scale(36) }}
                        title={'Kayıt Ol'}
                        onPress={() => navigation.navigate('Auth', { screen: 'Register' })}
                        variant='ghost'
                        titleColor={themeColors.textColor}
                        titleSize={Sizes.label}
                    />
                </View>
            </View>
            <View style={styles.otherAuthContainer}>
                <View style={styles.seperatoreContainer}>
                    <View style={styles.seperator} />
                    <CustomText text={language('or')} color={themeColors.gray} family='poppins-light' />
                    <View style={styles.seperator} />
                </View>
                <CustomText text={language('connectWith')} variant='caption' />
                <CustomButton 
                    onPress={handleGoogleSignin}
                    style={{ width: width - scale(64) }}
                    title={language('googleSignin')}
                    variant='ghost'
                    titleColor={themeColors.textColor}
                    withIcon
                    icon={<Image source={images.google} style={{ width: 28, height: 28 }} />}
                    marginBetweenText={24}
                />
            </View>
        </ScrollView>
    )
}

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        width: width,
        height: height,
        justifyContent: 'space-evenly',
        alignItems: 'center',
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
    otherAuthContainer: {
        width: '100%',
        height: height * 0.2,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    seperatoreContainer: {
        width: '70%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    seperator: {
        height: 1.8,
        backgroundColor: Colors.gray,
        width: width * 0.2,
    }
})