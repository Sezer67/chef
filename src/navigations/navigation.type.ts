import { NavigatorScreenParams } from "@react-navigation/native";
import type { NativeStackScreenProps } from '@react-navigation/native-stack'; 

export type AccountCompleteParamsType =  {
    username?: string;
    firstName?: string;
    lastName?: string;
    photoURL?: string;
    phoneNumber?: string;
    withGoogle: boolean;
}

export type RootStackParamList = {
    Auth: NavigatorScreenParams<AuthStackParamList>;
    AccountComplete: AccountCompleteParamsType;
}

export type AuthStackParamList = {
    Login: {
        asd?: string;
    };
    Register: undefined;
}

export type RootStackScreenProps<T extends keyof RootStackParamList> = NativeStackScreenProps<RootStackParamList, T>;