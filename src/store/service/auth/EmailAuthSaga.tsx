import { put, call, takeLatest } from 'redux-saga/effects';
import { batchActions } from 'redux-batched-actions';
import { createUserChangeAction } from '../../modules/user/UserActionCreator';
import { LogInResult } from 'expo-google-app-auth';
import { firebaseApp } from '../../../config/firebase-config';
import { IUser } from '../../../model/IUser';

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
        console.log(JSON.stringify(data))
        const userData: IUser = {
            id: data.user.uid,
            email: data.user.email,
            name: data.user.email.split('@')[0],
        };

        yield put(createUserChangeAction({
            ...userData,
            loading: false,
            error: null
        }));
    } catch (e) {
        alert(e.message)
        yield put(createUserChangeAction({
            loading: false,
            error: e.message
        }))
    }
};

export function* watchEmailAuth() {
    console.log('saga watching')

    yield takeLatest(ACTION_TYPE, emailAuth);
};
