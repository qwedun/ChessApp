import {configureStore} from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import historySliceReducer from "./slices/historySlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        history: historySliceReducer,
    }
})