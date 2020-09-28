import { put, call, select, takeLatest, throttle } from "redux-saga/effects";
import { createUserChangeAction } from "../../modules/user/UserActionCreator";
import { IStorage } from "../../../model/IStorage";
import { handleErrorSilently } from '../../../app/ErrorHandler';
import { batchActions } from 'redux-batched-actions';
import { getLocale, getRegion, i18nGet } from '../../../localisation/Translate';
import { FoodApi } from '../../../api/FoodApi';
import { FoodSection, createReplaceFood, createSetFoodSearchTotal, createSetFoodLoadingAndError, createChangeFood } from '../../modules/food/food';
import { checkForIsItInRuGroup } from '../../../localisation/Residents';
import { FOOD_DATABASES_BY_COUNTRY_GROUP } from '../../../localisation/FoodDatabases';
import { dbMapper } from '../../../api/mappers/dbMapper';

const ACTION_TYPE = "SEARCH_PRODUCTS";

export function createSearchProductsAction(searchString: string) {
  return batchActions([
    createUserChangeAction({
      loading: true,
      error: null
    }),
    createSetFoodLoadingAndError({
      loading: true,
      error: null
    }),
    {
      type: ACTION_TYPE,
      payload: searchString,
    },
  ])
}

interface SearchProductsAction {
  type: 'SEARCH_PRODUCTS',
  payload: string
}

function* run({ payload }: SearchProductsAction) {
  try {
    const state: IStorage = yield select(state => state);
    const isInRussianGroup = checkForIsItInRuGroup(getLocale(), getRegion());
    if (state.app.networkConnected) {
      let res;

      if (isInRussianGroup) {
        const { data } = yield call(FoodApi.searchProductsInLocalDb, FOOD_DATABASES_BY_COUNTRY_GROUP.RU, payload);
        const dbFoods = dbMapper(data.foods);

        yield put(createReplaceFood(FoodSection.SEARCH, dbFoods));

        res = yield call(FoodApi.searchOpenFoodFacts, payload);

        yield put(createChangeFood(FoodSection.SEARCH, res.foods));
      } else {
        const { data } = yield call(FoodApi.searchProductsInLocalDb, FOOD_DATABASES_BY_COUNTRY_GROUP.EN, payload);
        const dbFoods = dbMapper(data.foods);

        yield put(createReplaceFood(FoodSection.SEARCH, dbFoods));

        res = yield call(FoodApi.searchFatSecret, payload);

        yield put(createChangeFood(FoodSection.SEARCH, res.foods));

        res = yield call(FoodApi.searchOpenFoodFacts, payload);

        yield put(createChangeFood(FoodSection.SEARCH, res.foods));
      }
    } else {
      alert(i18nGet('active_network_needed'));
    }

    yield put(
      batchActions([
        createUserChangeAction({
          loading: false,
          error: null,
        }),
        createSetFoodLoadingAndError({
          loading: false,
          error: null
        }),
      ])
    );
  } catch (e) {
    handleErrorSilently(e, 'Ошибка при поиске продуктов');
    yield put(
      batchActions([
        createUserChangeAction({
          loading: false,
          error: e,
        }),
        createSetFoodLoadingAndError({
          loading: true,
          error: null
        }),
      ])
    );
  }
}

export function* watchSearchProducts() {
  yield throttle(500, ACTION_TYPE, run);
}
