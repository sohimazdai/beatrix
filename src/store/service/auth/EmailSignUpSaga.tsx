import { put, takeLatest } from 'redux-saga/effects';
import { createUserChangeAction } from '../../modules/user/UserActionCreator';
import { firebaseApp } from '../../../config/firebase-config';
import { createSyncUserAction } from '../user/SyncUserSaga';
import { appAnalytics } from '../../../app/Analytics';

const ACTION_TYPE = 'EMAIL_SIGN_UP_ACTION';

interface EmailSignUpAction {
    type: 'EMAIL_SIGN_UP_ACTION',
    payload: {
        email: string
        password: string
    }
}

export function createEmailSignUpAction(email: string, password: string): EmailSignUpAction {
    return {
        type: ACTION_TYPE,
        payload: { email, password }
    }
}

function* emailSignUp(action?: EmailSignUpAction) {
    try {
        yield put(createUserChangeAction({
            loading: true,
            error: null
        }));
        const email = action.payload.email;
        const password = action.payload.password;
        const appSignUp = firebaseApp.auth();
        const data: firebase.auth.UserCredential = yield appSignUp.createUserWithEmailAndPassword(email, password);
        const userData = {
            id: data.user.uid,
            email: data.user.email,
            name: data.user.email.split('@')[0],
            isAuthed: true,
        }

        appAnalytics.sendEvent(appAnalytics.events.EMAIL_SIGN_UP);

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
            error: e.message
        }))
    }
};

export function* watchEmailSignUp() {
    yield takeLatest(ACTION_TYPE, emailSignUp);
};
