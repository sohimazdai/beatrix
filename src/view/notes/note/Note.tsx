import React from 'react';
import { INoteListNote } from '../../../model/INoteList';
import { View, StyleSheet, Text } from 'react-native';
import { ThemeColor } from '../../../constant/ThemeColor';

interface Props {
    note?: INoteListNote
    onPress?: () => void
    onLongPress?: () => void
}

export function Note(props: Props) {
    return <View
        style={styles.noteView}
    >
        <Text>
            {new Date(props.note.date).toString()}
        </Text>
        <Text>
            {props.note.glucose}
        </Text>
        <Text>
            {props.note.breadUnits}
        </Text>
        <Text>
            {props.note.insulin}
        </Text>
    </View>
}

const styles = StyleSheet.create({
    noteView: {
        width: '100%',

        backgroundColor: ThemeColor.GRAY,

    }
})
