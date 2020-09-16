import { GlycemiaMeasuringType, CarbsUnitWeightType, CarbsMeasuringType } from './IUserDiabetesProperties';
import { ITag } from './ITagList';

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

    glycemiaType?: GlycemiaMeasuringType,
    carbsUnitWeight?: CarbsUnitWeightType
    carbsMeasuringType?: CarbsMeasuringType

    tagIds?: string[]
}

export interface INoteListByDay {
    [id: number]: INoteList;
}

export enum NoteValueType {
    DATE = 'date',
    GLUCOSE = 'glucose',
    BREAD_UNITS = 'breadUnits',
    SHORT_INSULIN = 'insulin',
    LONG_INSULIN = 'longInsulin',
    COMMENT = 'comment'
}
