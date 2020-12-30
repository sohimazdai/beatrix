import { SortType } from '../model/IExport';
import { IShedule } from '../model/IShedule';
import { api } from './api';

export class SheduleApi {
  static changeShedule(
    userId: string,
    shedule: IShedule
  ) {
    return api.post(
      'shedule/change',
      { userId, shedule }
    );
  }
}
