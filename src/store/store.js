import {configureStore} from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import playButtonReducer from "./slices/playButtonSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        playButtonStatus: playButtonReducer,
    }
})