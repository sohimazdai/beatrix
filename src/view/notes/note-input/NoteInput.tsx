import React from 'react';
import { Platform } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

interface Props {
    onChangeText: (text) => void;
    value: string;
    placeholder: string;
}

export function NoteInput(props: Props) {
    return (
        <TextInput
            {...props}
            // thinking about a keyboardType
            keyboardType= {'numeric'}
            style={{
                width: 88,
                height: 41,

                padding: 5,

                borderColor: '#D2a9a9',
                borderWidth: 2,
                borderRadius: 5,

                backgroundColor: '#FFFFFF',
            }}
        />
    )
}
