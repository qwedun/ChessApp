import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Board from "../../board/board";

const historySlice = createSlice({
    name: 'history',
    initialState: {
        array: [Board.createBoard('white')],
        index: 0,
    },
    reducers: {
        setArray(state, action) {
            state.array.push(action.payload);
            state.index = state.array.length - 1;
        },
        setNext(state) {
            if (state.index === state.array.length - 1) return
            state.index += 1;
        },
        setPrev(state) {
            if (state.index === 0) return
            state.index -= 1;
        }
    }
})
export const {setPrev, setNext, setArray} = historySlice.actions;
export default historySlice.reducer;