import { put, call, takeLatest, select } from "redux-saga/effects";
import { createUserChangeAction } from "../../modules/user/UserActionCreator";
import { IStorage } from "../../../model/IStorage";
import { handleErrorSilently } from '../../../app/ErrorHandler';
import { batchActions } from 'redux-batched-actions';
import { IShedule } from '../../../model/IShedule';
import { SheduleApi } from '../../../api/SheduleApi';
import { createChangePending } from '../../modules/pending/pending';
import { createReplaceShedule } from '../../modules/shedule/shedule';

const ACTION_TYPE = "CHANGE_SHEDULE_ACTION";

export function createChangeSheduleAction(shedule: IShedule) {
  return batchActions([
    createUserChangeAction({
      loading: true,
      error: null
    }),
    {
      type: ACTION_TYPE,
      payload: shedule,
    },
  ])
}

interface ChangeSheduleAction {
  type: 'CHANGE_SHEDULE_ACTION',
  payload: IShedule
}

function* run({ payload }: ChangeSheduleAction) {
  try {
    const state: IStorage = yield select(state => state);

    yield put(createReplaceShedule({ shedule: payload }))
    if (state.app.serverAvailable) {
      const { data } = yield call(SheduleApi.changeShedule, state.user.id, payload);

    } else {
      yield put(createChangePending({ shedule: true }));
    }

    yield put(
      createUserChangeAction({
        loading: false,
        error: null,
      })
    );
  } catch (e) {
    handleErrorSilently(e, 'Ошибка изменения расписания');
    yield put(
      createUserChangeAction({
        loading: false,
        error: e,
      })
    );
  }
}

export function* watchChangeShedule() {
  yield takeLatest(ACTION_TYPE, run);
}
