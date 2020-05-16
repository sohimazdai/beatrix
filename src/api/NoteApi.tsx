import { api } from './api';
import { INoteListNote } from '../model/INoteList';

export class NoteApi {
    static createNote(note: INoteListNote, userId: string) {
        return api.post('note/create', {
            ...note,
            userId
        })
    }

    static updateNote(note: INoteListNote, userId: String) {
        return api.post('note/update', {
            ...note,
            userId
        })
    }

    static deleteNote(id: string, userId: string) {
        return api.post('note/delete', {
            id,
            userId
        })
    }

    static syncNotes(notes: INoteListNote[], userId: string) {
        return api.post('note/sync', {
            notes,
            userId
        })
    }
}
