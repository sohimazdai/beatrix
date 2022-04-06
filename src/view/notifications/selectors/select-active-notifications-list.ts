import { createSelector } from "reselect";

import { IStorage } from "../../../model/IStorage";
import { isIOS } from "../../../app/Platorm";
import { INotification, INotificationsList } from "../../../model/INotification";
import { IUser } from "../../../model/IUser";

export default createSelector(
    [
        (state: IStorage) => state.notifications,
        (state: IStorage) => state.user,
        (_, version: string) => version,
    ],
    getActiveNotificationsList,
);

function getActiveNotificationsList(
    notifications: INotificationsList,
    user: IUser,
    version: string,
): INotification[] {
    const seenList = notifications.seenList.map(String);
    const notificationsToShow =
        Object.values(notifications.list)
            .filter((n) => n.isForAllUsers || (new Date(n.createdAt) > new Date(user.registeredOn)))
            .filter((n) => !seenList.includes(n.id))
            .filter((n) => checkVersion(n, version))
            .sort((a, b) => (
                new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
            ));

    return notificationsToShow;
}

/**
 * @example iOS: from 2.0.2; to 2.1.2; version: 2.0.2; return true
 * @example iOS: from 2.0.2; to 2.1.2; version: 2.1.2; return true
 * @example Android: from 32; to 34; version: 35; return false
 * @example Android: from 32; to 34; version: 32; return true
 * @example Android: from 32; to 34; version: 34; return true
 */
function checkVersion(
    notification: INotification,
    version: string,
): boolean {
    if (isIOS()) {
        const fromArr = notification.versionIOsFrom.split('.').map(Number);
        const toArr = notification.versionIOsTo.split('.').map(Number);
        const versionArr = version.split('.').map(Number);

        return versionArr.some((vers, i) => {
            if (vers >= fromArr[i] && vers <= toArr[i]) {
                return false;
            } else {
                return true;
            }
        })
    } else {
        return Number(version) >= Number(notification.versionAndroidFrom) &&
            Number(version) <= Number(notification.versionAndroidTo);
    }
}