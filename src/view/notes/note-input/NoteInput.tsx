import React from 'react';
import { Platform, KeyboardAvoidingView } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

interface Props {
    onChangeText: (text) => void;
    value: string;
    placeholder: string;
}

export function NoteInput(props: Props) {
    return (
        <KeyboardAvoidingView behavior="padding">
            <TextInput
                {...props}
                keyboardType={'numeric'}
                returnKeyType={'done'}
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
        </KeyboardAvoidingView>
    )
}
