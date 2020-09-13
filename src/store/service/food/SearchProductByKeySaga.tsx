import { put, call, takeLatest, select, throttle, takeLeading } from "redux-saga/effects";
import { createUserChangeAction } from "../../modules/user/UserActionCreator";
import { IStorage } from "../../../model/IStorage";
import { handleError } from '../../../app/ErrorHandler';
import { batchActions } from 'redux-batched-actions';
import { i18nGet } from '../../../localisation/Translate';
import { FoodApi } from '../../../api/FoodApi';
import { createChangeFood, FoodSection, createReplaceFood } from '../../modules/food/food';
import { IFoodList } from '../../../model/IFood';

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

    if (state.app.networkConnected) {
      const products: IFoodList = yield call(FoodApi.searchProductsByKey, payload);

      yield put(
        createReplaceFood(
          FoodSection.SEARCH,
          products
        ));
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
  yield takeLatest(ACTION_TYPE, run);
}
