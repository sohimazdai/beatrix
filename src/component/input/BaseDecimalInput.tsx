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

        let natural = Number(value) || '0';

        props.onChangeText(natural + '.0')
    }
    return (
        <View>
            <TextInput
                {...props}
                value={props.value || '0.0'}
                onChangeText={(value) => handleChange(value)}
                placeholder={props.placeholder || '0.0'}
                keyboardType={props.keyboardType || 'numeric'}
                returnKeyType={props.returnKeyType || 'done'}
            />
        </View>
    )
}
