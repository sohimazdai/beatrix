import { IFoodList } from '../../model/IFood';

export function searchFoodMapper(products: any[]): IFoodList {
  const searchFood: IFoodList = {};

  products.forEach((product) => {
    const nutrients = product.nutriments || product.nutrients || {};
    const id = product.id;

    if (!id) return;

    searchFood[id] = {
      id,
      code: product.code,
      name: product['product_name'],
      genericName: product['generic_name'],
      image: product['image_url'] || product['image_front_url'],
      nutrients: {
        proteins: nutrients.proteins || nutrients['proteins_100g'],
        fat: nutrients.fat || nutrients['fat_100g'],
        carbohydrates: nutrients.carbohydrates || nutrients['carbohydrates_100g'],
        energy: nutrients.energy || nutrients['energy_100g'],
        energyKJ: nutrients['energy-kj'] || nutrients['energy-kj_100g'],
      },
    }
  })

  return searchFood;
}
