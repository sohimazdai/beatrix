import { INoteListNote } from './INoteList';

export enum PendingOperationType {
    CREATE = 'create',
    UPDATE = 'update',
    DELETE = 'delete'
}

export interface IPendingNote extends INoteListNote {
    userId: string,
    operation: PendingOperationType
}

export interface IPendingNotes {
    [id: number]: IPendingNote
}

export interface IPendingNoteList {
    notes?: IPendingNotes

    loading?: boolean
    error?: any
}
