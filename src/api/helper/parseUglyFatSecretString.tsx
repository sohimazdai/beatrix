import { convertCaloriesToEnergy, convertEnergyToCalories } from '../../calculation-services/food-calculation-services/calories-energy-converter';
import { IFoodNutrients } from '../../model/IFood';
import { numberizeAndFix } from './numberize-and-fix';

export function parseUglyFatSecretString(fsNutrients: string): IFoodNutrients {
  const parted = fsNutrients.split(' - ');
  const container = parted[0];
  const isPer100Gramms = container === 'Per 100g';

  if (!isPer100Gramms) throw new Error();

  const nutrients: IFoodNutrients = {};
  const nutrientsArray = parted[1].split(' | ');

  for (const nutrient of nutrientsArray) {
    const parsedNutrient = nutrient.split(': ');
    const key = KEYS[parsedNutrient[0]];
    const valueNum = parsedNutrient[1].replace(/[^\d.-]/g, '')

    if (key) {
      nutrients[key] = numberizeAndFix(valueNum);
    }
  }

  nutrients.energy = numberizeAndFix(nutrients.energy || convertCaloriesToEnergy(nutrients.calories));
  nutrients.calories = numberizeAndFix(nutrients.calories || convertEnergyToCalories(nutrients.energy));

  return nutrients;
}

const KEYS = {
  Calories: 'calories',
  Energy: 'energy',
  Fat: 'fats',
  Carbs: 'carbohydrates',
  Protein: 'proteins',
}
