import { put, call, select, takeLatest, all } from "redux-saga/effects";
import { createUserChangeAction } from "../../modules/user/UserActionCreator";
import { IStorage } from "../../../model/IStorage";
import { handleErrorSilently } from '../../../app/ErrorHandler';
import { batchActions } from 'redux-batched-actions';
import { getLocale, getRegion, i18nGet } from '../../../localisation/Translate';
import { FoodApi } from '../../../api/FoodApi';
import { FoodSection, createReplaceFood, createSetFoodLoadingAndError } from '../../modules/food/food';
import { getRegionGroup } from '../../../localisation/Residents';
import { appAnalytics } from '../../../app/Analytics';

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

function* run({ payload: searchString }: SearchProductsAction) {
  try {
    const state: IStorage = yield select(state => state);
    const regionGroup = getRegionGroup(getLocale(), getRegion());
    if (state.app.serverAvailable) {
      const { data, error } = yield call(FoodApi.searchProducts, searchString, regionGroup);

      if (error) throw new Error(error.message);

      yield put(createReplaceFood(FoodSection.SEARCH, data));
      appAnalytics.sendEvent(appAnalytics.events.FOOD_SEARCH);
    } else {
      alert(i18nGet('server_is_not_available_try_to_restart_app'));
    }
    // const [localDB, offDB] = yield all([
    //   call(
    //     FoodApi.searchProductsInLocalDb,
    //     FOOD_DATABASES_BY_COUNTRY_GROUP.RU,
    //     searchString
    //   ),
    //   call(FoodApi.searchOpenFoodFacts, searchString),
    // ])

    // foods = {
    //   ...dbMapper(localDB.data.foods),
    //   ...offDB.foods,
    // };
    // } else {
    // const [localDB, fsDB, offDB] = yield all([
    //   call(
    //     FoodApi.searchProductsInLocalDb,
    //     FOOD_DATABASES_BY_COUNTRY_GROUP.EN,
    //     searchString
    //   ),
    //   call(FoodApi.searchFatSecret, searchString),
    //   call(FoodApi.searchOpenFoodFacts, searchString),
    // ]);

    //   foods = {
    //     ...dbMapper(localDB.data.foods),
    //     ...fsDB.foods,
    //     ...offDB.foods,
    //   };
    // }

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
          loading: false,
          error: e,
        }),
      ])
    );
  }
}

export function* watchSearchProducts() {
  yield takeLatest(ACTION_TYPE, run);
}
