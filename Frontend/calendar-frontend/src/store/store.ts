import { configureStore } from "@reduxjs/toolkit";
import calendarSlice from "./calendarSlice";
import themeSlice from "./themeSlice";
import userSlice from "./userSlice";
import loadingSlice from "./loadingSlice";
import draggedItemSlice from "./draggedItemSlice";
import noteListReducers from "./noteList/reducers";
import isClickOnAppointmentSlice from "./isClickOnAppointmentSlice";
export default configureStore({
    reducer: {
        calendar: calendarSlice,
        theme: themeSlice,
        user: userSlice,
        loading: loadingSlice,
        draggedItem: draggedItemSlice,
        noteList: noteListReducers,
        isClickOnAppointment: isClickOnAppointmentSlice,
    },
});