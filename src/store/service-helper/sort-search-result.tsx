import { IFoodListItem } from '../../model/IFood';

const splitRegexp = /[ .!?\\-]/g;

export function sortSearchResult(
  searchString: string,
  searchFoods: IFoodListItem[]
): IFoodListItem[] {
  const nameLengthSorted = searchFoods.sort((food1, food2) => food2.name.length - food1.name.length);

  const stringSet = searchString.trim().replace(splitRegexp, '.');

  const resultLength = nameLengthSorted.length;

  const foods: IFoodListItem[] = new Array(resultLength).fill(null);

  let currentTop = 0;
  let currentBottom = resultLength - 1;
  const reSet = new RegExp('^' + stringSet, 'i');

  nameLengthSorted.forEach((foodItem: IFoodListItem, index: number) => {
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
