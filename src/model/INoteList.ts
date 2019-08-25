export interface INoteList {
    [id: number]: INoteListNote
}

export interface INoteListNote {
    date: number,
    glucose: number,
    breadUnits: number,
    insulin: number,
    longInsulin: number,
}

export interface INoteListByDay {
    [id: number]: INoteList;
}
