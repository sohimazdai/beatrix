import { createSelector } from 'reselect';
import { IStorage } from '../../../../model/IStorage';
import { convertFlatNoteListToNoteListByDay } from '../../../selector/NoteListSelector';
import { INoteListByDay, INoteListNote, NoteValueType } from '../../../../model/INoteList';

export const selectAverage = createSelector(
  (state: IStorage, from: number, to: number, key: NoteValueType) => {
    const noteLIstByDay = convertFlatNoteListToNoteListByDay(state);

    return {
      noteList: selectNoteList(noteLIstByDay, from, to),
      key
    }
  },
  opts => getAverages(opts.noteList, opts.key)
)

function selectNoteList(noteListByDay: INoteListByDay, from: number, to: number) {
  const noteListDates: string[] = Object.keys(noteListByDay)
    .filter(dayDate => Number(dayDate) > from && Number(dayDate) < to);
  const noteList: INoteListNote[] = noteListDates.reduce(
    (acc: INoteListNote[], currentDate: string) => {
      const currentDateNoteList: INoteListNote[] = Object.values(noteListByDay[currentDate]);
      acc.push(...currentDateNoteList);
      return acc;
    }, []
  );

  return noteList;
};


function getAverages(noteList: INoteListNote[], key: NoteValueType) {
  let total = 0;
  let count = 0;

  noteList.forEach((note: INoteListNote) => {
    if (note[key]) {
      total += note[key];
      count++;
    }
  })

  return total ? (total / count).toFixed(1) : 0;
}
