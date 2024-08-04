import { createSlice } from "@reduxjs/toolkit";
import { start } from "repl";

const initialState = {
    id: 0,
    title: "",
    startHour: 0,
    endHour: 0,
    startMinute: 0,
    endMinute: 0,
    startDay: 0,
    endDay: 0,
    startMonth: 0,
    endMonth: 0,
    startYear: 0,
    endYear: 0,
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
        setStartDay: (state, action) => {
            state.startDay = action.payload;
        },
        setEndDay: (state, action) => {
            state.endDay = action.payload;
        },
        setStartMonth: (state, action) => {
            state.startMonth = action.payload;
        },
        setEndMonth: (state, action) => {
            state.endMonth = action.payload;
        },
        setStartYear: (state, action) => {
            state.startYear = action.payload;
        },
        setEndYear: (state, action) => {
            state.endYear = action.payload;
        },
        setNewHeight: (state, action) => {
            state.newHeight = action.payload;
        },
        setNewTop: (state, action) => {
            state.newTop = action.payload;
        },
    },
});

export const { setId, setTitle, setStartHour, setStartMinute, setEndHour, setEndMinute, setStartDay, setEndDay, setStartMonth, setEndMonth, setStartYear, setEndYear, setNewHeight, setNewTop } = draggedItemSlice.actions;
export default draggedItemSlice.reducer;
