import { INoteListNote } from "../../../model/INoteList";
import { NoteListChangeNoteByIdAction, NoteListDeleteNoteByIdAction, FDTUUIDAction } from "./NoteListAction";
import { NoteListActionType } from "./NoteListActionType";

export function createNoteListChangeNoteByIdAction(note: INoteListNote, userId: string): NoteListChangeNoteByIdAction {
    return {
        type: NoteListActionType.CHANGE_NOTE_BY_ID,
        payload: {
            note,
            userId
        }
    }
}

export function createDeleteNoteInNoteListById(noteId: string): NoteListDeleteNoteByIdAction {
    return {
        type: NoteListActionType.DELETE_NOTE_BY_ID,
        payload: {
            noteId
        }
    }
}

export function createFDTRUUIDAction(userId: string): FDTUUIDAction {
    return {
        type: NoteListActionType.FDTUUID,
        payload: {
            userId
        }
    }
}
