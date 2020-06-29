import { INoteListByDay, INoteListNote } from '../../../../model/INoteList';
import { StatisticsType } from '../entities';
import { DateHelper } from '../../../../utils/DateHelper';
import { IUserDiabetesProperties } from '../../../../model/IUserDiabetesProperties';
import { createSelector } from 'reselect';
import { IStorage } from '../../../../model/IStorage';
import { convertFlatNoteListToNoteListByDay } from '../../../../store/selector/NoteListSelector';

export const selectStatisticsAvailibility = createSelector(
  (state: IStorage) => convertFlatNoteListToNoteListByDay(state) || {},
  (state, statisticsType: StatisticsType) => statisticsType,
  (som1, som2, userDiabetesProperties: IUserDiabetesProperties) => userDiabetesProperties,
  getStatisticsAvailibility
)

function getStatisticsAvailibility(
  noteListByDay: INoteListByDay,
  statisticsType: StatisticsType,
): boolean {
  const noteList = getNoteList(noteListByDay, statisticsType);

  return !!noteList.length;
}

function getNoteList(noteListByDay: INoteListByDay, type: StatisticsType): INoteListNote[] {
  let noteList: INoteListNote[] = [];

  switch (type) {
    case StatisticsType.TODAY:
      noteList = Object.values(noteListByDay[DateHelper.today()] || {});
      break;
    case StatisticsType.YESTERDAY:
      noteList = Object.values(noteListByDay[DateHelper.yesterday()] || {});
      break;
    case StatisticsType.LAST_MONTH:
      for (let i = 0; i < 30; i++) {
        const notes = Object.values(noteListByDay[DateHelper.getDiffDate(new Date(), -i)] || {});
        notes.length && noteList.push(...notes as any)
      }
      break;
    case StatisticsType.LAST_THREE_MONTH:
      for (let i = 0; i < 90; i++) {
        const notes = Object.values(noteListByDay[DateHelper.getDiffDate(new Date(), -i)] || {});
        notes.length && noteList.push(...notes as any)
      }
      break;
  }
  return noteList;
}
