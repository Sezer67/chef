import { Dimensions, NativeScrollEvent, NativeSyntheticEvent, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { FC, useEffect, useRef, useState } from 'react'
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

    const [activeTab, setActiveTab] = useState<number>(0);
    const tabRef = useRef<ScrollView>(null);

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

    const handleTabScroll = (event:NativeSyntheticEvent<NativeScrollEvent>) => {
        const xOffset = event.nativeEvent.contentOffset.x;
        setActiveTab(Math.round(xOffset / width));
    }

    const handleTabPress = (tab: number) => {
        setActiveTab(tab);
        tabRef.current?.scrollTo({ x: tab * width, animated: true });
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
        <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                {/* todo: İkon Bulunacak */}
                <TouchableOpacity onPress={() => handleTabPress(0)} style={[styles.tab, activeTab === 0 ? {...styles.activeTab, borderColor: themeColors.textColor} : {}]}>
                    <Text style={activeTab === 0 ? { color: themeColors.textColor } : { color: themeColors.gray }}>Postlar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleTabPress(1)} style={[styles.tab, activeTab === 1 ? {...styles.activeTab, borderColor: themeColors.textColor} : {}]}>
                    <Text style={activeTab === 1 ? { color: themeColors.textColor } : { color: themeColors.gray }}>Tarifler</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleTabPress(2)} style={[styles.tab, activeTab === 2 ? {...styles.activeTab, borderColor: themeColors.textColor} : {}]}>
                    <Text style={activeTab === 2 ? { color: themeColors.textColor } : { color: themeColors.gray }}>Tab 3</Text>
                </TouchableOpacity>
            </View>
            <ScrollView 
                ref={tabRef}
                horizontal 
                pagingEnabled 
                onScroll={handleTabScroll} 
                scrollEventThrottle={16} 
                style={{flex : 1}}
                showsHorizontalScrollIndicator={false}
            >
                <ScrollView style={styles.tabContainer}>
                    <Text>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.

The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.

The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.</Text>
                </ScrollView>
                <ScrollView style={styles.tabContainer}>
                    <Text>Tab 2</Text>
                </ScrollView>
                <ScrollView style={styles.tabContainer}>
                    <Text>Tab 3</Text>
                </ScrollView>
            </ScrollView>
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
    },
    tab: {
        width: width / 3,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
    },
    activeTab: {
        borderBottomWidth: 0.75,
    },
    tabContainer: {
        width: width,
        marginBottom: 75, // bottom tab
    }
})