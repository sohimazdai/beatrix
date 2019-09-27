import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { ThemeColor } from '../../../constant/ThemeColor';

interface Props {
    onChangeText: (text) => void;
    value: string;
    placeholder: string;
    keyboardType: string;
}
// TODO:
export function AuthInput(props: Props) {
    return (
            <TextInput
                style={styles.input}
                onChangeText={props.onChangeText}
                value={props.value}

                returnKeyType={'done'}
            />
    )
}

const styles = StyleSheet.create({
    input: {
        width: 88,
        height: 41,

        padding: 5,
        borderRadius: 10,
        borderWidth: 2,

        textAlign: 'center',
        fontSize: 20,
        color: ThemeColor.TEXT_DARK_GRAY,

        borderColor: ThemeColor.TAN,
        backgroundColor: ThemeColor.WHITE,
    }
})