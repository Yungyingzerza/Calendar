import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: null,
    email: null,
    name: null,
    picture: null,
    isLogin: false
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
        },
        setEmail: (state, action) => {
            state.email = action.payload;
        },
        setName: (state, action) => {
            state.name = action.payload;
        },
        setPicture: (state, action) => {
            state.picture = action.payload;
        },
        setIsLogin: (state, action) => {
            state.isLogin = action.payload;
        }
    },
});

export const { setEmail, setName, setToken, setPicture, setIsLogin } = userSlice.actions;
export default userSlice.reducer;
