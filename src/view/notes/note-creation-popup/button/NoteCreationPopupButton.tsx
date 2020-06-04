import { TouchableOpacity } from "react-native-gesture-handler";
import { View, Text, StyleSheet } from "react-native";
import { AddNoteIconV2, AddNoteIcon_WHITE } from "../../../../component/icon/AddNoteIcon";
import { shadowOptions } from "../../../../constant/ShadowOptions";
import { connect } from "react-redux";
import { createChangeInteractive } from "../../../../store/modules/interactive/interactive";
import * as React from 'react';
import { styles } from './Style';

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
            <AddNoteIcon_WHITE />
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
