import React from "react";
import { connect } from "react-redux";
import { IStorage } from "../../model/IStorage";
import { IModal, ModalType } from "../../model/IModal";
import { Action, Dispatch } from "redux";
import { createModalChangeAction } from "../../store/modules/modal/ModalActionCreator";
import { ModalContentConfirm } from "./modal-content-confirm/ModalContentConfirm";
import { SuperPopup, PopupDirection } from '../popup/SuperPopup';
import { ModalContentInfo } from './modal-content-info/ModalContentInfo';
import { ModalContentHint } from './modal-content-hint/ModalContentHint';

interface ModalContentProps {
    modal: IModal;
    dispatch: Dispatch<Action>
}

class ModalContent extends React.PureComponent<ModalContentProps> {
    render() {
        return (
            <SuperPopup
                hidden={!this.props.modal.needToShow}
                direction={PopupDirection.BOTTOM_TOP}
            >
                {this.modalToShow}
            </SuperPopup>
        );
    }

    get modalToShow() {
        switch (this.props.modal.type) {
            case ModalType.INFO:
                return <ModalContentInfo
                    modal={this.props.modal}
                    onResult={() => this.onClose()}
                />
            case ModalType.HINT:
                return <ModalContentHint
                    modal={this.props.modal}
                    onResult={() => this.onClose()}
                />
            case ModalType.CONFIRM:
                return <ModalContentConfirm
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
