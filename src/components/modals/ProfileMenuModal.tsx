import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import useAppTheme from '../../hooks/useAppTheme'
import { initialWindowMetrics } from 'react-native-safe-area-context';
import { scale } from 'react-native-size-matters';
import { AntDesign, Ionicons, MaterialIcons, Fontisto } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { appActions } from '../../redux/app.reducer';
import CustomText from '../UI/CustomText';
import { Colors } from '../../constans';
import { language } from '../../languages';

const { width, height } = Dimensions.get('window');

const ProfileMenuModal = () => {

    const { themeColors } = useAppTheme();
    const dispatch = useDispatch();

    const handleClose = () => {
        dispatch(appActions.hideModal());
    }

  return (
    <View style={[
        styles.container,
        {
            backgroundColor: themeColors.loginCardbg,
            paddingBottom: initialWindowMetrics?.insets.bottom ? initialWindowMetrics?.insets.bottom + scale(16) : scale(16),
        }
    ]}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: scale(8) }}>
            <CustomText 
                text={language('menu')}
            />
            <TouchableOpacity onPress={handleClose}>
                <AntDesign name="closecircle" size={24} color={themeColors.textColor} />
            </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.itemRow}>
            <View style={styles.itemIcon}>
                <Ionicons name="settings-sharp" size={24} color={themeColors.textColor} />
            </View>
            <View style={styles.itemText}>
                <CustomText
                    text={language('settings')}
                    variant='button'
                />
            </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.itemRow}>
            <View style={styles.itemIcon}>
                <MaterialIcons name="edit" size={24} color={themeColors.textColor} />
            </View>
            <View style={styles.itemText}>
                <CustomText
                    text={language('edit')}
                    variant='button'
                />
            </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.itemRow}>
            <View style={styles.itemIcon}>
                <Ionicons name="qr-code-outline" size={24} color={themeColors.textColor} />
            </View>
            <View style={styles.itemText}>
                <CustomText
                    text={language('qrCode')}
                    variant='button'
                />
            </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.itemRow}>
            <View style={styles.itemIcon}>
                <Fontisto name="favorite" size={24} color={themeColors.textColor} />
            </View>
            <View style={styles.itemText}>
                <CustomText
                    text={language('favorites')}
                    variant='button'
                />
            </View>
        </TouchableOpacity>
    </View>
  )
}

export default ProfileMenuModal

const styles = StyleSheet.create({
    container: {
        width: width,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        padding: scale(16),
        marginTop: 'auto',
    },
    itemRow: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingVertical: scale(6),
    },
    itemText: {
        marginLeft: scale(8),
        width: '100%',
        borderBottomWidth: 0.6,
        paddingBottom: scale(4),
        borderBottomColor: Colors.gray,
    },
    itemIcon: {
        width: scale(30),
        justifyContent: 'center',
        alignItems: 'center'
    }
})