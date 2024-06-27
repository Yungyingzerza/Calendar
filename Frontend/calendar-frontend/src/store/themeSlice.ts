import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: localStorage.getItem("theme") || "dark",
};

export const themeSlice = createSlice({
    name: "test",
    initialState,
    reducers: {
        setTheme: (state, action) => {
            state.value = action.payload;
        }
    },
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
