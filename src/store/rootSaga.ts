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
import { watchCompleteOnboarding } from './service/onboarding/CompleteOnboardingSaga';
import { watchSyncPendingData } from './service/pending/SyncPendingData';
import { watchFetchProductByBarcode } from './service/food/FetchBarcodeProductSaga';
import { watchSearchProducts } from './service/food/SearchProductsSaga';
import { watchAddProduct } from './service/food/AddProductSaga';

export function* rootSaga() {
    yield all([
        //AUTH
        fork(watchGoogleAuth),
        fork(watchGetUserByInstallationId),
        fork(watchClearInstallationId),
        //ONBOARDING
        fork(watchCompleteOnboarding),
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
        //PENDING
        fork(watchSyncPendingData),
        // FOOD
        fork(watchFetchProductByBarcode),
        fork(watchSearchProducts),
        fork(watchAddProduct),
    ]);
};
