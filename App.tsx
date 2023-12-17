import { StatusBar } from 'expo-status-bar';
import { Button, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { language } from './src/languages';
import { Sizes } from './src/constans';
import { ThemeProvider } from './src/contexts/theme.context';
import useTheme from './src/hooks/useTheme';
import DenemeComp from './src/components/DenemeComp';

export default function App() {
  return (
    <ThemeProvider>
      <StatusBar style="auto" />
      <SafeAreaView style={{ flex: 1 }}><DenemeComp /></SafeAreaView>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
