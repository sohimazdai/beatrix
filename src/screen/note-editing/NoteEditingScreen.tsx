// import React from 'react';
// import {
//     View,
//     Text,
//     TextInput,
//     StyleSheet,
//     TouchableOpacity,
//     Slider,
//     SliderComponent,
//     SliderBase,
//     DatePickerAndroid,
//     Platform,
//     DatePickerIOS,
//     ScrollView,
//     KeyboardAvoidingView,
// } from 'react-native';
// import { connect } from 'react-redux';
// import { Dispatch, Action } from 'redux';
// import { NoteInputWithSlider } from '../../view/notes/note-input/NoteInputWithSlider';
// import { INoteListNote, INoteList } from '../../model/INoteList';
// import { createNoteListChangeNoteByIdAction, deleteNoteInNoteListById } from '../../store/modules/noteList/NoteListActionCreator';
// import { ThemeColor } from '../../constant/ThemeColor';
// import { Hat } from '../../component/hat/Hat';
// import * as lodash from "lodash"
// import { IAppState } from '../../model/IAppState';
// import { shadowOptions } from '../../constant/shadowOptions';
// import { createModalChangeAction } from '../../store/modules/modal/ModalActionCreator';
// import { ModalType, IModalConfirm } from '../../model/IModal';
// import { DeleteNoteIcon } from '../../component/icon/DeleteNoteIcon';
// import { ChangeNoteIcon } from '../../component/icon/ChangeNoteIcon';
// import { NoteDatePickerConnect } from '../../view/notes/note-date-picker/NoteDatePicker';
// import { NoteTimePickerConnect } from '../../view/notes/note-date-picker/NoteTimePicker';
// import { ArrowDownIcon } from '../../component/icon/ArrowDownIcon';


// enum InputType {
//     GLUCOSE = 'Глюкоза',
//     BREAD_UNITS = 'ХЕ',
//     INSULIN = 'Инсулин',
// }


// interface NoteEditingStateToProps {
//     noteList?: INoteList
// }

// interface NoteEditingDispatchProps {
//     dispatch?: Dispatch<Action>
// }

// interface NoteMergeProps {
//     noteId?: number
//     note?: INoteListNote
//     onDeleteNote?: () => void
// }

// interface NoteEditingProps {
//     noteId?: number
//     onBackPress?: () => void
// }

// interface NoteEdittingScreenState {
//     date: Date
//     glucoseInput: string
//     breadUnitsInput: string
//     insulinInput: string
//     longInsulinInput: string
// }

// interface FullProps extends NoteEditingStateToProps, NoteEditingDispatchProps, NoteEditingProps, NoteMergeProps { }

// interface FullState extends NoteEdittingScreenState { }

// class NoteEditingScreen extends React.PureComponent<FullProps, FullState>{
//     state = {
//         date: new Date(this.props.note.date),
//         glucoseInput: this.props.note.glucose.toString(),
//         breadUnitsInput: this.props.note.breadUnits.toString(),
//         insulinInput: this.props.note.insulin.toString(),
//         longInsulinInput: this.props.note.longInsulin.toString(),
//     }

//     render() {
//         return (
//             <KeyboardAvoidingView
//                 style={styles.noteEdittingView}
//                 behavior='padding'
//             >
//                 <ScrollView style={styles.scrollView}>
//                     <View style={styles.scrollViewContent}>
//                         {this.renderInputBlock()}
//                         <View style={styles.noteButtons}>
//                             {this.renderDeleteButton()}
//                             {this.renderChangeButton()}
//                         </View>
//                     </View>
//                 </ScrollView>
//                 <TouchableOpacity
//                     style={styles.arrowDown}
//                     onPress={this.props.onBackPress}
//                 >
//                     <ArrowDownIcon />
//                 </TouchableOpacity>
//             </KeyboardAvoidingView>
//         )
//     }


//     renderInputBlock() {
//         let { glucoseInput, breadUnitsInput, insulinInput, longInsulinInput } = this.state;

//         glucoseInput = glucoseInput.includes(',') ? glucoseInput.replace(/,/g, '.') : glucoseInput || glucoseInput.includes('undefined') ? glucoseInput.replace(/undefined/g, '0') : glucoseInput;
//         breadUnitsInput = breadUnitsInput.includes(',') ? breadUnitsInput.replace(/,/g, '.') : breadUnitsInput || breadUnitsInput.includes('undefined') ? breadUnitsInput.replace(/undefined/g, '0') : breadUnitsInput;
//         insulinInput = insulinInput.includes(',') ? insulinInput.replace(/,/g, '.') : insulinInput || insulinInput.includes('undefined') ? insulinInput.replace(/undefined/g, '0') : insulinInput;
//         longInsulinInput = longInsulinInput.includes(',') ? longInsulinInput.replace(/,/g, '.') : longInsulinInput || longInsulinInput.includes('undefined') ? longInsulinInput.replace(/undefined/g, '0') : longInsulinInput;

//         return (
//             <View style={styles.inputBlock}>
//                 <View style={styles.pickers}>
//                     <NoteDatePickerConnect
//                         date={this.state.date}
//                         onChange={(value: Date) => this.setState({
//                             date: new Date(
//                                 value.getFullYear(),
//                                 value.getMonth(),
//                                 value.getDate(),
//                                 this.state.date.getHours(),
//                                 this.state.date.getMinutes(),
//                             )
//                         })}
//                     />
//                     <NoteTimePickerConnect
//                         date={this.state.date}
//                         onChange={(value) => this.setState({ date: value })}
//                     />
//                 </View>
//                 <View style={styles.inputView}>
//                     <NoteInputWithSlider
//                         inputTitle={InputType.GLUCOSE}
//                         value={glucoseInput}
//                         maximumNum={'15'}
//                         onChangeText={(value) =>
//                             this.setState({ glucoseInput: value })
//                         }
//                         onNaturalSlide={lodash.debounce((value) =>
//                             this.setState({
//                                 glucoseInput: value + '.' + glucoseInput.split('.')[1]
//                             }), 50
//                         )}
//                         onDecimalSlide={lodash.debounce((value) =>
//                             this.setState({
//                                 glucoseInput:
//                                     glucoseInput.split('.')[0] + '.' +
//                                     value.toString().split('.')[1]
//                             }), 50
//                         )}
//                     />
//                 </View>
//                 <View style={styles.inputView}>
//                     <NoteInputWithSlider
//                         inputTitle={InputType.BREAD_UNITS}
//                         value={breadUnitsInput}
//                         maximumNum={'12'}
//                         onChangeText={(value) =>
//                             this.setState({ breadUnitsInput: value })
//                         }
//                         onNaturalSlide={lodash.debounce((value) =>
//                             this.setState({
//                                 breadUnitsInput: value + '.' + breadUnitsInput.split('.')[1]
//                             }), 50
//                         )}
//                         onDecimalSlide={lodash.debounce((value) =>
//                             this.setState({
//                                 breadUnitsInput:
//                                     breadUnitsInput.split('.')[0] + '.' +
//                                     value.toString().split('.')[1]
//                             }), 50
//                         )}
//                     />
//                 </View>
//                 <View style={styles.inputView}>
//                     <NoteInputWithSlider
//                         inputTitle={InputType.INSULIN}
//                         value={insulinInput}
//                         maximumNum={'15'}
//                         onChangeText={(value) =>
//                             this.setState({ insulinInput: value })
//                         }
//                         onNaturalSlide={lodash.debounce((value) =>
//                             this.setState({
//                                 insulinInput: value + '.' + insulinInput.split('.')[1]
//                             }), 50
//                         )}
//                         onDecimalSlide={lodash.debounce((value) =>
//                             this.setState({
//                                 insulinInput:
//                                     insulinInput.split('.')[0] + '.' +
//                                     value.toString().split('.')[1]
//                             }), 50
//                         )}
//                     />
//                 </View>
//                 <View style={styles.inputView}>
//                     <NoteInputWithSlider
//                         inputTitle={InputType.INSULIN}
//                         value={longInsulinInput}
//                         maximumNum={'25'}
//                         onChangeText={(value) =>
//                             this.setState({ longInsulinInput: value })
//                         }
//                         onNaturalSlide={lodash.debounce((value) =>
//                             this.setState({
//                                 longInsulinInput: value + '.' + longInsulinInput.split('.')[1]
//                             }), 50
//                         )}
//                         onDecimalSlide={lodash.debounce((value) =>
//                             this.setState({
//                                 longInsulinInput:
//                                     longInsulinInput.split('.')[0] + '.' +
//                                     value.toString().split('.')[1]
//                             }), 50
//                         )}
//                     />
//                 </View>
//             </View>
//         )
//     }

//     renderChangeButton() {
//         return (
//             <TouchableOpacity
//                 style={styles.changeButton}
//                 onPress={this.changeNote}
//             >
//                 <ChangeNoteIcon />
//                 <Text style={styles.changeButtonText}>
//                     Изменить
//                 </Text>
//             </TouchableOpacity>
//         )
//     }

//     renderDeleteButton() {
//         return (
//             <TouchableOpacity
//                 style={styles.deleteButton}
//                 onPress={this.onDeleteClick}
//             >
//                 <DeleteNoteIcon />
//                 <Text style={styles.removeButtonText}>
//                     Удалить
//                 </Text>
//             </TouchableOpacity>
//         )
//     }

//     changeNote = () => {
//         let { glucoseInput, breadUnitsInput, insulinInput, longInsulinInput } = this.state;
//         glucoseInput = glucoseInput.includes(',') ? glucoseInput.replace(/,/g, '.') : glucoseInput;
//         breadUnitsInput = breadUnitsInput.includes(',') ? breadUnitsInput.replace(/,/g, '.') : breadUnitsInput;
//         insulinInput = insulinInput.includes(',') ? insulinInput.replace(/,/g, '.') : insulinInput;
//         longInsulinInput = longInsulinInput.includes(',') ? longInsulinInput.replace(/,/g, '.') : longInsulinInput;

//         let note: INoteListNote = {
//             date: this.state.date.getTime(),
//             glucose: glucoseInput && parseFloat(glucoseInput) || 0,
//             breadUnits: breadUnitsInput && parseFloat(breadUnitsInput) || 0,
//             insulin: insulinInput && parseFloat(insulinInput) || 0,
//             longInsulin: longInsulinInput && parseFloat(longInsulinInput) || 0
//         }

//         if (note.glucose || note.breadUnits || note.insulin || note.longInsulin) {
//             if (note.date !== this.props.note.date) {
//                 this.props.onDeleteNote();
//                 this.props.dispatch(createNoteListChangeNoteByIdAction(note));
//                 this.props.onBackPress()
//             }
//             else {
//                 this.props.dispatch(createNoteListChangeNoteByIdAction(note));
//                 this.props.onBackPress()
//             }
//         } else {
//             alert('Заполните хотя бы одно поле')
//         }
//     }
//     onDeleteClick = () => {
//         const confirmData: IModalConfirm = {
//             data: {
//                 questionText: 'Вы уверены, что хотите удалить эту запись?',
//                 positiveButtonText: 'Удалить',
//                 negativeButtonText: 'Оставить',

//                 onPositiveClick: () => this.deleteNote(),
//             }
//         }
//         this.props.dispatch(createModalChangeAction({
//             type: ModalType.CONFIRM,
//             needToShow: true,
//             ...confirmData
//         }))
//     }

//     deleteNote = () => {
//         this.props.onDeleteNote();
//         this.props.onBackPress()
//     }
// }

// export const NoteEditingScreenConnect = connect<NoteEditingStateToProps, NoteEditingDispatchProps, NoteMergeProps>(
//     (state: IAppState) => ({
//         noteList: state.noteList
//     }),
//     (dispatch: Dispatch<Action>) => ({ dispatch }),
//     (stateProps, { dispatch }, ownProps) => {
//         return {
//             ...ownProps,
//             note: stateProps.noteList[ownProps.noteId],
//             dispatch,
//             onDeleteNote() {
//                 dispatch(deleteNoteInNoteListById(ownProps.noteId))
//             }
//         }
//     }
// )(NoteEditingScreen)

// const styles = StyleSheet.create({
//     noteEdittingView: {
//         flex: 1,
//         width: '100%',
//         height: '100%',

//         paddingTop: 30,

//         flexDirection: 'column',
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: "#4B5860",
//     },

//     scrollView: {
//         flex: 1,
//         width: '100%',
//         height: '100%',
//     },

//     scrollViewContent: {
//         flex: 1,
//         height: '100%',
//         flexDirection: 'column',
//         justifyContent: 'center',
//         alignItems: 'center',
//     },

//     inputBlock: {
//         width: '100%',
//         justifyContent: 'center',
//         marginTop: 30,
//         paddingTop: 31,
//         paddingBottom: 15,

//         elevation: 2,

//         ...shadowOptions,

//         borderRadius: 25,

//         alignItems: 'center',
//         backgroundColor: "#FFF8F2",

//     },
//     pickers: {
//         flex: 1,
//         height: 25,
//         width: '80%',

//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//     },
//     textInDatePickerIOS: {
//         textAlign: 'center',
//     },
//     inputView: {
//         flex: 1,
//         margin: 15,
//         marginRight: 10,
//     },
//     noteButtons: {
//         flex: 1,

//         width: '90%',

//         margin: 14,

//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'space-between',
//     },
//     changeButton: {
//         flex: 1,
//         width: 160,
//         height: 50,

//         marginLeft: 20,
//         paddingLeft: 10,

//         elevation: 2,
//         ...shadowOptions,

//         borderRadius: 15,
//         backgroundColor: ThemeColor.LIGHT_BLUE,
//         flexDirection: 'row',
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     changeButtonText: {
//         flex: 1,
//         marginLeft: 20,
//         fontFamily: 'Roboto',
//         fontSize: 16,
//         color: '#666666',
//     },
//     deleteButton: {
//         flex: 1,
//         width: 140,
//         height: 50,

//         paddingLeft: 10,

//         elevation: 2,
//         ...shadowOptions,

//         borderRadius: 15,
//         backgroundColor: ThemeColor.BRIGHT_RED,
//         flexDirection: 'row',
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     removeButtonText: {
//         flex: 1,
//         marginLeft: 20,
//         fontFamily: 'Roboto',
//         fontSize: 16,
//         color: ThemeColor.WHITE,
//     },
//     arrowDown: {
//         position: 'absolute',
//         right: 20,
//         top: 20,
//     }
// })

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
import { INoteListNote, NoteValueType } from '../../model/INoteList';
import { createNoteListChangeNoteByIdAction } from '../../store/modules/noteList/NoteListActionCreator';
import { ThemeColor } from '../../constant/ThemeColor';
import * as lodash from "lodash";
import { shadowOptions } from '../../constant/shadowOptions';
import { NoteInputWithSlider } from '../../view/notes/note-input/NoteInputWithSlider';
import { createModalChangeAction } from '../../store/modules/modal/ModalActionCreator';
import { ModalType, IModalConfirm } from '../../model/IModal';
import { NoteDatePickerConnect } from '../../view/notes/note-date-picker/NoteDatePicker';
import { NoteTimePickerConnect } from '../../view/notes/note-date-picker/NoteTimePicker';
import { ArrowDownIcon } from '../../component/icon/ArrowDownIcon';
import { ValueTypePicker } from '../../view/notes/value-type-picker/ValueTypePicker';
import { IAppState } from '../../model/IAppState';
import { stat } from 'fs';

enum InputType {
    GLUCOSE = 'Глюкоза',
    BREAD_UNITS = 'ХЕ',
    LONG_INSULIN = 'Длинный',
    INSULIN = 'Короткий',
    COMMENT = 'Комментарий'
}

interface NoteEditingScreenProps {
    note?: INoteListNote
    dispatch?: (action: Action) => void
    onBackPress?: () => void
}

interface NoteEditingScreenState {
    date: Date
    glucoseInput: string
    breadUnitsInput: string
    insulinInput: string
    longInsulinInput: string
    currentValueType: NoteValueType
    commentary: string
}

interface FullState extends NoteEditingScreenState { }

class NoteEditingScreen extends React.PureComponent<NoteEditingScreenProps, FullState>{
    state = {
        date: new Date(this.props.note.date),
        glucoseInput: this.props.note.glucose.toString(),
        breadUnitsInput: this.props.note.breadUnits.toString(),
        insulinInput: this.props.note.insulin.toString(),
        longInsulinInput: this.props.note.longInsulin.toString(),
        commentary: this.props.note.commentary,
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
                    <View style={styles.editButtons}>
                        {this.renderDeleteButton()}
                        {this.renderSaveButton()}
                    </View>
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
        // this.props.onDeleteNote();
        this.props.onBackPress()
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

export const NoteEditingScreenConnect = connect(
    (state: IAppState) => ({ notes: state.noteList }),
    (dispatch: Dispatch<Action>) => ({ dispatch }),
    (stateProps, { dispatch }, ownProps: any) => {
        return {
            ...ownProps,
            dispatch,
            note: stateProps.notes[ownProps.noteId]
        }
    }
)(NoteEditingScreen)

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
    editButtons: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },

    inputBlock: {
        flex: 1,
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 16,

        elevation: 2,

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
        width: 150,
        height: 50,

        marginVertical: 10,
        marginLeft: 15,

        elevation: 2,
        ...shadowOptions,

        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "rgba(250, 250, 250, 0.9)",

    },
    deleteButtonTouchable: {
        width: 150,
        height: 50,

        marginVertical: 10,

        elevation: 2,
        ...shadowOptions,

        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "rgba(255,225,223, 0.9)",

    },
    saveButtonText: {
        fontFamily: 'Roboto',
        fontSize: 19,
        color: '#333333',
        fontWeight: 'bold',
    },
    deleteButtonText: {
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

