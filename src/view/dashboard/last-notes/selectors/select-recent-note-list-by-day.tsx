import { createSelector } from 'reselect';
import { IStorage } from '../../../../model/IStorage';
import { convertFlatNoteListToNoteListByDay } from '../../../../store/selector/NoteListSelector';
import { INoteListByDay, INoteList } from '../../../../model/INoteList';
import { DateHelper } from '../../../../utils/DateHelper';

export const selectRecentNoteListByDay = createSelector(
  (state: IStorage) => convertFlatNoteListToNoteListByDay(state),
  getRecentNoteListByDay
);

function getRecentNoteListByDay(noteListByDay: INoteListByDay): INoteListByDay {
  let recentNoteListByDay: INoteListByDay = {};
  let notesCount = 0;
  let daysInDepth = 4;
  for (let i = 0; i < daysInDepth; i++) {
    const currentDate = DateHelper.getDiffDate(new Date(), -i);
    const currentNoteList: INoteList = noteListByDay[currentDate] || {};

    Object.values(currentNoteList).forEach((note) => {
      if (notesCount < 4) {
        if (!recentNoteListByDay[currentDate]) recentNoteListByDay[currentDate] = {};
        recentNoteListByDay[currentDate] = {
          ...recentNoteListByDay[currentDate],
          [note.id]: note
        };
        notesCount++;
      }
    })
  }

  return recentNoteListByDay;
}
