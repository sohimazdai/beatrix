import { ChartPeriodType } from './IChart';
import { SheduleKeyType } from "./IUserPropertiesShedule";

export enum ThemeType {
    DARK = 'dark',
    LIGHT = 'light',
}

export interface IInteractive {
    creatingNoteMode?: boolean // TODO: remove it
    editingNoteId?: string // TODO: and it

    selectedDotId?: number
    selectedChartPeriod?: ChartPeriodType

    confirmPopupShown?: boolean
    confirmPopupSuccessCallback?: Function
    confirmPopupRejectCallback?: Function
    confirmPopupDescription?: string

    userPropertiesShedulePopupType?: SheduleKeyType

    isPasswordRestored?: boolean

    cardFoodId?: string
}

export enum InteractiveUserPropertiesShedulePopupType {
    NONE = 'none',
    INSULIN_SENSITIVITY = 'insulin-sensitivity',
    CARBOHYDRATE_RATIO = 'carbohydrate-ratio'
}
