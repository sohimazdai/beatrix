import React from "react";
import { View, Text, ScrollView } from "react-native";
import { connect } from "react-redux";
import { IStorage } from "../../model/IStorage";
import { INoteListByDay, INoteListNote } from "../../model/INoteList";
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState
} from "react-navigation";
import { Note } from "../../view/notes/note/Note";
import { NoteListSelector } from "../../store/selector/NoteListSelector";
import { RoundClocksIcon } from "../../component/icon/RoundClocksIcon";
import { VegetablesIcon } from "../../component/icon/value-icons/VegetablesIcon";
import { GlucometerIcon } from "../../component/icon/value-icons/GlucometerIcon";
import { ShortSyringeIcon } from "../../component/icon/value-icons/ShortSyringeIcon";
import { LongSyringeIcon } from "../../component/icon/value-icons/LongSyringeIcon";
import { BlockHat } from "../../component/hat/BlockHat";
import { createChangeInteractive } from "../../store/modules/interactive/interactive";
import { NoteCreationPopupButtonConnect } from "../../view/notes/note-creation-popup/button/NoteCreationPopupButton";
import { styles } from "./Style";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ProfileIcon } from "../../component/icon/ProfileIcon";
import { IUser } from '../../model/IUser';
import { appAnalytics } from '../../app/Analytics';
import { createSyncNotesAction, SyncReasonType } from '../../store/service/note/SyncNotesSaga';
import { IApp } from '../../model/IApp';
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
    appAnalytics.sendEvent(appAnalytics.events.NOTELIST_SEEN);
  }

  componentDidUpdate(pP: FullProps) {
    if (!pP.app.serverAvailable && this.props.app.serverAvailable) {
      this.props.syncNotes();
    }
  }

  render() {
    return (
      <View style={styles.screenView}>
        <BlockHat title={i18nGet('notes')} rightSideSlot={this.renderProfileIcon()} />
        {this.renderIconBar()}
        <View style={styles.cardsViewWrapWrap}>
          <View style={styles.cardsViewWrap}>
            {this.renderCards()}
          </View>
        </View>
        <View style={styles.addNoteButtonView}>
          <NoteCreationPopupButtonConnect />
        </View>
      </View >
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
          <RoundClocksIcon style={styles.iconBarIcon} />
          <GlucometerIcon style={styles.iconBarIcon} />
          <VegetablesIcon style={styles.iconBarIcon} />
          <ShortSyringeIcon style={styles.iconBarIcon} />
          <LongSyringeIcon style={styles.iconBarIcon} />
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
              onPress={() => this.props.selectNoteToEdit(note.id)}
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
        return i18nGet('jule');
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
    noteListByDay: NoteListSelector.convertFlatNoteListToNoteListByDay(state),
  }),
  dispatch => ({
    dispatch,
    selectNoteToEdit: (noteId: string) => dispatch(
      createChangeInteractive({
        editingNoteId: noteId,
        creatingNoteMode: true
      })
    ),
    syncNotes: () => dispatch(createSyncNotesAction({ reason: SyncReasonType.SEND_PENDING })),
  }),
)(NoteListScreen);
