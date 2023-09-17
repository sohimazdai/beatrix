import { call, put, takeLatest } from 'redux-saga/effects';
import { createUserChangeAction } from '../../modules/user/UserActionCreator';
import { IUser, AuthType } from '../../../model/IUser';
import { createSyncUserAction } from '../user/SyncUserSaga';
import { appAnalytics } from '../../../app/Analytics';
import { handleError } from '../../../app/ErrorHandler';
import Constants from 'expo-constants';
import { i18nGet } from '../../../localisation/Translate';
import fetchGoogleUserInfo from './fetch-google-user-info';

const ACTION_TYPE = 'GOOGLE_AUTH_ACTION';

interface GoogleAuthAction {
    type: 'GOOGLE_AUTH_ACTION',
    accessToken: string,
}

export function createGoogleAuthAction(accessToken): GoogleAuthAction {
    return {
        type: ACTION_TYPE,
        accessToken,
    }
}

function* run(action) {
    const { accessToken } = action;

    try {
        yield put(createUserChangeAction({
            loading: true,
            error: null,
        }));

        const userInfo = yield call(fetchGoogleUserInfo, accessToken);

        let userData: IUser = {};

        userData = {
            id: userInfo.id,
            email: userInfo.email,
            name: userInfo.name,
            authType: AuthType.GOOGLE,
            installationId: Constants.sessionId,
            isAuthed: true,
        };

        appAnalytics.sendEvent(appAnalytics.events.GOOGLE_SIGN_IN);
        appAnalytics.setUser(userInfo.id);
        appAnalytics.setUserProperties();

        yield put(createUserChangeAction({
            ...userData,
            loading: false,
            error: null,
        }));
        yield put(createSyncUserAction(userData));
    } catch (e) {
        handleError(e, i18nGet('google_auth_error'));

        yield put(createUserChangeAction({
            loading: false,
            error: e.message,

            isAuthed: false
        }))
    }
};

export function* watchGoogleAuth() {
    yield takeLatest(ACTION_TYPE, run);
};
