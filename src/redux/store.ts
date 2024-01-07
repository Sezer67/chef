import AsyncStorage from "@react-native-async-storage/async-storage";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import userReducer from "./user.reducer";
import appReducer from "./app.reducer";

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whiteList: ['user'],
    blackList: [],
};

const rootReducer = combineReducers({
    user: userReducer,
    app: appReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoreActions: true,
        }
    })
});

export const persistor = persistStore(store);