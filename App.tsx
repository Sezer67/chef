import { StatusBar } from 'expo-status-bar';
import { SafeAreaView} from 'react-native';
import { ThemeProvider } from './src/contexts/theme.context';
import DenemeComp from './src/components/DenemeComp';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import LoginScreen from './src/screens/auth/LoginScreen';

GoogleSignin.configure({
  webClientId: '757483130139-0g39jjal70furmuga405gbm2hbggth68.apps.googleusercontent.com'
})

export default function App() {
  return (
    <ThemeProvider>
      <LoginScreen />
    </ThemeProvider>
  );
}
