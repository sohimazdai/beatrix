import { createSelector } from 'reselect';
import { IStorage } from '../../../../model/IStorage';
import { convertFlatNoteListToNoteListByDay } from '../../../../store/selector/NoteListSelector';
import { ChartPeriodType } from '../../../../model/IChart';
import { INoteListByDay, INoteList } from '../../../../model/INoteList';
import { getArrayAverage, getWeekDaysNumbers } from '../../../../calculation-services/chart-calculation-services/ChartCalculationHelper';

export const selectAverageValue = createSelector(
  (state: IStorage) => convertFlatNoteListToNoteListByDay(state),
  (some, chartPeriod: ChartPeriodType) => chartPeriod,
  (some, some1, selectedDotId: number) => selectedDotId,
  (state: IStorage) => state.noteList,
  getNoteForChartPopup
)

function getNoteForChartPopup(
  noteListByDay: INoteListByDay,
  chartPeriod: ChartPeriodType = ChartPeriodType.DAY,
  selectedDotId: number,
  noteList: INoteList 
) {
  let weekDayNotes = [];
  let dayNotes: INoteList = {};
  let glucoseArray = [];
  let breadUnitsArray = [];
  let insulinArray = [];
  let longInsulinArray = [];
  switch (chartPeriod) {
      case ChartPeriodType.DAY:
          return Object.values(noteList).filter(note => selectedDotId === note.date)[0]
      case ChartPeriodType.MONTH:
          dayNotes = noteListByDay[selectedDotId];
          dayNotes && Object.values(dayNotes) && Object.values(dayNotes).map(note => {
              note.glucose && glucoseArray.push(note.glucose);
              note.breadUnits && breadUnitsArray.push(note.breadUnits);
              note.insulin && insulinArray.push(note.insulin);
              note.longInsulin && longInsulinArray.push(note.longInsulin);
          })
          return {
              glucose: Math.round(getArrayAverage(glucoseArray) * 10) / 10,
              breadUnits: Math.round(getArrayAverage(breadUnitsArray) * 10) / 10,
              insulin: Math.round(getArrayAverage(insulinArray) * 10) / 10,
              longInsulin: Math.round(getArrayAverage(longInsulinArray) * 10) / 10,
              date: selectedDotId
          }
      case ChartPeriodType.THREE_MONTH:
          weekDayNotes = getWeekDaysNumbers(new Date(selectedDotId))
              .map(weekDayNumber => {
                  dayNotes = noteListByDay[weekDayNumber];
                  dayNotes && Object.values(dayNotes) && Object.values(dayNotes).map(note => {
                      note.glucose && glucoseArray.push(note.glucose);
                      note.breadUnits && breadUnitsArray.push(note.breadUnits);
                      note.insulin && insulinArray.push(note.insulin);
                      note.longInsulin && longInsulinArray.push(note.longInsulin);
                  })
              })
          return {
              glucose: Math.round(getArrayAverage(glucoseArray) * 10) / 10,
              breadUnits: Math.round(getArrayAverage(breadUnitsArray) * 10) / 10,
              insulin: Math.round(getArrayAverage(insulinArray) * 10) / 10,
              longInsulin: Math.round(getArrayAverage(longInsulinArray) * 10) / 10,
              date: selectedDotId
          }
  }
}
