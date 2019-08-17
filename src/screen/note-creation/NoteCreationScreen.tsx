import React from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Slider,
    SliderComponent,
    SliderBase,
    DatePickerAndroid,
    Platform,
    DatePickerIOS,
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

interface IOSVisibilityDatePickerState {
    visibilityIOSDatePicker: boolean
}

interface FullState extends NoteCreationScreenState, IOSVisibilityDatePickerState { }

class NoteCreationScreen extends React.Component<NoteCreationScreenProps, FullState>{
    state = {
        date: new Date(),
        glucoseInput: "",
        breadUnitsInput: "",
        insulinInput: "",
        visibilityIOSDatePicker: false,
    }
    render() {
        return (
            <View style={styles.noteCreationView}>
                {this.renderInputBlock()}
                {this.renderSaveButton()}
                <Hat
                    title={'Новая запись'}
                    onBackPress={() => this.props.navigation.navigate('NoteList')}
                />
            </View>
        )
    }

    createNote = () => {
        let { glucoseInput, breadUnitsInput, insulinInput } = this.state;
        glucoseInput = glucoseInput.includes(',') ? glucoseInput.replace(/,/g, '.') : glucoseInput ;
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
            console.warn('Cannot open date picker', message);
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

    onIOSDatePickerPress = () => {
        this.setState({ visibilityIOSDatePicker: !this.state.visibilityIOSDatePicker})
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
        height: Platform.OS === 'ios' ? 450 : 0,
        justifyContent:'center',
        marginTop: Platform.OS === 'ios' ? 30 :  60,
        padding: 31,
        paddingBottom: 40,

        elevation: 2,

        shadowOffset: { width: 10, height: 10 },
        shadowColor: '#000',
        shadowRadius: 5,
        shadowOpacity: 1,

        borderRadius: 25,

        // with alignItems: 'center in IOS datepicker dont work(hide in interface)
        alignItems: 'center',
        backgroundColor: "#FFF8F2",
    },
    input: {
        padding: Platform.OS === 'ios' ? 0 :  31,
    },
    slider: {
        width: 280,
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
