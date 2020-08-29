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
  KeyboardAvoidingView,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { NavigationParams, NavigationState, NavigationScreenProp } from 'react-navigation';

import { NumberScroller } from '../../view/notes/number-scroller/NumberScroller';
import { NoteInsulinDoseRecommendationConnect } from '../../view/notes/insulin-dose-recommendation/NoteInsulinDoseRecommendation';
import { ValueTypePicker } from '../../view/note-editor/value-type-picker/ValueTypePicker';
import { NoteTimePickerConnect } from '../../view/notes/note-date-picker/NoteTimePicker';
import { NoteDatePickerConnect } from '../../view/notes/note-date-picker/NoteDatePicker';
import { DownArrowIcon } from '../../component/icon/ArrowDownIcon';

import { IInteractive } from '../../model/IInteractive';
import { INoteListNote, NoteValueType } from '../../model/INoteList';
import { IUserDiabetesProperties, CarbsMeasuringType } from '../../model/IUserDiabetesProperties';
import { IStorage } from '../../model/IStorage';
import { COLOR } from '../../constant/Color';
import { Measures } from '../../localisation/Measures';

import { SuperPopup, PopupDirection } from '../../component/popup/SuperPopup';
import { createDeleteNoteInNoteListById } from '../../store/modules/noteList/NoteListActionCreator';
import { SHADOW_OPTIONS } from '../../constant/ShadowOptions';
import { createDeleteNoteAction } from '../../store/service/note/DeleteNoteSaga';
import { i18nGet } from '../../localisation/Translate';
import { createCreateNoteAction } from '../../store/service/note/CreateNoteSaga';
import { createUpdateNoteAction } from '../../store/service/note/UpdateNoteSaga';
import { appAnalytics } from '../../app/Analytics';
import { NavigatorEntities } from '../../navigator/modules/NavigatorEntities';
import { Hat } from '../../component/hat/Hat';
import { TagPicker } from '../../view/note-editor/tag-picker/TagPicker';
import { StyledButton, IconPositionType, StyledButtonType } from '../../component/button/StyledButton';
import { AddNoteIcon } from '../../component/icon/AddNoteIcon';
import { PlusRoundedIcon } from '../../component/icon/PlusRoundedIcon';

const INITIAL_STATE = {
  date: new Date(),
  glucose: 0,
  breadUnits: 0,
  insulin: 0,
  longInsulin: 0,
  commentary: '',
  currentValueType: null,
};

interface Props {
  interactive?: IInteractive
  note?: INoteListNote
  userDiabetesProperties?: IUserDiabetesProperties
  dispatch?: (action) => void
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
  isTagPickerOpen?: boolean
}

class NoteEditor extends React.PureComponent<Props, State>{
  constructor(props: Props) {
    super(props);
    const { note } = props;

    if (note) {
      const { id, userId, carbsUnitWeight, carbsMeasuringType, glycemiaType, ...restNote } = note;

      const noteFromProps: State = {
        ...INITIAL_STATE,
        ...restNote,
        date: new Date(restNote.date),
      }

      this.state = noteFromProps;
    } else this.state = INITIAL_STATE
  }

  componentDidMount() {
    const { note } = this.props;

    appAnalytics.sendEventWithProps(appAnalytics.events.NOTE_EDITOR_SEEN, {
      isEditing: note ? true : false
    })
  }

  closeEditor = () => {
    const { navigation } = this.props;

    navigation.goBack();
  }

  render() {
    const { note } = this.props;

    const title = note
      ? i18nGet('note_editing')
      : i18nGet('note_creation');

    return (
      <View
        style={note
          ? styles.noteEditingView
          : styles.noteCreationView
        }
      >
        <Hat
          onBackPress={this.closeEditor}
          title={title}
        />
        <ScrollView
          style={note
            ? styles.noteEditingViewScrollView
            : styles.noteCreationViewScrollView
          }
        >
          <View
            style={note
              ? styles.noteEditingScrollViewContent
              : styles.noteCreationScrollViewContent
            }
          >
            {this.renderPickerBlock()}
          </View>
        </ScrollView>
        <View style={styles.buttonsBlock}>
          {this.props.note && this.renderDeleteButton()}
          {this.renderSaveButton()}
        </View>
        <KeyboardAvoidingView behavior='position'>
          {this.renderInputPopup()}
          {this.renderTagsPopup()}
        </KeyboardAvoidingView>
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

  onDowArrowIconPress = () => {
    const { currentValueType } = this.state;

    const analyticsProp = currentValueType
      ? currentValueType
      : 'tag-picker';

    appAnalytics.sendEventWithProps(
      appAnalytics.events.NOTE_EDITOR_INPUT_POPUP_CLOSED,
      analyticsProp
    );

    this.setState({ currentValueType: null, isTagPickerOpen: false })
  }

  onTagPickerOpen = () => {
    this.setState({
      isTagPickerOpen: true,
      currentValueType: null,
    })
  }

  renderTagsPopup() {
    const { navigation } = this.props;
    const { isTagPickerOpen } = this.state;

    return (
      <SuperPopup
        hidden={!isTagPickerOpen}
        direction={PopupDirection.BOTTOM_TOP}
      >
        <TagPicker navigation={navigation} />
        <TouchableOpacity
          style={styles.arrowDownIcon}
          onPress={this.onDowArrowIconPress}
        >
          <DownArrowIcon />
        </TouchableOpacity>
      </SuperPopup>
    )
  }

  renderInputPopup() {
    const { currentValueType } = this.state;

    return (
      <SuperPopup
        hidden={!currentValueType}
        direction={PopupDirection.BOTTOM_TOP}
      >
        <View style={styles.inputPopup}>
          {this.renderInputByValue()}
        </View>
        <TouchableOpacity
          style={styles.arrowDownIcon}
          onPress={this.onDowArrowIconPress}
        >
          <DownArrowIcon />
        </TouchableOpacity>
      </SuperPopup>
    )
  }

  renderPickerBlock() {
    const { currentValueType, ...note } = this.state;
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
          {...note}
        />
        <View style={styles.addTagsButtons}>
          <StyledButton
            fluid
            icon={<PlusRoundedIcon color={COLOR.PRIMARY} />}
            iconPosition={IconPositionType.LEFT}
            label={i18nGet('add_tag_to_note')}
            onPress={this.onTagPickerOpen}
            style={StyledButtonType.EMPTY}
          />
        </View>
      </View>
    )
  }

  goToInsulinSettings = () => {
    const { navigation } = this.props;

    navigation.navigate(NavigatorEntities.SETTINGS_INSULIN, {
      backPage: NavigatorEntities.NOTE_EDITOR,
    });
  }

  renderInputByValue() {
    let { glucose, breadUnits, insulin, longInsulin, currentValueType, commentary } = this.state;

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
            goToInsulinSettings={this.goToInsulinSettings}
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
                defaultValue={commentary}
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
      this.closeEditor();
    }
    else {
      if (note.glucose || note.breadUnits || note.insulin || note.longInsulin || note.commentary) {
        this.props.dispatch(createCreateNoteAction({
          ...note,
          glycemiaType: Measures.getDefaultGlucoseMeasuringType(glycemiaMeasuringType),
          carbsMeasuringType: Measures.getDefaultCarbsMeasuringType(carbsMeasuringType),
        }));
        this.closeEditor()
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
    this.props.dispatch(createDeleteNoteAction(this.props.note.id))
    this.closeEditor()
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
  (stateProps, { dispatch }, ownProps: Partial<Props>) => {
    const noteId = ownProps.navigation.getParam('noteId') || "";

    return {
      ...ownProps,
      ...stateProps,
      dispatch,
      note: stateProps.noteList[noteId] || null,
      onNoteDelete(noteId) {
        dispatch(createDeleteNoteInNoteListById(noteId))
      }
    }
  }
)(NoteEditor)

const styles = StyleSheet.create({
  noteCreationView: {
    backgroundColor: COLOR.PRIMARY,
  },
  noteEditingView: {
    backgroundColor: COLOR.PRIMARY,
  },
  noteCreationViewScrollView: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: COLOR.BLUE_BASE,
  },
  noteEditingViewScrollView: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: COLOR.RED_BASE,
  },
  noteEditingScrollViewContent: {
    minHeight: Dimensions.get('screen').height - 75,
    alignItems: 'center',
  },
  noteCreationScrollViewContent: {
    minHeight: Dimensions.get('screen').height - 75,
    alignItems: 'center',
  },
  inputBlock: {
    width: '100%',
    maxWidth: 280,
    paddingBottom: 20,
    flexDirection: 'column',
    justifyContent: 'flex-start',

    borderRadius: 25,

    alignItems: 'center',
  },
  buttonsBlock: {
    position: 'absolute',
    bottom: 16,
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
  addTagsButtons: {
    width: '100%',
    marginTop: 16,
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
    paddingHorizontal: 32,
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
  inputPopup: {
    position: 'relative',
    backgroundColor: COLOR.PRIMARY_WHITE,
    alignItems: 'center',
  },
  arrowDownIcon: {
    position: 'absolute',
    padding: 8,
    top: 8,
    right: 8,
  },
})

