import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import { Colors, gStyles } from '../../constans'
import useAppTheme from '../../hooks/useAppTheme'
import { modalTypes } from '../../types'
import { scale } from 'react-native-size-matters'
import { AntDesign } from '@expo/vector-icons';
import CustomText from '../UI/CustomText'
import CustomButton from '../UI/CustomButton'
import { useDispatch } from 'react-redux'
import { appActions } from '../../redux/app.reducer'
import { language } from '../../languages'

type PropsType = modalTypes.MessageDataType
const { width, height } = Dimensions.get('window');

const MessageModal:FC<PropsType> = ({ message, status }) => {
  const dispatch = useDispatch();
  const { themeColors } = useAppTheme();

  const handleClose = () => {
    dispatch(appActions.hideModal());
  }

  return (
    <View style={[
      gStyles.modal,
      {
        backgroundColor: themeColors.backgroundColor,
        paddingVertical: 0,
        paddingHorizontal: 0,
      }
    ]}>
      <View style={{...styles.imageContainer, backgroundColor: status === 'error' ? Colors.error : Colors.success}}>
        <AntDesign name={status === 'error' ? "closecircleo" : 'checkcircleo'} size={64} color={Colors.light} />
      </View>
      <View style={{ alignItems: 'center', paddingVertical: 12, marginBottom: 8 }}>
        <CustomText 
          text={status === 'error' ? language('modalError') : language('modalSuccess')}
          family='poppins-bold'
          variant='subHeader'
        />
        <CustomText 
          text={message}
          family='poppins-medium'
          variant='small'
        />
        <CustomButton 
          onPress={handleClose}
          title={language('modalClose')}
          style={{
            width: 'auto',
            height: 'auto',
            paddingHorizontal: 20,
            paddingVertical: 6,
            marginTop: 12,
            backgroundColor: Colors.error,
          }}
        />
      </View>
    </View>
  )
}

export default MessageModal

const styles = StyleSheet.create({
  imageContainer: {
    height: scale(130),
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
  }
})