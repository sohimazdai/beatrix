import { put, call, takeLatest, select } from "redux-saga/effects";
import { createUserChangeAction } from "../../modules/user/UserActionCreator";
import { UserApi } from "../../../api/userApi";
import { IStorage } from "../../../model/IStorage";
import { createOneLevelMergeUserPropertiesShedule } from "../../modules/user-properties-shedule/UserPropertiesShedule";
import { IUserPropertiesShedule } from "../../../model/IUserPropertiesShedule";
import { appAnalytics } from '../../../app/Analytics';
import { handleError } from '../../../app/ErrorHandler';
import { batchActions } from 'redux-batched-actions';
import { IUserDiabetesProperties } from '../../../model/IUserDiabetesProperties';
import { createUserDiabetesPropertiesChangeAction } from '../../modules/user-diabetes-properties/UserDiabetesPropertiesActionCreator';

const ACTION_TYPE = "UPDATE_USER_DIABETES_PROPERTIES";

interface UpdateUserDiabetesPropertiesAction {
  type: "UPDATE_USER_DIABETES_PROPERTIES";
  payload: {
    prevProperties: IUserDiabetesProperties;
  };
}

export function createUpdateUserDiabetesPropertiesAction(
  prevProperties: IUserDiabetesProperties
) {
  return batchActions([
    createUserChangeAction({
      loading: true,
      error: null
    }),
    {
      type: ACTION_TYPE,
      payload: {
        prevProperties
      }
    }
  ])
}

function* run({ payload }: UpdateUserDiabetesPropertiesAction) {
  try {
    const state: IStorage = yield select(state => state);
    if (state.app.serverAvailable) {
      yield put(
        createUserChangeAction({
          loading: false,
          error: null
        })
      );
    } else {
      yield put(createUserDiabetesPropertiesChangeAction(payload.prevProperties));
      yield put(
        createUserChangeAction({
          loading: false,
          error: null
        })
      );
    }

    // appAnalytics.sendEvent(appAnalytics.events.SHEDULE_UPDATED);

  } catch (e) {
    handleError(e, 'Ошибка синхронизации расписания с сервером');
    yield put(
      createUserChangeAction({
        loading: false,
        error: e
      })
    );
  }
}

export function* watchUpdateUserDiabetesProperties() {
  yield takeLatest(ACTION_TYPE, run);
}
