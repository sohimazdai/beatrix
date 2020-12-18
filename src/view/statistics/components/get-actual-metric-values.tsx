import { INoteListNote, NoteValueType } from '../../../model/INoteList';
import { DateHelper } from '../../../utils/DateHelper';

type ActualMetricValues = {
  average: number,
  maximum: number,
  minimum: number,
  count: number,
  daysCount: number,
};

export default function getActualMetricValues(
  noteList: INoteListNote[],
  measureName: NoteValueType,
): ActualMetricValues {
  let maximum = 0;
  let minimum = 0;
  let count = 0;
  let daysCount = 0;
  let currentDate: number = 0;
  let totalValue = 0;

  noteList.forEach(note => {
    const { date } = note;
    const value = note[measureName];



    if (value) {
      const noteDate = DateHelper.getDiffDate(new Date(date), 0);

      if (!currentDate || currentDate !== noteDate) {
        currentDate = noteDate;
        daysCount++;
      }

      count++;
      totalValue += value;

      if (value > maximum) maximum = value;

      if ((!minimum && !!value) || value && value < minimum) minimum = value;
    }
  })

  return {
    maximum,
    minimum,
    count,
    daysCount,
    average: Number((totalValue / count).toFixed(1)) || 0,
  };
}
