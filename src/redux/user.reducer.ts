import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { reducerTypes } from "../types";
import { userActionTypes } from "./types";

const initialState: reducerTypes.UserReducer = {
    isAuth: false,
    id: '',
    email: '',
    username: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    photoURL: null,
    withGoogle: false,
    description: null,
}

const userSlice = createSlice({
    name: 'user',
    initialState: { ...initialState },
    reducers: {
        firstLogin: (state, action: PayloadAction<userActionTypes.FirstLoginPayload>) => {
            return {
                ...state,
                ...action.payload,
                isAuth: true,
            }
        },
        setUser:(state, action: PayloadAction<userActionTypes.SetUserPayload>) =>  {
            return {
                ...state,
                ...action.payload,
            }
        },
        logout: () => {
            return {
                ...initialState,
            }
        }
    }
});

export const userActions = userSlice.actions;

export default userSlice.reducer;