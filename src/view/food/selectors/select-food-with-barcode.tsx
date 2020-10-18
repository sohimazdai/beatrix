import { createSelector } from 'reselect';
import { IFood, IFoodListItem } from '../../../model/IFood';
import { IStorage } from '../../../model/IStorage';

export const selectFoodWithBarcode = createSelector(
  [
    (state: IStorage) => state.food,
    (state: IStorage, barcode: string) => barcode,
  ],
  getFoodItem
)

function getFoodItem(food: IFood, barcode: string): IFoodListItem {
  let result =
    Object.values(food.favorites).find((foodItem: IFoodListItem) => foodItem.barcode === barcode) ||
    Object.values(food.search).find((foodItem: IFoodListItem) => foodItem.barcode === barcode) ||
    Object.values(food.history).find((foodItem: IFoodListItem) => foodItem.barcode === barcode) ||
    null;

  return result;
}
