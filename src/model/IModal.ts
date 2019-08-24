export interface IModal {
    type?: ModalType,
    needToShow?: boolean,

    loading?: boolean,
    error?: boolean,
}

export enum ModalType {
    CONFIRM = 'confirm',
    HINT = 'hint',
    IOS_DATE_PICKER = 'ios-date-picker',
}

export interface IModalHint extends IModal {
    data?: {
        questionText: string
        positiveButtonText: string
    }
}

export interface IModalConfirm extends IModal {
    data?: {
        questionText: string
        positiveButtonText: string
        negativeButtonText: string

        onPositiveClick: () => void
    }
}

export interface IModalIOsDatePicker extends IModal {
    data?: {
        date: Date
        positiveButtonText: string
        pickerType: IModalPickerType
        onPositiveClick: (value) => void
    }
}

export enum IModalPickerType {
    DATE = 'date',
    TIME = 'time',
}

export type IModalType = (
    IModalHint |
    IModalConfirm |
    IModalIOsDatePicker
)
