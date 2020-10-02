import { put, call, takeLatest, select } from "redux-saga/effects";
import { createUserChangeAction } from "../../modules/user/UserActionCreator";
import { IStorage } from "../../../model/IStorage";
import { handleErrorSilently } from '../../../app/ErrorHandler';
import { batchActions } from 'redux-batched-actions';
import { FoodApi } from '../../../api/FoodApi';
import { IFoodList } from '../../../model/IFood';
import { createChangeFood, FoodSection } from '../../modules/food/food';
import { appAnalytics } from '../../../app/Analytics';

const type = "GET_FAVORITES_PRODUCTS";

export function createGetFavoritesProductsAction() {
  return batchActions([
    createUserChangeAction({
      loading: true,
      error: null
    }),
    {
      type,
    },
  ])
}

function* run() {
  try {
    const state: IStorage = yield select(state => state);
    const favoritesInStore = state.food.favorites;
    const userId = state.user.id;

    if (state.app.networkConnected) {
      const result = yield call(FoodApi.getFoodIdsFromFavorites, userId);

      const favorites = result.data?.favorites || [];

      const foodIdsToSync: string[] = [];

      favorites.forEach((favoriteId) => {
        if (!favoritesInStore[favoriteId]) {
          foodIdsToSync.push(favoriteId)
        }
      });

      const foodList: IFoodList = {};

      const favIterator = foodIdsToSync.entries();
      let foodId = favIterator.next();

      while (!foodId.done) {
        const foodIdValue = foodId.value[1]
        foodList[foodIdValue] = yield call(FoodApi.getFoodItemById, foodIdValue);
        foodId = favIterator.next();
      }

      yield put(
        createChangeFood(
          FoodSection.FAVORITES,
          foodList
        )
      )

      appAnalytics.sendEventWithProps(
        appAnalytics.events.FOOD_FAVORITES_FETCHED,
        { favorites: Object.values(foodList).length }
      );

      appAnalytics.setUserProperties({ favorites: Object.values(foodList).length })
    }

    yield put(
      createUserChangeAction({
        loading: false,
        error: null,
      })
    );
  } catch (e) {
    handleErrorSilently(e, 'Ошибка получения продуктов под одному из favorites');
    yield put(
      createUserChangeAction({
        loading: false,
        error: e,
      })
    );
  }
}

export function* watchGetFavoritesProducts() {
  yield takeLatest(type, run);
}
