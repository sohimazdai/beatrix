export interface IInteractive  {
    creatingNoteMode?: boolean
    editingNoteId?: string

    confirmPopupShown?: boolean
    confirmPopupSuccessCallback?: Function
    confirmPopupRejectCallback?: Function
    confirmPopupDescription?: string

    userPropertiesShedulePopupType?: InteractiveUserPropertiesShedulePopupType
}

export enum InteractiveUserPropertiesShedulePopupType {
    NONE = 'none',
    INSULIN_SENSITIVITY = 'insulin-sensitivity',
    CARBOHYDRATE_RATIO = 'carbohydrate-ratio'
}