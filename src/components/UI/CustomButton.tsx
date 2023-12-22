import { StyleSheet, TouchableOpacity, TouchableOpacityProps, View } from 'react-native'
import React, { FC, useEffect, useState } from 'react'
import CustomText from './CustomText';
import useTheme from '../../hooks/useTheme';
import { Colors, Sizes, gStyles } from '../../constans';
import { scale } from 'react-native-size-matters';

type WithIconProps = 
  | {
    withIcon: true;
    icon: React.ReactNode;
    position?: 'left' | 'right';
    marginBetweenText?: number; 
} | {
    withIcon?: false
}

type Props = {
    variant?: 'filled' | 'outlined' | 'text' | 'ghost';
    color?: string;
    titleColor?: string;
    titleSize?: number;
    shadow?: 'small' | 'medium';
    title: string;
} & WithIconProps
  & TouchableOpacityProps;

const CustomButton: FC<Props> = ({
    variant = 'filled',
    color,
    title,
    titleColor,
    titleSize,
    shadow,
    ...props
}) => {
    const { themeColors } = useTheme();
    const [buttonVariantStyle, setButtonVariantStyle] = useState({});

    useEffect(() => {
        setButtonVariantStyle(getButtonVariant());
    }, [variant]);

    const getButtonVariant = () => {
        switch (variant) {
        case 'filled':
            return {
                backgroundColor: color || Colors.primary,
            }
        case 'outlined':
            return {
                backgroundColor: 'transparent',
                borderColor: color || Colors.primary,
                borderWidth: 1,
            }
        case 'ghost':
            return {
                backgroundColor: color || themeColors.ghostButton,
            }
        case 'text':
            return {};
        }
    }

  return (
    <TouchableOpacity
        {...props}
        style={[
            styles.button, 
            buttonVariantStyle, 
            props.style,
            shadow === 'small' ? gStyles.smallShadow : 
                shadow === 'medium' ? gStyles.mediumShadow : null,
        ]}
    >
        {
            (props.withIcon && (props.position === 'left' || props.position === undefined)) ?
                <View style={{ marginRight: props.marginBetweenText || 20 }}>
                    {props.icon}
                </View> : null 
        }
        <CustomText 
            text={title} 
            variant='button'
            family={variant === 'ghost' || variant === 'text' ? 'poppins-regular' : 'poppins-medium'}
            color={titleColor || Colors.light} 
            style={ titleSize ? {fontSize: titleSize} : {} }    
        />
        {
            (props.withIcon && props.position === 'right') ?
                <View style={{ marginLeft: props.marginBetweenText || 20 }}>
                    {props.icon}
                </View> 
                : null 
        }
    </TouchableOpacity>
  )
}

export default CustomButton

const styles = StyleSheet.create({
    button: {
        width: '100%',
        height: scale(46),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
    }
})