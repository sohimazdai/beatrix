import { INoteListByDay } from '../../../../model/INoteList';
import { IUserDiabetesProperties } from '../../../../model/IUserDiabetesProperties';
import { createSelector } from 'reselect';
import { IStorage } from '../../../../model/IStorage';
import { convertFlatNoteListToNoteListByDay } from '../../../../store/selector/NoteListSelector';
import { StatisticsPeriod } from '../../../../model/IStatistics';
import { getNoteList } from './get-note-list';

export const selectStatisticsAvailibility = createSelector(
  (state: IStorage) => convertFlatNoteListToNoteListByDay(state) || {},
  (state, statisticsPeriod: StatisticsPeriod) => statisticsPeriod,
  (state, som2, date: Date) => date,
  (som1, som2, some3, userDiabetesProperties: IUserDiabetesProperties) => userDiabetesProperties,
  getStatisticsAvailibility
)

function getStatisticsAvailibility(
  noteListByDay: INoteListByDay,
  statisticsPeriod: StatisticsPeriod,
  date: Date,
): boolean {
  const noteList = getNoteList(noteListByDay, statisticsPeriod, date);

  return !!noteList.length;
}

