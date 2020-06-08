export enum ShortInsulinType {
    SHORT = 'short',
    ULTRA_SHORT = 'ultra-short'
}

export enum GlycemiaMeasuringType {
    MG_DL = 'mg/dL',
    MMOL_L = 'mmol/L'
};

export enum CarbsMeasuringType {
    BREAD_UNITS = 'breadUnits',
    CARBOHYDRATES = 'carbohydrates',
}; 

export enum CarbsUnitWeightType {
    TEN = 10,
    ELEVEN = 11,
    TWELVE = 12,
}; 

export interface IUserDiabetesPropertiesDayTimeValue {
    id?: number,
    since?: number,
    to?: number,
    value?: number,
    needToSave?: boolean,
    error?: string
}

export interface IUserDiabetesProperties {
    targetGlycemia?: number;
    shortInsulinType?: ShortInsulinType
    glycemiaMeasuringType?: GlycemiaMeasuringType
    carbsMeasuringType?: CarbsMeasuringType
    carbsUnitWeightType?: CarbsUnitWeightType
}
