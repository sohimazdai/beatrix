import { IInteractive } from "../../../model/IInteractive";
import { persistReducer, createTransform } from "redux-persist";

export enum InteractiveActionType {
    CHANGE = "INTERACTIVE_CHANGE"
}

export type InteractiveActionTypes = InteractiveChangeAction

export interface InteractiveChangeAction {
    type: InteractiveActionType.CHANGE,
    payload: IInteractive
}

export function createChangeInteractive(interactive: IInteractive) {
    return {
        type: InteractiveActionType.CHANGE,
        payload: interactive 
    }
}

export function interactiveReducer(
    module: IInteractive = {},
    action: InteractiveActionTypes
): IInteractive {
    switch (action.type) {
        case InteractiveActionType.CHANGE:
            return {
                ...module,
                ...action.payload
            }

        default: return module;
    }
}
