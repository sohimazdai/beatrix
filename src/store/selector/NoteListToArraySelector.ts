import { INoteList, INoteListNotes, INoteListNote } from "../../model/INoteList";

export class NoteListToArraySelector {
    static makeArraySortedByTime(note: INoteListNote, notes: INoteListNotes) {
        const keys: string[] = Object.keys(notes);
        keys.push(note.date.toString());
        let result: number[] = keys.map(key => parseInt(key))
        return result.sort((a, b) => b - a);
    }
}
