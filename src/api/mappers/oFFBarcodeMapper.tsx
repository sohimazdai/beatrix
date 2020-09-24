import { convertCaloriesToEnergy, convertEnergyToCalories } from '../../calculation-services/food-calculation-services/calories-energy-converter';
import { FoodDatabase, IFoodListItem } from '../../model/IFood';
import { numberizeAndFix } from '../helper/numberize-and-fix';

export function oFFBarcodeMapper(response): IFoodListItem {
  // console.dir(response);

  const nutrients = response.nutriments || response.nutrients || {};

  const food: IFoodListItem = {
    id: response.id,
    sourceId: response.id,
    barcode: response.code,
    name: response['product_name'],
    dbId: FoodDatabase.OPEN_FOOD_FACTS,
    image: response['image_url'] || response['image_front_url'],
    nutrients: {
      proteins: numberizeAndFix(nutrients.proteins || nutrients['proteins_100g']),
      fats: numberizeAndFix(nutrients.fat || nutrients['fat_100g']),
      carbohydrates: numberizeAndFix(nutrients.carbohydrates || nutrients['carbohydrates_100g']),
      calories: numberizeAndFix(nutrients.calories || nutrients['energy_100g']),
      energy: numberizeAndFix(nutrients['calories-kj'] || nutrients['calories-kj_100g']),
    },
  };

  food.nutrients.energy = numberizeAndFix(
    food.nutrients.energy || convertCaloriesToEnergy(food.nutrients.calories)
  );
  food.nutrients.calories = numberizeAndFix(
    food.nutrients.calories || convertEnergyToCalories(food.nutrients.energy)
  );

  return food;
}
