import { all, fork } from 'redux-saga/effects';
import { watchGoogleAuth } from './service/auth/GoogleAuthSaga';
import { watchSyncUser } from './service/user/SyncUserSaga';
import { watchCreateNote } from './service/note/CreateNoteSaga';
import { watchUpdateNote } from './service/note/UpdateNoteSaga';
import { watchDeleteNote } from './service/note/DeleteNoteSaga';
import { watchAppPing } from './service/app/AppPingSaga';
import { watchSyncNotes } from './service/note/SyncNotesSaga';
import { watchUpdateUserShedule } from './service/user/UpdateSheduleSaga';

export function* rootSaga() {
    yield all([
        //AUTH
        fork(watchGoogleAuth),
        //USER
        fork(watchSyncUser),
        //NOTES
        fork(watchCreateNote),
        fork(watchUpdateNote),
        fork(watchDeleteNote),
        fork(watchSyncNotes),
        fork(watchUpdateUserShedule),
        //APP
        fork(watchAppPing),
    ]);
};
