import { createSelector } from 'reselect';
import { ISheduleList } from '../../../../../model/IShedule';
import { IStorage } from '../../../../../model/IStorage';
import { IUserPropertiesShedule, SheduleKeyType } from '../../../../../model/IUserPropertiesShedule';

export const selectSheduleHours = createSelector(
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
    const hours = getDefaultArray();

    Object.entries(oldShedule).forEach((hourValue) => {
      const hour = hourValue[0];
      const value = hourValue[1];
      hours[hour] = value[type];
    });

    return hours;
  }
  return [];
}

function getDefaultArray() {
  return new Array(24).fill(0);
}
