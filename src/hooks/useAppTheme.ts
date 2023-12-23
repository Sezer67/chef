import { useContext } from 'react';
import { ThemeContext } from '../contexts/theme.context';

const useAppTheme = () => {
	const context = useContext(ThemeContext);
	if (!context) {
		throw new Error('Theme Provider Henüz Oluşturulamadi');
	}
	return context;
};

export default useAppTheme;
