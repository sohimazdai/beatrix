import { numberizeAndFix } from '../../../api/helper/numberize-and-fix';
import { IFoodList, IFoodListItem, IFoodNutrients } from '../../../model/IFood';

export const sumMealTotal = (foodList: IFoodList = {}): IFoodNutrients => {
  const totalNutrients: IFoodNutrients = {};

  Object.values(foodList).forEach((food: IFoodListItem) => {
    Object.keys(food.nutrients).forEach((nutrientKey: string) => {
      if (!totalNutrients[nutrientKey]) totalNutrients[nutrientKey] = 0;

      totalNutrients[nutrientKey] += food.nutrients[nutrientKey]
    })
  })

  Object.keys(totalNutrients).forEach((nutrientKey) => {
    totalNutrients[nutrientKey] = numberizeAndFix(totalNutrients[nutrientKey])
  })

  return totalNutrients;
}
