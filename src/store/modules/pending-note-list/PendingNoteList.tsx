import { IPendingNoteList } from '../../../model/IPendingNoteList'

export enum PendingNoteListActionType {
    PENDING_NOTE_LIST_UPLOAD = "PENDING_NOTE_LIST_UPLOAD",
    PENDING_NOTE_LIST_ONE_LEVEL_DEEP_MERGE = "PENDING_NOTE_LIST_ONE_LEVEL_DEEP_MERGE",
    PENDING_NOTE_LIST_CLEAR_PENDING_NOTES = 'PENDING_NOTE_LIST_CLEAR_PENDING_NOTES',
    PENDING_NOTE_LIST_DELETE_NOTE_BY_ID = "PENDING_NOTE_LIST_DELETE_NOTE_BY_ID_ACTION"
}

export type PendingNoteListActionTypes = (
    PendingNoteListChangeAction |
    PendingNoteListOneLevelDeepMergeAction |
    PendingNoteListClearAction |
    PendingNoteListDeleteNoteByIdAction
)

export interface PendingNoteListChangeAction {
    type: PendingNoteListActionType.PENDING_NOTE_LIST_UPLOAD,
    payload: {
        noteList: IPendingNoteList
    }
}

export interface PendingNoteListOneLevelDeepMergeAction {
    type: PendingNoteListActionType.PENDING_NOTE_LIST_ONE_LEVEL_DEEP_MERGE,
    payload: {
        noteList: IPendingNoteList
    }
}

export interface PendingNoteListClearAction {
    type: PendingNoteListActionType.PENDING_NOTE_LIST_CLEAR_PENDING_NOTES,
    payload: {
        idsToRemove: number[]
    }
}

export interface PendingNoteListDeleteNoteByIdAction {
    type: PendingNoteListActionType.PENDING_NOTE_LIST_DELETE_NOTE_BY_ID,
    payload: {
        id: number
    }
}

export function createChangePendingNoteList(noteList: IPendingNoteList) {
    return {
        type: PendingNoteListActionType.PENDING_NOTE_LIST_UPLOAD,
        payload: {
            noteList
        }
    }
}

export function createOneLevelMergePendingNoteList(noteList: IPendingNoteList) {
    return {
        type: PendingNoteListActionType.PENDING_NOTE_LIST_ONE_LEVEL_DEEP_MERGE,
        payload: {
            noteList
        }
    }
}

export function createDeletePendingNoteById(id: number): PendingNoteListDeleteNoteByIdAction {
    return {
        type: PendingNoteListActionType.PENDING_NOTE_LIST_DELETE_NOTE_BY_ID,
        payload: {
            id
        }
    }
}

export function createClearPendingNoteList(idsToRemove: number[]): PendingNoteListClearAction {
    return {
        type: PendingNoteListActionType.PENDING_NOTE_LIST_CLEAR_PENDING_NOTES,
        payload: {
            idsToRemove
        }
    }
}

export function pendingNoteListReducer(
    module: IPendingNoteList = {},
    action: PendingNoteListActionTypes
): IPendingNoteList {
    switch (action.type) {
        case PendingNoteListActionType.PENDING_NOTE_LIST_UPLOAD:
            return {
                ...module,
                ...action.payload.noteList
            }
        case PendingNoteListActionType.PENDING_NOTE_LIST_ONE_LEVEL_DEEP_MERGE:
            return {
                ...module,
                ...action.payload.noteList.notes,
                notes: {
                    ...module.notes,
                    ...action.payload.noteList.notes
                }
            }
        case PendingNoteListActionType.PENDING_NOTE_LIST_DELETE_NOTE_BY_ID:
            const newModule = module;
            delete newModule[action.payload.id]
            return newModule;
        case PendingNoteListActionType.PENDING_NOTE_LIST_CLEAR_PENDING_NOTES:
            const moduleToClear = module;
            action.payload.idsToRemove.map(id => delete moduleToClear[id]);
            return moduleToClear
        default: return module;
    }
}
