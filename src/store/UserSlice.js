import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const loginUser = createAsyncThunk(
    'user/loginUser',

    async({userCredentials, auth}) => {

        //----------- Check if the user already exists by making a GET request
        const checkRequest = await axios.get('http://localhost:8080/credentials');
        const usersData = checkRequest.data;     
        console.log(usersData);
        console.log('auth:', auth);
        
        if (auth === 'signup'){

            const existingUsers = usersData.filter((user) => {
                return user.name === userCredentials.name || user.email === userCredentials.email;
            });

            if (existingUsers.length > 0) {
                return 'Account already exist with these credentials';

            }  else {
                //----------- Proceed with user registration using a POST request
                const request = await axios.post('http://localhost:8080/credentials', userCredentials)
                const response = await request.data;
                console.log(response);
                localStorage.setItem('user', JSON.stringify(response));
                return response;
            }
        }
        else if (auth === 'login') {

            const existingUsers = usersData.filter((user) => {
                return user.email === userCredentials.email && user.password === userCredentials.password;
            });
                
            if (existingUsers.length > 0) {
                //------------ User with matching email and password found
                const user = existingUsers[0]; 
                console.log(user);
                localStorage.setItem('user', JSON.stringify({ name: user.name, email: user.email }));
                return {
                    name: user.name,
                    email: user.email,
                    message: 'Login successful',
                };

            }  else {
                return 'No user found with these credentials';

            }
        }
    }
);


const userSlice = createSlice({
    name: 'user',
    initialState : {
        loading : false,
        user : null,
        otherError : null
    },
    extraReducers: (builder) => {
        builder
        .addCase(loginUser.pending,(state)=> {
            state.loading = true;
            state.user = null;
            state.otherError = null;
        })
        .addCase(loginUser.fulfilled,(state, action)=> {
            state.loading = false;
            state.user = action.payload;
            state.otherError = null;
        })
        .addCase(loginUser.rejected,(state, action)=> {
            state.loading = false;
            state.user = null;
            console.log(action.error.message);
            if(action.error.message === 'Request failed with status code 404'){
                state.otherError = 'Access denied!';
            } else {
                state.otherError = 'invalid credentials';
            }
        })
    }
});

export default userSlice.reducer;