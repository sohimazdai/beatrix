import { convertCaloriesToEnergy, convertEnergyToCalories } from '../../calculation-services/food-calculation-services/calories-energy-converter';
import { FoodDatabase, IFoodList } from '../../model/IFood';
import { numberizeAndFix } from '../helper/numberize-and-fix';
import { v1 as uuidv1 } from 'uuid';

export function oFFMapper(products: any[]): IFoodList {
  const searchFood: IFoodList = {};

  products.forEach((product) => {
    const nutrients = product.nutriments || product.nutrients || {};
    const id = product.id;
    const name = product['product_name'] || product['generic_name'];
    const nutrientsMapped = {
      proteins: nutrients.proteins || nutrients['proteins_100g'] || 0,
      fats: nutrients.fat || nutrients['fat_100g'] || 0,
      carbohydrates: nutrients.carbohydrates || nutrients['carbohydrates_100g'] || 0,
      calories: nutrients.calories || nutrients['energy_100g'] || 0,
      energy: nutrients['calories-kj'] || nutrients['calories-kj_100g'] || 0,
    }

    if (!id || !name) return;

    const idForDb = uuidv1();

    searchFood[id] = {
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

