import { all, fork } from 'redux-saga/effects';
import { watchGoogleAuth } from './service/auth/GoogleAuthSaga';
import { watchSyncUser } from './service/user/SyncUserSaga';
import { watchCreateNote } from './service/note/CreateNoteSaga';
import { watchUpdateNote } from './service/note/UpdateNoteSaga';
import { watchDeleteNote } from './service/note/DeleteNoteSaga';
import { watchAppPing } from './service/app/AppPingSaga';
import { watchSyncNotes } from './service/note/SyncNotesSaga';
import { watchUpdateUserShedule } from './service/user/UpdateSheduleSaga';
import { watchGetUserByInstallationId } from './service/auth/GetUserByInstallationId';
import { watchClearInstallationId } from './service/auth/ClearInstallationIdSaga';
import { watchUpdateUserDiabetesProperties } from './service/user/UpdateUserDiabetesPropertiesSaga';
import { watchExportData } from './service/export/ExportDataSaga';

export function* rootSaga() {
    yield all([
        //AUTH
        fork(watchGoogleAuth),
        fork(watchGetUserByInstallationId),
        fork(watchClearInstallationId),
        //USER
        fork(watchSyncUser),
        fork(watchUpdateUserDiabetesProperties),
        //NOTES
        fork(watchCreateNote),
        fork(watchUpdateNote),
        fork(watchDeleteNote),
        fork(watchSyncNotes),
        fork(watchUpdateUserShedule),
        //APP
        fork(watchAppPing),
        //EXPORT
        fork(watchExportData),
    ]);
};
