import {createSlice} from "@reduxjs/toolkit";

const playButtonSlice = createSlice({
    name: 'status',
    initialState: {
        barStatus: 'showBarStatic',
        circleStatus: 'showCircleStatic',
    },
    reducers: {
        setBarStatus(state, action) {
            state.barStatus = action.payload;
        },
        setCircleStatus(state, action) {
            state.circleStatus = action.payload;
        }
    }
})

export const {setCircleStatus, setBarStatus} = playButtonSlice.actions;
export default playButtonSlice.reducer;