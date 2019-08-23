import { INoteListNote } from "../../../model/INoteList";
import { ModalActionType } from "./ModalActionType";
import { IModalType } from "../../../model/IModal";

export interface ModalChangeAction {
    type: ModalActionType.CHANGE,
    payload: {
        modalData: IModalType
    }
}

export type ModalAction = (
    ModalChangeAction
)
