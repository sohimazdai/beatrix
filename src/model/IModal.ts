import { ChartPeriodType } from './IChart';

export interface IModal {
    type?: ModalType,
    needToShow?: boolean,

    loading?: boolean,
    error?: boolean,
}

export enum ModalType {
    CONFIRM = 'confirm',
    HINT = 'hint',
    INFO = 'info',
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

export interface IModalInfo extends IModal {
    data?: {
        type: ChartPeriodType
    }
}

export enum IModalPickerType {
    DATE = 'date',
    TIME = 'time',
}

export type IModalType = (
    IModalHint |
    IModalConfirm |
    IModalInfo
)
