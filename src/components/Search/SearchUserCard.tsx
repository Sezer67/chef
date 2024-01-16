import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { FC, useEffect, useState } from 'react'
import { userTypes } from '../../types'
import { storageService } from '../../firebase';
import { scale } from 'react-native-size-matters';
import CustomText from '../UI/CustomText';
import useAppTheme from '../../hooks/useAppTheme';
import { EvilIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { cacheUtil } from '../../utils';

type PropsType = userTypes.SearchUserResultType & {
    deleteItem: (id: string) => void;
}

const SearchUserCard: FC<PropsType> = ({ firstName, lastName, id, photoURL, username, deleteItem }) => {
    const { themeColors } = useAppTheme();
    const [uri, setUri] = useState<string>();

    useEffect(() => {
        if(photoURL) {
            storageService.getImage(photoURL).then((val) => setUri(val));
        }
    },[photoURL]);

    const handleItemPress = async () => {
        await cacheUtil.addItemFromList('@SearchItemList', JSON.stringify({id,firstName,lastName,username,photoURL}));
    }

  return (
    <TouchableOpacity onPress={handleItemPress} style={styles.container}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{...styles.imageContainer, backgroundColor: themeColors.textColor }}>
                {
                    uri ? (
                        <Image
                            source={{ uri }}
                            style={{ width: scale(32), height: scale(32), borderRadius: scale(16) }}
                        />
                    ) : (
                        <CustomText
                            text={firstName.charAt(0)}
                            color={themeColors.backgroundColor}
                            family='poppins-semibold'
                            variant='button'
                            capitalize
                            style={{ marginTop: 3, padding: 0 }}
                        />
                    )
                }
            </View>
            <View>
                <CustomText style={{lineHeight: 14}} family='poppins-semibold' text={username} variant='small'  />
                <CustomText style={{lineHeight: 16}} color={themeColors.gray} family='poppins-medium' text={firstName + " " + lastName + `${true && ' \u2022 Takip Ediyorsun'}`} variant='small' />
            </View>
        </View>
        <TouchableOpacity style={{ width: scale(32), height: scale(32),justifyContent: 'center', alignItems :'flex-end' }} onPress={() => deleteItem(id)}>
            <EvilIcons name="close" size={18} color={themeColors.textColor} />
        </TouchableOpacity>
    </TouchableOpacity>
  )
}

export default SearchUserCard

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: scale(8),
    },
    imageContainer: {
        width: scale(32),
        height: scale(32),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: scale(16),
        marginRight: scale(8)
    }
})