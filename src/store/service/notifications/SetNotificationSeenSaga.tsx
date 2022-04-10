import { put, call, takeLatest, select } from "redux-saga/effects";

import { IStorage } from "../../../model/IStorage";
import { handleErrorSilently } from '../../../app/ErrorHandler';
import { NotificationsApi } from "../../../api/NotificationsApi";
import { createSetNotificationSeen } from "../../modules/notifications";
import { appAnalytics } from '../../../app/Analytics';

const ACTION_TYPE = "SET_NOTIFICATION_SEEN_ACTION";

interface SetNotificationSeenAction {
    type: "SET_NOTIFICATION_SEEN_ACTION";
    payload: { notificationIds: string[] };
}

export function createSetNotificationSeenAction(notificationIds: string[]): SetNotificationSeenAction {
    return {
        type: ACTION_TYPE,
        payload: { notificationIds },
    };
}

function* run({ payload: { notificationIds } }: SetNotificationSeenAction) {
    try {
        const state: IStorage = yield select(state => state);
        const seens = notificationIds.filter((nId) => !state.notifications.seenList.includes(nId));

        if (state.app.serverAvailable && seens.length) {
            yield call(
                NotificationsApi.setSeenNotifications,
                state.user.id,
                notificationIds,
            );
        }

        yield put(createSetNotificationSeen(notificationIds));

        notificationIds.forEach((id) => {
            appAnalytics.sendEventWithProps(
                appAnalytics.events.NOTIFICATION_SEEN,
                { notificationId: id },
            );
        });
    } catch (e) {
        handleErrorSilently('Ошибка установки статуса прочитано для notifications');
    }
}

export function* watchSetNotificationSeen() {
    yield takeLatest(ACTION_TYPE, run);
}
