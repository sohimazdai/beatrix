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
import { NoteCreationButton } from "../../view/notes/note-creation-popup/button/NoteCreationButton";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ProfileIcon } from "../../component/icon/ProfileIcon";
import { Hat } from '../../component/hat/Hat';
import { GlycemiaIconConnected } from '../../component/icon/tooltiped/GlycemiaIcon';
import { ClocsIconTooltipedConnected } from '../../component/icon/tooltiped/ClocsIconTooltiped';
import { BreadUnitsIconConnected } from '../../component/icon/tooltiped/BreadUnitsIcon';
import { LongInsulinIconConnected } from '../../component/icon/tooltiped/LongInsulinIcon';
import { ShortInsulinIconConnected } from '../../component/icon/tooltiped/ShortInsulinIcon';

import { IStorage } from "../../model/IStorage";
import { INoteListByDay, INoteListNote } from "../../model/INoteList";
import { IUser } from '../../model/IUser';
import { IApp } from '../../model/IApp';
import { NavigatorEntities } from '../../navigator/modules/NavigatorEntities';
import { COLOR } from "../../constant/Color";
import { SHADOW_OPTIONS } from "../../constant/ShadowOptions";

import { convertFlatNoteListToNoteListByDay } from "../../store/selector/NoteListSelector";
import { createChangeInteractive } from "../../store/modules/interactive/interactive";
import { appAnalytics, AnalyticsSections } from '../../app/Analytics';
import { createSyncNotesAction, SyncReasonType } from '../../store/service/note/SyncNotesSaga';
import { i18nGet } from '../../localisation/Translate';

interface NoteListScreenStateTProps {
  app: IApp;
  noteListByDay: INoteListByDay;
  user: IUser;
}

interface NoteListScreenDispatchProps {
  selectNoteToEdit: (noteId: string) => void;
  syncNotes: () => void;
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
  };

  componentDidMount() {
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

  render() {
    const { navigation } = this.props;

    return (
      <View style={styles.screenView}>
        <Hat
          onBackPress={() => navigation.navigate('Dashboard')}
          title={i18nGet('notes')}
        />
        {this.renderIconBar()}
        <View style={styles.cardsViewWrapWrap}>
          <View style={styles.cardsViewWrap}>
            {this.renderCards()}
          </View>
        </View>
        <View style={styles.addNoteButtonView}>
          <NoteCreationButton onClick={this.goToNoteEditor} />
        </View>
      </View>
    );
  }

  showMorePosts = () => {
    this.setState({ portionsToRender: this.state.portionsToRender + 1 });
  }

  renderProfileIcon() {
    return (
      <TouchableOpacity
        onPress={() => this.props.navigation.navigate("Profile")}
      >
        <ProfileIcon fill={"white"} />
      </TouchableOpacity>
    );
  }

  renderIconBar() {
    return (
      <View style={styles.iconBarViewWrap}>
        <View style={styles.iconBarView}>
          <ClocsIconTooltipedConnected style={styles.iconBarIcon} />
          <GlycemiaIconConnected style={styles.iconBarIcon} />
          <BreadUnitsIconConnected style={styles.iconBarIcon} />
          <ShortInsulinIconConnected style={styles.iconBarIcon} />
          <LongInsulinIconConnected style={styles.iconBarIcon} />
        </View>
      </View>
    );
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
      <ScrollView style={styles.cardsView}>
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
        return i18nGet('september');
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
    noteListByDay: convertFlatNoteListToNoteListByDay(state),
  }),
  dispatch => ({
    dispatch,
    syncNotes: () => dispatch(createSyncNotesAction({ reason: SyncReasonType.SEND_PENDING })),
  }),
)(NoteListScreen);

const styles = StyleSheet.create({
  screenView: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: COLOR.PRIMARY_WHITE,
  },
  cardsViewWrapWrap: {
    height: '100%',
  },
  cardsViewWrap: {
    height: '100%',
    width: '100%',
    overflow: 'hidden',
  },
  cardsView: {
    height: '100%',
    width: '100%',
    overflow: 'scroll',
    backgroundColor: COLOR.PRIMARY_WHITE,
  },
  iconBarViewWrap: {
    backgroundColor: "#2E3858",
  },
  iconBarView: {
    display: "flex",
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'space-evenly',
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    backgroundColor: COLOR.PRIMARY_WHITE,
  },
  iconBarIcon: {
    flex: 1,
    height: 35,
    width: 35,
  },
  cardWrap: {
    width: "100%",
    marginBottom: 15,
    marginTop: 15,
    alignItems: "center"
  },
  dateView: {
    marginBottom: 10,

    justifyContent: "space-evenly",
    flexDirection: "row",
    alignItems: "center"
  },
  dateText: {
    textAlign: "center",
    fontFamily: "Roboto",
    fontWeight: "bold",
    fontSize: 19,
    lineHeight: 22,

    color: "#555"
  },
  dayNotes: {
    width: "100%",
    padding: 10,
    borderRadius: 25,
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
    bottom: 5,
    right: 5,

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
    marginBottom: 120,
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
    marginVertical: 35
  }
});
