import { put, takeLatest } from 'redux-saga/effects';
import { createUserChangeAction } from '../../modules/user/UserActionCreator';
import { firebaseApp } from '../../../config/firebase-config';
import { IUser } from '../../../model/IUser';
import { createSyncUserAction } from '../user/SyncUserSaga';
import { batchActions } from 'redux-batched-actions';
import { appAnalytics } from '../../../app/Analytics';
import { handleError } from '../../../app/ErrorHandler';

const ACTION_TYPE = 'EMAIL_AUTH_ACTION';

interface EmailAuthAction {
    type: 'EMAIL_AUTH_ACTION',
    payload: {
        email: string
        password: string
    }
}

export function createEmailAuthAction(email: string, password: string): EmailAuthAction {
    return {
        type: ACTION_TYPE,
        payload: { email, password }
    }
}

function* emailAuth(action?: EmailAuthAction) {
    try {
        yield put(createUserChangeAction({
            loading: true,
            error: null
        }));
        const email = action.payload.email;
        const password = action.payload.password;
        const appAuth = firebaseApp.auth();
        const data: firebase.auth.UserCredential = yield appAuth.signInWithEmailAndPassword(email, password);
        const userData: IUser = {
            id: data.user.uid,
            email: data.user.email,
            name: data.user.email.split('@')[0],
            isAuthed: true
        };

        appAnalytics.sendEvent(appAnalytics.events.EMAIL_LOGIN);
        
        yield put(createUserChangeAction({
            ...userData,
            loading: false,
            error: null,
        }));
        yield put(createSyncUserAction(userData));
    } catch (e) {
        handleError(e, 'Не удалось авторизоваться');
        yield put(createUserChangeAction({
            loading: false,
            error: e.message
        }))
    }
};

export function* watchEmailAuth() {
    yield takeLatest(ACTION_TYPE, emailAuth);
};
