export type UsernameCollection = {
    email: string;
    username: string;
    phoneNumber: string;
}

export type UserCollection = {
    id: string;
    email: string;
    username: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    photoURL: string | null;
    withGoogle: boolean;
}