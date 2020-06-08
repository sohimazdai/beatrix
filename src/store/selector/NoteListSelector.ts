import { INoteListByDay } from "../../model/INoteList";
import { IStorage } from '../../model/IStorage';

export class NoteListSelector {
    static convertFlatNoteListToNoteListByDay(
        { noteList, user }: IStorage
    ): INoteListByDay {
        const notesByDay: INoteListByDay = {};

        Object.values(noteList).map(note => {
            const dayDate = new Date(
                new Date(note.date).getFullYear(),
                new Date(note.date).getMonth(),
                new Date(note.date).getDate()
            ).getTime();
            if (note.userId === user.id) {

                notesByDay[dayDate] = {
                    ...notesByDay[dayDate],
                    [note.id]: note
                }
            }
        })

        return notesByDay
    }
}
