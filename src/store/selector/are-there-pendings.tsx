import { createSelector } from 'reselect';
import { IStorage } from '../../model/IStorage';
import { IPending } from '../../model/IPending';

export const selectAreTherePendings = createSelector(
  (state: IStorage) => state.pending,
  areTherePendings
)

function areTherePendings(pending: IPending): boolean {
  return Object.values(pending).some(pending => !!pending);
}
