import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { modalTypes, reducerTypes } from "../types";
import { appActionTypes } from "./types";

const initialData: modalTypes.DataType = {
    message: '',
    status: 'error',
}

const initialState: reducerTypes.AppReducer = {
    activeModal: 0,
    data: initialData,
    isLoading: false,
    modalVisible: true,
}

const appSlice = createSlice({
    name: 'app',
    initialState: { ...initialState },
    reducers: {
        showModal: (state, action: PayloadAction<appActionTypes.ShowModalPayloadType>) => {
            return {
                ...state,
                activeModal: action.payload.activeModal,
                modalVisible: true,
                data: {
                    ...initialData,
                    ...action.payload.data,
                }
            };
        },
        hideModal: (state) => {
			return {
                ...state,
                activeModal: null,
                modalVisible: false,
			};
		},
    }
});

export const appActions = appSlice.actions;

export default appSlice.reducer;