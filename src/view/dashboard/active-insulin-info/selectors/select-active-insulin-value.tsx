import { createSelector } from 'reselect';
import { INoteListByDay, INoteListNote, INoteList } from '../../../../model/INoteList';
import { IStorage } from '../../../../model/IStorage';
import { selectNoteWithActiveInsulin } from './select-notes-with-active-insulin';
import { DateHelper } from '../../../../utils/DateHelper';
import { ShortInsulinType } from '../../../../model/IUserDiabetesProperties';
import { ChartConfig } from '../../../../screen/chart/config/ChartConfig';
import { IChartConfiguration } from '../../../../model/IChart';
import { shortInsulinDistribution } from '../../../../calculation-services/short-insulin-distribution';

export const selectActiveInsulinValue = createSelector(
  (state: IStorage) => selectNoteWithActiveInsulin(state).noteListByDay,
  (state: IStorage) => selectNoteWithActiveInsulin(state).oldestNoteTime,
  (state, now: Date) => now,
  (state: IStorage) => state.userDiabetesProperties.shortInsulinType,
  calculateActiveInsulinValue
)

function calculateActiveInsulinValue(
  noteListByDay: INoteListByDay,
  oldestNoteTime: number,
  now: Date,
  shortInsulinType: ShortInsulinType,
): number {
  const config: IChartConfiguration = new ChartConfig().getConfigs().activeInsulin;

  const noteListToday: INoteList = noteListByDay[DateHelper.today()] || {} as INoteList;

  const notes: INoteListNote[] = [
    ...Object.values(noteListToday),
  ];

  if (!(notes.length > 0) || !shortInsulinType) return 0;

  const nowTime = now.getTime();
  const oldestNoteDate = new Date(oldestNoteTime);

  const values: number[] = [];

  notes.forEach((note: INoteListNote) => {
    const currentDate = new Date(note.date);
    currentDate.setHours(currentDate.getHours() + oldestNoteDate.getHours());

    const deltaDate = nowTime - currentDate.getTime();
    const insulin = note.insulin;

    if (deltaDate) {
      const deltaIndex: number = Math.round(deltaDate / 1000 / 60 / config.timeStepMinutes);

      const insulinDistribution: number[] = shortInsulinDistribution[shortInsulinType];
      const totalDistribution: number = insulinDistribution.reduce((acc, curr) => curr + acc, 0);

      const particleInsulinDistribution: number[] = insulinDistribution.slice(deltaIndex);
      const particleDistribution: number = particleInsulinDistribution
        .reduce((acc, curr) => acc + curr, 0);

      const particleToTotalRelativity = particleDistribution / totalDistribution;
      const particleInsulin = insulin * particleToTotalRelativity;
      values.push(particleInsulin);
    } else {
      values.push(insulin);
    }
  });

  const totalRestInsulin = values.reduce((sum, next) => sum + next, 0);

  return totalRestInsulin;
}
