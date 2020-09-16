import { IFoodList, IFoodListItem } from '../../model/IFood';

export const fatSecretSearchMapper = (products: any[]): IFoodList => {
  const foods = {};

  if (!products || !(products.length > 0)) return foods;

  products.forEach((product) => {
    if (!product['food_id'] || !product['food_description'] || !product['food_name']) return;

    const food: IFoodListItem = {
      id: product['food_id'],
      brandName: product['brand_name'],
      name: product['food_name'],
      nutrients: {},
    };

    foods[food.id] = food;
  })

  return foods;
}
