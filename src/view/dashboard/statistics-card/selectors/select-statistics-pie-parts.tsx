import { INoteListByDay, INoteList, INoteListNote } from '../../../../model/INoteList';
import { StatisticsType } from '../entities';
import { DateHelper } from '../../../../utils/DateHelper';
import { IUserDiabetesProperties } from '../../../../model/IUserDiabetesProperties';
import { Measures } from '../../../../localisation/Measures';
import { createSelector } from 'reselect';
import { IStorage } from '../../../../model/IStorage';
import { convertFlatNoteListToNoteListByDay } from '../../../../store/selector/NoteListSelector';

export const selectStatisticsPieParts = createSelector(
  (state: IStorage) => convertFlatNoteListToNoteListByDay(state) || {},
  (state, statisticsType: StatisticsType) => statisticsType,
  (som1, som2, userDiabetesProperties: IUserDiabetesProperties) => userDiabetesProperties,
  getStatisticsPieParts
)

function getStatisticsPieParts(
  noteListByDay: INoteListByDay,
  statisticsType: StatisticsType,
  userDiabetesProperties: IUserDiabetesProperties
): {
  value: number, title: string,
}[] {
  const noteList = getNoteList(noteListByDay, statisticsType);

  return getPieStatistics(noteList, userDiabetesProperties);
}

function getPieStatistics(
  noteList: INoteListNote[],
  userDiabetesProperties: IUserDiabetesProperties
) {
  let hypos = 0;
  let hypers = 0;
  let normal = 0;

  const crits = Measures.getCriticalGlycemia(userDiabetesProperties.glycemiaMeasuringType);

  noteList.forEach((note) => {
    if (note.glucose) {
      if (note.glucose > crits.max) ++hypers;
      if (note.glucose < crits.min) ++hypos;
      if (note.glucose <= crits.max && note.glucose >= crits.min) ++normal;
    }
  })

  return [
    {
      value: hypos,
      title: 'hypoglycemia_count',
    },
    {
      value: hypers,
      title: 'hyperglycemia_count',
    },
    {
      value: normal,
      title: 'normalglycemia_count',
    },
  ]
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
