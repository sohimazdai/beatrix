import { put, takeLatest, call, select } from 'redux-saga/effects';
import { createUserChangeAction } from '../../modules/user/UserActionCreator';
import { handleErrorSilently } from '../../../app/ErrorHandler';
import { UserApi } from '../../../api/userApi';
import { IStorage } from '../../../model/IStorage';

const ACTION_TYPE = 'CLEAR_INSTALLATION_ID';

interface ClearInstallationIdAction {
  type: 'CLEAR_INSTALLATION_ID',
}

export function createClearInstallationIdAction(): ClearInstallationIdAction {
  return {
    type: ACTION_TYPE
  }
}

function* run() {
  try {
    yield put(createUserChangeAction({
      loading: true,
      error: null
    }));

    const state: IStorage = yield select(state => state);

    if (state.app.serverAvailable) {
      yield call(UserApi.clearInstallationId, state.user.id);
    }
    
    yield put(createUserChangeAction({
      id: '',
      isAuthed: false,
      loading: false,
      error: null,
    }));
  } catch (e) {
    handleErrorSilently('Не удалось стереть installationId');

    yield put(createUserChangeAction({
      id: '',
      isAuthed: false,
      loading: false,
      error: e.message,
    }))
  }
};

export function* watchClearInstallationId() {
  yield takeLatest(ACTION_TYPE, run);
};
