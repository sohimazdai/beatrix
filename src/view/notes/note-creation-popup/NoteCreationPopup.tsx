import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Keyboard,
    KeyboardAvoidingView,
    Alert,
} from 'react-native';
import { connect } from 'react-redux';
import { Dispatch, Action } from 'redux';
import { INoteListNote, NoteValueType } from '../../../model/INoteList';
import { createDeleteNoteInNoteListById } from '../../../store/modules/noteList/NoteListActionCreator';
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
import { createCreateNoteAction } from '../../../store/service/note/CreateNoteSaga';
import { createUpdateNoteAction } from '../../../store/service/note/UpdateNoteSaga';
import { createDeleteNoteAction } from '../../../store/service/note/DeleteNoteSaga';
import { appAnalytics } from '../../../app/Analytics';
import { NumberScroller } from '../number-scroller/NumberScroller';
import { Measures } from '../../../localisation/Measures';
import { IUserDiabetesProperties, CarbsMeasuringType } from '../../../model/IUserDiabetesProperties';
import { i18nGet } from '../../../localisation/Translate';

interface Props {
    interactive?: IInteractive
    note?: INoteListNote
    userDiabetesProperties?: IUserDiabetesProperties
    dispatch?: (action: Action) => void
    hidePopup?: () => void
    onNoteDelete?: (noteId: string) => void;
}

interface State {
    date: Date
    glucose: number
    breadUnits: number
    insulin: number
    longInsulin: number
    commentary: string,
    currentValueType: NoteValueType
}

class NoteCreationPopup extends React.PureComponent<Props, State>{
    state = {
        date: new Date(),
        glucose: 0,
        breadUnits: 0,
        insulin: 0,
        longInsulin: 0,
        commentary: '',
        currentValueType: NoteValueType.GLUCOSE,
    }

    componentDidUpdate(pP: Props, pS: State) {
        const { note, interactive } = this.props;

        if (pP.interactive.creatingNoteMode && !interactive.creatingNoteMode) {
            this.setInitialState();
        };

        if (!pP.note && note) {
            this.setState({
                date: new Date(note.date),
                glucose: note.glucose,
                breadUnits: note.breadUnits,
                insulin: note.insulin,
                longInsulin: note.longInsulin,
                commentary: note.commentary,
            });
        };

        if (
            !pP.interactive.creatingNoteMode && interactive.creatingNoteMode &&
            !interactive.editingNoteId
        ) {
            this.setInitialState();
        };
    }

    render() {
        return (
            <BottomPopup hidden={!this.props.interactive.creatingNoteMode}>
                <KeyboardAvoidingView
                    style={!this.props.note ?
                        styles.noteCreationView :
                        styles.noteEditingView
                    }
                >
                    <ScrollView style={styles.noteCreationViewScrollView}>
                        <View style={styles.scrollViewContent}>
                            {this.renderPickerBlock()}
                            <View style={styles.buttonsBlock}>
                                {this.props.note && this.renderDeleteButton()}
                                {this.renderSaveButton()}
                            </View>
                        </View>
                    </ScrollView>
                    <TouchableOpacity
                        style={styles.hideTouchable}
                        onPress={this.props.hidePopup}
                    >
                        <CloseIcon />
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </BottomPopup>
        )
    }

    onDateChange = (value) => {
        this.setState({
            date: new Date(
                value.getFullYear(),
                value.getMonth(),
                value.getDate(),
                this.state.date.getHours(),
                this.state.date.getMinutes(),
            )
        })
        appAnalytics.sendEvent(appAnalytics.events.NOTE_DATE_CHANGED);
    }

    onTimeChange = (value) => {
        this.setState({ date: value });
        appAnalytics.sendEvent(appAnalytics.events.NOTE_TIME_CHANGED);
    }

    onValueTypePickerSelect = (type) => this.setState({ currentValueType: type })

    renderPickerBlock() {
        return (
            <View style={styles.inputBlock}>
                <View style={styles.timePickers}>
                    <NoteDatePickerConnect
                        date={this.state.date}
                        onChange={this.onDateChange}
                    />
                    <NoteTimePickerConnect
                        date={this.state.date}
                        onChange={this.onTimeChange}
                    />
                </View>
                <ValueTypePicker
                    onSelect={this.onValueTypePickerSelect}
                    selectedType={this.state.currentValueType}
                />
                {this.renderInputByValue()}
            </View>
        )
    }

    renderInputByValue() {
        let { glucose, breadUnits, insulin, longInsulin, currentValueType } = this.state;
        const isCreating = this.props.interactive.creatingNoteMode && !this.props.interactive.editingNoteId;
        switch (currentValueType) {
            case NoteValueType.GLUCOSE:
                return this.renderInputByType(NoteValueType.GLUCOSE, glucose)
            case NoteValueType.BREAD_UNITS:
                return this.renderInputByType(NoteValueType.BREAD_UNITS, breadUnits)
            case NoteValueType.SHORT_INSULIN:
                return <>
                    {this.renderInputByType(NoteValueType.SHORT_INSULIN, insulin)}
                    <NoteInsulinDoseRecommendationConnect note={this.noteFromState} />
                </>
            case NoteValueType.LONG_INSULIN:
                return this.renderInputByType(NoteValueType.LONG_INSULIN, longInsulin)
            case NoteValueType.COMMENT:
                return (
                    <View style={styles.commentInputView}>
                        <Text style={styles.inputViewTitle}>
                            {i18nGet(NoteValueType.COMMENT)}
                        </Text>
                        <View style={styles.commentViewTextArea}>
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
                )
        }
    }

    renderInputByType(name, value) {
        const { userDiabetesProperties: { glycemiaMeasuringType, carbsMeasuringType } } = this.props;
        let postfix = '';
        if (name === NoteValueType.GLUCOSE) {
            postfix = ' ' + Measures.getDefaultGlucoseMeasuringType(glycemiaMeasuringType)
        }

        if (name === NoteValueType.BREAD_UNITS) {
            const carbMeasureType = Measures.getDefaultCarbsMeasuringType(carbsMeasuringType);
            const carbUnits = carbMeasureType === CarbsMeasuringType.BREAD_UNITS
                ? ''
                : i18nGet('carb_gram')
            postfix = ' ' + carbUnits;
        }

        const obj = { [`${name}`]: null }
        const displayedValue = value
            ? ': ' + value + postfix
            : ': ' + i18nGet('not_selected');

        return (
            <View style={styles.inputView}>
                <Text style={styles.inputViewTitle}>
                    {i18nGet(name)}{displayedValue}
                </Text>
                <View style={styles.numberScrollWrapper}>
                    <NumberScroller
                        key={name}
                        selectedNumber={value}
                        measuresOption={Measures.getNoteMeasuresOption(
                            name,
                            glycemiaMeasuringType,
                            carbsMeasuringType,
                        )}
                        onNumberClick={(number) => {
                            obj[`${name}`] = number;
                            this.setState(obj as any)
                        }}
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
                    {this.props.note ? i18nGet('rewrite') : i18nGet('write')}
                </Text>
            </TouchableOpacity>
        )
    }

    createNote = () => {
        const { userDiabetesProperties: {
            glycemiaMeasuringType, carbsMeasuringType
        } } = this.props;

        let note: INoteListNote = this.noteFromState;

        if (this.props.note) {
            this.props.dispatch(createUpdateNoteAction({
                ...note,
                id: this.props.note.id
            }));
            this.props.hidePopup();
        }
        else {
            if (note.glucose || note.breadUnits || note.insulin || note.longInsulin || note.commentary) {
                this.props.dispatch(createCreateNoteAction({
                    ...note,
                    glycemiaType: Measures.getDefaultGlucoseMeasuringType(glycemiaMeasuringType),
                    carbsMeasuringType: Measures.getDefaultCarbsMeasuringType(carbsMeasuringType),
                }));
                this.props.hidePopup()
            } else {
                Alert.alert(
                    i18nGet('fill_at_least_one_parameter'),
                )
            }

            this.setInitialState();
        }
    }

    renderDeleteButton() {
        return (
            <TouchableOpacity
                style={styles.deleteButtonTouchable}
                onPress={this.onDeleteClick}
            >
                <Text style={styles.deleteButtonText}>
                    {i18nGet('delete')}
                </Text>
            </TouchableOpacity>
        )
    }

    onDeleteClick = () => {
        Alert.alert(
            i18nGet('are_you_sure'),
            '',
            [
                {
                    text: i18nGet('delete'),
                    onPress: () => this.deleteNote(),
                },
                {
                    text: i18nGet('cancel'),
                },
            ],
        )
    }

    deleteNote = () => {
        // this.props.onNoteDelete(this.props.note.id);
        this.props.dispatch(createDeleteNoteAction(this.props.note.id))
        this.props.hidePopup()
    }

    setInitialState() {
        this.setState({
            date: new Date(),
            glucose: 0,
            breadUnits: 0,
            insulin: 0,
            longInsulin: 0,
            commentary: "",
            currentValueType: NoteValueType.GLUCOSE
        })
    }

    get noteFromState() {
        let { currentValueType, ...note } = this.state;
        return {
            ...note,
            date: note.date.getTime(),
        };
    }
}

export const NoteCreationPopupConnect = connect(
    (state: IStorage) => ({
        noteList: state.noteList,
        interactive: state.interactive,
        userDiabetesProperties: state.userDiabetesProperties
    }),
    (dispatch: Dispatch<Action>) => ({ dispatch }),
    (stateProps, { dispatch }, ownProps: any) => {
        const noteId = stateProps.interactive.editingNoteId || "";
        return {
            ...stateProps,
            dispatch,
            note: stateProps.noteList[noteId] || null,
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
