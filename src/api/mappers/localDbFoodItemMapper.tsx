import { convertCaloriesToEnergy, convertEnergyToCalories } from '../../calculation-services/food-calculation-services/calories-energy-converter';
import { FoodDatabase, IFoodListItem } from '../../model/IFood';
import { numberizeAndFix } from '../helper/numberize-and-fix';

export function localDBFoodItemMapper(response): IFoodListItem {
  const {
    calories,
    energy,
    proteins,
    fats,
    carbohydrates,
    weight,
    ...restFoodItem
  } = response;

  const foodItem: IFoodListItem = {
    ...restFoodItem,
    nutrients: {
      calories,
      energy,
      proteins,
      fats,
      carbohydrates,
      weight
    }
  }

  return foodItem;
}
