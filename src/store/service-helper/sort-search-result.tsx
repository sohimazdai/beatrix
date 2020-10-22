import { IFoodListItem } from '../../model/IFood';

const splitRegexp = /[ .!?\\-]/g;

export function sortSearchResult(
  searchString: string,
  searchFoods: IFoodListItem[]
): IFoodListItem[] {
  const splittedName = searchString.split(splitRegexp);
  const stringSetRE = new RegExp(createSetString(splittedName), 'i');

  return searchFoods
    .sort((food1, food2) => food1.name.length - food2.name.length)
    .sort(
      (food1, food2) => {
        const food1Name = food1.name;
        const food2Name = food2.name;

        if (stringSetRE.test(food1Name)) {
          if (stringSetRE.test(food2Name)) {
            return food1.name.length - food2.name.length;
          }

          return -1;
        } else {
          if (stringSetRE.test(food2Name)) {
            return 1;
          }

          return food1.name.length - food2.name.length;
        }
      }
    );
}

function createSetString(splitted) {
  const res = [splitted];

  for (let i = 1; i < splitted.length; i++) {
    res[i] = [...res[i - 1]];
    const shifted = res[i].shift();
    res[i].push(shifted);
  }
  for (let i = 0; i < splitted.length; i++) {
    res[i] = res[i].join('\.*');
  }
  return '(' + res.join(')|(') + ')';
}
