import { IModalType, ModalType } from "../../../model/IModal";
import { ModalActionType } from "./ModalActionType";
import { ModalChangeAction } from "./ModalAction";

export function createModalChangeAction(modalData: IModalType): ModalChangeAction {
    return {
        type: ModalActionType.CHANGE,
        payload: {
            modalData
        }
    }
}
