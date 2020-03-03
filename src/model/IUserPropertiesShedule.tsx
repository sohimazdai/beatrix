export interface IUserPropertiesShedule {
    [id: number]: IUserPropertiesSheduleItem
}

export interface IUserPropertiesSheduleItem {
    id: number //HOUR
    carbohydrateRatio?: number
    insulinSensitivityFactor?: number
}