import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice.js";
import sessionReducer from './slices/sessionSlice.js'

export const store = configureStore({
    reducer: {
        user: userReducer,
        sessionState: sessionReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActionPaths: ['payload']
            }
        })
})