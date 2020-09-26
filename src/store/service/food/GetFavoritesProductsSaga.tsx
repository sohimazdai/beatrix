import { put, call, takeLatest, select } from "redux-saga/effects";
import { createUserChangeAction } from "../../modules/user/UserActionCreator";
import { IStorage } from "../../../model/IStorage";
import { handleErrorSilently } from '../../../app/ErrorHandler';
import { batchActions } from 'redux-batched-actions';
import { FoodApi } from '../../../api/FoodApi';
import { IFoodList } from '../../../model/IFood';
import { createChangeFood, FoodSection } from '../../modules/food/food';

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
    console.log('🤖🤖🤖🤖 favoritesInStore', favoritesInStore);
    console.log('🤖🤖🤖🤖 userId', userId);

    if (state.app.networkConnected) {
      const result = yield call(FoodApi.getFoodIdsFromFavorites, userId);
      console.log('🤖🤖🤖🤖 result from server', result);

      const favorites = result.data?.favorites || [];

      console.log('🤖🤖🤖🤖 favs from server', favorites);

      const foodIdsToSync: string[] = [];

      favorites.forEach((favoriteId) => {
        if (!favoritesInStore[favoriteId]) {
          foodIdsToSync.push(favoriteId)
        }
      });

      console.log('🤖🤖🤖🤖 foodIdsToSync', foodIdsToSync);

      const foodList: IFoodList = {};

      const favIterator = foodIdsToSync.entries();
      let foodId = favIterator.next();

      while (!foodId.done) {
        const foodIdValue = foodId.value[1]
        foodList[foodIdValue] = yield call(FoodApi.getFoodItemById, foodIdValue);
        foodId = favIterator.next();
      }

      console.log('🤖🤖🤖🤖 foodList after iterator', foodList);
      yield put(
        createChangeFood(
          FoodSection.FAVORITES,
          foodList
        )
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

export function* watchGetFavoritesProducts() {
  yield takeLatest(type, run);
}
