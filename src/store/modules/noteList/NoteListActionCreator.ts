import { INoteListNote, INoteList } from "../../../model/INoteList";
import { NoteListChangeNoteByIdAction, NoteListDeleteNoteByIdAction, NoteListOneLevelDeepMerge, NoteListReplace } from "./NoteListAction";
import { NoteListActionType } from "./NoteListActionType";

export function createNoteListChangeNoteByIdAction(note: INoteListNote, userId: string, generatedNoteId?: string): NoteListChangeNoteByIdAction {
    return {
        type: NoteListActionType.CHANGE_NOTE_BY_ID,
        payload: {
            note,
            userId,
            generatedNoteId
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

export function createNoteListOneLevelDeepMerge(noteList: INoteList): NoteListOneLevelDeepMerge {
    return {
        type: NoteListActionType.ONE_LEVEL_DEEP_MERGE,
        payload: {
            noteList
        }
    }
}

export function createNoteListReplace(noteList: INoteList): NoteListReplace {
    return {
        type: NoteListActionType.REPLACE,
        payload: {
            noteList
        }
    }
}