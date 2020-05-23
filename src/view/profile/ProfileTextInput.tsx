import React from 'react';
import { TextInput } from 'react-native-gesture-handler';

interface Props {
    onChangeText?: (text: string) => void;
    value?: string;
    placeholder?: string;
}

export function ProfileTextInput(props: Props) {
    return (
        <TextInput
            {...props}
            keyboardType={'numeric'}
            returnKeyType={'done'}
            maxLength={2}
            style={{
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
            }}
        />
    )
}
