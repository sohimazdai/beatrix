export interface INoteList {
    [id: string]: INoteListNote
}

export interface INoteListNote {
    id?: string
    date: number,
    userId?: string,
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
    DATE = 'date',
    GLUCOSE = 'glucose',
    FOOD = 'food',
    SHORT_INSULIN = 'short-insulin',
    LONG_INSULIN = 'long-insulin',
    COMMENT = 'comment'
}
