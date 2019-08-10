import { NoteListActionType } from "./NoteListActionType";
import { INoteListNote } from "../../../model/INoteList";

export interface NoteListChangeNoteByIdAction {
    type: NoteListActionType.CHANGE_NOTE_BY_ID,
    payload: INoteListNote
}
