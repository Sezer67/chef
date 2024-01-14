import { reducerTypes } from "../../types";

export type FirstLoginPayload = {
    id: string;
    email: string;
    username?: string;
    firstName?:string;
    lastName?:string;
    phoneNumber?: string;
    photoURL?: string;
    withGoogle: boolean;
    description?: string;
}

export type SetUserPayload = {
    email?: string;
    username?: string;
    firstName?:string;
    lastName?:string;
    phoneNumber?: string;
    photoURL?: string | null;
    withGoogle?: boolean;
    description?: string;
}

export type LoginPayload = Omit<reducerTypes.UserReducer, "isAuth" >;