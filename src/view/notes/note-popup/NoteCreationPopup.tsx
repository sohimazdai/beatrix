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
import { createNoteListChangeNoteByIdAction, createDeleteNoteInNoteListById } from '../../../store/modules/noteList/NoteListActionCreator';
import { ThemeColor } from '../../../constant/ThemeColor';
import * as lodash from "lodash";
import { shadowOptions } from '../../../constant/shadowOptions';
import { NoteInputWithSlider } from '../../../view/notes/note-input/NoteInputWithSlider';
import { createModalChangeAction } from '../../../store/modules/modal/ModalActionCreator';
import { ModalType, IModalConfirm } from '../../../model/IModal';
import { NoteDatePickerConnect } from '../../../view/notes/note-date-picker/NoteDatePicker';
import { NoteTimePickerConnect } from '../../../view/notes/note-date-picker/NoteTimePicker';
import { ValueTypePicker } from '../../../view/notes/value-type-picker/ValueTypePicker';
import { ScrollView } from 'react-native-gesture-handler';
import { CloseIcon } from '../../../component/icon/CloseIcon';
import { IStorage } from '../../../model/IStorage';
import { BottomPopup } from '../../../component/popup/BottomPopup';
import { IInteractive } from '../../../model/IInteractive';
import { createChangeInteractive } from '../../../store/modules/interactive/interactive';
import { Fader } from '../../../component/Fader';

enum InputType {
    glucoseInput = 'Глюкоза',
    breadUnitsInput = 'ХЕ',
    insulinInput = 'Короткий',
    longInsulinInput = 'Длинный',
    COMMENT = 'Комментарий'
}

interface NoteCreationPopupProps {
    interactive?: IInteractive
    note?: INoteListNote
    dispatch?: (action: Action) => void
    hidePopup?: () => void
    onNoteDelete?: (noteId: number) => void;
}

interface NoteCreationPopupState {
    date: Date
    glucoseInput: string
    breadUnitsInput: string
    insulinInput: string
    longInsulinInput: string
    currentValueType: NoteValueType
    commentary: string
}

class NoteCreationPopup extends React.PureComponent<NoteCreationPopupProps, NoteCreationPopupState>{
    constructor(props: NoteCreationPopupProps) {
        super(props);
        this.state = {
            date: new Date(),
            glucoseInput: "0.0",
            breadUnitsInput: "0.0",
            insulinInput: "0.0",
            longInsulinInput: "0.0",
            commentary: "",
            currentValueType: NoteValueType.GLUCOSE
        }
    }

    componentDidMount = () => {
        this.props.note && this.setState({
            ...this.noteFromProps
        })
    };

    componentDidUpdate = (pP: NoteCreationPopupProps) => {
        if (!pP.note && this.props.note) {
            this.setState({
                ...this.noteFromProps
            })
        }
    };


    get noteFromProps() {
        const { note } = this.props;
        const newState: NoteCreationPopupState = {
            date: new Date(note.date) || new Date(),
            glucoseInput: String(note.glucose) || "0.0",
            breadUnitsInput: String(note.breadUnits) || "0.0",
            insulinInput: String(note.insulin) || "0.0",
            longInsulinInput: String(note.longInsulin) || "0.0",
            commentary: note.commentary || "",
            currentValueType: NoteValueType.GLUCOSE
        }
        return newState
    }


    render() {
        return (
            <>
                <Fader hidden={!this.props.interactive.creatingNoteMode} />
                <BottomPopup hidden={!this.props.interactive.creatingNoteMode}>
                    <KeyboardAvoidingView
                        style={!this.props.note ?
                            styles.noteCreationView :
                            styles.noteEditingView
                        }
                        keyboardVerticalOffset={90}
                        behavior='padding'
                    >
                        <ScrollView style={styles.noteCreationViewScrollView}>
                            <View style={styles.scrollViewContent}>
                                {this.renderPickerBlock()}
                                <View style={styles.buttonsBlock}>
                                    {this.props.note && this.renderDeleteButton()}
                                    {this.renderSaveButton()}
                                </View>
                            </View>
                            <TouchableOpacity
                                style={styles.hideTouchable}
                                onPress={this.props.hidePopup}
                            >
                                <CloseIcon />
                            </TouchableOpacity>
                        </ScrollView>
                    </KeyboardAvoidingView>
                </BottomPopup>
            </>
        )
    }

    renderPickerBlock() {
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
        let { glucoseInput, breadUnitsInput, insulinInput, longInsulinInput, currentValueType } = this.stateWithoutComma;

        switch (currentValueType) {
            case NoteValueType.GLUCOSE:
                return this.renderInputByType(glucoseInput, 'glucoseInput', 18)
            case NoteValueType.FOOD:
                return this.renderInputByType(breadUnitsInput, 'breadUnitsInput', 15)
            case NoteValueType.SHORT_INSULIN:
                return this.renderInputByType(insulinInput, 'insulinInput', 15)
            case NoteValueType.LONG_INSULIN:
                return this.renderInputByType(longInsulinInput, 'longInsulinInput', 25)
            case NoteValueType.COMMENT:
                return <View style={styles.inputView}>
                    <Text style={styles.inputViewTitle}>
                        Комментарий
                    </Text>
                    <View
                        style={styles.commentViewTextArea}
                    >
                        <TextInput
                            multiline
                            editable
                            onChangeText={(text) => this.setState({ commentary: text })}
                            value={this.state.commentary}
                        />
                    </View>
                </View>
        }
    }

    renderInputByType(inputValue, name, maxNum) {
        const obj = { [`${name}`]: null }
        return <View style={styles.inputView}>
            <NoteInputWithSlider
                value={inputValue}
                inputTitle={InputType[name]}
                maximumNum={maxNum}
                onChangeText={(value) => {
                    obj[`${name}`] = value;
                    this.setState(obj as any)
                }}
                onNaturalSlide={lodash.debounce((value) => {
                    obj[`${name}`] = value + '.' + inputValue.split('.')[1];
                    this.setState(obj as any), 50
                })}
                onDecimalSlide={lodash.debounce((value) => {
                    obj[`${name}`] = inputValue.split('.')[0] + '.' + value.toString().split('.')[1];
                    this.setState(obj as any), 50
                })}
            />
        </View>
    }

    renderSaveButton() {
        return (
            <TouchableOpacity
                style={styles.saveButtonTouchable}
                onPress={this.createNote}
            >
                <Text style={styles.saveButtonText}>
                    {this.props.note ? 'Перезаписать' : 'Записать'}
                </Text>
            </TouchableOpacity>
        )
    }

    createNote = () => {
        let note: INoteListNote = this.noteFromState;
        if (note.glucose || note.breadUnits || note.insulin || note.longInsulin || note.commentary) {
            this.props.dispatch(createNoteListChangeNoteByIdAction(note));
            this.setInitialState();
            this.props.hidePopup()
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

    renderDeleteButton() {
        return (
            <TouchableOpacity
                style={styles.deleteButtonTouchable}
                onPress={this.onDeleteClick}
            >
                <Text style={styles.deleteButtonText}>
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
            ...confirmData
        }))
    }

    deleteNote = () => {
        this.props.onNoteDelete(this.props.note.date);
        this.props.hidePopup()
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

    get stateWithoutComma() {
        let { glucoseInput, breadUnitsInput, insulinInput, longInsulinInput, commentary, currentValueType, date } = this.state;

        return {
            date,
            glucoseInput: this.exceptComma(glucoseInput),
            breadUnitsInput: this.exceptComma(breadUnitsInput),
            insulinInput: this.exceptComma(insulinInput),
            longInsulinInput: this.exceptComma(longInsulinInput),
            commentary,
            currentValueType
        }
    }

    get noteFromState() {
        let { glucoseInput, breadUnitsInput, insulinInput, longInsulinInput, commentary, date } = this.state;
        return {
            date: date.getTime(),
            glucose: glucoseInput && parseFloat(glucoseInput) || 0,
            breadUnits: breadUnitsInput && parseFloat(breadUnitsInput) || 0,
            insulin: insulinInput && parseFloat(insulinInput) || 0,
            longInsulin: longInsulinInput && parseFloat(longInsulinInput) || 0,
            commentary: commentary || ""
        }
    }



    exceptComma(input) {
        return input.includes(',') ?
            input.replace(/,/g, '.') :
            input || input.includes('undefined') ?
                input.replace(/undefined/g, '0') :
                input;
    }
}

export const NoteCreationPopupConnect = connect(
    (state: IStorage) => ({
        notes: state.noteList,
        interactive: state.interactive
    }),
    (dispatch: Dispatch<Action>) => ({ dispatch }),
    (stateProps, { dispatch }, ownProps: any) => {
        const noteId = stateProps.interactive.editingNoteId || "";
        return {
            ...stateProps,
            dispatch,
            note: stateProps.notes[noteId] || null,
            hidePopup() {
                dispatch(createChangeInteractive({
                    creatingNoteMode: false,
                    editingNoteId: ''
                }))
            },
            onNoteDelete(noteId) {
                dispatch(createDeleteNoteInNoteListById(noteId))
            }
        }
    }
)(NoteCreationPopup)

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
    noteEditingView: {
        flex: 1,
        width: '100%',
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        backgroundColor: "#FFE1DF",
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    noteCreationViewScrollView: {
        width: '100%',
        height: '100%',
    },
    buttonsBlock: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
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

        borderRadius: 25,

        alignItems: 'center',
    },
    pickers: {
        flex: 1,
        height: 50,
        width: 240,

        flexDirection: 'row',
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
        width: 160,
        height: 50,

        marginVertical: 10,

        ...shadowOptions,

        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "rgba(250, 250, 250, 1)",

    },
    saveButtonText: {
        fontFamily: 'Roboto',
        fontSize: 19,
        color: '#333333',
        fontWeight: 'bold',
    },
    deleteButtonTouchable: {
        width: 80,
        height: 50,

        marginVertical: 10,
        ...shadowOptions,

        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',

    },
    deleteButtonText: {
        fontFamily: 'Roboto',
        fontSize: 17,
        color: 'crimson',
        fontWeight: 'bold',
        textDecorationLine: 'underline',
    },
    inputViewTitle: {
        width: '100%',
        textAlign: 'center',
        margin: 5,
        fontSize: 19,
        lineHeight: 20,
        fontWeight: "bold",
        color: ThemeColor.TEXT_DARK_GRAY
    },
    commentViewTextArea: {
        backgroundColor: 'white',
        padding: 10,
        width: '100%',
        borderRadius: 15,
    },
    hideTouchable: {
        position: 'absolute',
        right: 10,
        top: 10,
        height: 30,
        width: 30
    }
})

