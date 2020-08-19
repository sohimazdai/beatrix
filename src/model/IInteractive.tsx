import { SheduleKeyType } from "./IUserPropertiesShedule";

export interface IInteractive {
    creatingNoteMode?: boolean // TODO: remove it
    editingNoteId?: string // TODO: and it

    selectedDotId?: number
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
