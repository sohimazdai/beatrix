import { createSelector } from 'reselect';
import { IStorage } from '../../../../../model/IStorage';
import { INoteList } from '../../../../../model/INoteList';

export const selectFirstNoteDate = createSelector(
  (state: IStorage) => state.noteList,
  getLastNoteDate
)

function getLastNoteDate(noteList: INoteList) {
  if (!noteList) {
    return new Date().getTime();
  }
  let minDate;
  Object.values(noteList).forEach((note) => {
    if (note.id && (note.date < minDate || !minDate)) {
      minDate = note.date;
    }
  })

  return minDate;
}
