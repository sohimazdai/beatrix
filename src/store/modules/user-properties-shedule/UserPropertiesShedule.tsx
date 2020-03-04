import { IUserPropertiesShedule } from "../../../model/IUserPropertiesShedule";

export enum UserPropertiesSheduleActionType {
    UPLOAD = "USER_PROPERTIES_SHEDULE_UPLOAD",
    ONE_LEVEL_DEEP_MERGE = "USER_PROPERTIES_SHEDULE_ONE_LEVEL_DEEP_MERGE"
}

export type UserPropertiesSheduleActionTypes = (
    UserPropertiesSheduleChangeAction |
    UserPropertiesSheduleOneLevelDeepMergeAction
)

export interface UserPropertiesSheduleChangeAction {
    type: UserPropertiesSheduleActionType.UPLOAD,
    payload: IUserPropertiesShedule
}

export interface UserPropertiesSheduleOneLevelDeepMergeAction {
    type: UserPropertiesSheduleActionType.ONE_LEVEL_DEEP_MERGE,
    payload: IUserPropertiesShedule
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
                console.log('action.payload', action.payload)

            const newModule: IUserPropertiesShedule = Object.values(action.payload).reduce((prev, curr) => {
                console.log('prev', prev);
                console.log('curr', curr);
                return {
                    ...prev,
                    [curr.id]: {
                        ...module[curr.id],
                        ...curr
                    }
                }
            }, {})
            console.log('newModule', newModule)
            return {
                ...module,
                ...newModule
            }

        default: return module;
    }
}
