import { IModal } from "../../../model/IModal";
import { ModalActionType } from "./ModalActionType";
import { ModalAction } from "./ModalAction";

export function modalReducer(
  modal: IModal = {},
  action: ModalAction
): IModal {
  switch (action.type) {
    case ModalActionType.CHANGE: {
      return {
        ...modal,
        ...action.payload.modalData
      }
    };

    default:
      return modal;
  }
}
