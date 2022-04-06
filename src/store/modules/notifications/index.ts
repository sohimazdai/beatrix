import { INotificationsList } from "../../../model/INotification";

enum NotificationsActions {
    SET_LIST = "NOTIFICATIONS/SET_LIST",
    SET_NOTIFICATION_AS_SHOWN = "NOTIFICATIONS/SET_NOTIFICATION_AS_SHOWN",
}

export interface NotificationsSetListAction {
    type: NotificationsActions.SET_LIST,
    payload: INotificationsList,
}

export function createSetNotificationsList(notifications: INotificationsList): NotificationsSetListAction {
    return {
        type: NotificationsActions.SET_LIST,
        payload: notifications
    }
}

export interface SetNotificationSeenAction {
    type: NotificationsActions.SET_NOTIFICATION_AS_SHOWN,
    payload: string[],
}

export function createSetNotificationSeen(notificationIds: string[]): SetNotificationSeenAction {
    return {
        type: NotificationsActions.SET_NOTIFICATION_AS_SHOWN,
        payload: notificationIds,
    }
}

export type NotificationsActionTypes = NotificationsSetListAction | SetNotificationSeenAction

export function notificationsReducer(
    module: INotificationsList = {
        list: [],
        seenList: [],
    },
    action: NotificationsActionTypes
): INotificationsList {
    switch (action.type) {
        case NotificationsActions.SET_LIST:
            return {
                ...module,
                ...action.payload,
            }
        case NotificationsActions.SET_NOTIFICATION_AS_SHOWN:
            return {
                ...module,
                seenList: [...module.seenList, ...action.payload],
            }
        default: return module;
    }
}
