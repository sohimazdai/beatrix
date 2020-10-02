import React from 'react';
import {
  View,
  TextInput,
  Keyboard,
  Alert,
  StyleSheet,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { NavigationParams, NavigationState, NavigationScreenProp } from 'react-navigation';

import { NumberScroller } from '../../view/notes/components/number-scroller/NumberScroller';
import { NoteInsulinDoseRecommendationConnect } from '../../view/notes/components/insulin-dose-recommendation/NoteInsulinDoseRecommendation';
import { ValueTypePicker } from '../../view/note-editor/components/value-type-picker/ValueTypePicker';
import { NoteTimePickerConnect } from '../../view/notes/components/note-date-picker/NoteTimePicker';
import { NoteDatePickerConnect } from '../../view/notes/components/note-date-picker/NoteDatePicker';
import { ArrowTaillessIcon, ArrowDirection } from '../../component/icon/ArrowTaillessIcon';

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
import { TagPicker } from '../../view/note-editor/components/tag-picker/TagPicker';
import { StyledButton, IconPositionType, StyledButtonType } from '../../component/button/StyledButton';
import { ITagList } from '../../model/ITagList';
import { TagsIcon } from '../../component/icon/TagsIcon';
import { PopupHeader } from '../../component/popup/PopupHeader';
import { VegetablesIcon } from '../../component/icon/value-icons/VegetablesIcon';
import { FoodListComponent } from '../../view/food/components/FoodList';
import { IFoodList } from '../../model/IFood';
import { sumMealTotal } from '../../view/food/modules/sumMealTotal';
import { numberizeAndFix } from '../../api/helper/numberize-and-fix';
import { MealTotal } from '../../view/note-editor/components/MealTotal';
import { BlockHat } from '../../component/hat/BlockHat';

const POPUP_PADDING_HORIZONTAL = 16;

const INITIAL_STATE = {
  date: new Date(),
  glucose: 0,
  breadUnits: 0,
  insulin: 0,
  longInsulin: 0,
  commentary: '',
  currentValueType: null,
  selectedTags: [],
  foodList: {},
};

interface Props {
  interactive?: IInteractive
  note?: INoteListNote
  userDiabetesProperties?: IUserDiabetesProperties
  dispatch?: (action) => void
  onNoteDelete?: (noteId: string) => void;
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
  tagList?: ITagList
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
  selectedTags?: string[]
  foodList: IFoodList,
}

class NoteEditor extends React.PureComponent<Props, State>{
  constructor(props: Props) {
    super(props);
    const { note } = props;

    if (note) {
      const {
        id, userId, carbsUnitWeight, carbsMeasuringType, glycemiaType, tagIds, ...restNote
      } = note;

      const noteFromProps: State = {
        ...INITIAL_STATE,
        ...restNote,
        selectedTags: tagIds,
        date: new Date(restNote.date),
      }

      this.state = noteFromProps;
    } else {
      this.state = {
        ...INITIAL_STATE,
        date: new Date(),
      }
    }
  }

  componentDidMount() {
    const { note } = this.props;

    appAnalytics.sendEventWithProps(appAnalytics.events.NOTE_EDITOR_SEEN, {
      isEditing: note ? true : false
    })
  }

  componentDidUpdate(pP: Props) {
    const { navigation } = this.props;
    const { foodList } = this.state;

    const foodForNote = navigation.getParam('foodForNote');
    const foodIdToRemove = navigation.getParam('foodIdToRemove');

    if (
      foodForNote && (
        pP.navigation.getParam('foodForNote')?.nutrients?.weight !== foodForNote?.nutrients?.weight ||
        pP.navigation.getParam('foodForNote')?.id !== foodForNote?.id
      )
    ) {
      const { _id, _v, ...rest } = foodForNote;
      this.setState({
        foodList: {
          ...foodList,
          [rest.id]: rest
        },
      });
      appAnalytics.sendEventWithProps(
        appAnalytics.events.FOOD_ADD_TO_NOTE,
        { dbId: rest.dbId, weight: rest.nutrients.weight }
      );
    }

    if (!pP.navigation.getParam('foodIdToRemove') && !!foodIdToRemove) {
      const newList = { ...foodList };
      delete newList[foodIdToRemove];

      this.setState({ foodList: newList });

      const foodToRemove = newList[foodIdToRemove];
      appAnalytics.sendEventWithProps(
        appAnalytics.events.FOOD_REMOVE_FROM_NOTE,
        { dbId: foodToRemove.dbId }
      )

      navigation.setParams({ foodIdToRemove: null })
    }
  }

  closeEditor = () => {
    const { navigation } = this.props;

    navigation.goBack();
  }

  get additionalCarbs() {
    const { userDiabetesProperties: { carbsMeasuringType, carbsUnitWeightType } } = this.props;
    const { foodList } = this.state;

    const measuring = Measures.getDefaultCarbsMeasuringType(carbsMeasuringType);
    const buWeight = Measures.getDefaultCarbsUnitWeightType(carbsUnitWeightType);
    const carbsTotal = sumMealTotal(foodList).carbohydrates;

    if (measuring === CarbsMeasuringType.BREAD_UNITS) {
      return numberizeAndFix(carbsTotal / buWeight);
    } else {
      return numberizeAndFix(carbsTotal);
    }
  }

  render() {
    const { note } = this.props;

    const title = note
      ? i18nGet('note_editing')
      : i18nGet('note_creation');

    return (
      <View style={{ ...styles.wrap, ...(!!note ? styles.wrapEditiing : {}) }}>
        <BlockHat
          onBackPress={this.closeEditor}
          title={title}
        />
        <ScrollView style={styles.scrollView} contentContainerStyle={{ flexGrow: 1, }}>
          {this.renderPickerBlock()}
          <View style={styles.bottomSpace} />
        </ScrollView>
        <View style={styles.buttonsBlock}>
          {this.props.note && this.renderDeleteButton()}
          {this.renderSaveButton()}
        </View>
        { this.renderInputPopup()}
        { this.renderCommentInputPopup()}
        { this.renderTagsPopup()}
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

  onValueTypePickerSelect = (type) => this.setState({
    currentValueType: type,
    isTagPickerOpen: false,
  })

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

  onTagSelect = (tagId: string) => {
    const { tagList } = this.props;
    const { selectedTags } = this.state;

    appAnalytics.sendEventWithProps(appAnalytics.events.CREATE_TAG, {
      name: tagList.tags[String(tagId)].name
    });

    if (selectedTags) {
      this.setState({
        selectedTags: [
          ...selectedTags,
          tagId
        ]
      })
    } else this.setState({ selectedTags: [tagId] })
  }

  goToTagEditor = () => {
    const { navigation } = this.props;

    navigation.navigate(
      NavigatorEntities.TAG_EDITOR,
      { backPage: NavigatorEntities.NOTE_EDITOR }
    );
  }

  renderTagsPopup() {
    const { isTagPickerOpen, selectedTags } = this.state;

    return (
      <SuperPopup
        hidden={!isTagPickerOpen}
        direction={PopupDirection.BOTTOM_TOP}
      >
        <View style={styles.tagPopupContent}>
          <PopupHeader
            title={i18nGet('tags')}
            leftSlot={
              <StyledButton
                icon={<TagsIcon width={30} height={30} fill={COLOR.PRIMARY} />}
                onPress={this.goToTagEditor}
                style={StyledButtonType.EMPTY}
              />
            }
            rightSlot={
              <StyledButton
                icon={<ArrowTaillessIcon direction={ArrowDirection.DOWN} width={20} height={30} fill={COLOR.PRIMARY} />}
                onPress={this.onDowArrowIconPress}
                style={StyledButtonType.EMPTY}
              />
            }
          />
          <TagPicker
            selectedTags={selectedTags}
            onTagPress={this.onTagSelect}
          />
        </View>
      </SuperPopup>
    )
  }

  onTagDelete = (tagId: string) => {
    const { selectedTags } = this.state;

    this.setState({
      selectedTags: selectedTags.filter((id: string) => id !== tagId),
    });
  }

  renderPickerBlock() {
    const { currentValueType, selectedTags, isTagPickerOpen, ...note } = this.state;

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
          breadUnits={
            !note.breadUnits && !this.additionalCarbs
              ? 0
              : `${note.breadUnits}+${this.additionalCarbs}`
          }
        />
        <View style={styles.foods}>
          <StyledButton
            icon={<VegetablesIcon width={30} height={30} />}
            iconPosition={IconPositionType.LEFT}
            label={i18nGet('add_food')}
            onPress={this.goToFood}
            style={StyledButtonType.EMPTY}
          />
          <View style={styles.foodList}>
            <FoodListComponent
              foodList={note.foodList}
              goToFoodCard={this.goToFoodCard}
              forNote
            />
          </View>
          {Object.values(note.foodList).length > 1 && (
            <MealTotal foodList={note.foodList} />
          )}
        </View>
        <View style={styles.tags}>
          <StyledButton
            icon={<TagsIcon width={30} height={30} fill={COLOR.PRIMARY} />}
            label={i18nGet('add_tag_to_note')}
            onPress={this.onTagPickerOpen}
            style={StyledButtonType.EMPTY}
            iconPosition={IconPositionType.LEFT}
          />
          <TagPicker
            viewerOfSelected
            width={280}
            selectedTags={selectedTags}
            onTagPress={this.onTagDelete}
          />
        </View>
      </View>
    )
  }

  renderInputPopup() {
    const { currentValueType } = this.state;

    const isCommentPopupVisible = currentValueType === NoteValueType.COMMENT;

    return (
      <SuperPopup
        hidden={!currentValueType || isCommentPopupVisible}
        direction={PopupDirection.BOTTOM_TOP}
      >
        <View style={styles.inputPopup}>
          {this.renderInputByValue()}
        </View>
      </SuperPopup>
    )
  }

  renderCommentInputPopup() {
    const { currentValueType } = this.state;

    const isCommentPopupVisible = currentValueType === NoteValueType.COMMENT;

    return (
      <SuperPopup
        hidden={!isCommentPopupVisible}
        direction={PopupDirection.TOP_BOTTOM}
      >
        <View style={styles.inputPopup}>
          {this.renderInputByValue()}
        </View>
      </SuperPopup>
    )
  }

  goToInsulinSettings = () => {
    const { navigation } = this.props;

    navigation.navigate(NavigatorEntities.SETTINGS_INSULIN, {
      backPage: NavigatorEntities.NOTE_EDITOR,
    });
  }

  goToFoodCard = (foodId?: string) => {
    const { navigation } = this.props;
    const { foodList } = this.state;

    const foodItem = foodList[foodId];

    navigation.navigate(NavigatorEntities.FOOD_CARD, {
      backPage: NavigatorEntities.NOTE_EDITOR,
      isForNote: true,
      foodForNote: null,
      foodItem,
      foodId,
      isEditing: true,
    });
  }

  goToFood = () => {
    const { navigation } = this.props;

    navigation.navigate(NavigatorEntities.FOOD_PAGE, {
      backPage: NavigatorEntities.NOTE_EDITOR,
      isForNote: true,
      foodForNote: null,
      isEditing: false,
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
            note={{
              ...this.noteFromState,
              breadUnits: this.noteFromState.breadUnits + this.additionalCarbs
            }}
            goToInsulinSettings={this.goToInsulinSettings}
          />
        </>
      case NoteValueType.LONG_INSULIN:
        return this.renderInputByType(NoteValueType.LONG_INSULIN, longInsulin)
      case NoteValueType.COMMENT:
        return (
          <>
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
            <View style={styles.commentPopupHeader}>
              <PopupHeader
                title={i18nGet(NoteValueType.COMMENT)}
                rightSlot={
                  <StyledButton
                    icon={<ArrowTaillessIcon direction={ArrowDirection.UP} />}
                    iconPosition={IconPositionType.LEFT}
                    style={StyledButtonType.EMPTY}
                    onPress={this.onDowArrowIconPress}
                  />
                }
                paddingHorizontal={POPUP_PADDING_HORIZONTAL}
              />
            </View>
          </>
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
      <>
        <PopupHeader
          paddingHorizontal={POPUP_PADDING_HORIZONTAL}
          title={`${i18nGet(name)}${displayedValue}`}
          rightSlot={
            <StyledButton
              style={StyledButtonType.EMPTY}
              onPress={this.onDowArrowIconPress}
              iconPosition={IconPositionType.LEFT}
              icon={<ArrowTaillessIcon direction={ArrowDirection.DOWN} />}
            />
          }
        />
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
      </>
    )
  }

  renderSaveButton() {
    return (
      <StyledButton
        style={StyledButtonType.PRIMARY}
        onPress={this.createNote}
        label={this.props.note ? i18nGet('rewrite') : i18nGet('write')}
      />
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
      if (
        note.glucose || note.breadUnits || note.insulin ||
        note.longInsulin || note.commentary || this.additionalCarbs
      ) {
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
      <StyledButton
        style={StyledButtonType.DELETE}
        onPress={this.onDeleteClick}
        label={i18nGet('delete')}
      />
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

  get noteFromState(): INoteListNote {
    let { currentValueType, isTagPickerOpen, selectedTags, ...note } = this.state;
    return {
      ...note,
      date: note.date.getTime(),
      tagIds: selectedTags,
    };
  }
}

export const NoteEditorConnect = connect(
  (state: IStorage) => ({
    noteList: state.noteList,
    interactive: state.interactive,
    userDiabetesProperties: state.userDiabetesProperties,
    tagList: state.tagList,
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
  wrap: {
    position: 'relative',
    backgroundColor: COLOR.BLUE_BASE,
    flex: 1,
  },
  wrapEditiing: {
    position: 'relative',
    backgroundColor: COLOR.RED_BASE,
  },
  scrollView: {
    height: '100%',
    flexGrow: 1,
  },
  inputBlock: {
    flex: 1,
    maxWidth: 400,
    paddingBottom: 20,
    paddingHorizontal: 16,
    flexDirection: 'column',
    justifyContent: 'flex-start',

    borderRadius: 25,

    alignItems: 'center',
  },
  buttonsBlock: {
    position: 'absolute',
    bottom: 16,
    paddingHorizontal: 16,
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
  foods: {
    width: '100%',
    marginTop: 16,
    alignItems: 'flex-start',
    backgroundColor: COLOR.HALF_TRANSPARENT,
    padding: 8,
    borderRadius: 10,
  },
  foodList: {
    flex: 1,
    width: '100%',
  },
  tags: {
    width: '100%',
    marginTop: 16,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    backgroundColor: COLOR.HALF_TRANSPARENT,
    padding: 8,
    borderRadius: 10,
  },
  tagPopupContent: {
    padding: POPUP_PADDING_HORIZONTAL,
    backgroundColor: COLOR.WHITE,
  },
  inputView: {
    width: '100%',
    marginTop: 20,
  },
  commentPopupHeader: {
    width: '100%',
    marginBottom: 16,
  },
  commentInputView: {
    width: '100%',
    margin: 15,
    marginBottom: 0,
    paddingBottom: 50,
  },
  bottomSpace: {
    width: '100%',
    height: 120,
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
    textAlign: 'center',
    flex: 1,
    fontSize: 19,
    fontWeight: "bold",
    color: COLOR.TEXT_DARK_GRAY
  },
  numberScrollWrapper: {
    marginVertical: 20,
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
    marginVertical: 20,
    borderWidth: 1,
    borderColor: COLOR.PRIMARY,
  },
  inputPopup: {
    backgroundColor: COLOR.PRIMARY_WHITE,
    alignItems: 'center',
    paddingTop: 16,
  },
  arrowDownIcon: {
    padding: 8,
  },
  toTabsIcon: {
    padding: 8,
  }
})

