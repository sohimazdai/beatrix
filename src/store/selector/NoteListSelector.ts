import { INoteListByDay } from "../../model/INoteList";
import { IStorage } from '../../model/IStorage';
import { createSelector } from 'reselect';

const noteListSelector = (state: IStorage) => Object.values(state.noteList);
const userIdSelector = (state: IStorage) => state.user.id;

export const convertFlatNoteListToNoteListByDay = createSelector(
    [
        noteListSelector,
        userIdSelector,
    ],
    (notes, userId): INoteListByDay => {
        const notesByDay: INoteListByDay = {};

        notes.map(note => {
            const dayDate = new Date(
                new Date(note.date).getFullYear(),
                new Date(note.date).getMonth(),
                new Date(note.date).getDate()
            ).getTime();

            if (note.userId === userId) {
                notesByDay[dayDate] = {
                    ...notesByDay[dayDate],
                    [note.id]: note
                }
            }
        })

        return notesByDay
    }
);
