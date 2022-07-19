// Para conexiones asincronas
import { collection, deleteDoc, doc, setDoc } from 'firebase/firestore/lite'
import { FirebaseDB } from '../../firebase/config'
import { addNewEmptyNote, setActiveNote, savingNewNote, setNotes, setSaving, updateNote, setPhotosToActiveNote, deleteNoteById } from './'
import { loadNotes } from '../../helpers/loadNotes'
import { fileUpload } from '../../helpers/fileUpload'

export const startNewNote = () => {
    return async( dispatch, getState ) => {

        dispatch( savingNewNote() )

        const { uid } = getState().auth

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),
        }

        const newDoc = doc( collection( FirebaseDB, `${uid}/journal/notes` ) )
        await setDoc( newDoc, newNote )

        newNote.id = newDoc.id

        dispatch( addNewEmptyNote( newNote ) )
        dispatch( setActiveNote( newNote ) )
    }
}

export const startLoadingNotes = () => {
    return async( dispatch, getState ) => {

        const { uid } = getState().auth
        if( !uid ) throw new Error('El UID del usuario no existe')

        const notes = await loadNotes( uid )

        dispatch( setNotes( notes ) )
    }
}

export const startSaveNote = () => {
    return async( dispatch, getState ) => {

        dispatch( setSaving() )

        // Obtenemos la uid del usuario
        const { uid } = getState().auth
        // Obtenemos la nota activa renombrandola a note
        const { active:note } = getState().journal
        
        // Asigino a una copia de note a una constante
        const noteToFirestone = { ...note }
        // Borrar la id de la nota para pasarla a Firestone
        delete noteToFirestone.id
        // Referencia al documento con su URL y la id
        const docRef = doc( FirebaseDB, `${ uid }/journal/notes/${ note.id }` )
        // La opción de merge es para que una datos, si hay campos que no existe los deja
        await setDoc( docRef, noteToFirestone, { merge: true } )

        dispatch( updateNote( note ) )

    }
}

export const startUploadingFiles = ( files = [] ) => {
    return async ( dispatch ) => {
        dispatch( setSaving() )

        // Almaceno en un array las rutas de las imagenes para depués hacer un envío
        const fileUploadPromises = []
        for (const file of files) {
            fileUploadPromises.push( fileUpload( file ) )
        }
        // se guarda la promesa
        const photosUrls = await Promise.all( fileUploadPromises )
        // Se guarda en el estado
        dispatch( setPhotosToActiveNote( photosUrls ) )
    }
}

export const startDeletingNote = () => {
    return async( dispatch, getState ) => {
        // Obtenemos la uid del usuario
        const { uid } = getState().auth
        // Obtenemos la nota activa renombrandola a note
        const { active:note } = getState().journal

       // Referencia al documento con su URL y la id
       const docRef = doc( FirebaseDB, `${ uid }/journal/notes/${ note.id }` )
       await deleteDoc( docRef )

       dispatch( deleteNoteById( note.id ) )
    }
}