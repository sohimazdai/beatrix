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
            userId,
        });
    }

    static syncNotes(notes: INoteListNote[], userId: string) {
        return api.post('note/sync', {
            notes,
            userId
        })
    }

    static syncNotesV2(notes: INoteListNote[], userId: string) {
        return api.post('note/v2/sync', {
            notes,
            userId
        })
    }

    static getNotes(
        userId: string,
        opts: {
            offset: number,
            limit: number,
        },
    ) {

        const { offset, limit } = opts;

        return api.post('note/range', {
            userId,
            offset,
            limit,
        })
    }
}
