import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../server/firestore";

const sessionRef = collection(db, 'sessionState')


const initialState = {
    drawOffer: '',
    lossOffer: '',
    partyResult: {
        result: '',
        winColor: '',
        reason: '',
    },
    currentPlayer: '',
    whiteTime: '',
    blackTime: '',
}

const sessionState = createSlice({
    name: 'sessionState',
    initialState: initialState,
    reducers: {
        setResult(state, action) {
            state.partyResult = action.payload;
        },
        setCurrentPlayer(state, action) {
            state.currentPlayer = action.payload;
        }
    },
})

export const { setResult, setCurrentPlayer } = sessionState.actions
export default sessionState.reducer;