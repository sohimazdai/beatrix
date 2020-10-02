import { put, call, takeLatest, select } from "redux-saga/effects";
import { createUserChangeAction } from "../../modules/user/UserActionCreator";
import { IStorage } from "../../../model/IStorage";
import { handleErrorSilently } from '../../../app/ErrorHandler';
import { batchActions } from 'redux-batched-actions';
import { FoodApi } from '../../../api/FoodApi';
import { appAnalytics } from '../../../app/Analytics';
import { selectSelectedFoodItem } from '../../../view/food/selectors/select-selected-food-item';
import { createFoodAnalytics } from '../../service-helper/createFoodAnalytics';

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
    const foodToRemoveFromFavs = selectSelectedFoodItem(state, payload[0]);
    const userId = state.user.id;

    if (state.app.networkConnected) {
      yield call(FoodApi.removeFoodIdFromFavorites, userId, payload);
      appAnalytics.sendEventWithProps(
        appAnalytics.events.REMOVE_FOOD_FROM_FAVORITES,
        createFoodAnalytics(foodToRemoveFromFavs),
      )
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
