import { createSelector } from 'reselect';
import { IStorage } from '../../../model/IStorage';
import { INoteFilter } from '../../../model/INoteFilter';

export const checkIsFilterActive = createSelector(
  (state: IStorage) => state.noteFilter,
  filter
)

function filter(noteFilter: INoteFilter): boolean {
  const { tags, withTags, withComment, lowGlucose, highGlucose, normalGlucose } = noteFilter;
  if (tags && tags.length > 0) return true;

  if (withTags || withComment || lowGlucose || highGlucose || normalGlucose) return true;

  return false;
}
