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
} from 'react-native';
import { connect } from 'react-redux';
import { Dispatch, Action } from 'redux';
import { NoteInput } from '../../view/notes/note-input/NoteInput';
import { INoteListNote } from '../../model/INoteList';
import { createNoteListChangeNoteByIdAction } from '../../store/modules/noteList/NoteListActionCreator';
import { NavigationScreenProp, NavigationParams, NavigationState } from 'react-navigation';
import { ThemeColor } from '../../constant/ThemeColor';
import { Hat } from '../../component/hat/Hat';
import * as lodash from "lodash";
import { shadowOptions } from '../../constant/shadowOptions';
import { NoteInputWithSlider } from '../../view/notes/note-input/NoteInputWithSlider';

enum InputType {
    GLUCOSE = 'Глюкоза',
    BREAD_UNITS = 'ХЕ',
    INSULIN = 'Инсулин',
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

interface IOSVisibilityDatePickerState {
    visibilityIOSDatePicker: boolean
}

interface FullState extends NoteCreationScreenState, IOSVisibilityDatePickerState { }

class NoteCreationScreen extends React.Component<NoteCreationScreenProps, FullState>{
    state = {
        date: new Date(),
        glucoseInput: "0.0",
        breadUnitsInput: "0.0",
        insulinInput: "0.0",
        visibilityIOSDatePicker: false,
    }
    render() {
        return (
            <View style={styles.noteCreationView}>
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
            </View>
        )
    }

    createNote = () => {
        let { glucoseInput, breadUnitsInput, insulinInput } = this.state;
        glucoseInput = glucoseInput.includes(',') ? glucoseInput.replace(/,/g, '.') : glucoseInput;
        breadUnitsInput = breadUnitsInput.includes(',') ? breadUnitsInput.replace(/,/g, '.') : breadUnitsInput;
        insulinInput = insulinInput.includes(',') ? insulinInput.replace(/,/g, '.') : insulinInput;

        let note: INoteListNote = {
            date: this.state.date.getTime(),
            glucose: glucoseInput && parseFloat(glucoseInput) || 0,
            breadUnits: breadUnitsInput && parseFloat(breadUnitsInput) || 0,
            insulin: insulinInput && parseFloat(insulinInput) || 0
        }
        if (note.glucose || note.breadUnits || note.insulin) {
            this.props.dispatch(createNoteListChangeNoteByIdAction(note));
            this.props.navigation.navigate('NoteList')
        } else {
            alert('Заполните хотя бы одно поле')
        }
    }

    onAndroidDatePickerPress = async () => {
        try {
            const { action, year, month, day } = await (DatePickerAndroid as any).open({
                date: this.state.date,
            });
            if (action !== DatePickerAndroid.dismissedAction) {
                this.setState({
                    date: new Date(year, month, day)
                })
            }
        } catch ({ code, message }) {
            console.warn('Cannot open date android picker', message);
        }
    }

    renderInputBlock() {
        const { glucoseInput, breadUnitsInput, insulinInput } = this.state
        const glucoseSliderValue = glucoseInput ?
            Math.floor(parseFloat(glucoseInput)) : 0;
        const breadUnitsSliderValue = breadUnitsInput ?
            parseFloat(breadUnitsInput) : 0;
        const insulinSliderValue = insulinInput ?
            parseFloat(insulinInput) : 0;

        return (
            <View style={styles.inputBlock}>
                {this.renderDatePicker()}
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
                        inputTitle={InputType.INSULIN}
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

            </View>
        )
    }

    onIOSDatePickerPress = () => {
        this.setState({ visibilityIOSDatePicker: !this.state.visibilityIOSDatePicker })
    }

    renderDatePicker() {
        if (Platform.OS === 'android') {
            return <View>
                <TouchableOpacity
                    onPress={this.onAndroidDatePickerPress}
                >
                    <Text>
                        {this.state.date.toString()}
                    </Text>
                </TouchableOpacity>
            </View>
        } else if (Platform.OS === 'ios') {
            return <View >
                {
                    this.state.visibilityIOSDatePicker === false ?
                        <TouchableOpacity
                            onPress={this.onIOSDatePickerPress}
                        >
                            <Text>
                                {this.state.date.toString()}
                            </Text>
                        </TouchableOpacity>
                        :
                        <DatePickerIOS
                            date={this.state.date}
                            onDateChange={(date) => this.setState({ date: date })}
                        />
                }
            </View>
        }
    }

    renderSaveButton() {
        return (
            <View style={styles.saveButton}>
                <TouchableOpacity
                    style={styles.saveButtonTouchable}
                    onPress={this.createNote}>
                    <Text style={styles.saveButtonText}>
                        Записать
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    noteCreationView: {
        flex: 1,
        width: '100%',
        height: '100%',

        paddingTop: 30,

        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#4B5860",
    },

    scrollView: {
        flex: 1,
        width: '100%',
        height: '100%',
    },

    scrollViewContent: {
        flex: 1,
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },

    inputBlock: {
        width: '100%',
        // height: Platform.OS === 'ios' ? 450 : 0,
        justifyContent: 'center',
        marginTop: 30,
        paddingTop: 31,
        paddingBottom: 15,

        elevation: 2,

        ...shadowOptions,

        borderRadius: 25,

        // with alignItems: 'center in IOS datepicker dont work(hide in interface)
        alignItems: 'center',
        backgroundColor: "#FFF8F2",
    },
    inputView: {
        flex: 1,
        margin: 15,
        marginRight: 10,
    },
    saveButton: {
        width: 150,
        height: 50,

        marginTop: 20,

        elevation: 2,
        ...shadowOptions,

        borderRadius: 15,
        backgroundColor: ThemeColor.LIGHT_RED,
    },
    saveButtonTouchable: {
        width: 150,
        height: 50,

        justifyContent: 'center',
        alignItems: 'center',
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
