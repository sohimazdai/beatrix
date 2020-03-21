import { api } from './api';
import { INoteListNote } from '../model/INoteList';

export class NoteApi {
    static createNote(note: INoteListNote, userId: string) {
        return api.axios.post('note/create', {
            ...note,
            userId
        })
    }

    static updateNote(note: INoteListNote, userId: String) {
        return api.axios.post('note/update', {
            ...note,
            userId
        })
    }

    static deleteNote(date: number, userId: string) {
        return api.axios.post('note/delete', {
            date,
            userId
        })
    }
}
