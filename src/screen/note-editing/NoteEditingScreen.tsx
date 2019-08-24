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
}

interface IOSVisibilityDatePickerState {
    visibilityIOSDatePicker: boolean
}

interface FullProps extends NoteEditingStateTProps, NoteEditingDispatchProps, NoteEditingProps { }

interface FullState extends NoteEdittingScreenState, IOSVisibilityDatePickerState { }

class NoteEditingScreen extends React.Component<FullProps, FullState>{

    noteId = this.props.navigation.getParam('noteId', 'currentId');
    currentNote = this.props.noteList[this.noteId];

    state = {
        date: new Date(this.currentNote.date),
        glucoseInput: this.currentNote.glucose.toString(),
        breadUnitsInput: this.currentNote.breadUnits.toString(),
        insulinInput: this.currentNote.insulin.toString(),
        visibilityIOSDatePicker: false
    }

    render() {
        return (
            <View style={styles.noteEdittingView}>
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
            </View>
        )
    }

    changeNote = () => {
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
                            <Text style={styles.textInDatePickerIOS}>
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
            data: confirmData.data
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
        // height: Platform.OS === 'ios' ? 450 : 0,
        justifyContent: 'center',
        marginTop: Platform.OS === 'ios' ? 100 : 30,
        paddingTop: 31,
        paddingBottom: 15,

        elevation: 2,

        ...shadowOptions,

        borderRadius: 25,

        // with alignItems: 'center in IOS datepicker dont work(hide in interface)
        // alignItems: 'stretch',
        alignItems: Platform.OS === "ios" ? 'stretch' : 'center',
        backgroundColor: "#FFF8F2",

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
