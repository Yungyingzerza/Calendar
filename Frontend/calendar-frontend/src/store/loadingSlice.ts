import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    authenLoading: true,
};

export const loadingSlice = createSlice({
    name: "loading",
    initialState,
    reducers: {
        setAuthenLoading: (state, action) => {
            state.authenLoading = action.payload;
        }
    },
});

export const { setAuthenLoading } = loadingSlice.actions;
export default loadingSlice.reducer;
