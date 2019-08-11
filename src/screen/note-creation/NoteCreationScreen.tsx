import React from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import { Dispatch, Action } from 'redux';
import { NoteInput } from '../../view/notes/note-input/NoteInput';

interface NoteCreationScreenProps {
    dispatch: (action: Action) => void
}

interface NoteCreationScreenState {
    date: Date
    glucoseInput: string
    breadUnitsInput: string
    insulinInput: string
}

class NoteCreationScreen extends React.Component<NoteCreationScreenProps, NoteCreationScreenState>{
    state = {
        date: new Date(),
        glucoseInput: "",
        breadUnitsInput: "",
        insulinInput: ""
    }
    render() {
        return (
            <View>
                {this.renderInputs()}
                <TouchableOpacity
                    style={styles.saveButton}
                    onPress={() => this.createNote}
                >
                    <Text style={styles.saveButtonText}>
                        Записать
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }

    createNote = () => {

    }

    renderInputs() {
        return [
            <NoteInput
                placeholder={'Глюкоза'}
                value={this.state.glucoseInput}
                onChangeText={(text) => this.setState({glucoseInput: text})}
            />,
            <NoteInput
                placeholder={'ХЕ'}
                value={this.state.breadUnitsInput}
                onChangeText={(text) => this.setState({breadUnitsInput: text})}
            />,
            <NoteInput
                placeholder={'Инсулин'}
                value={this.state.insulinInput}
                onChangeText={(text) => this.setState({insulinInput: text})}
            />
        ]
    }
}

const styles = StyleSheet.create({
    saveButton: {
        width: 150,
        height: 50,

        borderRadius: 15,

        alignItems: 'center',
        justifyContent: 'center',

        backgroundColor: '#FFB4B4',
    },
    saveButtonText: {
        fontFamily: 'Roboto',
        fontSize: 16,
        color: '#666666',
    }
})

export const NoteCreationScreenConnect = connect(
    null,
    (dispatch: Dispatch<Action>) => ({ dispatch })
)(NoteCreationScreen)
