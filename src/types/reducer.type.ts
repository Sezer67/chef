import { modalTypes } from ".";

export type RootReduxType = {
    user: UserReducer;
    app: AppReducer;
}
export type UserReducer = {
    isAuth: boolean;
    id: string;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    photoURL: string | null;
    description: string | null;
    withGoogle: boolean;
}
export type AppReducer = {
    activeModal: modalTypes.Variables | null;
    modalVisible: boolean;
    isLoading: boolean;
    data: modalTypes.DataType;
}

