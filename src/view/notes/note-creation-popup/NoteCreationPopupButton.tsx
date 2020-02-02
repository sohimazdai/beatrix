import { TouchableOpacity } from "react-native-gesture-handler";
import { View, Text, StyleSheet } from "react-native";
import { AddNoteIcon } from "../../../component/icon/AddNoteIcon";
import { shadowOptions } from "../../../constant/shadowOptions";
import { connect } from "react-redux";
import { createChangeInteractive } from "../../../store/modules/interactive/interactive";
import * as React from 'react';

interface Props {
    openPopup: () => void;
}

const NoteCreationPopupButton = (props: Props) => (
    <View style={styles.addNoteButton}>
        <TouchableOpacity
            onPress={props.openPopup}
            style={styles.addNoteButtonTouchable}
        >
            <Text style={styles.addNoteButtonText}>
                Записать
                </Text>
            <AddNoteIcon />
        </TouchableOpacity>
    </View>
)

export const NoteCreationPopupButtonConnect = connect(
    () => ({}),
    (dispatch) => ({
        openPopup: () => {
            dispatch(createChangeInteractive({
                creatingNoteMode: true,
                editingNoteId: ""
            }))
        }
    })
)(NoteCreationPopupButton)

const styles = StyleSheet.create({
    addNoteButton: {
        padding: 5,
        margin: 5,
        paddingLeft: 10,
        paddingRight: 10,

        backgroundColor: 'rgba(250,250,250, 1)',
        borderRadius: 30,
        ...shadowOptions
    },
    addNoteButtonTouchable: {
        display: 'flex',

        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    addNoteButtonText: {
        fontSize: 18,
        color: "#333333",
        marginRight: 5
    }
})
