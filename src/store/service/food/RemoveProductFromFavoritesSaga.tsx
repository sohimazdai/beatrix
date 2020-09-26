import { put, call, takeLatest, select } from "redux-saga/effects";
import { createUserChangeAction } from "../../modules/user/UserActionCreator";
import { IStorage } from "../../../model/IStorage";
import { handleErrorSilently } from '../../../app/ErrorHandler';
import { batchActions } from 'redux-batched-actions';
import { FoodApi } from '../../../api/FoodApi';

const type = "REMOVE_PRODUCT_FROM_FAVORITE";

export function createRemoveProdcutFromFavoriteAction(foodIds: string[]) {
  return batchActions([
    createUserChangeAction({
      loading: true,
      error: null
    }),
    {
      type,
      payload: foodIds
    },
  ])
}

interface RemoveProdcutFromFavoriteAction {
  type,
  payload: string[]
}

function* run({ payload }: RemoveProdcutFromFavoriteAction) {
  try {
    const state: IStorage = yield select(state => state);
    const userId = state.user.id;

    if (state.app.networkConnected) {
      yield call(FoodApi.removeFoodIdFromFavorites, userId, payload);
    }

    yield put(
      createUserChangeAction({
        loading: false,
        error: null,
      })
    );
  } catch (e) {
    handleErrorSilently(e, 'Ошибка удаления из favorites');
    yield put(
      createUserChangeAction({
        loading: false,
        error: e,
      })
    );
  }
}

export function* watchRemoveProdcutFromFavorite() {
  yield takeLatest(type, run);
}
