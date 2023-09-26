import { Measures } from "../../../../localisation/Measures";
import { i18nGet } from "../../../../localisation/Translate";

export function getInsulinDoseRecommendation({
    isFormUnfilled,
    note,
    insulinValue,
    glycemiaMeasuringType,
}) {

    if (isFormUnfilled) return '';

    if (note.glucose == 0 && note.breadUnits == 0) {
        return '';
    }

    if (note.glucose === 0) {
        return i18nGet('enter_blood_glucose_value_to_get_recommendation');
    }

    if (parseFloat(insulinValue) <= 0) {
        return i18nGet('insulin_is_not_recommended');
    }

    if (
        note.glucose < Measures.getCriticalGlycemia(glycemiaMeasuringType).min &&
        note.glucose > Measures.getCriticalGlycemia(glycemiaMeasuringType).min / 2
    ) {
        return i18nGet('inject_insulin_after_meal') + ': ' + insulinValue;
    }

    if (note.glucose < Measures.getCriticalGlycemia(glycemiaMeasuringType).min / 2) {
        return i18nGet('restore_your_glucose_level_first');
    }

    return i18nGet('recommended_insulin_value') + ': ' + insulinValue;
}