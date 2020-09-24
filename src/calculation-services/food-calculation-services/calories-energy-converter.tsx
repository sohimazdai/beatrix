import { numberizeAndFix } from '../../api/helper/numberize-and-fix';

const CALORIES_TO_ENERGY_RELATION = 4.1868;

export function convertCaloriesToEnergy(ccal: number) {
  return numberizeAndFix(ccal * CALORIES_TO_ENERGY_RELATION);
}

export function convertEnergyToCalories(kJ: number) {
  return numberizeAndFix(kJ / CALORIES_TO_ENERGY_RELATION);
}
