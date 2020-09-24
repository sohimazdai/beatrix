import { convertCaloriesToEnergy, convertEnergyToCalories } from '../../calculation-services/food-calculation-services/calories-energy-converter';
import { IFoodList } from '../../model/IFood';
import { numberizeAndFix } from '../helper/numberize-and-fix';

export const foodDatabaseMapper = (foodArray: any[]): IFoodList => {
  const foods = foodArray.reduce(
    (acc, curr) => ({
      ...acc,
      [curr.id]: {
        ...curr,
        nutrients: {
          proteins: numberizeAndFix(curr.proteins),
          carbohydrates: numberizeAndFix(curr.carbohydrates),
          fats: numberizeAndFix(curr.fats),
          calories: numberizeAndFix(curr.calories || convertEnergyToCalories(curr.energy)),
          energy: numberizeAndFix(curr.energy || convertCaloriesToEnergy(curr.calories)),
        },
      },
    }),
    {}
  )

  return foods;
}
