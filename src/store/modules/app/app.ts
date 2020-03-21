import { IApp } from "../../../model/IApp";

export enum AppActionType {
    CHANGE_LAST_ACTIVE_USER_ID = "APP_CHANGE_LAST_ACTIVE_USER_ID",
    CHANGE = "APP_STATE_CHANGE"
}

export type AppActionTypes = AppChangeLastActiveUserIdAction | AppChangeAction;

export interface AppChangeLastActiveUserIdAction {
    type: AppActionType.CHANGE_LAST_ACTIVE_USER_ID,
    payload: {
        userId: string
    }
}

export interface AppChangeAction {
    type: AppActionType.CHANGE,
    payload: {
        app: IApp
    }
}

export function createChangeLastActiveUserId(userId: string) {
    return {
        type: AppActionType.CHANGE_LAST_ACTIVE_USER_ID,
        payload: {
            userId: userId
        }
    }
}

export function createChangeAppAction(app: IApp): AppChangeAction {
    return {
        type: AppActionType.CHANGE,
        payload: {
            app
        }
    }
}

export function appReducer(
    module: IApp = {},
    action: AppActionTypes
): IApp {
    switch (action.type) {
        case AppActionType.CHANGE_LAST_ACTIVE_USER_ID:
            return {
                ...module,
                lastUserId: action.payload.userId
            }
        case AppActionType.CHANGE:
            return {
                ...module,
                ...action.payload.app
            }
        default: return module;
    }
}
