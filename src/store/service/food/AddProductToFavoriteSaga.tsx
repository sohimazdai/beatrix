import { put, call, takeLatest, select } from "redux-saga/effects";
import { createUserChangeAction } from "../../modules/user/UserActionCreator";
import { IStorage } from "../../../model/IStorage";
import { handleErrorSilently } from '../../../app/ErrorHandler';
import { batchActions } from 'redux-batched-actions';
import { FoodApi } from '../../../api/FoodApi';
import { appAnalytics } from '../../../app/Analytics';
import { selectSelectedFoodItem } from '../../../view/food/selectors/select-selected-food-item';
import { createFoodAnalytics } from '../../service-helper/createFoodAnalytics';

const type = "ADD_PRODUCT_TO_FAVORITE";

export function createAddProductToFavoriteAction(foodId: string) {
  return batchActions([
    createUserChangeAction({
      loading: true,
      error: null
    }),
    {
      type,
      foodId
    },
  ])
}

interface AddProductToFavoriteAction {
  type,
  foodId: string
}

function* run({ foodId }: AddProductToFavoriteAction) {
  try {
    const state: IStorage = yield select(state => state);
    const foodToAdd = selectSelectedFoodItem(state, foodId);
    const userId = state.user.id;

    if (state.app.networkConnected) {
      yield call(FoodApi.addFoodIdToFavorites, String(userId), String(foodId));
      appAnalytics.sendEventWithProps(
        appAnalytics.events.ADD_FOOD_TO_FAVORITES,
        createFoodAnalytics(foodToAdd),
      );
      appAnalytics.setUserProperties({ favorites: Object.values(state.food.favorites).length })
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
