import { StyleSheet, Text, TextStyle, View } from 'react-native'
import React, { FC } from 'react'
import { Colors, LightColors, Sizes } from '../../constans';
import useTheme from '../../hooks/useTheme';

type Props = {
    capitalize?: boolean;
    variant?: keyof typeof Sizes;
    style?: TextStyle | TextStyle[];
    color?: string,
    text: string;
    family?: string;
}

const CustomText: FC<Props> = ({
    capitalize = false,
    variant = 'body',
    text,
    style,
    family = 'sans-serif',
    color,
}) => {
    const { themeColors } = useTheme();

    if (capitalize) {
		text = text.toUpperCase();
	}

    const passedStyles = Array.isArray(style)
		? Object.assign({}, ...style)
		: style;

    return (
        <Text
        style={[
				{ 
                    fontSize: Sizes[variant],
                    color: color || themeColors.textColor,
                    fontFamily: family,
                },
				{ ...passedStyles },
			]}
        >{text}</Text>
    )
}

export default CustomText

const styles = StyleSheet.create({

})