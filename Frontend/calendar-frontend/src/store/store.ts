import { configureStore } from "@reduxjs/toolkit";
import calendarSlice from "./calendarSlice";
import themeSlice from "./themeSlice";
export default configureStore({
    reducer: {
        calendar: calendarSlice,
        theme: themeSlice,
    },
});