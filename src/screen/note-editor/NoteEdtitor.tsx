import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Keyboard,
  Alert,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { NavigationParams, NavigationState, NavigationScreenProp } from 'react-navigation';

import { NumberScroller } from '../../view/notes/number-scroller/NumberScroller';
import { NoteInsulinDoseRecommendationConnect } from '../../view/notes/insulin-dose-recommendation/NoteInsulinDoseRecommendation';
import { ValueTypePicker } from '../../view/notes/value-type-picker/ValueTypePicker';
import { NoteTimePickerConnect } from '../../view/notes/note-date-picker/NoteTimePicker';
import { NoteDatePickerConnect } from '../../view/notes/note-date-picker/NoteDatePicker';
import { CloseIcon } from '../../component/icon/CloseIcon';

import { IInteractive } from '../../model/IInteractive';
import { INoteListNote, NoteValueType } from '../../model/INoteList';
import { IUserDiabetesProperties, CarbsMeasuringType } from '../../model/IUserDiabetesProperties';
import { IStorage } from '../../model/IStorage';
import { COLOR } from '../../constant/Color';
import { Measures } from '../../localisation/Measures';

import { createChangeInteractive } from '../../store/modules/interactive/interactive';
import { createDeleteNoteInNoteListById } from '../../store/modules/noteList/NoteListActionCreator';
import { SHADOW_OPTIONS } from '../../constant/ShadowOptions';
import { createDeleteNoteAction } from '../../store/service/note/DeleteNoteSaga';
import { i18nGet } from '../../localisation/Translate';
import { createCreateNoteAction } from '../../store/service/note/CreateNoteSaga';
import { createUpdateNoteAction } from '../../store/service/note/UpdateNoteSaga';
import { appAnalytics } from '../../app/Analytics';

interface Props {
  interactive?: IInteractive
  note?: INoteListNote
  userDiabetesProperties?: IUserDiabetesProperties
  dispatch?: (action) => void
  hidePopup?: () => void
  onNoteDelete?: (noteId: string) => void;
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
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

class NoteEditor extends React.PureComponent<Props, State>{
  state = {
    date: new Date(),
    glucose: 0,
    breadUnits: 0,
    insulin: 0,
    longInsulin: 0,
    commentary: '',
    currentValueType: NoteValueType.GLUCOSE,
  }

  componentDidMount() {
    //TODO: add analytics
  }

  componentDidUpdate(pP: Props, pS: State) {
    const { note } = this.props;

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
  }

  render() {
    return (
      <View
        style={!this.props.note ?
          styles.NoteEditorView :
          styles.noteEditingView
        }
      >
        <ScrollView style={styles.NoteEditorViewScrollView}>
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
      </View>
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
    const { navigation } = this.props;

    const isCreating =
      this.props.interactive.creatingNoteMode && !this.props.interactive.editingNoteId;

    switch (currentValueType) {
      case NoteValueType.GLUCOSE:
        return this.renderInputByType(NoteValueType.GLUCOSE, glucose)
      case NoteValueType.BREAD_UNITS:
        return this.renderInputByType(NoteValueType.BREAD_UNITS, breadUnits)
      case NoteValueType.SHORT_INSULIN:
        return <>
          {this.renderInputByType(NoteValueType.SHORT_INSULIN, insulin)}
          <NoteInsulinDoseRecommendationConnect
            note={this.noteFromState}
            navigation={navigation}
          />
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

export const NoteEditorConnect = connect(
  (state: IStorage) => ({
    noteList: state.noteList,
    interactive: state.interactive,
    userDiabetesProperties: state.userDiabetesProperties
  }),
  (dispatch) => ({ dispatch }),
  (stateProps, { dispatch }, ownProps: any) => {
    const noteId = stateProps.interactive.editingNoteId || "";
    return {
      ...ownProps,
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
)(NoteEditor)

const styles = StyleSheet.create({
  NoteEditorViewScrollView: {
    flex: 1,
    width: '100%',
    minHeight: Dimensions.get('screen').height * 0.9,
  },
  NoteEditorView: {
    flex: 1,
    width: '100%',
    height: Dimensions.get('screen').height * 0.9,
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
    height: Dimensions.get('screen').height * 0.9,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    backgroundColor: "#FFE1DF",
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  scrollViewContent: {
    flex: 1,
    height: Dimensions.get('screen').height * 0.9,
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  inputBlock: {
    flex: 3,
    width: '100%',
    paddingBottom: 20,
    flexDirection: 'column',
    justifyContent: 'flex-start',

    borderRadius: 25,

    alignItems: 'center',
  },
  buttonsBlock: {
    marginTop: 20,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  timePickers: {
    height: 50,
    width: 240,
    marginTop: 20,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textInDatePickerIOS: {
    textAlign: 'center',
  },
  inputView: {
    width: '100%',
    marginTop: 20,
  },
  commentInputView: {
    flex: 1,
    width: '100%',
    margin: 15,
    marginBottom: 0,
    height: 185
  },
  saveButtonTouchable: {
    padding: 15,
    marginVertical: 10,

    ...SHADOW_OPTIONS,

    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLOR.PRIMARY,
  },
  saveButtonText: {
    fontFamily: 'Roboto',
    fontSize: 17,
    color: COLOR.WHITE,
    fontWeight: 'bold',
  },
  deleteButtonTouchable: {
    marginVertical: 10,
    padding: 15,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    backgroundColor: COLOR.RED_DARK,
  },
  deleteButtonText: {
    fontFamily: 'Roboto',
    fontSize: 17,
    color: COLOR.WHITE,
    fontWeight: 'bold',
  },
  inputViewTitle: {
    width: '100%',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 19,
    lineHeight: 20,
    fontWeight: "bold",
    color: COLOR.TEXT_DARK_GRAY
  },
  numberScrollWrapper: {
    marginTop: 40,
    height: 150,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  commentViewTextArea: {
    backgroundColor: 'white',
    padding: 10,
    width: '100%',
    borderRadius: 15,
    marginTop: 20,
  },
  hideTouchable: {
    position: 'absolute',
    right: 10,
    top: 10,
    height: 30,
    width: 30
  }
})

