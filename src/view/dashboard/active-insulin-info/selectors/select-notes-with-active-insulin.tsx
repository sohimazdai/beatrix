import { createSelector } from 'reselect';
import { IStorage } from '../../../../model/IStorage';
import { convertFlatNoteListToNoteListByDay } from '../../../../store/selector/NoteListSelector';
import { INoteListByDay, INoteListNote } from '../../../../model/INoteList';
import { ShortInsulinType } from '../../../../model/IUserDiabetesProperties';
import { DateHelper } from '../../../../utils/DateHelper';

export const selectNoteWithActiveInsulin = createSelector(
  (state: IStorage) => convertFlatNoteListToNoteListByDay(state),
  (state: IStorage) => state.userDiabetesProperties.shortInsulinType,
  getActiveInsulinNoteList
)


function getActiveInsulinNoteList(
  noteListByDay: INoteListByDay,
  shortInsulinType: ShortInsulinType,
): {
  noteListByDay: INoteListByDay,
  oldestNoteTime: number,
} {
  const offset = shortInsulinType === ShortInsulinType.SHORT
    ? 8.5 * 2
    : 4 * 2;

  const currentDate = new Date();
  const startDate = new Date();
  startDate.setHours(new Date().getHours() - offset);

  const notes: INoteListNote[] = [
    ...Object.values(noteListByDay[DateHelper.yesterday()] || {}),
    ...Object.values(noteListByDay[DateHelper.today()] || {}),
  ];

  const filteredNotes = notes.filter(note => {
    return note.date > startDate.getTime() && note.date < currentDate.getTime()
  });

  if (filteredNotes.length === 0) {
    return {
      noteListByDay: {},
      oldestNoteTime: 0,
    };
  }

  let sortedNotes = filteredNotes.sort((note1, note2) => note1.date - note2.date);
  let oldestNote = sortedNotes[0] && sortedNotes[0].date;

  const notesWithNewDate = sortedNotes.map(note => {
    const newDate = new Date(note.date);
    newDate.setHours(new Date(note.date).getHours() - new Date(oldestNote).getHours());
    newDate.setDate(new Date().getDate());

    return {
      ...note,
      date: newDate,
    }
  })
  const noteList = notesWithNewDate.reduce((acc, curr) => {
    return {
      ...acc,
      [curr.id]: curr
    };
  }, {})

  const newNoteListByDay: INoteListByDay = {
    [DateHelper.today()]: noteList
  };

  return {
    noteListByDay: newNoteListByDay,
    oldestNoteTime: oldestNote,
  }
}
