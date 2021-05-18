import { put, call, select, takeLatest } from "redux-saga/effects";
import { createUserChangeAction } from "../../modules/user/UserActionCreator";
import { IStorage } from "../../../model/IStorage";
import { handleErrorSilently } from '../../../app/ErrorHandler';
import { batchActions } from 'redux-batched-actions';
import { getLocale, getRegion } from '../../../localisation/Translate';
import { FoodApi } from '../../../api/FoodApi';
import { FoodSection, createReplaceFood, createSetFoodLoadingAndError } from '../../modules/food/food';
import { getRegionGroup } from '../../../localisation/Residents';
import { appAnalytics } from '../../../app/Analytics';
import searchOpenFoodFacts from '../../../api/SearchOFF';
import { IFoodList } from '../../../model/IFood';

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
  ]);
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
      const oFFData: IFoodList = yield call(searchOpenFoodFacts, searchString);
      const { data, error } = yield call(FoodApi.searchProducts, searchString, regionGroup);

      if (error) throw new Error(error.message);

      yield put(createReplaceFood(FoodSection.SEARCH, { ...data, ...oFFData }));
      appAnalytics.sendEvent(appAnalytics.events.FOOD_SEARCH);
    } else {
      const oFFData: IFoodList = yield call(searchOpenFoodFacts, searchString);
      yield put(createReplaceFood(FoodSection.SEARCH, oFFData));
      appAnalytics.sendEvent(appAnalytics.events.FOOD_SEARCH_WITHOUT_SERVER);
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
