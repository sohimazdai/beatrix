import { TouchableOpacity } from "react-native-gesture-handler";
import { View, Text } from "react-native";
import { AddNoteIcon_WHITE } from "../../../../component/icon/AddNoteIcon";
import { connect } from "react-redux";
import { createChangeInteractive } from "../../../../store/modules/interactive/interactive";
import * as React from 'react';
import { styles } from './Style';
import { i18nGet } from '../../../../localisation/Translate';

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
                {i18nGet('add')}
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
                editingNoteId: "",
            }))
        }
    })
)(NoteCreationPopupButton)
