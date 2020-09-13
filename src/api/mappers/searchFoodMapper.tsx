import { IFoodList } from '../../model/IFood';
import * as Localization from 'expo-localization';

const locale = Localization.locale;

export function searchFoodMapper(products: any[]): IFoodList {
  const searchFood: IFoodList = {};

  products.forEach((product) => {
    const nutrients = product.nutriments || product.nutrients || {};
    const id = product.id;
    const name = product['product_name'] || product['generic_name'];
    const nutrientsMapped = {
      proteins: nutrients.proteins || nutrients['proteins_100g'] || 0,
      fat: nutrients.fat || nutrients['fat_100g'] || 0,
      carbohydrates: nutrients.carbohydrates || nutrients['carbohydrates_100g'] || 0,
      energy: nutrients.energy || nutrients['energy_100g'] || 0,
      energyKJ: nutrients['energy-kj'] || nutrients['energy-kj_100g'] || 0,
    }

    if (!id || !name) return;

    searchFood[id] = {
      id,
      code: product.code,
      name,
      genericName: product['generic_name'] || product['product_name'],
      image: product['image_url'] || product['image_front_url'],
      nutrients: {
        proteins: numberizeAndFix(nutrientsMapped.proteins),
        carbohydrates: numberizeAndFix(nutrientsMapped.carbohydrates),
        fat: numberizeAndFix(nutrientsMapped.fat),
        energy: numberizeAndFix(nutrientsMapped.energy),
        energyKJ: numberizeAndFix(nutrientsMapped.energyKJ),
      },
    }
  })

  return searchFood;
}

function numberizeAndFix(num: number | string) {
  return Number(Number(num || 0).toFixed(1));
}
