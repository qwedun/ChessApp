import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authService } from "../../services/authService";

const initialState = {
    email: null,
    isAuth: false,
    error: 0,
    isLoading: false,
    isAuthLoading: false,
}


export const login = createAsyncThunk(
    'user/login',
    async ({email, password}) => {
        return await authService.login(email, password);
    }
)
export const register = createAsyncThunk(
    'user/register',
    async ({email, password}, {rejectWithValue}) => {
        try {
            const response = await authService.register(email, password);
            console.log(response)
            return response.payload;
        } catch (e) {
            return rejectWithValue(e)
        }
    }
)

export const checkAuth = createAsyncThunk(
    'user/checkAuth',
    async (_, {rejectedWithValue}) => {
        try {
            const response = await authService.checkAuth();
            return response.payload
        } catch (e) {
            return rejectedWithValue(e)
        }
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
            state.isAuthLoading = true;
        },
        setIsAuthFalse(state) {
            state.isAuthLoading = false;
        },
        setError(state, action) {
            state.error = action.payload;
        },
        removeError(state) {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.isAuth = true;
                state.isLoading = false;
                localStorage.setItem('token', action.payload.data.access_token);
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                console.log(action)
            })
            .addCase(register.pending, (state, action) => {
                state.isLoading = true;
                state.error = state.error ? false : 0
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload.response.data.email?.[0]
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = state.error ? false : 0
            })
            .addCase(checkAuth.fulfilled, (state, action) => {
                state.isAuthLoading = false;
                state.isAuth = true;
            })
            .addCase(checkAuth.pending, (state, action) => {
                state.isAuthLoading = true;
            })
            .addCase(checkAuth.rejected, (state, action) => {
                state.isAuthLoading = false;
                console.log(action)
            })
    }
})

export const {setIsAuthFalse, removeError, setError, setEmail, setUsername, setIsAuth} = userSlice.actions
export default userSlice.reducer;
