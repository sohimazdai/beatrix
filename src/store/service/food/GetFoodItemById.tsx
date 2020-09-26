import { put, call, takeLatest, select } from "redux-saga/effects";
import { createUserChangeAction } from "../../modules/user/UserActionCreator";
import { IStorage } from "../../../model/IStorage";
import { handleError, handleErrorSilently } from '../../../app/ErrorHandler';
import { batchActions } from 'redux-batched-actions';
import { i18nGet } from '../../../localisation/Translate';
import { FoodApi } from '../../../api/FoodApi';
import { createChangeFood, createSetFoodLoadingAndError } from '../../modules/food/food';
import { FoodSection } from '../../modules/food/food';
import { IFoodListItem } from '../../../model/IFood';

const type = "GET_FOOD_ITEM_BY_ID";

export function createGetFoodItemByIdAction(foodId: string) {
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
      type,
      payload: foodId
    },
  ])
}

interface GetFoodItemByIdAction {
  type,
  payload: string
}

function* run({ payload }: GetFoodItemByIdAction) {
  try {
    const state: IStorage = yield select(state => state);
    if (state.app.networkConnected) {
      const foodItem: IFoodListItem | null = yield call(FoodApi.getFoodItemById, payload);

      if (!!foodItem) {
        yield put(createChangeFood(
          FoodSection.HISTORY,
          { [foodItem.id]: foodItem }
        ));
      } else {
        alert(i18nGet('food_not_found'))
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
    handleErrorSilently(e, 'Food item get error localDB');
    yield put(
      batchActions([
        createSetFoodLoadingAndError({
          loading: false,
          error: e
        }),
        createUserChangeAction({
          loading: false,
          error: e,
        })
      ])
    );
  }
}

export function* watchGetFoodItemById() {
  yield takeLatest(type, run);
}
