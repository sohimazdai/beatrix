import { put, call, takeLatest, select } from 'redux-saga/effects';
import { createUserChangeAction } from '../../modules/user/UserActionCreator';
import { UserApi } from '../../../api/userApi';
import { IUser } from '../../../model/IUser';
import { createFDTRUUIDAction } from '../../modules/noteList/NoteListActionCreator';
import { createChangeAppAction } from '../../modules/app/app';

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
        const state = yield select(state => state);
        if (!state.app.isNoteListMigrated) {
            yield put(createFDTRUUIDAction(payload.user.id));
            yield put(createChangeAppAction({
                isNoteListMigrated: true
            }));
        }
        const syncData = yield call(UserApi.syncUser, payload.user);
        yield put(createUserChangeAction({
            loading: false,
            error: null
        }));
    } catch (e) {
        alert(e.message);
        yield put(createUserChangeAction({
            loading: false,
            error: e
        }));
    }
};

export function* watchSyncUser() {
    yield takeLatest(ACTION_TYPE, syncUser);
};
