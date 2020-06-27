import { SheduleKeyType } from "./IUserPropertiesShedule";

export interface IInteractive {
    creatingNoteMode?: boolean
    editingNoteId?: string

    selectedDotId?: string
    selectedChartPeriod?: string

    confirmPopupShown?: boolean
    confirmPopupSuccessCallback?: Function
    confirmPopupRejectCallback?: Function
    confirmPopupDescription?: string

    userPropertiesShedulePopupType?: SheduleKeyType

    isPasswordRestored?: boolean
}

export enum InteractiveUserPropertiesShedulePopupType {
    NONE = 'none',
    INSULIN_SENSITIVITY = 'insulin-sensitivity',
    CARBOHYDRATE_RATIO = 'carbohydrate-ratio'
}
