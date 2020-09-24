import { put, call, takeLatest, select, throttle, takeLeading } from "redux-saga/effects";
import { createUserChangeAction } from "../../modules/user/UserActionCreator";
import { IStorage } from "../../../model/IStorage";
import { handleError } from '../../../app/ErrorHandler';
import { batchActions } from 'redux-batched-actions';
import { getLocale, getRegion, i18nGet } from '../../../localisation/Translate';
import { FoodApi } from '../../../api/FoodApi';
import { FoodSection, createReplaceFood, createSetFoodSearchTotal } from '../../modules/food/food';
import { checkForIsItInRuGroup } from '../../../localisation/Residents';
import { FOOD_DATABASES_BY_COUNTRY_GROUP } from '../../../localisation/FoodDatabases';
import { foodDatabaseMapper } from '../../../api/mappers/foodDatabaseMapper';

const ACTION_TYPE = "SEARCH_PRODUCTS";

export function createSearchProductsAction(searchString: string) {
  return batchActions([
    createUserChangeAction({
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
      let foods = {};
      let total = 0;

      if (isInRussianGroup) {
        const { data } = yield call(FoodApi.searchProductsInLocalDb, FOOD_DATABASES_BY_COUNTRY_GROUP.RU, payload);

        const dbFoods = foodDatabaseMapper(data.foods);

        foods = {
          ...foods,
          ...dbFoods
        };
        total += data.total;

        res = yield call(FoodApi.searchOpenFoodFacts, payload);

        foods = {
          ...foods,
          ...res.foods
        };
        total += res.total;
      } else {
        const { data } = yield call(FoodApi.searchProductsInLocalDb, FOOD_DATABASES_BY_COUNTRY_GROUP.EN, payload);

        const dbFoods = foodDatabaseMapper(data.foods);

        foods = {
          ...foods,
          ...dbFoods
        };
        total += data.total;

        res = yield call(FoodApi.searchFatSecret, payload);

        foods = {
          ...foods,
          ...res.foods
        };
        total += res.total;

        res = yield call(FoodApi.searchOpenFoodFacts, payload);

        foods = {
          ...foods,
          ...res.foods
        };
        total += res.total;
      }

      yield put(createSetFoodSearchTotal(total));
      yield put(createReplaceFood(FoodSection.SEARCH, foods));
    } else {
      alert(i18nGet('active_network_needed'));
    }

    yield put(
      createUserChangeAction({
        loading: false,
        error: null,
      })
    );
  } catch (e) {
    handleError(e, i18nGet('sync_error'));
    yield put(
      createUserChangeAction({
        loading: false,
        error: e,
      })
    );
  }
}

export function* watchSearchProducts() {
  yield takeLatest(ACTION_TYPE, run);
}
