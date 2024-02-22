import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice.js";
import sessionReducer from './slices/sessionSlice.js'
import { authApi } from "./slices/authApi";

export const store = configureStore({
    reducer: {
        user: userReducer,
        sessionState: sessionReducer,
        [authApi.reducerPath]: authApi.reducer,
    },
    middleware: (getDefaultMiddleware) => {
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActionPaths: ['payload']
            }
        });
        return getDefaultMiddleware().concat(authApi.middleware);
    }
})