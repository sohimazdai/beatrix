import { put, call, takeLatest } from 'redux-saga/effects';
import { createUserChangeAction } from '../../modules/user/UserActionCreator';
import { IUser } from '../../../model/IUser';
import * as Google from 'expo-google-app-auth';
import { googleAuthConfig } from '../../../config/googleAuthConfig';
import { createSyncUserAction } from '../user/SyncUserSaga';

const ACTION_TYPE = 'GOOGLE_AUTH_ACTION';

interface GoogleAuthAction {
    type: 'GOOGLE_AUTH_ACTION',
}

export function createGoogleAuthAction(): GoogleAuthAction {
    return {
        type: ACTION_TYPE
    }
}

function* googleAuth() {
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
                isAuthed: true
            };
        }

        yield put(createUserChangeAction({
            ...userData,
            loading: false,
            error: null,
        }));
        yield put(createSyncUserAction(userData));
    } catch (e) {
        alert(e.message)
        yield put(createUserChangeAction({
            loading: false,
            error: e.message,

            isAuthed: false
        }))
    }
};

export function* watchGoogleAuth() {
    yield takeLatest(ACTION_TYPE, googleAuth);
};
