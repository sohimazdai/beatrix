export interface IModal {
    type?: ModalType,
    needToShow?: boolean,

    loading?: boolean,
    error?: boolean,
}

export enum ModalType {
    CONFIRM = 'confirm'
}

export interface IModalHint extends IModal {
    data?: {
        questionText: string,
        positiveButtonText: string,
    }
}

export type IModalType = (
    IModalHint
)
