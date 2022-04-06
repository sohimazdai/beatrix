import { put, call, takeLatest, select } from "redux-saga/effects";

import { IStorage } from "../../../model/IStorage";
import { handleError } from '../../../app/ErrorHandler';
import { i18nGet } from '../../../localisation/Translate';
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

        if (state.app.serverAvailable) {
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
        handleError(e, i18nGet('set_notification_seen_error'));
    }
}

export function* watchSetNotificationSeen() {
    yield takeLatest(ACTION_TYPE, run);
}
