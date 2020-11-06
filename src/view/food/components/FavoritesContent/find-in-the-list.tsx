import { useMemo } from 'react';
import { IFoodList } from '../../../../model/IFood';

export default function findInTheList(favoritesList: IFoodList, inputValue: string): IFoodList {
  const favorites = useMemo(
    () => {
      return Object.values(favoritesList)
    },
    [favoritesList]
  );

  const re = new RegExp(inputValue, 'i');
  const filteredFavs =
    favorites
      .filter((fav) => re.test(fav.name))
      .reduce((acc, curr) => {
        return {
          ...acc,
          [curr.id]: curr
        }
      }, {});

  return filteredFavs;
}
