import { put, call, takeLatest, select } from 'redux-saga/effects';
import { createUserChangeAction } from '../../modules/user/UserActionCreator';
import { UserApi } from '../../../api/UserApi';
import { IUser } from '../../../model/IUser';
import { IStorage } from '../../../model/IStorage';
import { createSyncNotesAction } from '../note/SyncNotesSaga';
import { createReplaceShedule } from '../../modules/user-properties-shedule/UserPropertiesShedule';
import { createUserDiabetesPropertiesChangeAction } from '../../modules/user-diabetes-properties/UserDiabetesPropertiesActionCreator';
import { createUpdateUserDiabetesPropertiesAction } from './UpdateUserDiabetesPropertiesSaga'
import { handleError } from '../../../app/ErrorHandler';
import { appAnalytics } from '../../../app/Analytics';
import { batchActions } from 'redux-batched-actions';

const ACTION_TYPE = 'SYNC_USER_ACTION';

interface SyncUserAction {
    type: 'SYNC_USER_ACTION',
    payload: {
        user: IUser
    }
}

export function createSyncUserAction(user: IUser) {
    return batchActions([
        createUserChangeAction({
            loading: true,
            error: null
        }),
        {
            type: ACTION_TYPE,
            payload: {
                user
            }
        },
    ])
}

function* syncUser({ payload }: SyncUserAction) {
    try {
        const state: IStorage = yield select(state => state);

        appAnalytics.setUser(payload.user.id);

        if (state.app.serverAvailable) {
            yield call(UserApi.syncUser, payload.user);
            yield put(createSyncNotesAction());
            yield put(createUpdateUserDiabetesPropertiesAction());
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
