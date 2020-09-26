import { put, call, takeLatest, select } from "redux-saga/effects";
import { createUserChangeAction } from "../../modules/user/UserActionCreator";
import { IStorage } from "../../../model/IStorage";
import { handleError } from '../../../app/ErrorHandler';
import { batchActions } from 'redux-batched-actions';
import { i18nGet } from '../../../localisation/Translate';
import { FoodApi } from '../../../api/FoodApi';
import { IFoodListItem } from '../../../model/IFood';
import { createChangeFood } from '../../modules/food/food';
import { FoodSection } from '../../modules/food/food';

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
      const { nutrients, ...restFood } = payload;
      const foodToSaveInDb: IFoodListItem = {
        ...restFood,
        ...nutrients,
      }

      //TODO: HANDLE AUTO ADDING
      const foodToSaveLocally: IFoodListItem = {
        ...restFood,
        nutrients,
      }
      const { data: { success } } = yield call(FoodApi.addProduct, foodToSaveInDb);

      if (success) {
        if (!options?.auto) {
          yield put(createChangeFood(
            FoodSection.FAVORITES,
            { [foodToSaveLocally.id]: foodToSaveLocally }
          ));
        }
      } else {
        alert(i18nGet('food_is_not_added'))
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
    handleError(e, i18nGet('sync_error'));
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
