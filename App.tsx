import { ThemeProvider } from './src/contexts/theme.context';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import LoginScreen from './src/screens/auth/LoginScreen';
import { useFonts } from 'expo-font';
import { useCallback } from 'react';
import { Text, View } from 'react-native';
import { Fonts } from './src/constans';
import DenemeComp from './src/components/DenemeComp';

GoogleSignin.configure({
  webClientId: '757483130139-0g39jjal70furmuga405gbm2hbggth68.apps.googleusercontent.com'
})

export default function App() {

  const [fontsLoaded] = useFonts({
    [Fonts['poppins-black']]: require('./assets/fonts/poppins/Poppins-Black.ttf'),
    [Fonts['poppins-medium']]: require('./assets/fonts/poppins/Poppins-Medium.ttf'),
    [Fonts['poppins-regular']]: require('./assets/fonts/poppins/Poppins-Regular.ttf'),
    [Fonts['poppins-semibold']]: require('./assets/fonts/poppins/Poppins-SemiBold.ttf'),
    [Fonts['poppins-thin']]: require('./assets/fonts/poppins/Poppins-Thin.ttf'),
    [Fonts['poppins-light']]: require('./assets/fonts/poppins/Poppins-Light.ttf'),
    [Fonts['poppins-bold']]: require('./assets/fonts/poppins/Poppins-Bold.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if(fontsLoaded) {
      console.log("tamamlandı");
    }
  },[fontsLoaded]);

  if(!fontsLoaded) {
    console.log("şuan boş : ")
    return <View><Text>Loading</Text></View>
  }

  return (
    <ThemeProvider>
      <LoginScreen />
    </ThemeProvider>
  );
}
