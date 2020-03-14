import { all, fork } from 'redux-saga/effects';
import { watchEmailAuth } from './service/auth/EmailAuthSaga';
import { watchRememberPassword } from './service/auth/RememberPasswordSaga';
import { watchEmailSignUp } from './service/auth/EmailSignUpSaga';

export function* rootSaga() {
    yield all([
        fork(watchEmailAuth),
        fork(watchEmailSignUp),
        fork(watchRememberPassword),
    ]);
};
