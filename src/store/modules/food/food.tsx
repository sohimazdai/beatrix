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
    SET_TOTAL_SEARCh = "FOOD_SET_TOTAL_SEARCH",
}

export type FoodActionTypes = FoodChangeAction | FoodReplaceAction | FoodItemRemoveAction |
    FoodSearchTotalSetAction;

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

export interface FoodSearchTotalSetAction {
    type: FoodActionType.SET_TOTAL_SEARCh,
    payload: {
        total: number
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

export function createSetFoodSearchTotal(total: number = 0): FoodSearchTotalSetAction {
    return {
        type: FoodActionType.SET_TOTAL_SEARCh,
        payload: { total },
    };
}

export function foodReducer(
    module: IFood = {
        history: {},
        search: {},
        favorites: {},

        searchTotal: 0,

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
        case FoodActionType.SET_TOTAL_SEARCh:
            return {
                ...module,
                searchTotal: action.payload.total,
            };
        default: return module;
    }
}
