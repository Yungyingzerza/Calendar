import { createReducer, PayloadAction, ActionReducerMapBuilder } from "@reduxjs/toolkit";

import { 
    fetchNotes,
    addNote,
    deleteNote,
    updateNote    
} from "./action";

export default createReducer([], (builder: ActionReducerMapBuilder<any[]>) => {
    builder.addCase(fetchNotes, (state, action: PayloadAction<any>) => {
        return action.payload;
    });
    builder.addCase(addNote, (state, action: PayloadAction<any>) => {
        state.push({ ...action.payload });
    });
    builder.addCase(updateNote, (state, action: PayloadAction<any>) => {
        const noteIndex = state.findIndex(
            (note) => note.id === action.payload.id
        );
        state[noteIndex] = action.payload;
    });
    builder.addCase(deleteNote, (state, action: PayloadAction<any>) => {
        const noteIndex = state.findIndex(
            (note) => note.id === action.payload.id
        );
        state.splice(noteIndex, 1);
    });
});