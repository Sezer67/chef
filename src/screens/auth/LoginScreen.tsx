import { Dimensions, Image, ScrollView, StyleSheet, View } from 'react-native';
import React from 'react'
import useAppTheme from '../../hooks/useAppTheme'
import CustomInput from '../../components/UI/CustomInput';
import CustomText from '../../components/UI/CustomText';
import CustomButton from '../../components/UI/CustomButton';
import { scale } from 'react-native-size-matters';
import { Colors, Sizes, images } from '../../constans';
import { useAppNavigaton } from '../../hooks/useAppNavigation';
import { language } from '../../languages';

const { width, height } = Dimensions.get('window');

const LoginScreen = () => {
    const navigation = useAppNavigaton();
    const {themeColors} = useAppTheme();

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
                    placeholder='@asdddsa.com'
                />
                <CustomInput 
                    label={language('password')}
                    placeholder='******'
                    secureTextEntry
                />
                <CustomButton 
                    title={language('singin')} 
                    shadow='small'
                    variant='filled'
                    style={{ marginBottom: scale(16), marginTop: scale(8) }}
                />
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '98%' }}>
                    <CustomButton
                        style={{ width: 'auto' }}
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