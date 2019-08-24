import React from "react";
import { connect } from "react-redux";
import { AppState } from "../../model/AppState";
import { IModal, ModalType, IModalConfirm } from "../../model/IModal";
import { ModalContentHint } from "./modal-content-hint/ModalContentHint";
import { View, StyleSheet } from "react-native";
import { Action, Dispatch } from "redux";
import { createModalChangeAction } from "../../store/modules/modal/ModalActionCreator";
import { ModalContentConfirm } from "./modal-content-confirm/ModalContentConfirm";
import { ModalContentIOsDatePicker } from "./modal-content-ios-date-picker/ModalContentIOsDatePicker";

interface ModalContentProps {
    modal: IModal;
    dispatch: Dispatch<Action>
}

class ModalContent extends React.PureComponent<ModalContentProps> {
    render() {
        return this.props.modal && this.props.modal.needToShow ? (
            <View style={styles.modalContentView}>
                {this.modalToShow}
            </View>
        ) :
            null;
    }

    get modalToShow() {
        switch (this.props.modal.type) {
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
    (state: AppState) => ({
        modal: state.modal
    }),
    dispatch => ({ dispatch })
)(ModalContent);

const styles = StyleSheet.create({
    modalContentView: {
        position: 'absolute',
        top: 0,
        left: 0,
        flex: 1,
        height: '100%',
        width: '100%',

        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    }
})
