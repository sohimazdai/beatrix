import { put, call, takeLatest, select } from "redux-saga/effects";
import { createUserChangeAction } from "../../modules/user/UserActionCreator";
import { IStorage } from "../../../model/IStorage";
import { handleErrorSilently } from '../../../app/ErrorHandler';
import { batchActions } from 'redux-batched-actions';
import { FoodApi } from '../../../api/FoodApi';

const type = "ADD_PRODUCT_TO_FAVORITE";

export function createAddProductToFavoriteAction(foodId: string) {
  return batchActions([
    createUserChangeAction({
      loading: true,
      error: null
    }),
    {
      type,
      payload: foodId
    },
  ])
}

interface AddProductToFavoriteAction {
  type,
  payload: string
}

function* run({ payload }: AddProductToFavoriteAction) {
  try {
    const state: IStorage = yield select(state => state);
    const userId = state.user.id;

    if (state.app.networkConnected) {
      yield call(FoodApi.addFoodIdToFavorites, String(userId), String(payload));
    }

    yield put(
      createUserChangeAction({
        loading: false,
        error: null,
      })
    );
  } catch (e) {
    handleErrorSilently(e, 'Ошибка добавления в favorites');
    yield put(
      createUserChangeAction({
        loading: false,
        error: e,
      })
    );
  }
}

export function* watchAddProductToFavorite() {
  yield takeLatest(type, run);
}
