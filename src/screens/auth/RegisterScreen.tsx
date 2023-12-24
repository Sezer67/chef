import { Dimensions, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { scale } from 'react-native-size-matters';
import useAppTheme from '../../hooks/useAppTheme';
import CustomText from '../../components/UI/CustomText';
import { language } from '../../languages';
import CustomInput from '../../components/UI/CustomInput';
import CustomButton from '../../components/UI/CustomButton';
import { Octicons } from '@expo/vector-icons';
import { useAppNavigaton } from '../../hooks/useAppNavigation';
const { width, height } = Dimensions.get('window');

const RegisterScreen = () => {
    const { themeColors } = useAppTheme();
    const navigation = useAppNavigaton();

    return (
        <ScrollView contentContainerStyle={[styles.container, { backgroundColor: themeColors.backgroundColor }]}>
            <View style={{ width: '100%', alignItems: 'flex-start', marginBottom: scale(16) }}>
                <CustomButton 
                    onPress={() => navigation.goBack()}
                    style={{ width: 'auto' }}
                    title={language('singin')}
                    titleColor={themeColors.textColor}
                    variant='text'
                    withIcon
                    icon={<Octicons name="chevron-left" size={32} color="black" />}
                    marginBetweenText={12}
                />
            </View>
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
                    placeholder='@asdddsa.com'
                />
                <CustomInput 
                    label={language('email')}
                    placeholder='@asdddsa.com'
                />
                <CustomInput 
                    label={language('phoneNumber')}
                    placeholder='0555 555 55 55'
                />
                <CustomInput 
                    label={language('password')}
                    placeholder='******'
                    secureTextEntry
                />
                <CustomButton
                    title={language('signup')} 
                    shadow='small'
                    variant='filled'
                    style={{ marginBottom: scale(16), marginTop: scale(8) }}
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
        paddingTop: scale(32),
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
})