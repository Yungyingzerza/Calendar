import { ActionCreatorWithPayload, createAction } from "@reduxjs/toolkit";

export const fetchNotes : ActionCreatorWithPayload<any, string> = createAction('FETCH_NOTES');
export const addNote = createAction('ADD_NOTE');
export const deleteNote = createAction('DELETE_NOTE'); // payload is the note id
export const updateNote = createAction('UPDATE_NOTE');