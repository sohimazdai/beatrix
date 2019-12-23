export interface INoteList {
    [id: number]: INoteListNote
}

export interface INoteListNote {
    date: number,
    glucose?: number,
    breadUnits?: number,
    insulin?: number,
    longInsulin?: number,
    commentary?: string
}

export interface INoteListByDay {
    [id: number]: INoteList;
}

export enum NoteValueType {
    GLUCOSE = 'glucose',
    DATE = 'date',
    FOOD = 'food',
    SHORT_INSULIN = 'short-insulin',
    LONG_INSULIN = 'long-insulin',
    COMMENT = 'comment'
}