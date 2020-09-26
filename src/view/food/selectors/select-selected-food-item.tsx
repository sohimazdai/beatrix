import { createSelector } from 'reselect';
import { IFood } from '../../../model/IFood';
import { IStorage } from '../../../model/IStorage';

export const selectSelectedFoodItem = createSelector(
  [
    (state: IStorage) => state.food,
    (state: IStorage, foodId: string) => foodId,
  ],
  getFoodItem
)

function getFoodItem(food: IFood, foodId: string) {
  return foodId
    ? (
      food.favorites[foodId] ||
      food.history[foodId] ||
      food.search[foodId] ||
      null
    ) : null
}
