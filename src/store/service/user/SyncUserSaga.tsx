import { put, call, takeLatest, select } from 'redux-saga/effects';
import { createUserChangeAction } from '../../modules/user/UserActionCreator';
import { UserApi } from '../../../api/userApi';
import { IUser } from '../../../model/IUser';
import { IStorage } from '../../../model/IStorage';
import { createSyncNotesAction } from '../note/SyncNotesSaga';
import { createOneLevelMergeUserPropertiesShedule } from '../../modules/user-properties-shedule/UserPropertiesShedule';
import { createUserDiabetesPropertiesChangeAction } from '../../modules/user-diabetes-properties/UserDiabetesPropertiesActionCreator';
import { createUpdateUserSheduleAction } from './UpdateSheduleSaga';
import { handleError } from '../../../app/ErrorHandler';

const ACTION_TYPE = 'SYNC_USER_ACTION';

interface SyncUserAction {
    type: 'SYNC_USER_ACTION',
    payload: {
        user: IUser
    }
}

export function createSyncUserAction(user: IUser): SyncUserAction {
    return {
        type: ACTION_TYPE,
        payload: {
            user
        }
    }
}

function* syncUser({ payload }: SyncUserAction) {
    try {
        yield put(createUserChangeAction({
            loading: true,
            error: null
        }));
        const state: IStorage = yield select(state => state);
        if (state.app.serverAvailable) {
            const syncData = yield call(UserApi.syncUser, payload.user);
            yield put(createOneLevelMergeUserPropertiesShedule(syncData.data.shedule));
            yield put(createUserDiabetesPropertiesChangeAction(syncData.data.properties));
            yield put(createSyncNotesAction());
        }
        
        yield put(createUserChangeAction({
            loading: false,
            error: null
        }));
    } catch (e) {
        handleError(e, 'Ошибка синхронизации диабетического профиля с сервером');
        yield put(createUserChangeAction({
            loading: false,
            error: e
        }));
    }
};

export function* watchSyncUser() {
    yield takeLatest(ACTION_TYPE, syncUser);
};
