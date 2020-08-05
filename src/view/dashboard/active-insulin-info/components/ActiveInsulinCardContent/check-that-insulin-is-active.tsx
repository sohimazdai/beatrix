import { INoteListNote } from '../../../../../model/INoteList';
import { DateHelper } from '../../../../../utils/DateHelper';

export default function checkThatInsulinIsActive(lastNote: INoteListNote): boolean {
  if (!lastNote) return false;

  if (!lastNote.insulin) return false;

  if (DateHelper.getDiffBetweenInHours(lastNote.date, Date.now()) >= 4) return false;

  return true;
}
