import { createSelector } from 'reselect';
import { IStorage } from '../../../../model/IStorage';
import { convertFlatNoteListToNoteListByDay } from '../../../selector/NoteListSelector';
import { INoteListByDay, INoteList } from '../../../../model/INoteList';

export const selectTotalNotesCount = createSelector(
  (state: IStorage, from: number, to: number) => ({
    noteListByDay: convertFlatNoteListToNoteListByDay(state),
    from,
    to,
  }),
  opts => getNotesCount(opts.noteListByDay, opts.from, opts.to)
)

function getNotesCount(noteListByDay: INoteListByDay, from: number, to: number) {
  const noteListDates: string[] = Object.keys(noteListByDay)
    .filter(dayDate => Number(dayDate) > from && Number(dayDate) < to);

  let count = 0;

  noteListDates.forEach((date) => {
    const currentNoteList: INoteList = noteListByDay[date];
    count += Object.values(currentNoteList).length;
  });

  return count;
};
