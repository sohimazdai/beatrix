import React from "react";
import { View, } from "react-native";
import { connect } from "react-redux";
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState
} from "react-navigation";
import { TouchableOpacity, ScrollView } from "react-native-gesture-handler";
import { StyleSheet } from "react-native";

import { BlockHat } from "../../component/hat/BlockHat";
import { NoteCreationButton } from "../../view/notes/note-creation-popup/button/NoteCreationButton";
import { ProfileIcon } from "../../component/icon/ProfileIcon";
import { LastNotesConnected } from '../../view/dashboard/last-notes/components/LastNotes';
import { ChartPreviewConnected } from '../../view/dashboard/chart-preview/ChartPreview';
import { ActiveInsulinInfoConnected } from '../../view/dashboard/active-insulin-info/components/ActiveInsulinInfo';
import { StatisticsCardConnected } from '../../view/dashboard/statistics-card/components/StatisticsCard';
import { HBA1CCalculatorConnected } from '../../view/dashboard/hba1c-calculator/components/HBA1CCalculator';
import { Fader } from '../../component/fader/Fader';

import { IStorage } from "../../model/IStorage";
import { INoteListByDay } from "../../model/INoteList";
import { IUser } from '../../model/IUser';
import { IApp } from '../../model/IApp';
import { StatisticsType } from '../../view/dashboard/statistics-card/entities';
import { NavigatorEntities } from '../../navigator/modules/NavigatorEntities';
import { COLOR } from "../../constant/Color";

import { appAnalytics, AnalyticsSections } from '../../app/Analytics';
import { createSyncNotesAction, SyncReasonType } from '../../store/service/note/SyncNotesSaga';
import { i18nGet } from '../../localisation/Translate';
import { SHADOW_OPTIONS } from "../../constant/ShadowOptions";
import { ChartDotInfoPopupConnect } from '../../view/chart/chart-dot-info-popup/components/chart-dot-info-popup/ChartDotInfoPopup';

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
    appAnalytics.setSection(AnalyticsSections.DASHBOARD);
    appAnalytics.sendEvent(appAnalytics.events.DASHBOARD_SEEN);
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
        <BlockHat title={i18nGet('compensation')} rightSideSlot={this.renderProfileIcon()} />
        <View style={styles.scrollViewWrapper}>
          <ScrollView style={styles.scrollView}>
            <View style={{ padding: 16, paddingBottom: 0, marginTop: -4 }}>
              <ActiveInsulinInfoConnected navigation={navigation} />
              <LastNotesConnected
                onNotesPress={() => navigation.navigate('Notes')}
                onNotePress={(noteId) => this.goToNoteEditor(noteId)}
              />
              <ChartPreviewConnected onChartIconPress={() => navigation.navigate('Charts')} />
            </View>
            <ScrollView
              style={styles.statisticsScrollView}
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
          <NoteCreationButton onClick={this.goToNoteEditor} />
        </View>
        <Fader hidden={!this.props.selectedDotId} />
        <ChartDotInfoPopupConnect navigation={navigation} />
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

const styles = StyleSheet.create({
  screenView: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: COLOR.PRIMARY,
    maxWidth: 420,
  },
  scrollViewWrapper: {
    backgroundColor: COLOR.PRIMARY,
  },
  scrollView: {
    height: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: COLOR.PRIMARY_WHITE,
  },
  statisticsScrollView: {
    display: 'flex',
    marginLeft: -8,
    paddingHorizontal: 16,
    overflow: 'visible',
  },
  addNoteButtonView: {
    position: "absolute",
    bottom: 5,
    width: '100%',
    ...SHADOW_OPTIONS
  },
  profileIconView: {
    width: 30,
    height: 30,
    padding: 3,
    borderRadius: 5,
    backgroundColor: COLOR.PRIMARY_WHITE,
    ...SHADOW_OPTIONS,
  },
  stub: {
    marginTop: 152,
  },
});
