import { createSelector } from 'reselect';
import { IStorage } from '../../../../model/IStorage';
import { convertFlatNoteListToNoteListByDay } from '../../../selector/NoteListSelector';
import { INoteListByDay, INoteListNote, NoteValueType, INoteList } from '../../../../model/INoteList';

export const selectDailyAverage = createSelector(
  (state: IStorage, from: number, to: number, key: NoteValueType) => {
    const noteLIstByDay = convertFlatNoteListToNoteListByDay(state);

    return {
      noteList: selectDaysNoteList(noteLIstByDay, from, to),
      key
    }
  },
  opts => getDailyAverage(opts.noteList, opts.key)
)

function selectDaysNoteList(noteListByDay: INoteListByDay, from: number, to: number) {
  const noteListDates: string[] = Object.keys(noteListByDay)
    .filter(dayDate => Number(dayDate) > from && Number(dayDate) < to);
  const noteList: INoteList[] = noteListDates.reduce(
    (acc: INoteList[], currentDate: string) => {
      const currentDateNoteList: INoteList = noteListByDay[currentDate];
      acc.push(currentDateNoteList);
      return acc;
    }, []
  )
  return noteList;
};


function getDailyAverage(noteList: INoteList[], key: NoteValueType) {
  let total = 0;
  let count = 0;

  noteList.forEach((noteList: INoteList) => {
    let localTotal = 0;

    Object.values(noteList).map((note) => {
      if (note[key]) {
        localTotal += note[key];
      }
    });

    if (localTotal > 0) count++;
    total += localTotal;
  })

  return total ? (total / count).toFixed(1) : 0;
}
