import { INoteListByDay, INoteListNote } from '../../../../model/INoteList';
import { IUserDiabetesProperties } from '../../../../model/IUserDiabetesProperties';
import { Measures } from '../../../../localisation/Measures';
import { createSelector } from 'reselect';
import { IStorage } from '../../../../model/IStorage';
import { convertFlatNoteListToNoteListByDay } from '../../../../store/selector/NoteListSelector';
import { StatisticsPeriod } from '../../../../model/IStatistics';
import { getNoteList } from './get-note-list';

export const selectStatisticsPieParts = createSelector(
  (state: IStorage) => convertFlatNoteListToNoteListByDay(state) || {},
  (state, statisticsPeriod: StatisticsPeriod) => statisticsPeriod,
  (state, som2, date: Date) => date,
  (som1, som2, som3, userDiabetesProperties: IUserDiabetesProperties) => userDiabetesProperties,
  getStatisticsPieParts
)

function getStatisticsPieParts(
  noteListByDay: INoteListByDay,
  statisticsPeriod: StatisticsPeriod,
  date: Date,
  userDiabetesProperties: IUserDiabetesProperties
): {
  value: number, title: string,
}[] {
  const noteList = getNoteList(noteListByDay, statisticsPeriod, date)
    .filter((note => !!note.glucose));;

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
