import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedDay: 0,
    selectedMonth: 0,
    selectedYear: 0,
    currentDisplayMonth: 0,
    currentDisplayYear: 0,
};

export const calendarSlice = createSlice({
    name: "calendar",
    initialState,
    reducers: {
        setSelectedDay: (state, action) => {
            state.selectedDay = action.payload;
        },
        setSelectedMonth: (state, action) => {
            state.selectedMonth = action.payload;
        },
        setSelectedYear: (state, action) => {
            state.selectedYear = action.payload;
        },
        setCurrentDisplayMonth: (state, action) => {
            state.currentDisplayMonth = action.payload;
        },
        setCurrentDisplayYear: (state, action) => {
            state.currentDisplayYear = action.payload;
        }
    },
});

export const { setSelectedDay, setSelectedMonth, setSelectedYear, setCurrentDisplayMonth, setCurrentDisplayYear } = calendarSlice.actions;
export default calendarSlice.reducer;
