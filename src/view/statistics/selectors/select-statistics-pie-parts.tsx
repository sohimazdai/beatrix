import { INoteListNote } from '../../../model/INoteList';
import { IUserDiabetesProperties } from '../../../model/IUserDiabetesProperties';
import { Measures } from '../../../localisation/Measures';
import { createSelector } from 'reselect';
import { IStorage } from '../../../model/IStorage';
import { StatisticsPeriod } from '../../../model/IStatistics';
import { selectNoteListForStatisticsByPeriod } from "./select-note-list-for-statistics-by-period";

export const selectStatisticsPieParts = createSelector(
  (
    state: IStorage,
    statisticsPeriod: StatisticsPeriod,
    date: Date,
  ) => selectNoteListForStatisticsByPeriod(
    state,
    statisticsPeriod,
    date,
  ),
  (_, __, ___, userDiabetesProperties: IUserDiabetesProperties) => userDiabetesProperties,
  getPieStatistics
)

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
