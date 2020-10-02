import { IFoodListItem } from '../../model/IFood';

const splitRegexp = /[ .!?\\-]/g;

export function sortSearchResult(
  searchString: string,
  searchFoods: IFoodListItem[]
): IFoodListItem[] {
  const stringSet = searchString.trim().replace(splitRegexp, '.');

  const resultLength = searchFoods.length;

  const foods: IFoodListItem[] = new Array(resultLength).fill(null);

  let currentTop = 0;
  let currentBottom = resultLength - 1;
  const reSet = new RegExp('^' + stringSet, 'i');

  searchFoods.forEach((foodItem: IFoodListItem, index: number) => {
    let newIndex = 0;
    if (reSet.test(foodItem.name)) {
      foods[currentTop] = foodItem;
      currentTop++;
      newIndex = currentTop;
    } else {
      foods[currentBottom] = foodItem;
      currentBottom--;
      newIndex = currentBottom;
    }
  })

  return foods;
}
