import { StyleSheet, Text, TextInput, TextInputProps, TouchableOpacity, View } from 'react-native'
import React, { FC, useState } from 'react'
import CustomText from './CustomText';
import { Colors, Sizes } from '../../constans';
import useTheme from '../../hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';
import { scale } from 'react-native-size-matters';

type ClearButtonProps =
	| {
			isClearButton: true;
			handleClear: () => void;
	  }
	| {
			isClearButton?: false;
	  };

type Props = {
    label?: string;
} & TextInputProps;


const CustomInput: FC<Props> = ({
    label,
    ...props
}) => {
    const { themeColors } = useTheme();
	const [isLock, setIsLock] = useState(true);

    const toggleLock = () => {
		setIsLock(prev => !prev);
	};
  return (
    <View style={styles.container}>
        {
            label && (
                <CustomText 
                    text={label}
                    variant='label'
                />
            )
        }
        <View>
            <TextInput
                {...props}
                style={[
                    styles.input,
                    {
                        backgroundColor: themeColors.backgroundColor,
                        color: themeColors.textColor,
            
                    }
                ]}
                placeholderTextColor={themeColors.gray}
                secureTextEntry={props.secureTextEntry ? isLock : false}
            />
            {props.secureTextEntry && (
                <TouchableOpacity
                    onPress={toggleLock}
                    style={styles.clearButton}>
                    <Ionicons
                        name={isLock ? 'eye-off-outline' : 'eye-outline'}
                        size={scale(20)}
                        color={Colors.primary}
                        style={{ marginRight: 2 }}
                    />
                </TouchableOpacity>
            )}
        </View>
    </View>
  )
}

export default CustomInput;

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    input: {
        width: '100%',
        height: scale(46),
        marginTop: scale(8),
        marginBottom: scale(16),
        paddingHorizontal: 20,
        fontSize: Sizes.small,
        borderRadius: 8,
    },
    clearButton: {
		position: 'absolute',
		right: scale(12),
		top: scale(20),
	},
})