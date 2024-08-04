import { ActionCreatorWithPayload, createAction } from "@reduxjs/toolkit";

export const fetchNotes : ActionCreatorWithPayload<any, string> = createAction('FETCH_NOTES');
export const addNote : ActionCreatorWithPayload<any, string> = createAction('ADD_NOTE');
export const deleteNote : ActionCreatorWithPayload<any, string> = createAction('DELETE_NOTE'); // payload is the note id
export const updateNote : ActionCreatorWithPayload<any, string> = createAction('UPDATE_NOTE');