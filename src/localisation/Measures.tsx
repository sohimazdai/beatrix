import { GlycemiaMeasuringType, IUserDiabetesProperties, BreadUnitsMeasuringType } from '../model/IUserDiabetesProperties'
import i18n from 'i18n-js';
import { NoteValueType } from '../model/INoteList';

const MMOL_L_NORMAL_SUGAR = 6;
const MG_DL_NORMAL_SUGAR = 105;
const NORMAL_BREAD_UNITS_MEAL = 5;
const NORMAL_CARBOHYDRATES_MEAL = 50;
const NORMAL_SHORT_INSULIN_DOSE = 5;
const NORMAL_LONG_INSULIN_DOSE = 15;

const CRITICAL_MIN_GLUCOSE_MMOL_L = 4;
const CRITICAL_MAX_GLUCOSE_MMOL_L = 8;
const CRITICAL_MIN_GLUCOSE_MG_DL = 80;
const CRITICAL_MAX_GLUCOSE_MG_DL = 130;

export interface IMeasuresOption {
  withDecimal: boolean,
  startIndex: number,
};

export class Measures {
  static getCriticalGlycemia(
    glycemiaMeasuringType: GlycemiaMeasuringType
  ) {
    if (glycemiaMeasuringType === GlycemiaMeasuringType.MMOL_L) {
      return {
        min: CRITICAL_MIN_GLUCOSE_MMOL_L,
        max: CRITICAL_MAX_GLUCOSE_MMOL_L,
      }
    }

    return {
      min: CRITICAL_MIN_GLUCOSE_MG_DL,
      max: CRITICAL_MAX_GLUCOSE_MG_DL,
    }
  }

  static getCriticalGlycemiaForChart(
    glycemiaMeasuringType: GlycemiaMeasuringType
  ) {
    if (glycemiaMeasuringType === GlycemiaMeasuringType.MMOL_L) {
      return {
        min: CRITICAL_MIN_GLUCOSE_MMOL_L - 1,
        max: CRITICAL_MAX_GLUCOSE_MMOL_L + 1,
      }
    }

    return {
      min: CRITICAL_MIN_GLUCOSE_MG_DL - 10,
      max: CRITICAL_MAX_GLUCOSE_MG_DL + 10,
    }
  }

  static getDefaultBreadUnitsMeasuringType() {

    if (i18n.locale === 'ru') return BreadUnitsMeasuringType.BREAD_UNITS;

    return BreadUnitsMeasuringType.CARBOHYDRATES;
  }

  static getDefaultGlucoseMeasuringType = (
    existingGlycemiaMeasuringType?: GlycemiaMeasuringType
  ) => {

    if (existingGlycemiaMeasuringType) return existingGlycemiaMeasuringType;

    if (i18n.locale === 'ru') return GlycemiaMeasuringType.MMOL_L;

    return GlycemiaMeasuringType.MG_DL;
  }

  static getStartIndex(
    valueKey: NoteValueType,
    existingGlycemiaMeasuringType?: GlycemiaMeasuringType
  ) {
    switch (valueKey) {
      case NoteValueType.GLUCOSE:
        const glucoseMeasuringType = this.getDefaultGlucoseMeasuringType(existingGlycemiaMeasuringType)

        return glucoseMeasuringType === GlycemiaMeasuringType.MMOL_L
          ? MMOL_L_NORMAL_SUGAR
          : MG_DL_NORMAL_SUGAR;

      case NoteValueType.BREAD_UNITS:
        const breadUnitsMeasuringType = this.getDefaultBreadUnitsMeasuringType()

        return breadUnitsMeasuringType === BreadUnitsMeasuringType.BREAD_UNITS
          ? NORMAL_BREAD_UNITS_MEAL
          : NORMAL_CARBOHYDRATES_MEAL;
    }
  }

  static getMeasuresOption(
    valueKey: NoteValueType,
    userDiabetesProperties: IUserDiabetesProperties
  ): IMeasuresOption {

    switch (valueKey) {
      case NoteValueType.GLUCOSE:
        const glucoseMeasuringType = this.getDefaultGlucoseMeasuringType(userDiabetesProperties.glycemiaMeasuringType)

        return {
          withDecimal: glucoseMeasuringType === GlycemiaMeasuringType.MMOL_L,
          startIndex: this.getStartIndex(valueKey, userDiabetesProperties.glycemiaMeasuringType),
        };

      case NoteValueType.BREAD_UNITS:
        const breadUnitsMeasuringType = this.getDefaultBreadUnitsMeasuringType();

        return {
          withDecimal: breadUnitsMeasuringType === BreadUnitsMeasuringType.BREAD_UNITS,
          startIndex: this.getStartIndex(valueKey, userDiabetesProperties.glycemiaMeasuringType),
        }

      case NoteValueType.SHORT_INSULIN:
        return {
          withDecimal: true,
          startIndex: NORMAL_SHORT_INSULIN_DOSE,
        }

      case NoteValueType.LONG_INSULIN:
        return {
          withDecimal: false,
          startIndex: NORMAL_LONG_INSULIN_DOSE,
        }
    }
  }
}
