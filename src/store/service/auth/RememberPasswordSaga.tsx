import { put, call, takeLatest } from 'redux-saga/effects';
import { createUserChangeAction } from '../../modules/user/UserActionCreator';
import { firebaseApp } from '../../../config/firebase-config';

const ACTION_TYPE = 'REMEMBER_PASSWORD_ACTION';

interface RememberPasswordAction {
    type: 'REMEMBER_PASSWORD_ACTION',
    payload: {
        email: string
    }
}

export function createRememberPasswordAction(email: string): RememberPasswordAction {
    return {
        type: ACTION_TYPE,
        payload: { email }
    }
}

function* rememberPassword(action?: RememberPasswordAction) {
    try {
        yield put(createUserChangeAction({
            loading: true,
            error: null
        }));
        const email = action.payload.email;
        yield firebaseApp.auth().sendPasswordResetEmail(email);
        yield put(createUserChangeAction({
            loading: false,
            error: null
        }));
    } catch (e) {
        alert(e.message);
        yield put(createUserChangeAction({
            loading: false,
            error: e.message
        }));
    };
};

export function* watchRememberPassword() {
    yield takeLatest(ACTION_TYPE, rememberPassword);
};
