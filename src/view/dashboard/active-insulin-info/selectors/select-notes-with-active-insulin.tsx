import { createSelector } from 'reselect';
import { IStorage } from '../../../../model/IStorage';
import { convertFlatNoteListToNoteListByDay } from '../../../../store/selector/NoteListSelector';
import { INoteListByDay, INoteList, INoteListNote } from '../../../../model/INoteList';
import { ShortInsulinType } from '../../../../model/IUserDiabetesProperties';
import { DateHelper } from '../../../../utils/DateHelper';

export const selectNoteWithActiveInsulin = createSelector(
  (state: IStorage) => convertFlatNoteListToNoteListByDay(state),
  (state: IStorage) => state.userDiabetesProperties.shortInsulinType,
  getActiveInsulinNoteList
)

function getActiveInsulinNoteList(
  noteListByDay: INoteListByDay,
  shortInsulinType: ShortInsulinType
): INoteListByDay {
  const offset = shortInsulinType === ShortInsulinType.SHORT
    ? 8.5 * 2
    : 4 * 2;

  const currentDate = new Date();
  const startDate = new Date();
  startDate.setHours(new Date().getHours() - offset);

  const activeInsulinNoteList: INoteListByDay = {};

  if (noteListByDay[DateHelper.today()]) {
    Object.keys(noteListByDay[DateHelper.today()]).forEach(noteKey => {
      const note: INoteListNote = noteListByDay[DateHelper.today()][noteKey];

      if (
        note.date > startDate.getMilliseconds() && note.date < currentDate.getMilliseconds() &&
        note.insulin > 0
      ) {
        if (!activeInsulinNoteList[DateHelper.today()]) activeInsulinNoteList[DateHelper.today()] = {};
        activeInsulinNoteList[DateHelper.today()][noteKey] = note;
      }
    })
  }

  if (noteListByDay[DateHelper.yesterday()]) {

    Object.keys(noteListByDay[DateHelper.yesterday()]).forEach(noteKey => {
      const note: INoteListNote = noteListByDay[DateHelper.yesterday()][noteKey];

      if (
        note.date > startDate.getTime() && note.date < currentDate.getTime() &&
        note.insulin > 0
      ) {
        if (!activeInsulinNoteList[DateHelper.yesterday()]) activeInsulinNoteList[DateHelper.yesterday()] = {};
        activeInsulinNoteList[DateHelper.yesterday()][noteKey] = note;
      }
    });
  }

  const notes: INoteListNote[] = [
    ...Object.values(activeInsulinNoteList[DateHelper.yesterday()] || {}),
    ...Object.values(activeInsulinNoteList[DateHelper.today()] || {}),
  ];

  let oldestNote = notes.sort((note1, note2) => note1.date - note2.date)[0].date;

  const noteList = notes.map(note => {
    const newDate = new Date(note.date);
    newDate.setHours(new Date(note.date).getHours() - new Date(oldestNote).getHours());
    newDate.setDate(new Date().getDate());

    return {
      ...note,
      date: newDate,
    }
  }).reduce((acc, curr) => {
    return {
      ...acc,
      [curr.id]: curr
    };
  }, {})

  const newNoteListByDay: INoteListByDay = {
    [DateHelper.today()]: noteList
  };

  return newNoteListByDay;
}
