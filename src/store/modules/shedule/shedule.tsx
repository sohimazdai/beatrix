import { IShedule, ISheduleList } from "../../../model/IShedule";
import { SheduleKeyType } from '../../../model/IUserPropertiesShedule';

export enum SheduleActionType {
  REPLACE = "SHEDULE_LIST_REPLACE",
  MERGE = "SHEDULE_LIST_MERGE",
}

export type SheduleActionTypes = SheduleReplaceAction | SheduleListMergeAction

export interface SheduleReplaceAction {
  type: SheduleActionType.REPLACE,
  payload: {
    shedule: IShedule,
  }
};

export interface SheduleListMergeAction {
  type: SheduleActionType.MERGE,
  payload: ISheduleList
};
export function createReplaceShedule(pl: { shedule: IShedule }): SheduleReplaceAction {
  return {
    type: SheduleActionType.REPLACE,
    payload: pl,
  }
}

export function createMergeShedule(list: ISheduleList): SheduleListMergeAction {
  return {
    type: SheduleActionType.MERGE,
    payload: list,
  }
}
export function sheduleReducer(
  module: ISheduleList = {},
  action: SheduleActionTypes
): ISheduleList {
  switch (action.type) {
    case SheduleActionType.REPLACE:
      return {
        ...module,
        [action.payload.shedule.type]: action.payload.shedule,
      };
    case SheduleActionType.MERGE:
      return {
        ...module,
        ...action.payload,
      };
    default: return module;
  }
}
