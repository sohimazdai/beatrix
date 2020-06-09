import { put, takeLatest, call } from 'redux-saga/effects';
import { createUserChangeAction } from '../../modules/user/UserActionCreator';
import { IUser } from '../../../model/IUser';
import { appAnalytics } from '../../../app/Analytics';
import { handleErrorSilently } from '../../../app/ErrorHandler';
import { UserApi } from '../../../api/UserApi';
import Constants from 'expo-constants';

const ACTION_TYPE = 'GET_USER_BY_INSTALLATION_ID';

interface GetUserByInstallationIdAction {
  type: 'GET_USER_BY_INSTALLATION_ID',
}

export function createGetUserByInstallationIdAction(): GetUserByInstallationIdAction {
  return {
    type: ACTION_TYPE
  }
}

function* run() {
  try {
    yield put(createUserChangeAction({
      installationLoading: true,
      error: null
    }));

    const recoveredUser = yield call(UserApi.getUserByInstallationId, Constants.installationId);
    let userData: IUser = {};

    if (recoveredUser.data) {
      userData = {
        id: recoveredUser.data.id,
        email: recoveredUser.data.email,
        authType: recoveredUser.data.authType,
      }
    }
    appAnalytics.sendEvent(appAnalytics.events.USER_BY_INSTALLATION_ID);

    yield put(createUserChangeAction({
      ...userData,
      installationLoading: false,
      error: null,
    }));
  } catch (e) {
    handleErrorSilently('Не удалось подтянуть юзера по installationId');

    yield put(createUserChangeAction({
      installationLoading: false,
      error: e.message,

      isAuthed: false
    }))
  }
};

export function* watchGetUserByInstallationId() {
  yield takeLatest(ACTION_TYPE, run);
};
