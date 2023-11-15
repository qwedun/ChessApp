import {configureStore} from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import playButtonReducer from "./slices/playButtonSlice";
import historySliceReducer from "./slices/historySlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        playButtonStatus: playButtonReducer,
        history: historySliceReducer,
    }
})