import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import sessionReducer from './slices/sessionSlice'
import { authApi } from "./slices/authApi";

export const store = configureStore({
    reducer: {
        user: userReducer,
        session: sessionReducer,
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

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;