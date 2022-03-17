import { IPopup, IPopupList } from "../../../model/IPopupList";

export enum PopupListActionType {
    ADD = "POPUP_LIST_ADD",
    HIDE = "POPUP_LIST_HIDE",
    EMERGE = "POPUP_LIST_EMERGE",
}

export interface PopupListAddAction {
    type: PopupListActionType.ADD,
    payload: IPopup,
}

export function createAddPopupToPopupList(popup: IPopup): PopupListAddAction {
    return {
        type: PopupListActionType.ADD,
        payload: popup,
    };
}

export interface PopupListHideAction {
    type: PopupListActionType.HIDE,
    payload: string
}

export function createHidePopupToPopupList(popupId: string): PopupListHideAction {
    return {
        type: PopupListActionType.HIDE,
        payload: popupId
    };
}

export interface PopupListEmergeAction {
    type: PopupListActionType.EMERGE,
    payload: IPopup
}

export function createEmergePopupToPopupList(popup: IPopup): PopupListEmergeAction {
    return {
        type: PopupListActionType.EMERGE,
        payload: popup
    };
}

export type PopupListActionTypes = PopupListAddAction | PopupListHideAction | PopupListEmergeAction;

export function popupListReducer(
    module: IPopupList = [],
    action: PopupListActionTypes,
): IPopupList {
    let targetPopupIndex = -1;
    let newList = [];

    switch (action.type) {
        case PopupListActionType.ADD:
            return [
                ...module,
                action.payload,
            ];

        case PopupListActionType.HIDE:
            targetPopupIndex = module.findIndex((popup) => popup.id === action.payload);
            newList = [...module];
            newList[targetPopupIndex].isOpen = false;

            return newList;

        case PopupListActionType.EMERGE:
            targetPopupIndex = module.findIndex((popup) => popup.id === action.payload.id);
            newList = [...module];
            newList.splice(targetPopupIndex, 1);
            newList.push(action.payload);

            return newList;

        default: return module;
    }
}
