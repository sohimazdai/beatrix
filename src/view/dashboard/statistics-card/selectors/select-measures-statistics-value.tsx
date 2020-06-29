import { INoteListByDay, INoteListNote, NoteValueType } from '../../../../model/INoteList';
import { StatisticsType } from '../entities';
import { DateHelper } from '../../../../utils/DateHelper';
import { createSelector } from 'reselect';
import { convertFlatNoteListToNoteListByDay } from '../../../../store/selector/NoteListSelector';
import { IStorage } from '../../../../model/IStorage';

let measuresType = undefined;
let statisticsType = undefined;

export const selectMeasuresStatisticsValue = createSelector(
  (state: IStorage) => convertFlatNoteListToNoteListByDay(state),
  (some1, measuresTypeProps: NoteValueType) => measuresTypeProps,
  (some1, some2, statisticsTypeProp: StatisticsType) => statisticsTypeProp,
  getMeasuresStatistics
)

function getMeasuresStatistics(
  noteListByDae: INoteListByDay,
  measuresTypeProps: NoteValueType,
  statisticsTypeProp: StatisticsType
): number {
  measuresType = measuresTypeProps;
  statisticsType = statisticsTypeProp;
  const noteList: INoteListNote[] = getNoteList(noteListByDae, statisticsType);

  return getValue(noteList);
}

function getValue(
  noteList: INoteListNote[],
) {
  let averageValue = 0;
  noteList.forEach(note => {
    averageValue += note[measuresType]
  });
  const listLength = noteList.filter(note => !!note[measuresType]).length;

  return Number((averageValue / listLength).toFixed(1));
}

function convertNotesToSummaryNotesIfNeeded(noteList: INoteListNote[]) {
  let summary = 0;
  switch (measuresType) {
    case NoteValueType.GLUCOSE:
      noteList.forEach((note) => note[measuresType] && (summary += note[measuresType]));

      summary = summary / noteList.filter(note => !!note[measuresType]).length || 0;

      return [{ [measuresType]: summary, date: 0 }] as INoteListNote[];
    case NoteValueType.BREAD_UNITS:
    case NoteValueType.SHORT_INSULIN:
    case NoteValueType.LONG_INSULIN:
      summary = 0;
      noteList.forEach((note) => note[measuresType] && (summary += note[measuresType]))
      return [{ [measuresType]: summary, date: 0 }] as INoteListNote[]
  }
}

function getNoteList(
  noteListByDay: INoteListByDay,
  statisticsType: StatisticsType,
): INoteListNote[] {
  let noteList: INoteListNote[] = [];

  switch (statisticsType) {
    case StatisticsType.TODAY:
      noteList = convertNotesToSummaryNotesIfNeeded(
        Object.values(noteListByDay[DateHelper.today()] || {})
      );
      break;
    case StatisticsType.YESTERDAY:
      noteList = convertNotesToSummaryNotesIfNeeded(
        Object.values(noteListByDay[DateHelper.yesterday()] || {})
      );
      break;
    case StatisticsType.LAST_MONTH:
      for (let i = 0; i < 30; i++) {
        const notes = convertNotesToSummaryNotesIfNeeded(
          Object.values(noteListByDay[DateHelper.getDiffDate(new Date(), -i)] || {})
        );
        notes.length && noteList.push(...notes as any)
      }
      break;
    case StatisticsType.LAST_THREE_MONTH:
      for (let i = 0; i < 90; i++) {
        const notes = convertNotesToSummaryNotesIfNeeded(
          Object.values(noteListByDay[DateHelper.getDiffDate(new Date(), -i)] || {})
        );
        notes.length && noteList.push(...notes as any)
      }
      break;
  }

  return noteList;
}
