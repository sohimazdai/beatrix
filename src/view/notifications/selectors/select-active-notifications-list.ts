import { createSelector } from "reselect";
import * as Application from 'expo-application';

import { IStorage } from "../../../model/IStorage";
import { INotification, INotificationsList } from "../../../model/INotification";
import { IUser } from "../../../model/IUser";
import { getLocale } from "../../../localisation/Translate";

export default createSelector(
    [
        (state: IStorage) => state.notifications,
        (state: IStorage) => state.user,
    ],
    getActiveNotificationsList,
);

function getActiveNotificationsList(
    notifications: INotificationsList,
    user: IUser,
): INotification[] {
    const version = Application.nativeApplicationVersion;
    const locale = getLocale();

    const notificationsToShow =
        Object.values(notifications.list)
            .filter((n) => n.isForAllUsers || (new Date(n.createdAt) > new Date(user.registeredOn)))
            .filter((n) => (n.regionsToShow && n.regionsToShow.length
                ? n.regionsToShow.includes(locale)
                : true))
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
    const fromArr = notification.versionFrom.split('.').map(Number);
    const toArr = notification.versionTo.split('.').map(Number);
    const versionArr = version.split('.').map(Number);

    return versionArr.some((vers, i) => {
        if (vers >= fromArr[i] && vers <= toArr[i]) {
            return false;
        } else {
            return true;
        }
    });
}