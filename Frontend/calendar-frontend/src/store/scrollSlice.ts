import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    scrollY: -1,
};

export const scrollSlice = createSlice({
    name: "scroll",
    initialState,
    reducers: {
        setScrollY: (state, action) => {
            state.scrollY = action.payload;
        }
    },
});

export const { setScrollY,} = scrollSlice.actions;
export default scrollSlice.reducer;
