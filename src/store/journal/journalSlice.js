import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
    name: 'journal',
    initialState: {
        isSaving: false,
        messageSaved: '',
        notes: [],
        active: null,
        // active: {
        //     id: 'ABC',
        //     title: '',
        //     body: '',
        //     date: 1234567,
        //     imageUrls: [], //https://foto1.jpg, https://foto2.jpg
        // }
    },
    reducers: {
        savingNewNote: ( state ) => {
            state.isSaving = true
        },
        addNewEmptyNote: (state, action ) => {
            state.notes.push( action.payload )
            state.isSaving = false
        },
        setActiveNote: (state, action ) => {
            state.active = action.payload
        },
        setNotes: (state, action ) => {
            state.notes = action.payload
        },
        setSaving: (state, action ) => {
        
        },
        updateNote: (state, action ) => {
        
        },
        deleteNoteByID: (state, action ) => {
        
        },
    }
})


// Action creators are generated for each case reducer function
export const { 
    savingNewNote,
    addNewEmptyNote,
    setActiveNote,
    setNotes,
    setSaving,
    updateNote,
    deleteNoteByID,
} = journalSlice.actions;