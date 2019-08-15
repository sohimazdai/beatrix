import { INoteList, INoteListByDay } from "../../model/INoteList";

export class NoteListSelector {
    static convertFlatNoteListToNoteListByDay(noteList: INoteList): INoteListByDay {
        const notesByDay: INoteListByDay = {};

        Object.keys(noteList).map(key => {
            const note = noteList[key]
            const dayDate= new Date(
                new Date(note.date).getFullYear(),
                new Date(note.date).getMonth(),
                new Date(note.date).getDate()
            ).getTime();
            if (!!!notesByDay[dayDate]) {
                notesByDay[dayDate] = { [note.date]: note }
            } else {
                notesByDay[dayDate] = {
                    ...notesByDay[dayDate],
                    [note.date]: note
                }
            }
        })
        return notesByDay
    }
}
