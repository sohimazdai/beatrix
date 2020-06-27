import React from "react";
import { View, } from "react-native";
import { connect } from "react-redux";
import { IStorage } from "../../model/IStorage";
import { INoteListByDay } from "../../model/INoteList";
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState
} from "react-navigation";
import { BlockHat } from "../../component/hat/BlockHat";
import { NoteCreationPopupButtonConnect } from "../../view/notes/note-creation-popup/button/NoteCreationPopupButton";
import { styles } from "./Style";
import { TouchableOpacity, ScrollView } from "react-native-gesture-handler";
import { ProfileIcon } from "../../component/icon/ProfileIcon";
import { IUser } from '../../model/IUser';
import { appAnalytics } from '../../app/Analytics';
import { createSyncNotesAction, SyncReasonType } from '../../store/service/note/SyncNotesSaga';
import { IApp } from '../../model/IApp';
import { i18nGet } from '../../localisation/Translate';
import { LastNotesConnected } from '../../view/dashboard/last-notes/LastNotes/LastNotes';
import { ChartPreviewConnected } from '../../view/dashboard/chart-preview/ChartPreview';
import { ChartDotInfoPopupConnect } from '../../view/chart/chart-dot-info-popup/ChartDotInfoPopup';
import { DateHelper } from '../../utils/DateHelper';
import { ActiveInsulinInfoConnected } from '../../view/dashboard/active-insulin-info/ActiveInsulinInfo';

interface DashboardScreenStateTProps {
  app: IApp;
  noteListByDay: INoteListByDay;
  user: IUser;
}

interface DashboardScreenDispatchProps {
  selectNoteToEdit: (noteId: string) => void;
  syncNotes: () => void;
}

interface DashboardScreenProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

interface FullProps
  extends DashboardScreenProps,
  DashboardScreenDispatchProps,
  DashboardScreenStateTProps { }

class DashboardScreen extends React.PureComponent<FullProps> {
  state = {
    noteCreationShown: false,
    noteEditingShown: false,
    editingNoteId: null,
  };

  componentDidMount() {
    appAnalytics.sendEvent(appAnalytics.events.DASHBOARD_SEEN);
  }

  componentDidUpdate(pP: FullProps) {
    if (!pP.app.serverAvailable && this.props.app.serverAvailable) {
      this.props.syncNotes();
    }
  }

  render() {
    const { navigation } = this.props;

    return (
      <View style={styles.screenView}>
        <BlockHat title={i18nGet('compensation')} rightSideSlot={this.renderProfileIcon()} />
        <View style={styles.scrollViewWrapper}>
          <ScrollView style={styles.scrollView}>
            <LastNotesConnected onNotesPress={() => navigation.navigate('Notes')} />
            <ChartPreviewConnected onChartIconPress={() => navigation.navigate('Charts')} />
            <ActiveInsulinInfoConnected />
            <View style={styles.stub} />
          </ScrollView>
        </View>
        <View style={styles.addNoteButtonView}>
          <NoteCreationPopupButtonConnect />
        </View>
      </View >
    );
  }

  renderProfileIcon() {
    return (
      <View style={styles.profileIconView}>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("Profile")}
        >
          <ProfileIcon fill={"white"} />
        </TouchableOpacity>
      </View>
    );
  }
}

export const DashboardScreenConnect = connect(
  (state: IStorage) => ({
    app: state.app,
    user: state.user,
  }),
  dispatch => ({
    dispatch,
    syncNotes: () => dispatch(createSyncNotesAction({ reason: SyncReasonType.SEND_PENDING })),
  }),
)(DashboardScreen);
