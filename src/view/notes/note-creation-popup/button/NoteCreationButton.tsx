import * as React from 'react';
import { TouchableOpacity } from "react-native-gesture-handler";
import { View, Text } from "react-native";

import { AddNoteIcon } from "../../../../component/icon/AddNoteIcon";

import { styles } from './Style';
import { i18nGet } from '../../../../localisation/Translate';

interface Props {
    onClick: () => void;
}

export const NoteCreationButton = (props: Props) => (
    <View style={styles.addNoteButton}>
        <TouchableOpacity
            onPress={props.onClick}
            style={styles.addNoteButtonTouchable}
        >
            <Text style={styles.addNoteButtonText}>
                {i18nGet('add')}
            </Text>
            <AddNoteIcon />
        </TouchableOpacity>
    </View>
)
