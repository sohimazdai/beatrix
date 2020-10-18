import { put, call, takeLatest, select } from 'redux-saga/effects';
import { IStorage } from '../../../model/IStorage';
import { AppApi } from '../../../api/AppApi';
import { createChangeAppAction } from '../../modules/app/app';
import { logger } from '../../../app/Logger';
import { appAnalytics } from '../../../app/Analytics';

const ACTION_TYPE = 'PING_APP_ACTION';

export function createAppPingAction() {
    return {
        type: ACTION_TYPE,
    }
}

function* ping() {
    try {
        const state: IStorage = yield select(state => state);
        if (state.app.networkConnected) {
            const isOk = yield call(AppApi.ping);
            if (isOk.data == 'ОК') {
                logger('🖥️ Server is available ✅');

                yield put(createChangeAppAction({ serverAvailable: true }));
            } else {
                logger('🖥️ Server is is n/a ⛔');

                yield put(createChangeAppAction({ serverAvailable: false }));
            }

            appAnalytics.sendEventWithProps(appAnalytics.events.SERVER_AVAILIBILITY_STATUS_CHANGE, {
                isConnected: isOk.data == 'ОК'
            });
        }
    } catch (e) {
        logger('ErrorCatched: ' + e.message)
        logger('🖥️ Server is n/a ⛔')

        yield put(createChangeAppAction({ serverAvailable: false }));

        appAnalytics.sendEventWithProps(appAnalytics.events.SERVER_AVAILIBILITY_STATUS_CHANGE, {
            isConnected: false
        });
    }
};

export function* watchAppPing() {
    yield takeLatest(ACTION_TYPE, ping);
};
