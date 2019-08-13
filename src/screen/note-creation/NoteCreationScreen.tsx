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
import { INoteListNote } from '../../model/INoteList';
import { createNoteListChangeNoteByIdAction } from '../../store/modules/noteList/NoteListActionCreator';
import { NavigationScreenProp, NavigationParams } from 'react-navigation';
import { NavigationState } from 'react-navigation';
import { ThemeColor } from '../../constant/ThemeColor';
import { Hat } from '../../component/hat/Hat';

interface NoteCreationScreenProps {
    dispatch: (action: Action) => void,
    navigation: NavigationScreenProp<NavigationState, NavigationParams>
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
            <View style={styles.noteCreationView}>
                {this.renderInputs()}
                <TouchableOpacity
                    style={styles.saveButton}
                    onPress={this.createNote}
                >
                    <Text style={styles.saveButtonText}>
                        Записать
                    </Text>
                </TouchableOpacity>
                <Hat
                    title={'Новая запись'}
                    onBackPress={() => this.props.navigation.navigate('NoteList')}
                />
            </View>
        )
    }

    createNote = () => {
        let note: INoteListNote = {
            date: this.state.date.getTime(),
            glucose: this.state.glucoseInput && parseFloat(this.state.glucoseInput) || 0,
            breadUnits: this.state.breadUnitsInput && parseFloat(this.state.breadUnitsInput) || 0,
            insulin: this.state.insulinInput && parseFloat(this.state.insulinInput) || 0
        }
        this.props.dispatch(createNoteListChangeNoteByIdAction(note));
        this.props.navigation.navigate('NoteList')
    }

    renderInputs() {
        return (
            <View>
                <NoteInput
                    placeholder={'Глюкоза'}
                    value={this.state.glucoseInput}
                    onChangeText={(text) => this.setState({ glucoseInput: text })}
                />
                <NoteInput
                    placeholder={'ХЕ'}
                    value={this.state.breadUnitsInput}
                    onChangeText={(text) => this.setState({ breadUnitsInput: text })}
                />
                <NoteInput
                    placeholder={'Инсулин'}
                    value={this.state.insulinInput}
                    onChangeText={(text) => this.setState({ insulinInput: text })}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    noteCreationView: {
        flex: 1,
        width: '100%',
        minHeight: '100%',

        alignItems: 'center',
    },
    saveButton: {
        width: 150,
        height: 50,

        borderRadius: 15,

        alignItems: 'center',
        justifyContent: 'center',

        backgroundColor: ThemeColor.LIGHT_RED,
    },
    saveButtonText: {
        fontFamily: 'Roboto',
        fontSize: 16,
        color: '#666666',
    },
})

export const NoteCreationScreenConnect = connect(
    null,
    (dispatch: Dispatch<Action>) => ({ dispatch })
)(NoteCreationScreen)
