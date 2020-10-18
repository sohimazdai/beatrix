import { put, call, takeLatest, select } from "redux-saga/effects";
import { createUserChangeAction } from "../../modules/user/UserActionCreator";
import { IStorage } from "../../../model/IStorage";
import { handleErrorSilently } from '../../../app/ErrorHandler';
import { batchActions } from 'redux-batched-actions';
import { i18nGet } from '../../../localisation/Translate';
import { FoodApi } from '../../../api/FoodApi';
import { createChangeFood, createSetFoodLoadingAndError } from '../../modules/food/food';
import { FoodSection } from '../../modules/food/food';
import { IFoodListItem } from '../../../model/IFood';
import { appAnalytics } from '../../../app/Analytics';
import { createFoodAnalytics } from '../../service-helper/createFoodAnalytics';

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
      foodId
    },
  ])
}

interface GetFoodItemByIdAction {
  type,
  foodId: string
}

function* run({ foodId }: GetFoodItemByIdAction) {
  try {
    const state: IStorage = yield select(state => state);

    if (state.app.networkConnected) {
      const foodItem: IFoodListItem | null | any = yield call(FoodApi.getFoodItemById, foodId);

      if (!foodItem.error) {
        yield put(createChangeFood(
          FoodSection.HISTORY,
          { [foodItem.id]: { ...foodItem, dateAdded: new Date().getTime() } }
        ));
        appAnalytics.sendEventWithProps(
          appAnalytics.events.FOOD_GOT_BY_ID,
          createFoodAnalytics(foodItem),
        )
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
    handleErrorSilently(e, 'Ошибка запроса на продукт из ДБ');
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
