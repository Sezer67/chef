import { StyleSheet, TextInput, TextInputProps, TouchableOpacity, View } from 'react-native'
import React, { FC, useState } from 'react'
import CustomText from './CustomText';
import { Colors, Sizes } from '../../constans';
import useAppTheme from '../../hooks/useAppTheme';
import { Ionicons, AntDesign } from '@expo/vector-icons';
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
    error?: boolean;
    rightIcon?: 'success' | 'search';
    inputRef?: any;
} & TextInputProps;


const CustomInput: FC<Props> = ({
    label,
    error = false,
    rightIcon = undefined,
    inputRef = undefined,
    ...props
}) => {
    const { themeColors } = useAppTheme();
	const [isLock, setIsLock] = useState(true);

    const toggleLock = () => {
		setIsLock(prev => !prev);
	};

    const renderRightIcon = () => {
        switch(rightIcon) {
            case 'success':
                return <Ionicons name="ios-checkmark-circle" size={scale(20)} color={'#5cb85c'} />;
            case 'search':
                return <AntDesign name="search1" size={scale(18)} color={themeColors.textColor} />;
            default:
                return null;
        }
    }

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
                ref={inputRef}
                style={[
                    styles.input,
                    {
                        backgroundColor: themeColors.backgroundColor,
                        color: themeColors.textColor,
                    },
                    error ? { borderWidth: 1, borderColor: 'red' } : {},
                    props.style,
                ]}
                placeholderTextColor={error ? 'red' : themeColors.gray}
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
            {
                rightIcon && (
                    <View style={styles.rightIcon} >
                        {renderRightIcon()}
                    </View>
                )
            }
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
    rightIcon: {
        position: 'absolute',
        top: scale(21),
        right: scale(8),
    }
})