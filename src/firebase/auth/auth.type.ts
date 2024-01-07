export type RegisterType = {
    username: string;
    email: string;
    password: string;
    phoneNumber: string;
}

export type LoginType = {
    username: string;
    password: string;
}

export type CompleteProfileType = {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    photoURL: string | null;
    description: string | null;
    phoneNumber: string;
    withGoogle: boolean;
    email: string | undefined;
}