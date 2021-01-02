import { createSelector } from 'reselect';
import { ISheduleList } from '../../../../../model/IShedule';
import { IStorage } from '../../../../../model/IStorage';
import { SheduleKeyType } from '../../../../../model/IUserPropertiesShedule';
import { selectSheduleHours } from './select-shedule-hours';

export const selectShedule = createSelector(
  [
    (state: IStorage) => state,
  ],
  getShedule,
)

function getShedule(
  state: IStorage,
): ISheduleList {
  const sheduleList = getDefaultShedule();
  sheduleList.carbohydrateRatio.hours = selectSheduleHours(state, SheduleKeyType.CARBOHYDRATE_RATIO);
  sheduleList.insulinSensitivityFactor.hours = selectSheduleHours(state, SheduleKeyType.CARBOHYDRATE_RATIO);

  return sheduleList;
}

function getDefaultShedule(): ISheduleList {
  return {
    carbohydrateRatio: {
      type: SheduleKeyType.CARBOHYDRATE_RATIO,
      hours: [],
    },
    insulinSensitivityFactor: {
      type: SheduleKeyType.INSULIN_SENSITIVITY_FACTOR,
      hours: [],
    }
  };
}


