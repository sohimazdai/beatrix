import { IPendingNoteList, IPendingNotes, IPendingNote } from '../../../model/IPendingNoteList'

export enum PendingNoteListActionType {
    PENDING_NOTE_LIST_CLEAR_BY_USER_ID_PENDING_NOTES = 'PENDING_NOTE_LIST_CLEAR_BY_USER_ID_PENDING_NOTES',
    PENDING_NOTE_LIST_ADD_NOTE = "PENDING_NOTE_LIST_ADD_NOTE",
    PENDING_NOTE_LIST_DELETE_NOTE = "PENDING_NOTE_LIST_DELETE_NOTE"
}

export type PendingNoteListActionTypes = (
    PendingNoteListClearByUserIdAction |
    PendingNoteListAddNoteAction |
    PendingNoteListDeleteNoteAction
)

export interface PendingNoteListClearByUserIdAction {
    type: PendingNoteListActionType.PENDING_NOTE_LIST_CLEAR_BY_USER_ID_PENDING_NOTES,
    payload: {
        userId: string
    }
}

export interface PendingNoteListAddNoteAction {
    type: PendingNoteListActionType.PENDING_NOTE_LIST_ADD_NOTE,
    payload: {
        id: string,
        userId: string
    }
}

export interface PendingNoteListDeleteNoteAction {
    type: PendingNoteListActionType.PENDING_NOTE_LIST_DELETE_NOTE,
    payload: {
        id: string,
        userId: string
    }
}


export function createAddNotePendingNoteList(id: string, userId: string): PendingNoteListAddNoteAction {
    return {
        type: PendingNoteListActionType.PENDING_NOTE_LIST_ADD_NOTE,
        payload: {
            id,
            userId
        }
    }
}

export function createDeleteNoteFromPendingNoteList(id: string, userId: string): PendingNoteListDeleteNoteAction {
    return {
        type: PendingNoteListActionType.PENDING_NOTE_LIST_DELETE_NOTE,
        payload: {
            id,
            userId
        }
    }
}

export function createClearPendingNoteListByUserId(userId: string): PendingNoteListClearByUserIdAction {
    return {
        type: PendingNoteListActionType.PENDING_NOTE_LIST_CLEAR_BY_USER_ID_PENDING_NOTES,
        payload: {
            userId
        }
    }
}

export function pendingNoteListReducer(
    module: IPendingNoteList = {},
    action: PendingNoteListActionTypes
): IPendingNoteList {
    switch (action.type) {
        case PendingNoteListActionType.PENDING_NOTE_LIST_ADD_NOTE:
            return {
                ...module,
                notes: {
                    ...module.notes,
                    [action.payload.id]: {
                        id: action.payload.id,
                        userId: action.payload.userId,
                    }
                }
            };
        case PendingNoteListActionType.PENDING_NOTE_LIST_DELETE_NOTE:
            const pendingNotes = module.notes;
            delete pendingNotes[action.payload.id];
            return {
                ...module,
                notes: pendingNotes,
                loading: false,
                error: null
            };
        case PendingNoteListActionType.PENDING_NOTE_LIST_CLEAR_BY_USER_ID_PENDING_NOTES:
            const newNotes: IPendingNotes = module.notes
                ? module.notes
                : {};
            Object.values(newNotes).forEach(note => {
                if (note.userId === action.payload.userId) {
                    delete newNotes[(note as IPendingNote).id];
                }
            });

            return {
                notes: newNotes,
                loading: false,
                error: null
            }
        default: return module;
    }
}
