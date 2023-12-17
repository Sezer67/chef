import { useContext } from 'react';
import { ThemeContext } from '../contexts/theme.context';
import { LightColors } from '../constans';

const useTheme = () => {
	const context = useContext(ThemeContext);
	if (!context) {
		throw new Error('Theme Provider Henüz Oluşturulamadi');
	}
	return context;
};

export default useTheme;
