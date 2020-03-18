import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    KeyboardAvoidingView,
    TextInput,
    Keyboard,
} from 'react-native';
import { connect } from 'react-redux';
import { Dispatch, Action } from 'redux';
import { INoteListNote, NoteValueType } from '../../../model/INoteList';
import { createNoteListChangeNoteByIdAction, createDeleteNoteInNoteListById } from '../../../store/modules/noteList/NoteListActionCreator';
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
import { styles } from './Style';
import { NoteInsulinDoseRecommendationConnect } from '../insulin-dose-recommendation/NoteInsulinDoseRecommendation';
import { batchActions } from 'redux-batched-actions';
import { createCreateNoteAction } from '../../../store/service/note/CreateNoteSaga';
import { createUpdateNoteAction } from '../../../store/service/note/UpdateNoteSaga';
import { createDeleteNoteAction } from '../../../store/service/note/DeleteNoteSaga';

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
    prevValueType?: NoteValueType
    commentary: string,
    glucoseInputForSlider?: number,
    breadUnitsInputForSlider?: number,
    shortInsulinInputForSlider?: number,
    longInsulinInputForSlider?: number
}

class NoteCreationPopup extends React.PureComponent<NoteCreationPopupProps, NoteCreationPopupState>{
    glucoseInputForSlider = 0.0;
    breadUnitsInputForSlider = 0.0;
    shortInsulinInputForSlider = 0.0;
    longInsulinInputForSlider = 0.0;

    state = {
        date: new Date(),
        glucoseInput: "0.0",
        breadUnitsInput: "0.0",
        insulinInput: "0.0",
        longInsulinInput: "0.0",
        commentary: "",
        currentValueType: NoteValueType.GLUCOSE,
        prevValueType: NoteValueType.GLUCOSE,
        glucoseInputForSlider: 0.0,
        breadUnitsInputForSlider: 0.0,
        shortInsulinInputForSlider: 0.0,
        longInsulinInputForSlider: 0.0
    }

    componentDidMount() {
        if (!this.props.note) {
            this.setState({
                date: new Date()
            })
        }
    }

    componentDidUpdate = (pP: NoteCreationPopupProps, pS: NoteCreationPopupState) => {
        if (!pP.note && this.props.note) {
            this.setState({
                ...this.noteFromProps,
                glucoseInputForSlider: this.props.note && this.props.note.glucose,
                breadUnitsInputForSlider: this.props.note && this.props.note.breadUnits,
                shortInsulinInputForSlider: this.props.note && this.props.note.insulin,
                longInsulinInputForSlider: this.props.note && this.props.note.longInsulin
            })
        } else if (!pP.interactive.creatingNoteMode && this.props.interactive.creatingNoteMode) {
            this.setState({
                date: new Date(),
                glucoseInput: "0.0",
                breadUnitsInput: "0.0",
                insulinInput: "0.0",
                longInsulinInput: "0.0",
                commentary: "",
                currentValueType: NoteValueType.GLUCOSE,
                glucoseInputForSlider: 0.0,
                breadUnitsInputForSlider: 0.0,
                shortInsulinInputForSlider: 0.0,
                longInsulinInputForSlider: 0.0
            })
        }

        if (
            !pP.interactive.creatingNoteMode && this.props.interactive.creatingNoteMode &&
            !this.props.interactive.editingNoteId
        ) {
            this.setState({ date: new Date() })
        }
    };

    static getDerivedStateFromProps(p: NoteCreationPopupProps, s: NoteCreationPopupState) {
        if (s.prevValueType !== s.currentValueType) {
            return {
                glucoseInputForSlider: Number(s.glucoseInput),
                breadUnitsInputForSlider: Number(s.breadUnitsInput),
                shortInsulinInputForSlider: Number(s.insulinInput),
                longInsulinInputForSlider: Number(s.longInsulinInput),
                prevValueType: s.currentValueType
            }
        }
        return s
    }

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
                <BottomPopup hidden={!this.props.interactive.creatingNoteMode}>
                    <ScrollView style={styles.noteCreationViewScrollView}>
                        <KeyboardAvoidingView
                            style={!this.props.note ?
                                styles.noteCreationView :
                                styles.noteEditingView
                            }
                            keyboardVerticalOffset={30}
                            behavior='padding'
                        >
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
                        </KeyboardAvoidingView>
                    </ScrollView>
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
                    onSelect={(type) => this.setState({
                        currentValueType: type,
                        prevValueType: this.state.currentValueType
                    })}
                    selectedType={this.state.currentValueType}
                />
                {this.renderInputByValue()}
            </View>
        )
    }

    renderInputByValue() {
        let { glucoseInput, breadUnitsInput, insulinInput, longInsulinInput, currentValueType } = this.stateWithoutComma;
        const isCreating = this.props.interactive.creatingNoteMode && !this.props.interactive.editingNoteId;
        switch (currentValueType) {
            case NoteValueType.GLUCOSE:
                return this.renderInputByType(this.state.glucoseInputForSlider, glucoseInput, 'glucoseInput', 18)
            case NoteValueType.FOOD:
                return this.renderInputByType(this.state.breadUnitsInputForSlider, breadUnitsInput, 'breadUnitsInput', 15)
            case NoteValueType.SHORT_INSULIN:
                return <>
                    {this.renderInputByType(this.state.shortInsulinInputForSlider, insulinInput, 'insulinInput', 15)}
                    <NoteInsulinDoseRecommendationConnect note={this.noteFromState} />
                </>
            case NoteValueType.LONG_INSULIN:
                return this.renderInputByType(this.state.longInsulinInputForSlider, longInsulinInput, 'longInsulinInput', 25)
            case NoteValueType.COMMENT:
                return <View
                    style={styles.commentInputView}
                >
                    <Text style={styles.inputViewTitle}>
                        Комментарий
                    </Text>
                    <View
                        style={styles.commentViewTextArea}
                    >
                        <TextInput
                            autoFocus
                            multiline
                            blurOnSubmit
                            style={{ maxHeight: 80 }}
                            onChangeText={(text) => this.setState({ commentary: text })}
                            defaultValue={isCreating ?
                                this.state.commentary :
                                this.props.note && this.props.note.commentary
                            }
                            keyboardType="default"
                            returnKeyType="done"
                            onSubmitEditing={() => { Keyboard.dismiss() }}
                        />
                    </View>
                </View>
        }
    }

    renderInputByType(defaultValue, inputValue, name, maxNum) {
        const obj = { [`${name}`]: null }
        return <View style={styles.inputView}>
            <NoteInputWithSlider
                defaultValue={defaultValue}
                value={inputValue}
                inputTitle={InputType[name]}
                maximumNum={maxNum}
                onChangeText={(value) => {
                    obj[`${name}`] = value;
                    this.setState(obj as any)
                }}
                onNaturalSlide={(value) => {
                    obj[`${name}`] = value + '.' + inputValue.split('.')[1];
                    this.setState(obj as any), 50
                }}
                onDecimalSlide={(value) => {
                    obj[`${name}`] = inputValue.split('.')[0] + '.' + value.toString().split('.')[1];
                    this.setState(obj as any), 50
                }}
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
        if (this.props.note) {
            this.props.onNoteDelete(this.props.note.date);
            this.props.dispatch(createUpdateNoteAction(note, this.props.note.date));
        }
        if (note.glucose || note.breadUnits || note.insulin || note.longInsulin || note.commentary) {
            this.props.dispatch(createNoteListChangeNoteByIdAction(note));
            if (!this.props.note) {
                this.props.dispatch(createCreateNoteAction(note));
            }
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
        this.props.dispatch(createDeleteNoteAction(this.props.note.date))
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
