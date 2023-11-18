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
                state.error = action.payload.response.data.email?.[0]
                state.isLoading = false;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = state.error ? false : 0
            })
    }
})

export const {removeError, setError, setEmail, setUsername, setIsAuth} = userSlice.actions
export default userSlice.reducer;
