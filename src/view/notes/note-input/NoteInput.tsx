import React from 'react'
import { TextInput } from 'react-native-gesture-handler';

interface Props {
    onChangeText: (text) => void;
    value: string;
    placeholder: string;
}

export class NoteInput extends React.PureComponent<Props> {
    render() {
        return(
            <TextInput
                {...this.props}
                style={{
                    width: 88,
                    height: 41,

                    padding: 5,

                    borderColor: '#D2a9a9',
                    borderWidth: 2,
                    borderRadius: 5,

                    backgroundColor: '#FFF8F2',
                }}
            />
        )
    }
}
