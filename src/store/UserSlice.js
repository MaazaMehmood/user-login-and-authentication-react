import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const loginUser = createAsyncThunk(
    'user/loginUser',
    async(userCredentials) => {
        const request = await axios.post('http://localhost:3000/credentials', userCredentials)
        const response = await request.data;
        console.log(response);
        localStorage.setItem('user', JSON.stringify(response));
        return response;
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState : {
        loading : false,
        user : null,
        error : null
    },
    extraReducers: (builder) => {
        builder
        .addCase(loginUser.pending,(state)=> {
            state.loading = true;
            state.user = null;
            state.error = null;
        })
        .addCase(loginUser.fulfilled,(state, action)=> {
            state.loading = false;
            state.user = action.payload;
            state.error = null;
        })
        .addCase(loginUser.rejected,(state, action)=> {
            state.loading = false;
            state.user = null;
            console.log(action.error.message);
            if(action.error.message === 'Request failed with status code 404'){
                state.error = 'Access denied! invalid credentials';
             }else {
                state.error = action.error.message;
             }
        })
    }
});

export default userSlice.reducer;