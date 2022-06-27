import { NoteListActionType } from "./NoteListActionType";
import { INoteListNote, INoteList } from "../../../model/INoteList";

export interface NoteListChangeNoteByIdAction {
    type: NoteListActionType.CHANGE_NOTE_BY_ID,
    payload: {
        note: INoteListNote,
        userId: string,
        generatedNoteId?: string
    }
}

export interface NoteListDeleteNoteByIdAction {
    type: NoteListActionType.DELETE_NOTE_BY_ID,
    payload: {
        noteId: string
    }
}

export interface NoteListOneLevelDeepMerge {
    type: NoteListActionType.ONE_LEVEL_DEEP_MERGE
    payload: {
        noteList: INoteList
    }
}

export interface NoteListReplace {
    type: NoteListActionType.REPLACE
    payload: {
        noteList: INoteList
    }
}
