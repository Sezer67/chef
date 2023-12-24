import { NavigatorScreenParams } from "@react-navigation/native";

export type RootStackParamList = {
    Auth: NavigatorScreenParams<AuthStackParamList>;
}

export type AuthStackParamList = {
    Login: undefined;
    Register: undefined;
}