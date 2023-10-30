import {createSlice} from "@reduxjs/toolkit";

export const postsSlice = createSlice({
    name: 'items',
    initialState: {
        posts: [],
        status: "idle"
    },
    reducers: {
        postCreated(state, action) {
            state = state.posts.push(action.payload);
        }
    },
    extraReducers: {
        
    }
})
export const { postCreated } = postsSlice.actions;

export default postsSlice.reducer;
