import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Slider,
    DatePickerAndroid,
    Platform,
    ScrollView,
    DatePickerIOS,
    KeyboardAvoidingView,
} from 'react-native';
import { connect } from 'react-redux';
import { Dispatch, Action } from 'redux';
import { INoteListNote } from '../../model/INoteList';
import { createNoteListChangeNoteByIdAction } from '../../store/modules/noteList/NoteListActionCreator';
import { NavigationScreenProp, NavigationParams, NavigationState } from 'react-navigation';
import { ThemeColor } from '../../constant/ThemeColor';
import { Hat } from '../../component/hat/Hat';
import * as lodash from "lodash";
import { shadowOptions } from '../../constant/shadowOptions';
import { NoteInputWithSlider } from '../../view/notes/note-input/NoteInputWithSlider';
import { createModalChangeAction } from '../../store/modules/modal/ModalActionCreator';
import { ModalType } from '../../model/IModal';
import { NoteDatePickerConnect } from '../../view/notes/note-date-picker/NoteDatePicker';
import { NoteTimePickerConnect } from '../../view/notes/note-date-picker/NoteTimePicker';

enum InputType {
    GLUCOSE = 'Глюкоза',
    BREAD_UNITS = 'ХЕ',
    INSULIN = 'Длинный',
    LONG_INSULIN = 'Короткий'
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
    longInsulinInput: string
}

interface FullState extends NoteCreationScreenState { }

class NoteCreationScreen extends React.PureComponent<NoteCreationScreenProps, FullState>{
    state = {
        date: new Date(),
        glucoseInput: "0.0",
        breadUnitsInput: "0.0",
        insulinInput: "0.0",
        longInsulinInput: "0.0",
    }

    render() {
        return (
            <KeyboardAvoidingView
                style={styles.noteCreationView}
                behavior='padding'
            >
                <ScrollView style={styles.scrollView}>
                    <View style={styles.scrollViewContent}>
                        {this.renderInputBlock()}
                        {this.renderSaveButton()}
                    </View>
                </ScrollView>
                <Hat
                    title={'Новая запись'}
                    onBackPress={() => this.props.navigation.navigate('NoteList')}
                />
            </KeyboardAvoidingView>
        )
    }

    renderInputBlock() {
        const { glucoseInput, breadUnitsInput, insulinInput, longInsulinInput } = this.state;
        return (
            <View style={styles.inputBlock}>
                <View style={styles.pickers}>
                    <NoteDatePickerConnect
                        date={this.state.date}
                        onChange={(value) => this.setState({
                            date: new Date(
                                value.getFullYear(),
                                value.getMonth(),
                                value.getDate(),
                                this.state.date.getHours(),
                                this.state.date.getMinutes(),
                            )
                        })}
                    />
                    <NoteTimePickerConnect
                        date={this.state.date}
                        onChange={(value) => this.setState({ date: value })}
                    />
                </View>
                <View style={styles.inputView}>
                    <NoteInputWithSlider
                        inputTitle={InputType.GLUCOSE}
                        value={this.state.glucoseInput}
                        maximumNum={'15'}
                        onChangeText={(value) =>
                            this.setState({ glucoseInput: value })
                        }
                        onNaturalSlide={lodash.debounce((value) =>
                            this.setState({
                                glucoseInput: value + '.' + glucoseInput.split('.')[1]
                            }), 50
                        )}
                        onDecimalSlide={lodash.debounce((value) =>
                            this.setState({
                                glucoseInput:
                                    glucoseInput.split('.')[0] + '.' +
                                    value.toString().split('.')[1]
                            }), 50
                        )}
                    />
                </View>
                <View style={styles.inputView}>
                    <NoteInputWithSlider
                        inputTitle={InputType.BREAD_UNITS}
                        value={this.state.breadUnitsInput}
                        maximumNum={'12'}
                        onChangeText={(value) =>
                            this.setState({ breadUnitsInput: value })
                        }
                        onNaturalSlide={lodash.debounce((value) =>
                            this.setState({
                                breadUnitsInput: value + '.' + breadUnitsInput.split('.')[1]
                            }), 50
                        )}
                        onDecimalSlide={lodash.debounce((value) =>
                            this.setState({
                                breadUnitsInput:
                                    breadUnitsInput.split('.')[0] + '.' +
                                    value.toString().split('.')[1]
                            }), 50
                        )}
                    />
                </View>
                <View style={styles.inputView}>
                    <NoteInputWithSlider
                        inputTitle={InputType.LONG_INSULIN}
                        value={this.state.insulinInput}
                        maximumNum={'15'}
                        onChangeText={(value) =>
                            this.setState({ insulinInput: value })
                        }
                        onNaturalSlide={lodash.debounce((value) =>
                            this.setState({
                                insulinInput: value + '.' + insulinInput.split('.')[1]
                            }), 50
                        )}
                        onDecimalSlide={lodash.debounce((value) =>
                            this.setState({
                                insulinInput:
                                    insulinInput.split('.')[0] + '.' +
                                    value.toString().split('.')[1]
                            }), 50
                        )}
                    />
                </View>
                <View style={styles.inputView}>
                    <NoteInputWithSlider
                        inputTitle={InputType.INSULIN}
                        value={this.state.longInsulinInput}
                        maximumNum={'25'}
                        onChangeText={(value) =>
                            this.setState({ longInsulinInput: value })
                        }
                        onNaturalSlide={lodash.debounce((value) =>
                            this.setState({
                                longInsulinInput: value + '.' + longInsulinInput.split('.')[1]
                            }), 50
                        )}
                        onDecimalSlide={lodash.debounce((value) =>
                            this.setState({
                                longInsulinInput:
                                    longInsulinInput.split('.')[0] + '.' +
                                    value.toString().split('.')[1]
                            }), 50
                        )}
                    />
                </View>
            </View>
        )
    }

    renderSaveButton() {
        return (
            <TouchableOpacity
                style={styles.saveButtonTouchable}
                onPress={this.createNote}
            >
                <Text style={styles.saveButtonText}>
                    Записать
                </Text>
            </TouchableOpacity>
        )
    }

    createNote = () => {
        let { glucoseInput, breadUnitsInput, insulinInput, longInsulinInput } = this.state;
        glucoseInput = glucoseInput.includes(',') ? glucoseInput.replace(/,/g, '.') : glucoseInput;
        breadUnitsInput = breadUnitsInput.includes(',') ? breadUnitsInput.replace(/,/g, '.') : breadUnitsInput;
        insulinInput = insulinInput.includes(',') ? insulinInput.replace(/,/g, '.') : insulinInput;
        longInsulinInput = longInsulinInput.includes(',') ? longInsulinInput.replace(/,/g, '.') : longInsulinInput;

        let note: INoteListNote = {
            date: this.state.date.getTime(),
            glucose: glucoseInput && parseFloat(glucoseInput) || 0,
            breadUnits: breadUnitsInput && parseFloat(breadUnitsInput) || 0,
            insulin: insulinInput && parseFloat(insulinInput) || 0,
            longInsulin: longInsulinInput && parseFloat(longInsulinInput) || 0
        }
        if (note.glucose || note.breadUnits || note.insulin || note.longInsulin) {
            this.props.dispatch(createNoteListChangeNoteByIdAction(note));
            this.props.navigation.navigate('NoteList')
        } else {
            this.props.dispatch(createModalChangeAction({
                type: ModalType.HINT,
                needToShow: true,
                data: {
                    questionText: 'Введите хотя бы один параметр',
                    positiveButtonText: 'ОК',
                },
            }))
        }
    }
}

const styles = StyleSheet.create({
    noteCreationView: {
        flex: 1,
        width: '100%',
        height: '100%',

        paddingTop: 30,

        backgroundColor: "#4B5860",
    },

    scrollView: {
        flex: 1,
        width: '100%',
        height: '100%',
    },

    scrollViewContent: {
        flex: 1,
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        alignItems: 'center',
    },

    inputBlock: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        marginTop: 30,
        marginVertical: 20,
        paddingTop: 31,
        paddingBottom: 15,

        elevation: 2,

        ...shadowOptions,

        borderRadius: 25,

        alignItems: 'center',
        backgroundColor: "#FFF8F2",
    },
    pickers: {
        flex: 1,
        height: 25,
        width: '80%',

        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textInDatePickerIOS: {
        textAlign: 'center',
    },
    inputView: {
        flex: 1,
        margin: 15,
        marginRight: 10,
    },
    saveButtonTouchable: {
        flex: 1,

        width: 150,
        height: 50,

        marginVertical: 20,

        elevation: 2,
        ...shadowOptions,

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
