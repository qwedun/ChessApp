import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { api } from "../../server/API";

type User = {
    email: string;
    login: string | undefined;
    canConfirmLogin: boolean;
    isAuth: boolean;
    isAuthLoading: boolean;
    currentPlayer: string;
    elo: number;
}

type Response = {
    login?: string;
    elo?: number;
    access_token?: string;
    email ? : string;
}

type CheckAuthResponse = {
    data: Response;
}

const initialState:User = {
    email: '',
    login: '',
    canConfirmLogin: false,
    isAuth: false,
    isAuthLoading: false,
    currentPlayer: '',
    elo: 0,
}

export const checkAuth = createAsyncThunk<CheckAuthResponse, undefined>(
    'user/checkAuth',
    async (_, {rejectWithValue}) => {
        try {
            return await api.post('/authuser');
        } catch (e) {
            return rejectWithValue(e)
        }
    }
)

const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        setAuthLogin(state, action: PayloadAction<Response>) {
            if (action.payload.login) {
                state.isAuth = true;
                state.login = action.payload.login
                state.elo = 800;
                localStorage.setItem('token', action.payload.access_token || '');
            }
            else
                state.canConfirmLogin = true;
        },
        setAuthLogout(state) {
            state.isAuth = false;
            localStorage.removeItem('token');
        },
        setAuthConfirmLogin(state, action:PayloadAction<Response>) {
            state.login = action.payload.login
            state.isAuth = true;
            state.canConfirmLogin = false;
            state.elo = 800;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(checkAuth.pending, (state) => {
                state.isAuthLoading = true;
            })
            .addCase(checkAuth.fulfilled, (state, action) => {
                if (action.payload.data.login) {
                    state.isAuth = true;
                    state.login = action.payload.data.login;
                    state.elo = 999999;
                    localStorage.setItem('token', action.payload.data.access_token || '')
                }
                state.isAuthLoading = false;
            })
            .addCase(checkAuth.rejected, (state) => {
                state.isAuthLoading = false;
            })
    }
})

export const {setAuthConfirmLogin, setAuthLogout, setAuthLogin} = userSlice.actions
export default userSlice.reducer;
