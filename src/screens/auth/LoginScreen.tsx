import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import useTheme from '../../hooks/useTheme'
import { scale } from 'react-native-size-matters';
import CustomInput from '../../components/UI/CustomInput';
import CustomText from '../../components/UI/CustomText';
import CustomButton from '../../components/UI/CustomButton';
import { Colors, Sizes, images } from '../../constans';
import { AntDesign } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const LoginScreen = () => {

    const {themeColors} = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: themeColors.backgroundColor }]}>
        <View style={{ ...styles.card,backgroundColor: themeColors.loginCardbg }}>
            <CustomText 
                text='Sign In'
                variant='subHeader'
                family='poppins-medium'
            />
            <CustomText 
                text='Before continue, please Sign in first!'
                variant='small'
                color={themeColors.gray}
                family={'poppins-light'}
                style={{marginTop: scale(6), marginBottom: scale(16)}}
            />
            <CustomInput 
                label='Username'
                placeholder='@asdddsa.com'
            />
            <CustomInput 
                label='Password'
                placeholder='******'
                secureTextEntry
            />
            <CustomText text='Remember Me' style={{ textAlign: 'left' }} variant='button' />
            <CustomButton 
                title='Sign In' 
                shadow='small'
                variant='filled' 
                style={{ marginVertical: scale(16) }}
            />
            <CustomButton 
                title='Forgot Password?' 
                variant='text'
                titleColor={themeColors.gray}
                titleSize={Sizes.label}
            />
        </View>
        <View style={styles.otherAuthContainer}>
            <View style={styles.seperatoreContainer}>
                <View style={styles.seperator} />
                <CustomText text='Or' color={themeColors.gray} family='poppins-light' />
                <View style={styles.seperator} />
            </View>
            <CustomText text='Connect With' variant='caption' />
            <CustomButton 
                style={{ width: width - scale(64) }}
                title='Google Hesabı İle' 
                variant='ghost'
                titleColor={themeColors.textColor}
                withIcon
                icon={<Image source={images.google} style={{ width: 32, height: 32 }} />}
                marginBetweenText={40}
            />
        </View>
    </View>
  )
}

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        paddingHorizontal: scale(16),
    },
    card: {
        width: '100%',
        height: height * 0.56,
        borderRadius: 20,
        paddingHorizontal: scale(16),
        paddingVertical: scale(32),
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