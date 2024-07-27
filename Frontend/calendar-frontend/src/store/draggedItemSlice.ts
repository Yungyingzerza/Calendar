import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    id: 0,
    title: "",
    startHour: 0,
    endHour: 0,
    startMinute: 0,
    endMinute: 0,
    day: 0,
    month: 0,
    year: 0,
    newHeight: 0,
    newTop: 0,
};

export const draggedItemSlice = createSlice({
    name: "draggedItemSlice",
    initialState,
    reducers: {
        setId: (state, action) => {
            state.id = action.payload;
        },
        setTitle: (state, action) => {
            state.title = action.payload;
        },
        setStartHour: (state, action) => {
            state.startHour = action.payload;
        },
        setEndHour: (state, action) => {
            state.endHour = action.payload;
        },
        setStartMinute: (state, action) => {
            state.startMinute = action.payload;
        },
        setEndMinute: (state, action) => {
            state.endMinute = action.payload;
        },
        setDay: (state, action) => {
            state.day = action.payload;
        },
        setMonth: (state, action) => {
            state.month = action.payload;
        },
        setYear: (state, action) => {
            state.year = action.payload;
        },
        setNewHeight: (state, action) => {
            state.newHeight = action.payload;
        },
        setNewTop: (state, action) => {
            state.newTop = action.payload;
        },
    },
});

export const { setId, setTitle, setStartHour, setStartMinute, setEndHour, setEndMinute, setDay, setMonth, setYear, setNewHeight, setNewTop } = draggedItemSlice.actions;
export default draggedItemSlice.reducer;
