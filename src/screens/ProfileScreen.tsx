import { Dimensions, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { FC } from 'react'
import useAppTheme from '../hooks/useAppTheme';
import CustomText from '../components/UI/CustomText';
import ProfilePicture from '../components/Profile/ProfilePicture';
import { scale } from 'react-native-size-matters';
import { useDispatch, useSelector } from 'react-redux';
import { RootReduxType } from '../types/reducer.type';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { appActions } from '../redux/app.reducer';
import { modalTypes } from '../types';
import { language } from '../languages';

const { width, height } = Dimensions.get('window');

const ProfileScreen = () => {
    const { themeColors } = useAppTheme();
    const dispatch = useDispatch();
    const userState = useSelector((state: RootReduxType) => state.user);

    const formatNumber = (number: number): string => {
        if (number >= 1000000) {
            return (number / 1000000).toFixed(1) + 'M';
        } else if (number >= 1000) {
            return (number / 1000).toFixed(1) + 'K';
        } else {
            return number.toString();
        }
    }

    const renderFollowerArea = (number: number, title: string) => {
        return (
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <CustomText 
                    text={formatNumber(number)}
                    family='poppins-semibold'
                />
                <CustomText 
                    text={title}
                    variant='small'
                    color={themeColors.gray}
                />
            </View>
        )
    }

    const handlePressMenu = () => {
        dispatch(appActions.showModal({ activeModal: modalTypes.Variables.ProfileMenu, data: undefined }))
    }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: themeColors.backgroundColor  }}>
        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', paddingHorizontal: scale(16) }}>
            <TouchableOpacity onPress={handlePressMenu}>
               <MaterialCommunityIcons name="hamburger" size={24} color={themeColors.textColor} />
            </TouchableOpacity>
        </View>
        <View style={styles.headerContainer}>
            <ProfilePicture isChangable />
            <CustomText 
                style={{ marginVertical: scale(4) }}
                text={userState.firstName.concat(' ',userState.lastName)}
                family='poppins-medium'
                variant='subHeader'
            />
            <CustomText 
                style={{ marginBottom: scale(4) }}
                text={'@' + userState.username}
                family='poppins-light'
                variant='label'
                color={themeColors.gray}
            />
            {
                userState.description && (
                    <CustomText 
                        text={userState.description}
                        family='poppins-regular'
                        variant='button'

                    />
                )
            }
            <View style={styles.followerInfoContainer}>
                {renderFollowerArea(12, language('posts'))}
                {renderFollowerArea(132, language('followers'))}
                {renderFollowerArea(1323, language('follows'))}
            </View>
        </View>
    </SafeAreaView>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
    headerContainer: {
        width: width,
        marginVertical: scale(16),
        justifyContent: 'center',
        alignItems: 'center',
    },
    followerInfoContainer: {
        width: width,
        marginVertical: scale(6),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    }
})