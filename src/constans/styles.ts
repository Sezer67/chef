import { Dimensions, StyleSheet } from 'react-native';

const { width, height } = Dimensions.get('window');


const gStyles = StyleSheet.create({
	smallShadow: {
		shadowColor: '#121212',
		shadowOffset: {
			width: 0,
			height: 3,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 6,
	},
	mediumShadow: {
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 5.84,
		elevation: 5,
	},
	modal: {
		width: width - 40,
		minHeight: height * 0.25,
		paddingVertical: 16,
		paddingHorizontal: 12,
		borderRadius: 8,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 5.84,
		elevation: 5,
	},
});

export { gStyles };
