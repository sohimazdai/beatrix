import { createSelector } from 'reselect';
import { INoteListByDay, INoteListNote } from '../../../model/INoteList';
import { StatisticsPeriod } from '../../../model/IStatistics';
import { IStorage } from '../../../model/IStorage';
import { convertFlatNoteListToNoteListByDay } from '../../../store/selector/NoteListSelector';
import { DateHelper } from '../../../utils/DateHelper';

export const selectNoteListForStatisticsByPeriod = createSelector(
  [
    (state: IStorage) => convertFlatNoteListToNoteListByDay(state),
    (_, type: StatisticsPeriod) => type,
    (_, __, date: Date) => date,
  ],
  getNoteList
)

function getNoteList(
  noteListByDay: INoteListByDay,
  type: StatisticsPeriod,
  date: Date
): INoteListNote[] {
  let noteList: INoteListNote[] = [];

  switch (type) {
    case StatisticsPeriod.DAY:
      noteList = Object.values(noteListByDay[DateHelper.getDiffDate(date, 0)] || {});
      break;

    case StatisticsPeriod.MONTH:
      let startMonthDate = new Date(
        date.getFullYear(),
        date.getMonth(),
        1,
      );
      let lastMonthDay = DateHelper.getMaxDateOfDifferentMonth(date, 0);

      for (let i = 0; i < lastMonthDay; i++) {
        const notes = Object.values(noteListByDay[DateHelper.getDiffDate(startMonthDate, i)] || {});
        notes.length && noteList.push(...notes)
      }
      break;

    case StatisticsPeriod.SEASON:
      let firstSeasonDayDateNumber = getStartSeasonDate(date);
      let firstSeasonDayDate = new Date(getStartSeasonDate(date));
      let lastSeasonDay = new Date(
        new Date(firstSeasonDayDateNumber).getFullYear(),
        firstSeasonDayDate.getMonth() + 3,
        0,
      ).getTime();

      const diff = (lastSeasonDay - firstSeasonDayDateNumber) / 1000 / 60 / 60 / 24;

      for (let i = 0; i < diff; i++) {
        const currentDateNumber = String(DateHelper.getDiffDate(firstSeasonDayDate, i));
        const currentDayNotes = noteListByDay[currentDateNumber] || {};
        const notes: INoteListNote[] = Object.values(currentDayNotes);
        notes.length && noteList.push(...notes)
      }
      break;
    case StatisticsPeriod.YEAR:
      let firstYearDay = DateHelper.getDiffDate(new Date(date.getFullYear(), 0, 1), 0);
      let lastYearDay = DateHelper.getDiffDate(new Date(date.getFullYear(), 11, 31), 0);
      let yearDiff = (lastYearDay - firstYearDay) / 1000 / 60 / 60 / 24;

      for (let i = 0; i < yearDiff; i++) {
        const notes = Object.values(noteListByDay[DateHelper.getDiffDate(new Date(firstYearDay), i)] || {});
        notes.length && noteList.push(...notes);
      }

      break;
  }

  return noteList;
}

function getStartSeasonDate(date: Date): number {
  const month = date.getMonth();

  switch (month) {
    case 11:
      return new Date(
        date.getFullYear(),
        11,
        1,
      ).getTime();
    case 0:
    case 1:
      return new Date(
        date.getFullYear() - 1,
        11,
        1,
      ).getTime();
    case 2:
    case 3:
    case 4:
      return new Date(
        date.getFullYear(),
        2,
        1,
      ).getTime();
    case 5:
    case 6:
    case 7:
      return new Date(
        date.getFullYear(),
        5,
        1,
      ).getTime();
    case 8:
    case 9:
    case 10:
      return new Date(
        date.getFullYear(),
        8,
        1,
      ).getTime();
  }
}
