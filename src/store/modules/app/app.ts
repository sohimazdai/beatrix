import { IApp } from "../../../model/IApp";

export enum AppActionType {
    CHANGE = "APP_STATE_CHANGE"
}

export type AppActionTypes = AppChangeAction;

export interface AppChangeAction {
    type: AppActionType.CHANGE,
    payload: {
        app: IApp
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
        case AppActionType.CHANGE:
            return {
                ...module,
                ...action.payload.app
            }
        default: return module;
    }
}
