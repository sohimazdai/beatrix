import { FoodDatabase, IFoodList, IFoodListItem } from '../../model/IFood';
import { parseUglyFatSecretString } from '../helper/parseUglyFatSecretString';

export const fatSecretSearchMapper = (products: any[]): IFoodList => {
  console.log(products[0]);

  const foods = {};

  if (!products || !(products.length > 0)) return foods;

  products.forEach((product) => {
    if (!product['food_id'] || !product['food_description'] || !product['food_name']) return;

    try {
      const nutrients = parseUglyFatSecretString(product['food_description']);

      const food: IFoodListItem = {
        id: product['food_id'],
        sourceId: product['food_id'],
        dbId: FoodDatabase.FAT_SECRET_US,
        brandName: product['brand_name'],
        name: product['food_name'],
        nutrients,
      };

      foods[food.id] = food;
    } catch (e) {
      //ITS NEED TO SKIP BROKEN FOODS
      return
    }
  })

  return foods;
}
