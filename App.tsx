import { ThemeProvider } from './src/contexts/theme.context';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import LoginScreen from './src/screens/auth/LoginScreen';
import { useFonts } from 'expo-font';
import { useCallback } from 'react';
import { Text, View } from 'react-native';
import { Fonts } from './src/constans';
import { NavigationContainer } from '@react-navigation/native';
import RootStack from './src/navigations/RootStack';
import { Provider } from 'react-redux';
import { persistor, store } from './src/redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import CustomModal from './src/components/UI/CustomModal';

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
    <NavigationContainer>
      <ThemeProvider>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <CustomModal />
            <RootStack />
          </PersistGate>
        </Provider>
      </ThemeProvider>
    </NavigationContainer>
  );
}
