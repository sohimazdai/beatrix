import { createSelector } from 'reselect';
import { IStorage } from '../../../../model/IStorage';
import { INoteListByDay } from '../../../../model/INoteList';
import { ShortInsulinType } from '../../../../model/IUserDiabetesProperties';
import { DateHelper } from '../../../../utils/DateHelper';
import { shortInsulinDistributionStepNumber } from '../../../../calculation-services/short-insulin-distribution';
import { ChartConfig } from '../../../../screen/chart/config/ChartConfig';
import { selectNoteWithActiveInsulin } from './select-notes-with-active-insulin';

export const selectActiveInsulinDuration = createSelector(
  (state: IStorage) => selectNoteWithActiveInsulin(state).noteListByDay,
  (state: IStorage) => state.userDiabetesProperties.shortInsulinType,
  getActiveInsulinDuration
)


function getActiveInsulinDuration(
  activeInsulinNotesByDay: INoteListByDay,
  shortInsulinType: ShortInsulinType,
): number {

  if (!activeInsulinNotesByDay) return 0;

  let lastNoteHour = 0;

  const chartConfig = new ChartConfig().getConfigs().activeInsulin;

  const insulinActionTimeStepsNumber = shortInsulinDistributionStepNumber[shortInsulinType];
  const insulinActionHours = insulinActionTimeStepsNumber * chartConfig.timeStepMinutes / 60;

  activeInsulinNotesByDay[DateHelper.today()] && Object.values(activeInsulinNotesByDay[DateHelper.today()]).forEach((note) => {
    const noteDatePlusInsulin = new Date(note.date);
    noteDatePlusInsulin.setHours(noteDatePlusInsulin.getHours() + insulinActionHours);

    const hourTop = noteDatePlusInsulin.getMinutes() === 0
      ? noteDatePlusInsulin.getHours()
      : noteDatePlusInsulin.getHours() + 1;


    lastNoteHour = lastNoteHour > hourTop
      ? lastNoteHour
      : hourTop
  });

  if (lastNoteHour % 3 !== 0) lastNoteHour++;
  if (lastNoteHour % 3 !== 0) lastNoteHour++;

  return lastNoteHour;
}
