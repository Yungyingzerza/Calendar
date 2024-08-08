import { createSlice } from "@reduxjs/toolkit";
import { off } from "process";

const initialState = {
    isOn: false,
    top: 0,
    left: 0,
    offsetWidth: 0,
    offsetHeight: 0,
};

export const menuContextSlice = createSlice({
    name: "menuContext",
    initialState,
    reducers: {
        setIsOn(state, action) {
            state.isOn = action.payload;
        },
        setTop(state, action) {
            state.top = action.payload;
        },
        setLeft(state, action) {
            state.left = action.payload;
        },
        setOffsetWidth(state, action) {
            state.offsetWidth = action.payload;
        },
        setOffsetHeight(state, action) {
            state.offsetHeight = action.payload;
        },
    },
});

export const { setIsOn, setLeft, setTop, setOffsetHeight, setOffsetWidth } = menuContextSlice.actions;
export default menuContextSlice.reducer;
