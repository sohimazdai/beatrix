import { IPendingNoteList, IPendingNotes } from '../../../model/IPendingNoteList'

export enum PendingNoteListActionType {
    PENDING_NOTE_LIST_CLEAR_BY_USER_ID_PENDING_NOTES = 'PENDING_NOTE_LIST_CLEAR_BY_USER_ID_PENDING_NOTES',
    PENDING_NOTE_LIST_ADD_NOTE = "PENDING_NOTE_LIST_ADD_NOTE"
}

export type PendingNoteListActionTypes = (
    PendingNoteListClearByUserIdAction |
    PendingNoteListAddNoteAction
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

export function createAddNotePendingNoteList(id: string, userId: string): PendingNoteListAddNoteAction {
    return {
        type: PendingNoteListActionType.PENDING_NOTE_LIST_ADD_NOTE,
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
        case PendingNoteListActionType.PENDING_NOTE_LIST_CLEAR_BY_USER_ID_PENDING_NOTES:
            const newNotes: IPendingNotes = { ...module.notes };
            Object.values(module.notes).forEach(note => {
                delete newNotes[note.id];
            });
            return {
                notes: newNotes,
                loading: false,
                error: null
            }
        default: return module;
    }
}
