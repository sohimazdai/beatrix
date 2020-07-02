import { INoteListNote } from '../../model/INoteList';
import { IUserDiabetesProperties, GlycemiaMeasuringType, CarbsMeasuringType } from '../../model/IUserDiabetesProperties';
import { Measures } from '../../localisation/Measures';

export const MGDLtoMMOLrelation = 18.015;
export const MMOL_LToHBA1C = 1.12;

export function convertMGDLtoMMOLL(mgdl) {
  return mgdl / MGDLtoMMOLrelation;
}

export function convertMMOLtoMGDL(mmol) {
  return mmol * MGDLtoMMOLrelation;
}

export function convertNoteToCustomNote(
  note: INoteListNote, userDiabetesProperties: IUserDiabetesProperties
) {
  const { glycemiaMeasuringType, carbsMeasuringType, carbsUnitWeightType } = userDiabetesProperties;

  const currentGlycemiaMeasuringType = Measures.getDefaultGlucoseMeasuringType(glycemiaMeasuringType);
  const currentCarbsMeasuringType = Measures.getDefaultCarbsMeasuringType(carbsMeasuringType);
  const newNote = { ...note };

  if (!newNote.glycemiaType) {
    newNote.glycemiaType = GlycemiaMeasuringType.MMOL_L;
  }

  if (!newNote.carbsMeasuringType) {
    newNote.carbsMeasuringType = CarbsMeasuringType.BREAD_UNITS;
  }

  if (
    newNote.glucose && newNote.glycemiaType === GlycemiaMeasuringType.MMOL_L &&
    currentGlycemiaMeasuringType === GlycemiaMeasuringType.MG_DL
  ) {
    newNote.glucose = Math.round(convertMMOLtoMGDL(newNote.glucose));
  }
  else if (
    newNote.glucose && newNote.glycemiaType === GlycemiaMeasuringType.MG_DL &&
    currentGlycemiaMeasuringType === GlycemiaMeasuringType.MMOL_L
  ) {
    newNote.glucose = Number(convertMGDLtoMMOLL(newNote.glucose).toFixed(1));
  }

  if (
    newNote.breadUnits && newNote.carbsMeasuringType === CarbsMeasuringType.CARBOHYDRATES &&
    currentCarbsMeasuringType === CarbsMeasuringType.BREAD_UNITS
  ) {
    newNote.breadUnits = Number((newNote.breadUnits / carbsUnitWeightType).toFixed(1));
  }
  else if (
    newNote.breadUnits && newNote.carbsMeasuringType === CarbsMeasuringType.BREAD_UNITS &&
    currentCarbsMeasuringType === CarbsMeasuringType.CARBOHYDRATES
  ) {
    newNote.breadUnits = Math.round(newNote.breadUnits * carbsUnitWeightType);
  }
  return newNote;
}
