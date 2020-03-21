import { INoteList, INoteListByDay } from "../../model/INoteList";
import { IStorage } from '../../model/IStorage';
//TODO: remove using date as id and set real id
export class NoteListSelector {
    static convertFlatNoteListToNoteListByDay({ noteList, user }: IStorage): INoteListByDay {
        const notesByDay: INoteListByDay = {};

        Object.values(noteList).map(note => {
            const dayDate = new Date(
                new Date(note.date).getFullYear(),
                new Date(note.date).getMonth(),
                new Date(note.date).getDate()
            ).getTime();
            // if (!!!notesByDay[dayDate]) {
            //     notesByDay[dayDate] = { [note.date]: note }
            // } else {
            if (note.userId === user.id) {

                notesByDay[dayDate] = {
                    ...notesByDay[dayDate],
                    [note.id]: note
                }
            }
            // }
        })
        return notesByDay
    }

    static convertNoteListToDayChartDots(noteList: INoteList, date: Date) {
        let result;
        // const notesByDay = NoteListSelector.convertFlatNoteListToNoteListByDay(noteList);

        return result;
    }
}
