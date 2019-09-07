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
    ScrollView,
    KeyboardAvoidingView,
} from 'react-native';
import { connect } from 'react-redux';
import { Dispatch, Action } from 'redux';
import { NoteInputWithSlider } from '../../view/notes/note-input/NoteInputWithSlider';
import { INoteListNote, INoteList } from '../../model/INoteList';
import { createNoteListChangeNoteByIdAction, deleteNoteInNoteListById } from '../../store/modules/noteList/NoteListActionCreator';
import { NavigationScreenProp, NavigationParams, NavigationState } from 'react-navigation';
import { ThemeColor } from '../../constant/ThemeColor';
import { Hat } from '../../component/hat/Hat';
import * as lodash from "lodash"
import { AppState } from '../../model/AppState';
import { shadowOptions } from '../../constant/shadowOptions';
import { createModalChangeAction } from '../../store/modules/modal/ModalActionCreator';
import { ModalType, IModalConfirm } from '../../model/IModal';
import { DeleteNoteIcon } from '../../component/icon/DeleteNoteIcon';
import { ChangeNoteIcon } from '../../component/icon/ChangeNoteIcon';
import { NoteDatePickerConnect } from '../../view/notes/note-date-picker/NoteDatePicker';
import { NoteTimePickerConnect } from '../../view/notes/note-date-picker/NoteTimePicker';


enum InputType {
    GLUCOSE = 'Глюкоза',
    BREAD_UNITS = 'ХЕ',
    INSULIN = 'Инсулин',
}


interface NoteEditingStateTProps {
    noteList: INoteList,
}

interface NoteEditingDispatchProps {
    dispatch: Dispatch<Action>
}

interface NoteEditingProps {
    navigation: NavigationScreenProp<NavigationState, NavigationParams>
}

interface NoteEdittingScreenState {
    date: Date
    glucoseInput: string
    breadUnitsInput: string
    insulinInput: string
    longInsulinInput: string
}

interface FullProps extends NoteEditingStateTProps, NoteEditingDispatchProps, NoteEditingProps { }

interface FullState extends NoteEdittingScreenState { }

class NoteEditingScreen extends React.PureComponent<FullProps, FullState>{

    noteId = this.props.navigation.getParam('noteId', 'currentId');
    currentNote = this.props.noteList[this.noteId];

    state = {
        date: new Date(this.currentNote.date),
        glucoseInput: this.currentNote.glucose.toString(),
        breadUnitsInput: this.currentNote.breadUnits.toString(),
        insulinInput: this.currentNote.insulin.toString(),
        longInsulinInput: this.currentNote.longInsulin.toString(),
    }

    render() {
        return (
            <KeyboardAvoidingView
                style={styles.noteEdittingView}
                behavior='padding'
            >
                <ScrollView style={styles.scrollView}>
                    <View style={styles.scrollViewContent}>
                        {this.renderInputBlock()}
                        <View style={styles.noteButtons}>
                            {this.renderDeleteButton()}
                            {this.renderChangeButton()}
                        </View>
                    </View>
                </ScrollView>

                <Hat
                    title={'Редактировать запись'}
                    onBackPress={() => this.props.navigation.navigate('NoteList')}
                    hatColor={ThemeColor.LIGHT_PINK_RED}
                />
            </KeyboardAvoidingView>
        )
    }


    renderInputBlock() {
        const { glucoseInput, breadUnitsInput, insulinInput, longInsulinInput } = this.state
        return (
            <View style={styles.inputBlock}>
                <View style={styles.pickers}>
                    <NoteDatePickerConnect
                        date={this.state.date}
                        onChange={(value: Date) => this.setState({
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

    renderChangeButton() {
        return (
            <TouchableOpacity
                style={styles.changeButton}
                onPress={this.changeNote}
            >
                <ChangeNoteIcon />
                <Text style={styles.changeButtonText}>
                    Изменить
                </Text>
            </TouchableOpacity>
        )
    }

    renderDeleteButton() {
        return (
            <TouchableOpacity
                style={styles.deleteButton}
                onPress={this.onDeleteClick}
            >
                <DeleteNoteIcon />
                <Text style={styles.removeButtonText}>
                    Удалить
                </Text>
            </TouchableOpacity>
        )
    }

    changeNote = () => {
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
            if (note.date !== this.currentNote.date) {
                this.props.dispatch(deleteNoteInNoteListById(this.currentNote.date))
                this.props.dispatch(createNoteListChangeNoteByIdAction(note));
                this.props.navigation.navigate('NoteList')
            }
            else {
                this.props.dispatch(createNoteListChangeNoteByIdAction(note));
                this.props.navigation.navigate('NoteList')
            }
        } else {
            alert('Заполните хотя бы одно поле')
        }
    }
    onDeleteClick = () => {
        const confirmData: IModalConfirm = {
            data: {
                questionText: 'Вы уверены, что хотите удалить эту запись?',
                positiveButtonText: 'Удалить',
                negativeButtonText: 'Оставить',

                onPositiveClick: () => this.deleteNote(),
            }
        }
        this.props.dispatch(createModalChangeAction({
            type: ModalType.CONFIRM,
            needToShow: true,
            ...confirmData
        }))
    }

    deleteNote = () => {
        this.props.dispatch(deleteNoteInNoteListById(this.noteId));
        this.props.navigation.navigate('NoteList');
    }
}

export const NoteEditingScreenConnect = connect<NoteEditingStateTProps, NoteEditingDispatchProps>(
    (state: AppState) => ({ noteList: state.noteList }),
    (dispatch: Dispatch<Action>) => ({ dispatch })
)(NoteEditingScreen)

const styles = StyleSheet.create({
    noteEdittingView: {
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
        justifyContent: 'center',
        marginTop: 30,
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
    noteButtons: {
        flex: 1,

        width: '90%',

        margin: 14,

        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    changeButton: {
        flex: 1,
        width: 160,
        height: 50,

        marginLeft: 20,
        paddingLeft: 10,

        elevation: 2,
        ...shadowOptions,

        borderRadius: 15,
        backgroundColor: ThemeColor.LIGHT_BLUE,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    changeButtonText: {
        flex: 1,
        marginLeft: 20,
        fontFamily: 'Roboto',
        fontSize: 16,
        color: '#666666',
    },
    deleteButton: {
        flex: 1,
        width: 140,
        height: 50,

        paddingLeft: 10,

        elevation: 2,
        ...shadowOptions,

        borderRadius: 15,
        backgroundColor: ThemeColor.BRIGHT_RED,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    removeButtonText: {
        flex: 1,
        marginLeft: 20,
        fontFamily: 'Roboto',
        fontSize: 16,
        color: ThemeColor.WHITE,
    }
})
