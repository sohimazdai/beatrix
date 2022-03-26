import React from "react";
import { View, Text, ScrollView } from "react-native";
import { connect } from "react-redux";
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState
} from "react-navigation";
import { StyleSheet } from "react-native";

import { Note } from "../../view/shared/components/Note/Note";
import { TouchableOpacity } from "react-native-gesture-handler";
import { IconPositionType, StyledButton, StyledButtonType } from "../../component/button/StyledButton";
import { AddNoteIcon } from "../../component/icon/AddNoteIcon";

import { IStorage } from "../../model/IStorage";
import { INoteListByDay, INoteListNote } from "../../model/INoteList";
import { IUser } from '../../model/IUser';
import { IApp } from '../../model/IApp';
import { NavigatorEntities } from '../../navigator/modules/NavigatorEntities';
import { COLOR } from "../../constant/Color";
import { SHADOW_OPTIONS } from "../../constant/ShadowOptions";

import { appAnalytics, AnalyticsSections } from '../../app/Analytics';
import { createSyncNotesAction, SyncReasonType } from '../../store/service/note/SyncNotesSaga';
import { i18nGet } from '../../localisation/Translate';
import { HorizontalIconBar } from '../../view/shared/components/IconBar/HorizontalIconBar';
import { BlockHat } from '../../component/hat/BlockHat';
import { FilterIcon } from '../../component/icon/FilterIcon';
import { FilterPopupConnected } from '../../view/notes/components/filter-popup/FilterPopup';
import { selectFilteredNotes } from '../../view/notes/selectors/select-filtered-notes';
import { checkIsFilterActive } from '../../view/notes/selectors/check-is-filter-active';
import { createUserChangeAction } from '../../store/modules/user/UserActionCreator';

interface NoteListScreenStateTProps {
  app: IApp;
  noteListByDay: INoteListByDay;
  user: IUser;
  isFilterActive: boolean,
}

interface NoteListScreenDispatchProps {
  selectNoteToEdit: (noteId: string) => void;
  syncNotes: () => void;
  setNeedToRequestReview: () => void
}

interface NoteListScreenProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

interface FullProps
  extends NoteListScreenProps,
  NoteListScreenDispatchProps,
  NoteListScreenStateTProps { }

class NoteListScreen extends React.PureComponent<FullProps> {
  state = {
    noteCreationShown: false,
    noteEditingShown: false,
    editingNoteId: null,
    portionsToRender: 1,
    isFilterPopupOpen: false,
    selectedDate: new Date(),
  };

  componentDidMount() {
    this.props.setNeedToRequestReview();
    appAnalytics.setSection(AnalyticsSections.NOTES);
    appAnalytics.sendEvent(appAnalytics.events.NOTELIST_SEEN);
  }

  componentDidUpdate(pP: FullProps) {
    if (!pP.app.serverAvailable && this.props.app.serverAvailable) {
      this.props.syncNotes();
    }
  }

  goToNoteEditor = (noteId?: string) => {
    const { navigation } = this.props;

    navigation.navigate(NavigatorEntities.NOTE_EDITOR, { noteId });
  }

  renderFilterIcon() {
    const { isFilterActive } = this.props;

    return (
      <TouchableOpacity
        style={styles.filterIcon}
        onPress={() => this.setState({ isFilterPopupOpen: true })}
      >
        <FilterIcon width={20} height={20} />
        {isFilterActive && <View style={styles.redDot} />}
      </TouchableOpacity>
    )
  }

  goToTagEditor = () => {
    const { navigation } = this.props;

    navigation.navigate(NavigatorEntities.TAG_EDITOR, { backPage: NavigatorEntities.NOTE_LIST })
  }

  render() {
    const { navigation } = this.props;
    const { isFilterPopupOpen } = this.state;

    return (
      <>
        <View style={styles.screenView}>
          <BlockHat
            onBackPress={() => navigation.navigate('Dashboard')}
            title={i18nGet('notes')}
            rightSideSlot={this.renderFilterIcon()}
          />
          <View style={styles.content}>
            <HorizontalIconBar isBig />
            {this.renderCards()}
          </View>
          <View style={styles.addNoteButtonView}>
            <StyledButton
              fluid
              style={StyledButtonType.PRIMARY}
              onPress={this.goToNoteEditor}
              label={i18nGet('add_note')}
              icon={<AddNoteIcon />}
              iconPosition={IconPositionType.RIGHT}
            />
          </View>
        </View>
        <FilterPopupConnected
          isOpen={isFilterPopupOpen}
          onHide={this.hideFilter}
          goToTagEditor={this.goToTagEditor}
        />
      </>
    );
  }

  hideFilter = () => {
    this.setState({ isFilterPopupOpen: false });
  }

  showMorePosts = () => {
    this.setState({ portionsToRender: this.state.portionsToRender + 1 });
  }

  renderCards() {
    var portionSize = 10;
    const sortedDays = Object.keys(this.props.noteListByDay).sort(
      (a, b) => parseInt(b) - parseInt(a)
    );
    var daysToRender = sortedDays.slice(
      0,
      this.state.portionsToRender * portionSize
    );
    var isButtonShowing = sortedDays.length !== daysToRender.length;
    return daysToRender.length !== 0 ? (
      <ScrollView style={styles.cardsScrollView}>
        {
          daysToRender.map(day => {
            return (
              <View key={day} style={styles.cardWrap}>
                {this.renderDate(parseInt(day))}
                {this.renderCard(this.props.noteListByDay[day])}
              </View>
            )
          })
        }
        {isButtonShowing && this.renderShowMoreButton()}
        <View style={styles.noteListBottom}></View>
      </ScrollView>
    ) : (
      <Text style={styles.noNotesStub}>{i18nGet('notes_not_found')}</Text>
    )
  }

  renderDate(day: number) {
    const today = this.today;
    const yesterday = this.yesterday;
    let displayingDate = "";
    if (day === today) {
      displayingDate =
        `${i18nGet('today')}, ` +
        `${new Date(day).getDate()} ${this.getMonthString(
          new Date(day).getMonth()
        )}`;
    } else if (day === yesterday) {
      displayingDate =
        `${i18nGet('yesterday')}, ` +
        `${new Date(day).getDate()} ${this.getMonthString(
          new Date(day).getMonth()
        )}`;
    } else {
      displayingDate = `${new Date(day).getDate()} ${this.getMonthString(
        new Date(day).getMonth()
      )}`;
    }
    return (
      <View style={styles.dateView}>
        <Text style={styles.dateText}>{displayingDate}</Text>
      </View>
    );
  }

  renderCard(dayNotes: INoteListByDay) {
    const notes: INoteListNote[] = Object.values(dayNotes).sort((a, b) => {
      return b.date - a.date;
    });
    return (
      <View style={styles.dayNotes}>
        {notes.map(note => {
          return (
            <Note
              key={note.id}
              note={note}
              onPress={() => this.goToNoteEditor(note.id)}
            />
          );
        })}
      </View>
    );
  }

  renderShowMoreButton() {
    return (
      <View style={styles.showMoreButtonWrapper}>
        <TouchableOpacity
          style={styles.showMoreButton}
          onPress={this.showMorePosts}
        >
          <Text style={styles.addNoteButtonText}>{i18nGet('show_more')}</Text>
        </TouchableOpacity>
      </View>
    )
  }
  getMonthString(m: number) {
    switch (m) {
      case 0:
        return i18nGet('january');
      case 1:
        return i18nGet('february');
      case 2:
        return i18nGet('march');
      case 3:
        return i18nGet('april');
      case 4:
        return i18nGet('may');
      case 5:
        return i18nGet('june');
      case 6:
        return i18nGet('july');
      case 7:
        return i18nGet('august');
      case 8:
        return i18nGet('september');
      case 9:
        return i18nGet('october');
      case 10:
        return i18nGet('november');
      case 11:
        return i18nGet('december');
      default:
        console.warn("12 month is ... ? I think it is error");
    }
  }

  get today() {
    return new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate()
    ).getTime();
  }

  get yesterday() {
    return new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate() - 1
    ).getTime();
  }
}

export const NoteListScreenConnect = connect(
  (state: IStorage) => ({
    app: state.app,
    user: state.user,
    noteListByDay: selectFilteredNotes(state),
    isFilterActive: checkIsFilterActive(state),
  }),
  dispatch => ({
    dispatch,
    syncNotes: () => dispatch(createSyncNotesAction({ reason: SyncReasonType.SEND_PENDING })),
    setNeedToRequestReview: () => dispatch(createUserChangeAction({ needToRequestReview: true }))
  }),
)(NoteListScreen);

const styles = StyleSheet.create({
  screenView: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: COLOR.PRIMARY_WHITE,
  },
  filterIcon: {
    position: 'relative',
    padding: 5,
  },
  redDot: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: COLOR.RED,
  },
  contentWrap: {
    backgroundColor: "#2E3858",
  },
  content: {
    display: 'flex',
    height: '100%',
    width: '100%',
    flexDirection: 'column',
    backgroundColor: COLOR.PRIMARY_BASE,
  },
  cardsScrollView: {
    height: '100%',
    width: '100%',
    backgroundColor: COLOR.PRIMARY_WHITE,
  },
  cardWrap: {
    width: "100%",
    paddingVertical: 8,
    alignItems: "center"
  },
  dateView: {
    width: '100%',
    paddingLeft: 16,
    justifyContent: "flex-start",
    flexDirection: "row",
    alignItems: "flex-start"
  },
  dateText: {
    textAlign: "center",
    fontFamily: "Roboto",
    fontWeight: "bold",
    fontSize: 19,
    lineHeight: 22,
    marginTop: 8,
    color: "#555"
  },
  dayNotes: {
    width: "100%",
    flexDirection: "column"
  },
  cardHat: {
    height: 20,
    width: "100%",

    marginBottom: 20,

    justifyContent: "space-evenly",
    flexDirection: "row"
  },
  cardHatText: {
    width: "25%",

    textAlign: "center",
    fontFamily: "Roboto",
    fontSize: 16,
    lineHeight: 19,

    color: "#666666"
  },
  addNoteButtonView: {
    position: "absolute",
    bottom: 16,
    right: 16,

    ...SHADOW_OPTIONS
  },
  noNotesStub: {
    flex: 1,
    padding: 40,
    fontSize: 20,

    color: "#333333"
  },
  addNoteButton: {
    display: "flex",
    padding: 5,
    margin: 5,
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(250,250,250, 1)",
    borderRadius: 30,
    ...SHADOW_OPTIONS
  },
  addNoteButtonText: {
    fontSize: 18,
    color: "#333333",
    marginRight: 5
  },
  showMoreButtonWrapper: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  showMoreButton: {
    padding: 10,
    paddingHorizontal: 20,
    margin: 5,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: "rgba(250,250,250, 1)",
    borderRadius: 30,
    ...SHADOW_OPTIONS,
  },
  noteListBottom: {
    height: 120,
    width: '100%',
  },
  arrowDownIcon: {
    position: 'absolute',
    right: 8,
    top: 8,
    padding: 8,
  },
  popupHeader: {
    paddingHorizontal: 32,
    fontSize: 19,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
