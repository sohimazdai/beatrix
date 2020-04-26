export interface IPendingNote {
    id: string
    userId: string
}

export interface IPendingNotes {
    [id: number]: IPendingNote
}

export interface IPendingNoteList {
    notes?: IPendingNotes

    loading?: boolean
    error?: any
}
