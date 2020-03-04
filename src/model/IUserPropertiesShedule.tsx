export enum SheduleKeyType {
    NONE = "none",
    INSULIN_SENSITIVITY_FACTOR = 'insulinSensitivityFactor',
    CARBOHYDRATE_RATIO = 'carbohydrateRatio'
}

export interface IUserPropertiesShedule {
    [id: number]: IUserPropertiesSheduleItem
}

export interface IUserPropertiesSheduleItem {
    id: number //HOUR
    carbohydrateRatio?: number
    insulinSensitivityFactor?: number
}