export interface IModal {
    type?: ModalType,
    needToShow?: boolean,

    loading?: boolean,
    error?: boolean,
}

export enum ModalType {
    CONFIRM = 'confirm',
    HINT = 'hint'
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

export type IModalType = (
    IModalHint
)
