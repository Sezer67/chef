import { NavigatorScreenParams } from "@react-navigation/native";
import type { NativeStackScreenProps } from '@react-navigation/native-stack'; 

export type RootStackParamList = {
    Auth: NavigatorScreenParams<AuthStackParamList>;
    AccountComplete: undefined;
    App: TabNavigatorParamList | undefined;
}

export type AuthStackParamList = {
    Login: undefined;
    Register: undefined;
}

export type TabNavigatorParamList = {
    Home: undefined;
    Search: undefined;
    NewPost: undefined;
    Reels: undefined;
    Profile: undefined;
}

export type RootStackScreenProps<T extends keyof RootStackParamList> = NativeStackScreenProps<RootStackParamList, T>;