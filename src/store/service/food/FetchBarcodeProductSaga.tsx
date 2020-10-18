import { put, call, takeLatest, select } from "redux-saga/effects";
import { createUserChangeAction } from "../../modules/user/UserActionCreator";
import { IStorage } from "../../../model/IStorage";
import { handleErrorSilently } from '../../../app/ErrorHandler';
import { batchActions } from 'redux-batched-actions';
import { i18nGet } from '../../../localisation/Translate';
import { FoodApi } from '../../../api/FoodApi';
import { createChangeFood, FoodSection } from '../../modules/food/food';
import { appAnalytics } from '../../../app/Analytics';
import { IFoodListItem } from '../../../model/IFood';
import { createFoodAnalytics } from '../../service-helper/createFoodAnalytics';

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
      const product: IFoodListItem = yield call(FoodApi.getOFFProductByBarcode, payload);

      if (product && product.id) {
        appAnalytics.sendEventWithProps(
          appAnalytics.events.FOOD_BARCODE_GOT,
          createFoodAnalytics(product),
        );

        yield put(
          createChangeFood(
            FoodSection.HISTORY,
            {
              ...foodHistory,
              [product.id]: {
                ...product, dateAdded: new Date().getTime(),
              }
            }
          ));
      } else {
        alert(i18nGet('product_not_found'));

        throw new Error('Продукт не найден');
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
    handleErrorSilently(e, 'Ошибка чтения продукта по штрих-коду');
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
