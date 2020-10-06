import { IFoodListItem } from '../../model/IFood'

export function dbMapper(foods: IFoodListItem[]) {
  // console.log(foods);

  return foods.reduce((foodList, food) => {
    foodList[food.id] = food
    return foodList;
  }, {});
}
