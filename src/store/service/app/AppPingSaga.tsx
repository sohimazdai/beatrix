import { put, call, takeLatest, select } from 'redux-saga/effects';
import { IStorage } from '../../../model/IStorage';
import { AppApi } from '../../../api/AppApi';
import { createChangeAppAction } from '../../modules/app/app';

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
                console.log('Server is available')
                yield put(createChangeAppAction({
                    serverAvailable: true
                }))
            }
        }
    } catch (e) {
        console.log('ErrorCatched: ' + e.message)
        console.log('Server is n/a')
        yield put(createChangeAppAction({
            serverAvailable: false
        }))
    }
};

export function* watchAppPing() {
    yield takeLatest(ACTION_TYPE, ping);
};
