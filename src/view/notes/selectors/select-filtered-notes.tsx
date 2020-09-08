import { createSelector } from 'reselect';
import { IStorage } from '../../../model/IStorage';
import { INoteList, INoteListByDay, INoteListNote } from '../../../model/INoteList';
import { INoteFilter } from '../../../model/INoteFilter';
import { convertFlatNoteListToNoteListByDay } from '../../../store/selector/NoteListSelector';
import { Measures } from '../../../localisation/Measures';
import { IUserDiabetesProperties } from '../../../model/IUserDiabetesProperties';
import { checkIsFilterActive } from './check-is-filter-active';

export const selectFilteredNotes = createSelector(
  (state: IStorage) => convertFlatNoteListToNoteListByDay(state),
  (state: IStorage) => checkIsFilterActive(state),
  (state: IStorage) => state.noteFilter,
  (state: IStorage) => state.userDiabetesProperties,
  filter
)

function filter(
  noteListByDay: INoteListByDay,
  isFilterActive: boolean,
  noteFilter: INoteFilter,
  diabetesProps: IUserDiabetesProperties
): INoteListByDay {
  if (isFilterActive) {
    const newNoteListByDay = { ...noteListByDay };

    Object.keys(newNoteListByDay).forEach((dateId: string) => {

      const noteList = newNoteListByDay[dateId];
      filterNoteList(noteList, noteFilter, diabetesProps);

      Object.values(noteList).length === 0 && delete newNoteListByDay[dateId]
    });

    return newNoteListByDay;
  }

  return noteListByDay;
}

function filterNoteList(noteList: INoteList, noteFilter: INoteFilter, diabetesProps: IUserDiabetesProperties) {
  Object.values(noteList).forEach((note: INoteListNote) => {
    if (
      !(
        isWithTags(note, noteFilter.withTags) ||
        isWithComment(note, noteFilter.withComment) ||
        isWithHighGlucose(note, noteFilter.highGlucose, diabetesProps) ||
        isWithLowGlucose(note, noteFilter.lowGlucose, diabetesProps) ||
        isWithNormalGlucose(note, noteFilter.normalGlucose, diabetesProps) ||
        isTagsEquals(note, noteFilter.tags)
      )
    ) delete noteList[note.id]
  })
}

function isWithTags(note: INoteListNote, withTags: boolean) {
  if (note.tagIds?.length > 0 && withTags) return true;

  return false;
}

function isWithComment(note: INoteListNote, withComment: boolean) {
  if (note.commentary?.length > 0 && withComment) return true;

  return false;
}

function isWithHighGlucose(note: INoteListNote, highGlucose: boolean, diabetesProps: IUserDiabetesProperties) {
  const maxGlucose = Measures.getCriticalGlycemia(diabetesProps.glycemiaMeasuringType).max;

  if (note.glucose > maxGlucose && highGlucose) return true;

  return false;
}

function isWithLowGlucose(note: INoteListNote, highGlucose: boolean, diabetesProps: IUserDiabetesProperties) {
  const minGlucose = Measures.getCriticalGlycemia(diabetesProps.glycemiaMeasuringType).min;

  if (note.glucose && note.glucose < minGlucose && highGlucose) return true;

  return false;
}

function isWithNormalGlucose(note: INoteListNote, highGlucose: boolean, diabetesProps: IUserDiabetesProperties) {
  const limits = Measures.getCriticalGlycemia(diabetesProps.glycemiaMeasuringType);

  if (note.glucose && note.glucose >= limits.min && note.glucose <= limits.max && highGlucose) return true;

  return false;
}

function isTagsEquals(note: INoteListNote, tags: number[] = []) {
  const noteTags = note.tagIds || [];

  return noteTags.some((tagId: number) => {
    return tags.some((tagsTagId: number) => tagsTagId === tagId)
  })
}
