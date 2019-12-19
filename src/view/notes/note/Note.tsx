import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { INoteListNote } from '../../../model/INoteList';
import { ThemeColor } from '../../../constant/ThemeColor';
import { shadowOptions } from '../../../constant/shadowOptions';

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
        >
            <Text style={styles.text}>
                {getTime(new Date(props.note.date))}
            </Text>
        </TouchableOpacity>
        <Text style={styles.text}>
            {props.note.glucose || '-'}
        </Text>
        <Text style={styles.text}>
            {props.note.breadUnits || '-'}
        </Text>
        <Text style={styles.text}>
            {props.note.insulin || '-'}
        </Text>
        <Text style={styles.text}>
            {props.note.longInsulin || '-'}
        </Text>
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
        height: 30,

        display: 'flex',
        marginTop: 5,
        marginBottom: 5,

        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    touchableContainer: {
        flex: 1,
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 10,
        ...shadowOptions
    },
    text: {
        flex: 1,

        justifyContent: 'center',
        alignItems: 'center',

        textAlign: 'center',
        fontFamily: 'Roboto',
        fontSize: 18,
        lineHeight: 21,

        color: '#333',
    }
})
