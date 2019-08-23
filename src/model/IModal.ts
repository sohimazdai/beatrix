export interface IModal {
    type?: ModalType,
    needToShow?: boolean,

    loading?: boolean,
    error?: boolean,
}

export enum ModalType {
    CONFIRM = 'confirm'
}

export interface IModalConfirm extends IModal {
    data?: {
        questionText: string,
        confirmButtonText: string,
    }
}

export type IModalType = (
    IModalConfirm
)
