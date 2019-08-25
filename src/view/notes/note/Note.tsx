import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { INoteListNote } from '../../../model/INoteList';

interface Props {
    note?: INoteListNote
    onPress?: () => void
    onLongPress?: () => void
}

export function Note(props: Props) {
    return <View
        style={styles.noteView}
    >
        <TouchableOpacity
            style={styles.touchableContainer}
            onPress={props.onPress}
            onLongPress={props.onLongPress}
        >
            <Text style={styles.text}>
                {getTime(new Date(props.note.date))}
            </Text>
            <Text style={styles.text}>
                {props.note.glucose}
            </Text>
            <Text style={styles.text}>
                {props.note.breadUnits}
            </Text>
            <Text style={styles.text}>
                {props.note.insulin}{props.note.longInsulin ? '/' + props.note.longInsulin : ''}
            </Text>
        </TouchableOpacity>
    </View>
}

const getTime = (date: Date) => {
    const firstItem = date.toString().split(' ')[4].split(':')[0];
    const time = date.toString().split(' ')[4].split(':')[1];
    return firstItem + ':' + time;
}

const styles = StyleSheet.create({
    noteView: {
        width: '100%',
        height: 20,

        marginBottom: 10,
    },
    touchableContainer: {
        flex: 1,
        width: '100%',
        height: 20,

        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    text: {
        width: '25%',

        textAlign: 'center',
        fontFamily: 'Roboto',
        fontSize: 16,
        lineHeight: 19,

        color: '#666666'
    }
})
