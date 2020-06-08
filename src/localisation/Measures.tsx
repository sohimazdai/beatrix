import { GlycemiaMeasuringType, CarbMeasuringType } from '../model/IUserDiabetesProperties'
import i18n from 'i18n-js';
import { NoteValueType } from '../model/INoteList';

const NORMAL_BREAD_UNITS_MEAL = 5;
const NORMAL_CARBOHYDRATES_MEAL = 50;

const NORMAL_SHORT_INSULIN_DOSE = 5;
const NORMAL_LONG_INSULIN_DOSE = 15;

const CRITICAL_MIN_GLUCOSE_MMOL_L = 4;
const CRITICAL_MAX_GLUCOSE_MMOL_L = 8;
const NORMAL_GLUCOSE_MMOL_L = 6;

const CRITICAL_MIN_GLUCOSE_MG_DL = 80;
const CRITICAL_MAX_GLUCOSE_MG_DL = 130;
const NORMAL_GLUCOSE_MG_DL = 105;

export interface IMeasuresOption {
  withDecimal: boolean,
  startIndex: number,
};

export class Measures {
  static getNormalGlycemia(
    existingGlycemiaMeasuringType?: GlycemiaMeasuringType
  ) {
    const glycemiaMeasuringType = this.getDefaultGlucoseMeasuringType(existingGlycemiaMeasuringType);

    if (glycemiaMeasuringType === GlycemiaMeasuringType.MMOL_L) {
      return NORMAL_GLUCOSE_MMOL_L;
    }

    return NORMAL_GLUCOSE_MG_DL;
  }

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

  static getDefaultCarbMeasuringType(
    existingCarbMeasuringType?: CarbMeasuringType
  ) {
    if (existingCarbMeasuringType) return existingCarbMeasuringType;

    if (
      i18n.locale === 'ru' ||
      i18n.locale === 'de'
    ) return CarbMeasuringType.BREAD_UNITS;

    return CarbMeasuringType.CARBOHYDRATES;
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
    existingGlycemiaMeasuringType?: GlycemiaMeasuringType,
    existingCarbMeasuringType?: CarbMeasuringType
  ) {
    switch (valueKey) {
      case NoteValueType.GLUCOSE:
        const glucoseMeasuringType = this.getDefaultGlucoseMeasuringType(existingGlycemiaMeasuringType)

        return glucoseMeasuringType === GlycemiaMeasuringType.MMOL_L
          ? NORMAL_GLUCOSE_MMOL_L
          : NORMAL_GLUCOSE_MG_DL;

      case NoteValueType.BREAD_UNITS:
        const carbMeasuringType = this.getDefaultCarbMeasuringType(existingCarbMeasuringType);

        return carbMeasuringType === CarbMeasuringType.BREAD_UNITS
          ? NORMAL_BREAD_UNITS_MEAL
          : NORMAL_CARBOHYDRATES_MEAL;
    }
  }

  static getMeasuresOption(
    valueKey: NoteValueType,
    glycemiaMeasuringType: GlycemiaMeasuringType,
    carbMeasuringType: CarbMeasuringType,
  ): IMeasuresOption {

    switch (valueKey) {
      case NoteValueType.GLUCOSE:
        const glucoseMeasuringType = this.getDefaultGlucoseMeasuringType(glycemiaMeasuringType)

        return {
          withDecimal: glucoseMeasuringType === GlycemiaMeasuringType.MMOL_L,
          startIndex: this.getStartIndex(valueKey, glycemiaMeasuringType),
        };

      case NoteValueType.BREAD_UNITS:
        const buMeasuringType = this.getDefaultCarbMeasuringType(carbMeasuringType);

        return {
          withDecimal: buMeasuringType === CarbMeasuringType.BREAD_UNITS,
          startIndex: this.getStartIndex(valueKey, glycemiaMeasuringType, carbMeasuringType),
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
