import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as api from '../lib/api/authAPI';

export const getUserThunk = createAsyncThunk('auth/GetUser', async (code) => {
    const response = await api.authCode(code);
    return response.data;
});

export const auth = createSlice({
    name: 'auth',
    initialState: {
        user: null,
    },
    reducers: {
        tempSetUser: (state, { payload }) => {
            state.user = JSON.parse(payload.user);
        },
        clearUser: (state, {payload}) => {
            state.user = null;
        }
    },
    extraReducers: {
        [getUserThunk.fulfilled.type]: (state, { payload }) => {
            console.log(payload);
            state.user = payload.user;
            state.user.jwt = payload.jwt;
        },
    },
});

export default auth.reducer;