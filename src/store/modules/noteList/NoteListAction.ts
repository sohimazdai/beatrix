import { NoteListActionType } from "./NoteListActionType";
import { INoteListByDayNote } from "../../../model/INoteList";

export interface NoteListChangeNoteByIdAction {
    type: NoteListActionType.CHANGE_NOTE_BY_ID,
    payload: INoteListByDayNote
}

export interface NoteListDeleteNoteByIdAction {
    type: NoteListActionType.DELETE_NOTE_BY_ID,
    payload: INoteListByDayNote
}