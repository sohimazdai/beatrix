import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { INoteListNote } from '../../../../model/INoteList';
import { SHADOW_OPTIONS } from '../../../../constant/ShadowOptions';
import { COLOR } from '../../../../constant/Color';

interface Props {
    note: INoteListNote
    onPress?: () => void
}

export function Note(props: Props) {
    const { commentary } = props.note;

    const displayingComment = commentary?.length > 100
        ? `${commentary.slice(0, 100)}...`.trim()
        : commentary.trim();

    return (
        <TouchableOpacity
            style={styles.touchableContainer}
            onPress={props.onPress}
        >
            <View
                style={styles.generals}
            >
                <Text style={styles.text}>
                    {getTime(new Date(props.note.date))}
                </Text>
                <Text style={styles.text}>
                    {props.note.glucose || '-'}
                </Text>
                <Text style={styles.text}>
                    {(props.note.breadUnits) || '-'}
                </Text>
                <Text style={styles.text}>
                    {props.note.insulin || '-'}
                </Text>
                <Text style={styles.text}>
                    {props.note.longInsulin || '-'}
                </Text>
            </View>
            {!!commentary && (
                <Text style={styles.comment}>
                    {displayingComment}
                </Text>
            )}
        </TouchableOpacity>
    );
}

const getTime = (date: Date) => {
    const firstItem = date.getHours() >= 10 ? '' + date.getHours() : '0' + date.getHours();
    const time = date.getMinutes() >= 10 ? '' + date.getMinutes() : "0" + date.getMinutes();
    return firstItem + ':' + time;
}

const styles = StyleSheet.create({
    touchableContainer: {
        flex: 1,
        marginTop: 8,
        height: '100%',
        flexDirection: 'column',
        backgroundColor: COLOR.WHITE,
        borderRadius: 10,
        ...SHADOW_OPTIONS,
    },
    generals: {
        width: '100%',
        height: 30,

        display: 'flex',
        marginTop: 5,
        marginBottom: 5,

        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
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
    },
    comment: {
        paddingHorizontal: 20,
        paddingBottom: 12,
        fontSize: 15,
    },
})
