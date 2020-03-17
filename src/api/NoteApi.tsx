import { api } from './api';
import { INoteListNote } from '../model/INoteList';

export class NoteApi {
    static createNote(note: INoteListNote, userId: string) {
        return api.axios.post('note/create', {
            note,
            userId
        })
    }
}
