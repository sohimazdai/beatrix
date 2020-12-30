import { SheduleKeyType } from './IUserPropertiesShedule';

export interface ISheduleList {
  [type: string]: IShedule
}

export interface IShedule {
  type: SheduleKeyType
  hours: number[]
}
