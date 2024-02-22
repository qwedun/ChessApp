import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../server/API";

const initialState = {
    email: null,
    isAuth: false,
    login: null,
    isAuthLoading: false,
    canConfirmLogin: false,
}

export const checkAuth = createAsyncThunk(
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
        setAuthLogin(state, action) {
            if (action.payload.login) {
                state.isAuth = true;
                state.login = action.payload.login
                state.elo = 800;
                localStorage.setItem('token', action.payload.access_token);
            }
            else
                state.canConfirmLogin = true;
        },
        setAuthLogout(state) {
            state.isAuth = false;
            localStorage.removeItem('token');
        },
        setAuthConfirmLogin(state, action) {
            state.login = action.payload.login
            state.isAuth = true;
            state.canConfirmLogin = false;
            state.elo = 800;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(checkAuth.pending, (state, action) => {
                state.isAuthLoading = true;
            })
            .addCase(checkAuth.fulfilled, (state, action) => {
                if (action.payload.data.login) {
                    state.isAuth = true;
                    state.login = action.payload.data.login;
                    state.elo = 999999;
                    localStorage.setItem('token', action.payload.data.access_token)
                }
                state.isAuthLoading = false;
            })
            .addCase(checkAuth.rejected, (state, action) => {
                state.isAuthLoading = false;
            })
    }
})

export const {setAuthConfirmLogin, setAuthLogout, setAuthLogin} = userSlice.actions
export default userSlice.reducer;
