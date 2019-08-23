import React from "react";
import { connect } from "react-redux";
import { AppState } from "../../model/AppState";
import { IModal, ModalType } from "../../model/IModal";
import { ModalContentConfirm } from "./modal-content-confirm/ModalContentConfirm";
import { Modal } from "react-native";
import { Action, Dispatch } from "redux";
import { createModalChangeAction } from "../../store/modules/modal/ModalActionCreator";

interface ModalContentProps {
    modal: IModal;
    dispatch: Dispatch<Action>
}

interface ModalContentState {
    isVisible: boolean;
}

class ModalContent extends React.PureComponent<
    ModalContentProps,
    ModalContentState
    > {
    state = {
        isVisible: false
    };

    componentDidMount() {
        if (this.props.modal && this.props.modal.needToShow) {
            this.setState({
                isVisible: true
            });
        }
    }

    componentDidUpdate(prevProps: ModalContentProps) {
        if (
            (!prevProps.modal || (prevProps.modal && !prevProps.modal.needToShow)) &&
            this.props.modal && this.props.modal.needToShow
        ) {
            this.setState({
                isVisible: true
            });
        }
    }

    render() {
        return this.state.isVisible ? (
            <Modal>
                {this.modal}
            </Modal>
        ) :
            null;
    }

    get modal() {
        switch (this.props.modal.type) {
            case ModalType.CONFIRM:
                return <ModalContentConfirm
                    modal={this.props.modal}
                    onConfirmClick={this.onClose}
                />
            default:
                return null;
        }
    }

    onClose = () => {
        this.props.dispatch(createModalChangeAction({
            needToShow: false
        }))
    }
}

export const ModalContentConnect = connect(
    (state: AppState) => ({
        modal: state.modal
    }),
    dispatch => ({ dispatch })
)(ModalContent);
