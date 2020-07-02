import { createSelector } from 'reselect';
import { IStorage } from '../../../../model/IStorage';
import { convertFlatNoteListToNoteListByDay } from '../../../../store/selector/NoteListSelector';
import { INoteListByDay, INoteList } from '../../../../model/INoteList';
import { DateHelper } from '../../../../utils/DateHelper';
import { MMOL_LToHBA1C, MGDLtoMMOLrelation } from '../../../../calculation-services/diabetes-properties/GlycemiaType';
import { Measures } from '../../../../localisation/Measures';
import { IUserDiabetesProperties, GlycemiaMeasuringType } from '../../../../model/IUserDiabetesProperties';

export const selectHBA1C = createSelector(
  (state: IStorage) => convertFlatNoteListToNoteListByDay(state),
  (state: IStorage) => state.userDiabetesProperties,
  calculateHBA1C
)

function calculateHBA1C(
  noteListByDay: INoteListByDay,
  userDiabetesProperties: IUserDiabetesProperties
): {
  hba1c: number,
  days: number,
} {
  let totalGlucose = 0;
  let days = 0;

  for (let i = 0; i < 90; i++) {
    const currentNoteList: INoteList = noteListByDay[DateHelper.getDiffDate(new Date(), -i)] || {};
    const notesWithGlucose = Object.values(currentNoteList).filter((note) => !!note.glucose);

    if (notesWithGlucose.length) {
      days++;
      let totalDayGlucose = 0;
      notesWithGlucose.forEach((note) => totalDayGlucose += note.glucose);
      totalGlucose += totalDayGlucose / notesWithGlucose.length;
    }
  }

  if (totalGlucose && days) {
    const glycemiaType = Measures.getDefaultGlucoseMeasuringType(
      userDiabetesProperties.glycemiaMeasuringType
    );
    const averageGlycemia = glycemiaType === GlycemiaMeasuringType.MMOL_L
      ? totalGlucose / days
      : totalGlucose / days / MGDLtoMMOLrelation;

    const hba1c = Number((averageGlycemia / MMOL_LToHBA1C).toFixed(2));

    return {
      hba1c,
      days,
    }
  } else {
    return {
      hba1c: 0,
      days: 0,
    }
  }
}
