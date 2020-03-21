import { NoteListActionType } from "./NoteListActionType";
import { INoteListNote } from "../../../model/INoteList";

export interface NoteListChangeNoteByIdAction {
    type: NoteListActionType.CHANGE_NOTE_BY_ID,
    payload: {
        note: INoteListNote,
        userId: string
    }
}

export interface NoteListDeleteNoteByIdAction {
    type: NoteListActionType.DELETE_NOTE_BY_ID,
    payload: {
        noteId: string
    }
}

export interface FDTUUIDAction {
    type: NoteListActionType.FDTUUID,
    payload: {
        userId: string
    }
}
