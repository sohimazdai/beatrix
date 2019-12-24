import { INoteListNote } from "../../../model/INoteList";
import { NoteListChangeNoteByIdAction, NoteListDeleteNoteByIdAction } from "./NoteListAction";
import { NoteListActionType } from "./NoteListActionType";

export function createNoteListChangeNoteByIdAction(note: INoteListNote): NoteListChangeNoteByIdAction {
    return {
        type: NoteListActionType.CHANGE_NOTE_BY_ID,
        payload: note
    }
}


export function createDeleteNoteInNoteListById(noteId: number): NoteListDeleteNoteByIdAction {
    return {
        type: NoteListActionType.DELETE_NOTE_BY_ID,
        payload: noteId
    }
}
