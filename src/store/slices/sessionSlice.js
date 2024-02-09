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

export const lossOffer = createAsyncThunk(
    'session/lossOffer',
    async ({playerColor}, {rejectWithValue}) =>
    {
        try {
            return await addDoc(sessionRef, {playerColor: playerColor, offer: 'lossOffer'});
        } catch (e) {
            return rejectWithValue(e);
        }
    }
)

export const drawOffer = createAsyncThunk(
    'session/drawOffer',
    async ({playerColor}, {rejectWithValue}) =>
    {
        try {
            return await addDoc(sessionRef, {playerColor: playerColor, offer: 'drawOffer'});
        } catch (e) {
            return rejectWithValue(e);
        }
    }
)

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
    extraReducers: (builder) => {
        builder
            .addCase(drawOffer.pending, state => {
                state.drawOffer = 'pending';
            })
            .addCase(drawOffer.fulfilled, state => {
                state.drawOffer = 'sent';
            })

            .addCase(lossOffer.pending, state => {
                state.lossOffer = 'pending';
            })
            .addCase(lossOffer.fulfilled, state => {
                state.lossOffer = 'sent';
            })
    }
})

export const { setResult, setCurrentPlayer } = sessionState.actions
export default sessionState.reducer;