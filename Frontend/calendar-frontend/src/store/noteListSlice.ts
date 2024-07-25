import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    list: [],
};

export const noteListSlice = createSlice({
    name: "noteList",
    initialState,
    reducers: {
        setList(state, action) {
            state.list = action.payload;
        }
    },
});

export const { setList } = noteListSlice.actions;
export default noteListSlice.reducer;
