import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    KeyboardAvoidingView,
    TextInput,
} from 'react-native';
import { connect } from 'react-redux';
import { Dispatch, Action } from 'redux';
import { INoteListNote, NoteValueType } from '../../../model/INoteList';
import { createNoteListChangeNoteByIdAction } from '../../../store/modules/noteList/NoteListActionCreator';
import { ThemeColor } from '../../../constant/ThemeColor';
import * as lodash from "lodash";
import { shadowOptions } from '../../../constant/shadowOptions';
import { NoteInputWithSlider } from '../../../view/notes/note-input/NoteInputWithSlider';
import { createModalChangeAction } from '../../../store/modules/modal/ModalActionCreator';
import { ModalType } from '../../../model/IModal';
import { NoteDatePickerConnect } from '../../../view/notes/note-date-picker/NoteDatePicker';
import { NoteTimePickerConnect } from '../../../view/notes/note-date-picker/NoteTimePicker';
import { ArrowDownIcon } from '../../../component/icon/ArrowDownIcon';
import { ValueTypePicker } from '../../../view/notes/value-type-picker/ValueTypePicker';

enum InputType {
    GLUCOSE = 'Глюкоза',
    BREAD_UNITS = 'ХЕ',
    LONG_INSULIN = 'Длинный',
    INSULIN = 'Короткий',
    COMMENT = 'Комментарий'
}

interface NoteCreationScreenProps {
    dispatch?: (action: Action) => void
    onBackPress?: () => void
}

interface NoteCreationScreenState {
    date: Date
    glucoseInput: string
    breadUnitsInput: string
    insulinInput: string
    longInsulinInput: string
    currentValueType: NoteValueType
    commentary: string
}

interface FullState extends NoteCreationScreenState { }

class NoteCreationScreen extends React.PureComponent<NoteCreationScreenProps, FullState>{
    state = {
        date: new Date(),
        glucoseInput: "0.0",
        breadUnitsInput: "0.0",
        insulinInput: "0.0",
        longInsulinInput: "0.0",
        commentary: "",
        currentValueType: NoteValueType.GLUCOSE
    }

    render() {
        return (
            <KeyboardAvoidingView
                style={styles.noteCreationView}
                behavior='padding'
            >
                <View style={styles.scrollViewContent}>
                    {this.renderInputBlock()}
                    {this.renderSaveButton()}
                </View>
                <TouchableOpacity
                    style={styles.arrowDown}
                    onPress={this.props.onBackPress}
                >
                    <ArrowDownIcon />
                </TouchableOpacity>
            </KeyboardAvoidingView>
        )
    }

    renderInputBlock() {
        let { glucoseInput, breadUnitsInput, insulinInput, longInsulinInput } = this.state;

        glucoseInput = glucoseInput.includes(',') ? glucoseInput.replace(/,/g, '.') : glucoseInput || glucoseInput.includes('undefined') ? glucoseInput.replace(/undefined/g, '0') : glucoseInput;
        breadUnitsInput = breadUnitsInput.includes(',') ? breadUnitsInput.replace(/,/g, '.') : breadUnitsInput || breadUnitsInput.includes('undefined') ? breadUnitsInput.replace(/undefined/g, '0') : breadUnitsInput;
        insulinInput = insulinInput.includes(',') ? insulinInput.replace(/,/g, '.') : insulinInput || insulinInput.includes('undefined') ? insulinInput.replace(/undefined/g, '0') : insulinInput;
        longInsulinInput = longInsulinInput.includes(',') ? longInsulinInput.replace(/,/g, '.') : longInsulinInput || longInsulinInput.includes('undefined') ? longInsulinInput.replace(/undefined/g, '0') : longInsulinInput;

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
                <ValueTypePicker
                    onSelect={(type) => this.setState({ currentValueType: type })}
                    selectedType={this.state.currentValueType}
                />
                {this.renderInputByValue()}
            </View>
        )
    }

    renderInputByValue() {
        let { glucoseInput, breadUnitsInput, insulinInput, longInsulinInput, currentValueType } = this.state;

        glucoseInput = glucoseInput.includes(',') ? glucoseInput.replace(/,/g, '.') : glucoseInput || glucoseInput.includes('undefined') ? glucoseInput.replace(/undefined/g, '0') : glucoseInput;
        breadUnitsInput = breadUnitsInput.includes(',') ? breadUnitsInput.replace(/,/g, '.') : breadUnitsInput || breadUnitsInput.includes('undefined') ? breadUnitsInput.replace(/undefined/g, '0') : breadUnitsInput;
        insulinInput = insulinInput.includes(',') ? insulinInput.replace(/,/g, '.') : insulinInput || insulinInput.includes('undefined') ? insulinInput.replace(/undefined/g, '0') : insulinInput;
        longInsulinInput = longInsulinInput.includes(',') ? longInsulinInput.replace(/,/g, '.') : longInsulinInput || longInsulinInput.includes('undefined') ? longInsulinInput.replace(/undefined/g, '0') : longInsulinInput;

        switch (currentValueType) {
            case NoteValueType.GLUCOSE:
                return <View style={styles.inputView}>
                    <NoteInputWithSlider
                        inputTitle={InputType.GLUCOSE}
                        value={glucoseInput}
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
            case NoteValueType.FOOD:
                return <View style={styles.inputView}>
                    <NoteInputWithSlider
                        inputTitle={InputType.BREAD_UNITS}
                        value={breadUnitsInput}
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
            case NoteValueType.SHORT_INSULIN:
                return <View style={styles.inputView}>
                    <NoteInputWithSlider
                        inputTitle={InputType.INSULIN}
                        value={insulinInput}
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
            case NoteValueType.LONG_INSULIN:
                return <View style={styles.inputView}>
                    <NoteInputWithSlider
                        value={longInsulinInput}
                        inputTitle={InputType.LONG_INSULIN}
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
            case NoteValueType.COMMENT:
                return <View style={styles.inputView}>
                    <Text style={styles.inputViewTitle}>
                        Комментарий
                    </Text>
                    <TextInput
                        style={styles.commentTextArea}
                        multiline={true}
                        numberOfLines={4}
                        onChangeText={(text) => this.setState({ commentary: text })}
                        value={this.state.commentary}
                    />
                </View>
        }
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
        let { glucoseInput, breadUnitsInput, insulinInput, longInsulinInput, commentary } = this.state;
        glucoseInput = glucoseInput.includes(',') ? glucoseInput.replace(/,/g, '.') : glucoseInput;
        breadUnitsInput = breadUnitsInput.includes(',') ? breadUnitsInput.replace(/,/g, '.') : breadUnitsInput;
        insulinInput = insulinInput.includes(',') ? insulinInput.replace(/,/g, '.') : insulinInput;
        longInsulinInput = longInsulinInput.includes(',') ? longInsulinInput.replace(/,/g, '.') : longInsulinInput;

        let note: INoteListNote = {
            date: this.state.date.getTime(),
            glucose: glucoseInput && parseFloat(glucoseInput) || 0,
            breadUnits: breadUnitsInput && parseFloat(breadUnitsInput) || 0,
            insulin: insulinInput && parseFloat(insulinInput) || 0,
            longInsulin: longInsulinInput && parseFloat(longInsulinInput) || 0,
            commentary: commentary || ""
        }
        if (note.glucose || note.breadUnits || note.insulin || note.longInsulin || commentary) {
            this.props.dispatch(createNoteListChangeNoteByIdAction(note));
            this.setInitialState();
            this.props.onBackPress()
        } else {
            this.setInitialState();
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

    setInitialState() {
        this.setState({
            date: new Date(),
            glucoseInput: "0.0",
            breadUnitsInput: "0.0",
            insulinInput: "0.0",
            longInsulinInput: "0.0",
            commentary: "",
            currentValueType: NoteValueType.GLUCOSE
        })
    }
}

export const NoteCreationScreenConnect = connect(
    null,
    (dispatch: Dispatch<Action>) => ({ dispatch })
)(NoteCreationScreen)

const styles = StyleSheet.create({
    noteCreationView: {
        flex: 1,
        width: '100%',
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        backgroundColor: "#D4EEFF",
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
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
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 16,

        ...shadowOptions,

        borderRadius: 25,

        alignItems: 'center',
    },
    pickers: {
        flex: 1,
        height: 80,
        width: '100%',

        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textInDatePickerIOS: {
        textAlign: 'center',
    },
    inputView: {
        flex: 1,
        width: '100%',
        margin: 15,
        marginBottom: 0,
    },
    saveButtonTouchable: {
        flex: 1,

        width: 150,
        height: 50,

        marginVertical: 10,

        ...shadowOptions,

        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "rgba(250, 250, 250, 0.9)",

    },
    saveButtonText: {
        fontFamily: 'Roboto',
        fontSize: 19,
        color: '#333333',
        fontWeight: 'bold',
    },
    inputViewTitle: {
        width: '100%',
        textAlign: 'center',
        margin: 3,
        fontSize: 19,
        lineHeight: 20,
        fontWeight: "bold",
        color: ThemeColor.TEXT_DARK_GRAY
    },
    commentTextArea: {
        backgroundColor: 'white',
        padding: 10,
        width: '100%',
        height: 80,
        borderRadius: 15,
    },
    arrowDown: {
        position: 'absolute',
        right: 20,
        top: 20,
    }
})

