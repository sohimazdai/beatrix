import React from 'react';
import { StyleSheet, KeyboardAvoidingView } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

interface Props {
    onChangeText: (text: string) => void;
    value: string;
}



export function BaseDecimalInput(props: Props) {

    function handleChange(value) {
        if (value.includes(',')) value = value.replace(/\,/g, '.')
        if (value.includes('.')) {
            value.split('.')[0].length < 3 &&
                (!value.split('.')[1] || (value.split('.')[1] && value.split('.')[1].length < 2)) &&
                props.onChangeText(value)
        }
    }
    return (
        <KeyboardAvoidingView>
            <TextInput
                style={styles.inputView}
                onChangeText={(value) => handleChange(value)}
                placeholder={'0.0'}
                keyboardType={'numeric'}
                returnKeyType={'done'}
            />
        </KeyboardAvoidingView>
    )
}


const styles = StyleSheet.create({
    inputView: {
        display: 'flex',

        textAlign: 'center',

        width: 50,
        height: 30,

        padding: 5,

        borderRadius: 5,

        backgroundColor: '#FFFFFF',
        fontSize: 16,
        borderColor: "#cecece",
        borderWidth: 1,
    }
})
