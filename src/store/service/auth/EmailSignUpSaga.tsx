import { put, call, takeLatest } from 'redux-saga/effects';
import { batchActions } from 'redux-batched-actions';
import { createUserChangeAction } from '../../modules/user/UserActionCreator';
import { LogInResult } from 'expo-google-app-auth';
import { firebaseApp } from '../../../config/firebase-config';
import { IUser } from '../../../model/IUser';
import { createSyncUserAction } from '../user/SyncUserSaga';

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