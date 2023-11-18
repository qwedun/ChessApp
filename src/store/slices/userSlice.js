import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authService } from "../../services/authService";

const initialState = {
    email: null,
    isAuth: false,
    username: null,
    error: 0,
}


export const login = createAsyncThunk(
    'user/login',
    async ({email, password}) => {
        return await authService.login(email, password);
    }
)
export const register = createAsyncThunk(
    'user/register',
    async ({email, password}) => {
        return await authService.register(email, password)
    }
)

const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        setEmail(state, action) {
            state.email = action.payload.email;
        },
        setUsername(state, action) {
            state.username = action.payload.username;
        },
        setIsAuth(state) {
            state.isAuth = true;
        },
        setError(state) {
            state.error = 'ERROR';
        },
        removeError(state) {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.isAuth = true;
                localStorage.setItem('token', action.payload.data.access_token);
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = true;
                console.log(action)
            })
    }
})

export const {removeError, setError, setEmail, setUsername, setIsAuth} = userSlice.actions
export default userSlice.reducer;
