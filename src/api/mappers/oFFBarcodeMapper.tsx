import { convertCaloriesToEnergy, convertEnergyToCalories } from '../../calculation-services/food-calculation-services/calories-energy-converter';
import { FoodDatabase, IFoodListItem } from '../../model/IFood';
import { numberizeAndFix } from '../helper/numberize-and-fix';
import { v1 as uuidv1 } from 'uuid';

export function oFFBarcodeMapper(response): IFoodListItem {
  // console.debug(response);

  const nutrients = response.nutriments || response.nutrients || {};

  const id = uuidv1();
  const food: IFoodListItem = {
    id,
    sourceId: response.id,
    barcode: response.code,
    name: response['product_name'],
    dbId: FoodDatabase.OPEN_FOOD_FACTS,
    image: response['image_url'] || response['image_front_url'],
    nutrients: {
      proteins: numberizeAndFix(nutrients['proteins_100g'] || nutrients.proteins),
      fats: numberizeAndFix(nutrients['fat_100g'] || nutrients.fat),
      carbohydrates: numberizeAndFix(nutrients['carbohydrates_100g'] || nutrients.carbohydrates),
      calories:
        nutrients['energy-kcal_100g'] ||
        nutrients['calories-kcal_100g'] ||
        nutrients['energy-kcal'] ||
        nutrients['calories-kcal'] ||
        null,
      energy:
        nutrients['energy-kj_100g'] ||
        nutrients['calories-kj_100g'] ||
        nutrients['energy-kj'] ||
        nutrients['calories-kj'] ||
        null,
    },
  };

  if (!food.nutrients.energy && food.nutrients.calories) {
    food.nutrients.energy = numberizeAndFix(convertCaloriesToEnergy(food.nutrients.calories));
  }

  if (!food.nutrients.calories && food.nutrients.energy) {
    food.nutrients.calories = numberizeAndFix(convertEnergyToCalories(food.nutrients.energy));
  }

  return food;
}
