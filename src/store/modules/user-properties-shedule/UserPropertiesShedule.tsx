import { IUserPropertiesShedule, SheduleKeyType } from "../../../model/IUserPropertiesShedule";

export enum UserPropertiesSheduleActionType {
    UPLOAD = "USER_PROPERTIES_SHEDULE_UPLOAD",
    ONE_LEVEL_DEEP_MERGE = "USER_PROPERTIES_SHEDULE_ONE_LEVEL_DEEP_MERGE",
    CLEAR_SHEDULE_BY_KEY_TYPE = 'CLEAR_SHEDULE_BY_KEY_TYPE'
}

export type UserPropertiesSheduleActionTypes = (
    UserPropertiesSheduleChangeAction |
    UserPropertiesSheduleOneLevelDeepMergeAction |
    UserPropertiesSheduleClearSheduleByKeyTypeAction
)

export interface UserPropertiesSheduleChangeAction {
    type: UserPropertiesSheduleActionType.UPLOAD,
    payload: IUserPropertiesShedule
}

export interface UserPropertiesSheduleOneLevelDeepMergeAction {
    type: UserPropertiesSheduleActionType.ONE_LEVEL_DEEP_MERGE,
    payload: IUserPropertiesShedule
}

export interface UserPropertiesSheduleClearSheduleByKeyTypeAction {
    type: UserPropertiesSheduleActionType.CLEAR_SHEDULE_BY_KEY_TYPE,
    payload: string
}

export function createChangeUserPropertiesShedule(shedule: IUserPropertiesShedule) {
    return {
        type: UserPropertiesSheduleActionType.UPLOAD,
        payload: shedule
    }
}

export function createOneLevelMergeUserPropertiesShedule(shedule: IUserPropertiesShedule) {
    return {
        type: UserPropertiesSheduleActionType.ONE_LEVEL_DEEP_MERGE,
        payload: shedule
    }
}

export function createClearSheduleByKeyType(key: SheduleKeyType): UserPropertiesSheduleClearSheduleByKeyTypeAction {
    return {
        type: UserPropertiesSheduleActionType.CLEAR_SHEDULE_BY_KEY_TYPE,
        payload: key
    }
}

export function userPropertiesSheduleReducer(
    module: IUserPropertiesShedule = {},
    action: UserPropertiesSheduleActionTypes
): IUserPropertiesShedule {
    switch (action.type) {
        case UserPropertiesSheduleActionType.UPLOAD:
            return {
                ...module,
                ...action.payload
            }
        case UserPropertiesSheduleActionType.ONE_LEVEL_DEEP_MERGE:
            const newModule: IUserPropertiesShedule = Object.values(action.payload).reduce((prev, curr) => {
                return {
                    ...prev,
                    [curr.id]: {
                        ...module[curr.id],
                        ...curr
                    }
                }
            }, {})
            return {
                ...module,
                ...newModule
            }
        case UserPropertiesSheduleActionType.CLEAR_SHEDULE_BY_KEY_TYPE:
            const clearedModule: IUserPropertiesShedule = Object.values(module).reduce((prev, curr) => {
                delete curr[action.payload];
                return {
                    ...prev,
                    [curr.id]: {
                        ...module[curr.id],
                        ...curr
                    }
                }
            }, {})
            return clearedModule
        default: return module;
    }
}
