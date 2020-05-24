import React from "react";
import { connect } from "react-redux";
import { IStorage } from "../../model/IStorage";
import { IModal, ModalType, IModalConfirm } from "../../model/IModal";
import { Action, Dispatch } from "redux";
import { createModalChangeAction } from "../../store/modules/modal/ModalActionCreator";
import { ModalContentConfirm } from "./modal-content-confirm/ModalContentConfirm";
import { ModalContentIOsDatePicker } from "./modal-content-ios-date-picker/ModalContentIOsDatePicker";
import { BottomPopup } from '../popup/BottomPopup';
import { ModalContentInfo } from './modal-content-info/ModalContentInfo';

interface ModalContentProps {
    modal: IModal;
    dispatch: Dispatch<Action>
}

class ModalContent extends React.PureComponent<ModalContentProps> {
    render() {
        return (
            <BottomPopup hidden={!this.props.modal.needToShow}>
                {this.modalToShow}
            </BottomPopup>
        );
    }

    get modalToShow() {
        switch (this.props.modal.type) {
            case ModalType.INFO:
                return <ModalContentInfo
                    modal={this.props.modal}
                    onResult={() => this.onClose()}
                />
            case ModalType.CONFIRM:
                return <ModalContentConfirm
                    modal={this.props.modal}
                    onResult={() => this.onClose()}
                />
            case ModalType.IOS_DATE_PICKER:
                return <ModalContentIOsDatePicker
                    modal={this.props.modal}
                    onResult={() => this.onClose()}
                />
            default:
                return null;
        }
    }

    onClose() {
        this.props.dispatch(createModalChangeAction({
            needToShow: false
        }))
    }
}

export const ModalContentConnect = connect(
    (state: IStorage) => ({
        modal: state.modal
    }),
    dispatch => ({ dispatch })
)(ModalContent);
