import uuid from 'uuid';
import { convertCaloriesToEnergy, convertEnergyToCalories } from '../../calculation-services/food-calculation-services/calories-energy-converter';
import { FoodDatabase, IFoodList } from '../../model/IFood';
import { numberizeAndFix } from '../helper/numberize-and-fix';

const MAX_RESPONSE_ARRAY_LENGTH = 20;

export default function oFFMapper(products): IFoodList {
  const searchFood = {};

  products.slice(0, MAX_RESPONSE_ARRAY_LENGTH).forEach((product) => {
    const nutrients = product.nutriments || product.nutrients || {};
    const id = product.id;
    const name = product['product_name'] || product['generic_name'];
    const nutrientsMapped = {
      proteins: nutrients['proteins_100g'] || nutrients.proteins || 0,
      fats: nutrients['fat_100g'] || nutrients.fat || 0,
      carbohydrates: nutrients['carbohydrates_100g'] || nutrients.carbohydrates || 0,
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
    }

    if (!id || !name) return;

    const idForDb = uuid.v1();

    searchFood[idForDb] = {
      id: idForDb,
      sourceId: id,
      barcode: product['code'],
      name,
      dbId: FoodDatabase.OPEN_FOOD_FACTS,
      image: product['image_url'] || product['image_front_url'],
      brandName: product['brands'],
      nutrients: {
        proteins: numberizeAndFix(nutrientsMapped.proteins),
        carbohydrates: numberizeAndFix(nutrientsMapped.carbohydrates),
        fats: numberizeAndFix(nutrientsMapped.fats),
        calories: numberizeAndFix(
          nutrientsMapped.calories || convertEnergyToCalories(nutrientsMapped.energy)
        ),
        energy: numberizeAndFix(
          nutrientsMapped.energy || convertCaloriesToEnergy(nutrientsMapped.calories)
        ),
      },
    }
  })

  return searchFood;
}
