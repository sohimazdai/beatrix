import { put, call, takeLatest, select } from "redux-saga/effects";
import { createUserChangeAction } from "../../modules/user/UserActionCreator";
import { IStorage } from "../../../model/IStorage";
import { handleErrorSilently } from '../../../app/ErrorHandler';
import { batchActions } from 'redux-batched-actions';
import { FoodApi } from '../../../api/FoodApi';
import { IFoodList } from '../../../model/IFood';
import { createReplaceFood, FoodSection } from '../../modules/food/food';
import { appAnalytics } from '../../../app/Analytics';
import { createChangePending } from '../../modules/pending/pending';

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
    const favoritesInStore = { ...state.food.favorites };
    const userId = state.user.id;

    if (state.app.serverAvailable) {
      const result = yield call(FoodApi.getFoodIdsFromFavorites, userId);

      const favorites = result.data.favorites || [];
      const foodList: IFoodList = {};

      const favoritesInStoreValue =
        !!favoritesInStore && Object.values(favoritesInStore)
          .map((food) => food.id)
          .filter(foodId => !favorites.find((id) => id === foodId));
      const favIterator = [
        ...favorites,
        ...favoritesInStoreValue,
      ].entries();

      let foodId = favIterator.next();

      while (!foodId.done) {
        const foodIdValue = foodId.value[1];

        if (!foodIdValue || foodIdValue === 'undefined') {
          foodId = favIterator.next();
        } else {
          const {
            data: {
              __v,
              _id,
              ...foodItem
            }
          } = yield call(FoodApi.getFoodItemById, foodIdValue);

          if (foodItem && foodItem.id) {
            foodList[foodIdValue] = {
              ...foodItem,
              dateAdded: new Date().getTime()
            };
          }

          foodId = favIterator.next();
        }
      }

      yield put(
        createReplaceFood(
          FoodSection.FAVORITES,
          foodList,
        )
      )

      appAnalytics.sendEventWithProps(
        appAnalytics.events.FOOD_FAVORITES_FETCHED,
        { favorites: Object.values(foodList).length }
      );

      appAnalytics.setUserProperties({ favorites: Object.values(foodList).length })
    } else {
      yield put(createChangePending({ favoriteFood: true }));
    }

    yield put(
      createUserChangeAction({
        loading: false,
        error: null,
      })
    );
  } catch (e) {
    handleErrorSilently(e, 'Ошибка получения продуктов по одному из favorites');
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
