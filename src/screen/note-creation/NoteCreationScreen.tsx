import React from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Slider,
    SliderComponent,
    SliderBase
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
import * as lodash from "lodash"

const sliderOptions = {
    maximumValue: 12,
    minimumValue: 0,
    step: 0.1,
    minimumTrackTintColor: '#999999'
}

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
                {this.renderSaveButton()}
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
        const { glucoseInput, breadUnitsInput, insulinInput } = this.state
        const glucoseSliderValue = glucoseInput ?
            Math.floor(parseFloat(glucoseInput)) : 0;
        const breadUnitsSliderValue = breadUnitsInput ?
            parseFloat(breadUnitsInput) : 0;
        const insulinSliderValue = insulinInput ?
            parseFloat(insulinInput) : 0;

        return (
            <View style={styles.inputBlock}>
                <View style={styles.input}>
                    <NoteInput
                        placeholder={'Глюкоза'}
                        value={this.state.glucoseInput}
                        onChangeText={(text) => this.setState({ glucoseInput: text })}
                    />
                </View>
                <View style={styles.slider}>
                    <Slider
                        value={glucoseSliderValue}
                        onValueChange={lodash.debounce((value) =>
                            this.setState({
                                glucoseInput: (Math.floor(value * 10) / 10).toString()
                            }), 50
                        )}
                        {...sliderOptions}
                    />
                </View>
                <View style={styles.input}>
                    <NoteInput
                        placeholder={'ХЕ'}
                        value={this.state.breadUnitsInput}
                        onChangeText={(text) => this.setState({ breadUnitsInput: text })}
                    />
                </View>
                <View style={styles.slider}>
                    <Slider
                        value={breadUnitsSliderValue}
                        onValueChange={lodash.debounce((value) =>
                            this.setState({
                                breadUnitsInput: (Math.floor(value * 10) / 10).toString()
                            }), 50
                        )}
                        {...sliderOptions}
                    />
                </View>
                <View style={styles.input}>
                    <NoteInput
                        placeholder={'Инсулин'}
                        value={this.state.insulinInput}
                        onChangeText={(text) => this.setState({ insulinInput: text })}
                    />
                </View>
                <View style={styles.slider}>
                    <Slider
                        value={insulinSliderValue}
                        onValueChange={lodash.debounce((value) =>
                            this.setState({
                                insulinInput: (Math.floor(value * 10) / 10).toString()
                            }), 50
                        )}
                        {...sliderOptions}
                    />
                </View>
            </View>
        )


    }

    renderSaveButton() {
        return <View style={styles.saveButton}>
            <TouchableOpacity onPress={this.createNote}>
                <Text style={styles.saveButtonText}>
                    Записать
                </Text>
            </TouchableOpacity>
        </View>
    }
}

const styles = StyleSheet.create({
    noteCreationView: {
        flex: 1,
        width: '100%',
        minHeight: '100%',

        alignItems: 'center',
        backgroundColor: "#4B5860",
    },
    inputBlock: {
        width: '100%',

        marginTop: 65,
        paddingBottom: 15,

        elevation: 2,

        shadowOffset: { width: 10, height: 10 },
        shadowColor: '#000',
        shadowRadius: 5,
        shadowOpacity: 1,

        borderRadius: 25,

        alignItems: 'center',
        backgroundColor: "#E9E6DA",
    },
    input: {
        padding: 15,
    },
    slider: {
        width: 280,
        paddingBottom: 10,
    },
    saveButton: {
        width: 150,
        height: 50,

        margin: 20,

        elevation: 2,
        shadowOffset: { width: 10, height: 10 },
        shadowColor: '#000',
        shadowRadius: 5,
        shadowOpacity: 1,

        borderRadius: 15,
        justifyContent: 'center',

        alignItems: 'center',
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
