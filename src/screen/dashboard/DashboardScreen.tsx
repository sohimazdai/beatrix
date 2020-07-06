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
import { LastNotesConnected } from '../../view/dashboard/last-notes/components/LastNotes';
import { ChartPreviewConnected } from '../../view/dashboard/chart-preview/ChartPreview';
import { ActiveInsulinInfoConnected } from '../../view/dashboard/active-insulin-info/ActiveInsulinInfo';
import { StatisticsCardConnected } from '../../view/dashboard/statistics-card/components/StatisticsCard';
import { StatisticsType } from '../../view/dashboard/statistics-card/entities';
import { HBA1CCalculatorConnected } from '../../view/dashboard/hba1c-calculator/components/HBA1CCalculator';
import { Fader } from '../../component/fader/Fader';

interface DashboardScreenStateTProps {
  app: IApp;
  noteListByDay: INoteListByDay;
  user: IUser;
  selectedDotId: number;
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
            <View style={{ padding: 16, paddingBottom: 0 }}>
              <LastNotesConnected onNotesPress={() => navigation.navigate('Notes')} />
              <ChartPreviewConnected onChartIconPress={() => navigation.navigate('Charts')} />
              <ActiveInsulinInfoConnected />
            </View>
            <ScrollView
              style={styles.statisticsScrollViewTop}
              horizontal
              showsHorizontalScrollIndicator={false}
            >
              <View style={{ width: 8 }} />
              <StatisticsCardConnected statisticsType={StatisticsType.TODAY} />
              <StatisticsCardConnected statisticsType={StatisticsType.YESTERDAY} />
              <View style={{ width: 24 }} />
            </ScrollView>
            <ScrollView
              style={styles.statisticsScrollView}
              horizontal
              showsHorizontalScrollIndicator={false}
            >
              <View style={{ width: 8 }} />
              <StatisticsCardConnected statisticsType={StatisticsType.LAST_MONTH} />
              <StatisticsCardConnected statisticsType={StatisticsType.LAST_THREE_MONTH} />
              <View style={{ width: 24 }} />
            </ScrollView>
            <View style={{ padding: 16, paddingTop: 0 }}>
              <HBA1CCalculatorConnected />
            </View>
            <View style={styles.stub} />
          </ScrollView>
        </View>
        <View style={styles.addNoteButtonView}>
          <NoteCreationPopupButtonConnect />
        </View>
        <Fader hidden={!this.props.selectedDotId} />
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
    selectedDotId: state.interactive.selectedDotId,
  }),
  dispatch => ({
    dispatch,
    syncNotes: () => dispatch(createSyncNotesAction({ reason: SyncReasonType.SEND_PENDING })),
  }),
)(DashboardScreen);
