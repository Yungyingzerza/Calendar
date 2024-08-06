import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    click: false,
};

export const isClickOnAppointmentSlice = createSlice({
    name: "isClickOnAppointment",
    initialState,
    reducers: {
        setIsClick: (state, action) => {
            state.click = action.payload;
        }
    },
});

export const { setIsClick } = isClickOnAppointmentSlice.actions;
export default isClickOnAppointmentSlice.reducer;
