import { INoteList } from "../../model/INoteList";

export class NoteListToArraySelector {
    static makeArraySortedByTime(noteList: INoteList) {
        let result: string[] = Object.keys(noteList);
        result = result.sort((a, b) => a > b ? parseInt(a) : parseInt(b))
        return result;
    }
}
