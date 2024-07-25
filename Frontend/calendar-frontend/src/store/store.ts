import { configureStore } from "@reduxjs/toolkit";
import calendarSlice from "./calendarSlice";
import themeSlice from "./themeSlice";
import userSlice from "./userSlice";
import loadingSlice from "./loadingSlice";
import draggedItemSlice from "./draggedItemSlice";
export default configureStore({
    reducer: {
        calendar: calendarSlice,
        theme: themeSlice,
        user: userSlice,
        loading: loadingSlice,
        draggedItem: draggedItemSlice
    },
});