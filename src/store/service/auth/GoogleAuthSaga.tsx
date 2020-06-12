import { put, takeLatest } from 'redux-saga/effects';
import { createUserChangeAction } from '../../modules/user/UserActionCreator';
import { IUser, AuthType } from '../../../model/IUser';
import * as Google from 'expo-google-app-auth';
import { googleAuthConfig } from '../../../config/googleAuthConfig';
import { createSyncUserAction } from '../user/SyncUserSaga';
import { appAnalytics } from '../../../app/Analytics';
import { handleError } from '../../../app/ErrorHandler';
import Constants from 'expo-constants';
import { i18nGet } from '../../../localisation/Translate';

const ACTION_TYPE = 'GOOGLE_AUTH_ACTION';

interface GoogleAuthAction {
    type: 'GOOGLE_AUTH_ACTION',
}

export function createGoogleAuthAction(): GoogleAuthAction {
    return {
        type: ACTION_TYPE
    }
}

function* run() {
    try {
        yield put(createUserChangeAction({
            loading: true,
            error: null
        }));

        const googleUser: Google.LogInResult = yield Google.logInAsync(googleAuthConfig);
        let userData: IUser = {};

        if (googleUser.type === 'cancel') {
            yield put(createUserChangeAction({
                loading: false,
                error: null
            }));
            return;
        }

        if (googleUser.type === 'success') {
            userData = {
                id: googleUser.user.id,
                email: googleUser.user.email,
                name: googleUser.user.name,
                authType: AuthType.GOOGLE,
                installationId: Constants.installationId,
                isAuthed: true
            };
        }

        appAnalytics.sendEvent(appAnalytics.events.GOOGLE_SIGN_IN);

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
