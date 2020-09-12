import { IFood, IFoodList } from "../../../model/IFood";

export enum FoodSection {
    FAVORITES = 'favorites',
    HISTORY = 'history',
    SEARCH = 'search',
}

export enum FoodActionType {
    CHANGE = "FOOD_CHANGE",
    REPLACE = "FOOD_REPLACE",
    REMOVE_ITEM = "FOOD_ITEM_REMOVE",
}

export type FoodActionTypes = FoodChangeAction | FoodReplaceAction | FoodItemRemoveAction;

export interface FoodChangeAction {
    type: FoodActionType.CHANGE,
    payload: {
        section: FoodSection,
        foodList: IFoodList,
    },
}

export interface FoodReplaceAction {
    type: FoodActionType.REPLACE,
    payload: {
        section: FoodSection,
        foodList: IFoodList,
    },
}

export interface FoodItemRemoveAction {
    type: FoodActionType.REMOVE_ITEM,
    payload: {
        section: FoodSection,
        foodId: string,
    },
}

export function createChangeFood(section: FoodSection, foodList: IFoodList): FoodChangeAction {
    return {
        type: FoodActionType.CHANGE,
        payload: { section, foodList },
    };
}

export function createReplaceFood(section: FoodSection, foodList: IFoodList): FoodReplaceAction {
    return {
        type: FoodActionType.REPLACE,
        payload: { section, foodList },
    };
}

export function createRemoveFoodItem(section: FoodSection, foodId: string): FoodItemRemoveAction {
    return {
        type: FoodActionType.REMOVE_ITEM,
        payload: { section, foodId },
    };
}

export function foodReducer(
    module: IFood = {
        history: {},
        search: {},
        favorites: {},

        loading: false,
        error: null,
    },
    action: FoodActionTypes
): IFood {
    switch (action.type) {
        case FoodActionType.CHANGE:
            return {
                ...module,
                [action.payload.section]: {
                    ...module[action.payload.section],
                    ...action.payload.foodList,
                },
            };
        case FoodActionType.REPLACE:
            return {
                ...module,
                [action.payload.section]: action.payload.foodList,
            }
        case FoodActionType.REMOVE_ITEM:
            const newList = { ...module[action.payload.section] };

            delete newList[action.payload.foodId];

            return {
                ...module,
                [action.payload.section]: newList
            };
        default: return module;
    }
}
