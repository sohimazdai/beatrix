import { IApp } from "../../../model/IApp";
import { persistReducer, createTransform } from "redux-persist";

export enum AppActionType {
   CHANGE_LAST_ACTIVE_USER_ID = "CHANGE_LAST_ACTIVE_USER_ID"
} 

export type AppActionTypes = AppChangeLastActiveUserIdAction

export interface AppChangeLastActiveUserIdAction {
    type: AppActionType.CHANGE_LAST_ACTIVE_USER_ID,
    payload: {
        userId: string
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

export function appReducer (
        module: IApp = { },
        action: AppActionTypes
    ): IApp {
            switch(action.type) {
                case AppActionType.CHANGE_LAST_ACTIVE_USER_ID:
                    return {
                        ...module,
                        lastUserId: action.payload.userId
                    }
                
                default: return module;
            }
    }