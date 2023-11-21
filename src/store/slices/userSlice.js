import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authService } from "../../services/authService";

const initialState = {
    email: null,
    isAuth: false,
    error: 0,
    isLoading: false,
    isAuthLoading: false,
    canConfirmLogin: false,
}


export const login = createAsyncThunk(
    'user/login',
    async ({email, password}, {rejectWithValue}) => {
        try {
            return await authService.login(email, password);
        } catch (e) {
            return rejectWithValue(e);
        }
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
    async (_, {rejectWithValue}) => {
        try {
            return await authService.checkAuth();
        } catch (e) {
            return rejectWithValue(e)
        }
    }
)

export const confirmLogin = createAsyncThunk(
    'user/confirmLogin',
    async ({login}, {rejectWithValue}) => {
        try {
            return await authService.confirmLogin(login);
        } catch (e) {
            return rejectWithValue(e)
        }
    }
)

export const logout = createAsyncThunk(
    'user/logout',
    async (_, {rejectWithValue}) => {
        try {
            return await authService.logout();
        } catch (e) {
            return rejectWithValue(e)
        }
    }
)

const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        setIsAuth(state) {
            state.isAuthLoading = true;
        },
        setIsAuthFalse(state) {
            state.isAuthLoading = false;
        },
        setError(state, action) {
            state.error = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.isLoading = true;
                state.error = state.error ? false : 0
            })
            .addCase(login.fulfilled, (state, action) => {
                if (action.payload.data.login) {
                    state.isAuth = true;
                    state.elo = 9999999;
                }
                else
                    state.canConfirmLogin = true;
                state.isLoading = false;
                localStorage.setItem('token', action.payload.data.access_token);
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload.response.data.message
            })


            .addCase(register.pending, (state) => {
                state.isLoading = true;
                state.error = state.error ? false : 0
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload.response.data.email?.[0]
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false;
            })


            .addCase(checkAuth.pending, (state, action) => {
                state.isAuthLoading = true;
            })
            .addCase(checkAuth.fulfilled, (state, action) => {
                if (action.payload.data.login) {
                    state.isAuth = true;
                    state.login = action.payload.data.login;
                    state.elo = 999999;
                }
                state.isAuthLoading = false;
                localStorage.setItem('token', action.payload.data.access_token)
            })
            .addCase(checkAuth.rejected, (state, action) => {
                console.log(action)
                state.isAuthLoading = false;
            })

            .addCase(confirmLogin.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(confirmLogin.fulfilled, (state, action) => {
                state.isAuth = true;
                state.isLoading = false;
                state.canConfirmLogin = false;
                state.login = action.payload.data.login;
                state.elo = 9999999;
            })
            .addCase(confirmLogin.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload.data.message
            })
            .addCase(logout.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(logout.fulfilled, (state, action) => {
                localStorage.removeItem('token')
                state.isAuth = false;
                state.isLoading = false;
            })
            .addCase(logout.rejected, (state, action) => {
                state.isLoading = false;
            })
    }
})

export const {setIsAuthFalse, setError, setIsAuth} = userSlice.actions
export default userSlice.reducer;
