import { createSelector } from 'reselect';
import { ISheduleList } from '../../../../../model/IShedule';
import { IStorage } from '../../../../../model/IStorage';
import { IUserPropertiesShedule, SheduleKeyType } from '../../../../../model/IUserPropertiesShedule';

export const selectShedule = createSelector(
  [
    (state: IStorage) => state.userPropertiesShedule,
    (state: IStorage) => state.shedule,
    (_, type: SheduleKeyType) => type,
  ],
  getShedule,
)

function getShedule(
  oldShedule: IUserPropertiesShedule,
  newShedule: ISheduleList,
  type: SheduleKeyType
): number[] {
  if (newShedule[type]) return newShedule[type].hours;

  if (
    oldShedule &&
    Object.keys(oldShedule).length > 0
  ) {
    const transformedShedule = getDefaultShedule();

    Object.entries(oldShedule).forEach((hourValue) => {
      const hour = hourValue[0];
      const value = hourValue[1];
      transformedShedule[type].hours[hour] =
        value[type];
    });

    return transformedShedule[type].hours;
  }
  return [];
}

function getDefaultShedule(): ISheduleList {
  return {
    carbohydrateRatio: {
      type: SheduleKeyType.CARBOHYDRATE_RATIO,
      hours: getDefaultArray()
    },
    insulinSensitivityFactor: {
      type: SheduleKeyType.INSULIN_SENSITIVITY_FACTOR,
      hours: getDefaultArray(),
    }
  };
}

function getDefaultArray() {
  return new Array(24).fill(0);
}
