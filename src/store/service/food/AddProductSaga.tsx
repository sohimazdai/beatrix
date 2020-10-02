import { put, call, takeLatest, select } from "redux-saga/effects";
import { createUserChangeAction } from "../../modules/user/UserActionCreator";
import { IStorage } from "../../../model/IStorage";
import { handleErrorSilently } from '../../../app/ErrorHandler';
import { batchActions } from 'redux-batched-actions';
import { i18nGet } from '../../../localisation/Translate';
import { FoodApi } from '../../../api/FoodApi';
import { IFoodListItem } from '../../../model/IFood';
import { createChangeFood } from '../../modules/food/food';
import { FoodSection } from '../../modules/food/food';
import { appAnalytics } from '../../../app/Analytics';
import { createFoodAnalytics } from '../../service-helper/createFoodAnalytics';

const ACTION_TYPE = "ADD_PRODUCT_TO_DB";

export function createAddProductAction(foodItem: IFoodListItem, options?: Options) {
  return batchActions([
    createUserChangeAction({
      loading: true,
      error: null
    }),
    {
      type: ACTION_TYPE,
      payload: foodItem,
      options
    },
  ])
}

interface Options {
  auto: boolean
}

interface AddProductAction {
  type: 'ADD_PRODUCT_TO_DB',
  payload: IFoodListItem
  options: Options
}

function* run({ payload, options }: AddProductAction) {
  try {
    const state: IStorage = yield select(state => state);
    if (state.app.networkConnected) {
      const { data: { success } } = yield call(FoodApi.addProduct, payload);

      const { _v, _id, ...food } = payload as any;

      if (success) {
        if (!options?.auto) {
          yield put(createChangeFood(
            FoodSection.FAVORITES,
            { [food.id]: food }
          ));
          appAnalytics.sendEventWithProps(
            appAnalytics.events.ADD_FOOD_HANDLY,
            createFoodAnalytics(payload),
          );
        }
        appAnalytics.sendEventWithProps(
          appAnalytics.events.ADD_FOOD_AUTO,
          createFoodAnalytics(payload),
        );
      } else {
        if (!options?.auto) {
          alert(i18nGet('food_is_not_added'));
          throw new Error(i18nGet('food_is_not_added'))
        }
      }
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
    handleErrorSilently(e, 'Ошибка добавления продукта в ДБ');
    yield put(
      createUserChangeAction({
        loading: false,
        error: e,
      })
    );
  }
}

export function* watchAddProduct() {
  yield takeLatest(ACTION_TYPE, run);
}
