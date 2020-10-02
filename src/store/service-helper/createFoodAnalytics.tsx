import { IFoodListItem } from '../../model/IFood';

export function createFoodAnalytics(foodItem: IFoodListItem): Partial<IFoodListItem> {
  return {
    id: foodItem.id,
    sourceId: foodItem.sourceId,
    name: foodItem.name,
    dbId: foodItem.dbId,
  }
}
