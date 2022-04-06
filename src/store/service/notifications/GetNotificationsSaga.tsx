import { put, call, takeLatest, select } from "redux-saga/effects";
import { IStorage } from "../../../model/IStorage";
import { handleError } from '../../../app/ErrorHandler';
import { getLocale, i18nGet, LocaleType } from '../../../localisation/Translate';
import { NotificationsApi } from "../../../api/NotificationsApi";
import { createSetNotificationsList } from "../../modules/notifications";
import { INotification } from "../../../model/INotification";

const ACTION_TYPE = "GET_NOTIFICATIONS_ACTION";

interface GetNotificationsAction {
    type: "GET_NOTIFICATIONS_ACTION";
}

export function createGetNotificationsAction(): GetNotificationsAction {
    return { type: ACTION_TYPE };
}

function* run() {
    try {
        const state: IStorage = yield select(state => state);

        if (state.app.serverAvailable) {
            let { data: { notifications, notificationsSeen } } = yield call(
                NotificationsApi.getNotifications,
                state.user.id,
            );

            notifications = mapNotifications(notifications);

            yield put(
                createSetNotificationsList({
                    seenList: notificationsSeen,
                    list: notifications,
                }),
            );
        }
    } catch (e) {
        handleError(e, i18nGet('get_notifications_error'));
    }
}

export function* watchGetNotifications() {
    yield takeLatest(ACTION_TYPE, run);
}


function mapNotifications(nfs: INotification[]) {
    switch (getLocale()) {
        case LocaleType.ua:
            return nfs.map((n) => ({ ...n, title: n['title_ua'], text: n['text_ua'] }));
        case LocaleType.ru:
            return nfs.map((n) => ({ ...n, title: n['title_ru'], text: n['text_ru'] }));
        case LocaleType.es:
            return nfs.map((n) => ({ ...n, title: n['title_es'], text: n['text_es'] }));
        default:
            return nfs.map((n) => ({ ...n, title: n['title_en'], text: n['text_en'] }));
    }
}