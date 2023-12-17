import React, { createContext, useState } from 'react';
import { DarkColors, LightColors } from '../constans';
import { useColorScheme } from 'react-native';

interface IThemeContext {
	theme: 'dark' | 'light';
	themeColors: typeof LightColors;
	changeTheme: () => void;
}
export const ThemeContext = createContext<IThemeContext | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: any }> = ({
	children,
}) => {
	const systemColor = useColorScheme();
	const [theme, setTheme] = useState<'dark' | 'light'>(systemColor || 'light');

	const changeTheme = () => {
		setTheme((prev) => prev === 'light' ? 'dark' : 'light');
	};

	const themeColors = theme === 'light' ? LightColors : DarkColors;

	return (
		<ThemeContext.Provider value={{ theme, changeTheme, themeColors }}>
			{children}
		</ThemeContext.Provider>
	);
};
