import { put, call, takeLatest, select } from "redux-saga/effects";
import { createUserChangeAction } from "../../modules/user/UserActionCreator";
import { IStorage } from "../../../model/IStorage";
import { handleError } from '../../../app/ErrorHandler';
import { batchActions } from 'redux-batched-actions';
import { i18nGet } from '../../../localisation/Translate';
import { FoodApi } from '../../../api/FoodApi';
import { createChangeFood, FoodSection } from '../../modules/food/food';

const ACTION_TYPE = "FETCH_PRODUCT_BY_BARCODE_ACTION";

export function createFetchProductByBarcodeAction(id: string) {
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

interface FetchProductByBarcodeAction {
  type: 'FETCH_PRODUCT_BY_BARCODE_ACTION',
  payload: string
}

function* run({ payload }: FetchProductByBarcodeAction) {
  try {
    const state: IStorage = yield select(state => state);
    const foodHistory = state.food.history;

    if (state.app.networkConnected) {
      const product = yield call(FoodApi.getOFFProductByBarcode, payload);

      if (product && product.id) {
        yield put(
          createChangeFood(
            FoodSection.HISTORY,
            {
              ...foodHistory,
              [product.id]: product
            }
          ))
      } else {
        alert(i18nGet('product_not_found'));
      }

    } else {
      alert(i18nGet('active_network_needed'))
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

export function* watchFetchProductByBarcode() {
  yield takeLatest(ACTION_TYPE, run);
}
