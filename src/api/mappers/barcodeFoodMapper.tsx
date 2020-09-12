import { IFoodListItem } from '../../model/IFood';

export function barcodeFoodMapper(response): IFoodListItem {
  console.dir(response);

  const nutrients = response.nutriments || response.nutrients || {};

  return {
    id: response.id,
    code: response.code,
    name: response['product_name'],
    genericName: response['generic_name'],
    image: response['image_url'] || response['image_front_url'],
    nutrients: {
      proteins: nutrients.proteins || nutrients['proteins_100g'],
      fat: nutrients.fat || nutrients['fat_100g'],
      carbohydrates: nutrients.carbohydrates || nutrients['carbohydrates_100g'],
      energy: nutrients.energy || nutrients['energy_100g'],
      energyKJ: nutrients['energy-kj'] || nutrients['energy-kj_100g'],
    },
  }
}
