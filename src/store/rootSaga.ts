import { all, fork } from 'redux-saga/effects';
import { watchEmailAuth } from './service/auth/EmailAuthSaga';
import { watchRememberPassword } from './service/auth/RememberPasswordSaga';
import { watchEmailSignUp } from './service/auth/EmailSignUpSaga';
import { watchGoogleAuth } from './service/auth/GoogleAuthSaga';
import { watchSyncUser } from './service/user/SyncUserSaga';
import { watchCreateNote } from './service/note/CreateNoteSaga';
import { watchUpdateNote } from './service/note/UpdateNoteSaga';
import { watchDeleteNote } from './service/note/DeleteNoteSaga';

export function* rootSaga() {
    yield all([
        //AUTH
        fork(watchEmailAuth),
        fork(watchEmailSignUp),
        fork(watchGoogleAuth),
        fork(watchRememberPassword),
        //USER
        fork(watchSyncUser),
        //NOTES
        fork(watchCreateNote),
        fork(watchUpdateNote),
        fork(watchDeleteNote),
    ]);
};
