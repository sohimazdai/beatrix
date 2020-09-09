import { IPending } from "../../../model/IPending";

export enum PendingActionType {
  CHANGE = "PENDING_CHANGE",
  REPLACE = "PENDING_REPLACE",
}

export type PendingActionTypes = PendingChangeAction | PendingReplaceAction;

export interface PendingChangeAction {
  type: PendingActionType.CHANGE,
  payload: IPending
}

export interface PendingReplaceAction {
  type: PendingActionType.REPLACE,
  payload: IPending
}

export function createChangePending(pending: IPending): PendingChangeAction {
  return {
    type: PendingActionType.CHANGE,
    payload: pending,
  }
}

export function createReplacePending(pending: IPending): PendingReplaceAction {
  return {
    type: PendingActionType.REPLACE,
    payload: pending,
  }
}


export function pendingReducer(
  module: IPending = {},
  action: PendingActionTypes
): IPending {
  switch (action.type) {
    case PendingActionType.CHANGE:
      return {
        ...module,
        ...action.payload
      }
    case PendingActionType.REPLACE:
      return action.payload
    default: return module;
  }
}
