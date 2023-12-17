import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import useTheme from '../hooks/useTheme'
import { Sizes } from '../constans';
import { language } from '../languages';

const DenemeComp = () => {
  const {themeColors, changeTheme} = useTheme();
  
  return (
    <View style={[{ flex: 1 ,backgroundColor: themeColors.backgroundColor, }]}>
        <Text style={{ fontSize: Sizes.header }} >Header</Text>
        <Text style={{ fontSize: Sizes.subHeader, color: themeColors.textColor }} >Sub Header</Text>
        <Text style={{ fontSize: Sizes.body }} >Body</Text>
        <Text style={{ fontSize: Sizes.caption }} >Caption</Text>
        <Text style={{ fontSize: Sizes.small }} >Small</Text>
        <Text>{language('hello')}</Text>
        <Button title='Renk Değiştir' onPress={() => {changeTheme()}} />
    </View>
  )
}

export default DenemeComp

const styles = StyleSheet.create({})