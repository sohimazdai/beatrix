import { put, call, takeLatest, select, throttle, takeLeading } from "redux-saga/effects";
import { createUserChangeAction } from "../../modules/user/UserActionCreator";
import { IStorage } from "../../../model/IStorage";
import { handleError } from '../../../app/ErrorHandler';
import { batchActions } from 'redux-batched-actions';
import { getLocale, getRegion, i18nGet } from '../../../localisation/Translate';
import { FoodApi } from '../../../api/FoodApi';
import { createChangeFood, FoodSection, createReplaceFood, createSetFoodSearchTotal } from '../../modules/food/food';
import { IFoodList } from '../../../model/IFood';
import { checkForItIsInRuGroup } from '../../../localisation/Residents';

const ACTION_TYPE = "SEARCH_PRODUCT_BY_KEY_ACTION";

export function createSearchProductByKeyAction(id: string) {
  return batchActions([
    createUserChangeAction({
      loading: true,
      error: null
    }),
    {
      type: ACTION_TYPE,
      payload: id,
    },
  ])
}

interface SearchProductByKeyAction {
  type: 'SEARCH_PRODUCT_BY_KEY_ACTION',
  payload: string
}

function* run({ payload }: SearchProductByKeyAction) {
  try {
    const state: IStorage = yield select(state => state);
    const isInRussianGroup = checkForItIsInRuGroup(getLocale(), getRegion());

    if (state.app.networkConnected) {
      let res;
      let foods = {};
      let total = 0;

      if (isInRussianGroup) { //TODO: delete reverse
        res = yield call(FoodApi.searchFatSecret, payload);
      } else {
        res = yield call(FoodApi.searchProductsByKey, payload);
      }

      foods = res.foods;
      total = res.total;

      console.log('🤖🤖🤖🤖 res', res);
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

export function* watchSearchProductByKey() {
  yield throttle(500, ACTION_TYPE, run);
}
