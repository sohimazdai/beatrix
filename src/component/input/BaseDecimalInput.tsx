import React from 'react';
import { TextInputProps, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

interface Props extends TextInputProps{ }

export function BaseDecimalInput(props: Props) {
    function handleChange(value) {

        if (value.includes(',')) value = value.replace(/\,/g, '.')
        if (value.includes('.')) {
            let natural = value.split('.')[0];
            let decimal = value.split('.')[1];

            if (natural.length < 3 && (!decimal || (decimal && decimal.length < 2))) {
                props.onChangeText(natural + '.' + decimal)
            }

            return;
        }

        props.onChangeText(value)
    }

    return (
        <View>
            <TextInput
                {...props}
                value={props.value || ""}
                onChangeText={handleChange}
                placeholder={props.placeholder || '0.0'}
                keyboardType={props.keyboardType || 'decimal-pad'}
                returnKeyType={props.returnKeyType || 'done'}
                autoCompleteType="off"
                contextMenuHidden={true}
            />
        </View>
    )
}
