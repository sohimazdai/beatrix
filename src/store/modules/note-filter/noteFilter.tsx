import { INoteFilter } from "../../../model/INoteFilter";
import { i18nGet } from '../../../localisation/Translate';
import { randomizeBGandFontColor } from '../../../utils/RandomizeColor';

export enum NoteFilterActionType {
    CHANGE = "NOTE_FILTER_CHANGE",
}

export type NoteFilterActionTypes = NoteFilterChangeAction;

export interface NoteFilterChangeAction {
    type: NoteFilterActionType.CHANGE,
    payload: INoteFilter
}

export function createChangeNoteFilter(noteFilter: INoteFilter): NoteFilterChangeAction {
    return {
        type: NoteFilterActionType.CHANGE,
        payload: noteFilter
    }
}

export function noteFilterReducer(
    module: INoteFilter = {},
    action: NoteFilterActionTypes
): INoteFilter {
    switch (action.type) {
        case NoteFilterActionType.CHANGE:
            return {
                ...module,
                ...action.payload
            }
        default: return module;
    }
}
