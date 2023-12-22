import { scale } from "react-native-size-matters";

const Sizes = {
	header: scale(28),
	subHeader: scale(22),
	body: scale(16),
	small: scale(11),
	label: scale(12),
	button: scale(14),
	caption: scale(14), // foto altı açıklamalar
};

const Fonts = {
	'poppins-black': 'Poppins-Black',
	'poppins-medium': 'Poppins-Medium',
	'poppins-regular': 'Poppins-Regular',
	'poppins-semibold': 'Poppins-SemiBold',
	'poppins-thin': 'Poppins-Thin',
	'poppins-light': 'Poppins-Light',
	'poppins-bold': 'Poppins-Bold',
}

export { Sizes, Fonts };
