import React, { Dispatch } from "react";
import { View, StatusBar } from "react-native";
import { connect } from "react-redux";
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState
} from "react-navigation";
import { ScrollView } from "react-native-gesture-handler";
import { StyleSheet } from "react-native";

import { ProfileIcon } from "../../component/icon/ProfileIcon";
import { LastNotesConnected } from '../../view/dashboard/last-notes/components/LastNotes';
import { ChartPreviewConnected } from '../../view/dashboard/chart-preview/ChartPreview';
import { ActiveInsulinInfoConnected } from '../../view/dashboard/active-insulin-info/components/ActiveInsulinInfo';
import { StatisticsCardConnected } from '../../view/dashboard/statistics-card/components/StatisticsCard';
import { HBA1CCalculatorConnected } from '../../view/dashboard/hba1c-calculator/components/HBA1CCalculator';
import { Fader } from '../../component/fader/Fader';
import { SideMenu } from '../../view/shared/components/SideMenu';
import { ChartDotInfoPopupConnect } from '../../view/chart/chart-dot-info-popup/components/chart-dot-info-popup/ChartDotInfoPopup';
import { MenuIcon } from '../../component/icon/MenuIcon';
import AddNoteButton from '../../view/notes/components/add-note-button/AddNoteButton';

import { IStorage } from "../../model/IStorage";
import { INoteListByDay } from "../../model/INoteList";
import { IUser } from '../../model/IUser';
import { IApp } from '../../model/IApp';
import { NavigatorEntities } from '../../navigator/modules/NavigatorEntities';
import { COLOR } from "../../constant/Color";

import { appAnalytics, AnalyticsSections } from '../../app/Analytics';
import { createSyncNotesAction, SyncReasonType } from '../../store/service/note/SyncNotesSaga';
import { i18nGet } from '../../localisation/Translate';
import { SHADOW_OPTIONS } from "../../constant/ShadowOptions";
import { IconPositionType, StyledButton, StyledButtonType } from '../../component/button/StyledButton';
import { Header } from '../../component/hat/Header';
import { Action } from 'redux';
import { createAppPingAction } from '../../store/service/app/AppPingSaga';
import { StatisticsPeriod } from '../../model/IStatistics';
import { createGetNotificationsAction } from "../../store/service/notifications/GetNotificationsSaga";
import { INotification } from "../../model/INotification";
import selectUnreadNotifications from "../../view/notifications/selectors/select-unread-notifications";
import Bell from "../../component/icon/Bell";

interface DashboardScreenStateTProps {
  app: IApp;
  noteListByDay: INoteListByDay;
  user: IUser;
  selectedDotId: number;
  unreadNotifications: INotification[];
  ping: () => void;
}

interface DashboardScreenDispatchProps {
  selectNoteToEdit: (noteId: string) => void;
  syncNotes: () => void;
  loadNotifications: () => void;
  dispatch: Dispatch<Action>;
}

interface DashboardScreenProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

interface FullProps
  extends DashboardScreenProps,
  DashboardScreenDispatchProps,
  DashboardScreenStateTProps { }

interface State {
  menuShown: boolean
}

class DashboardScreen extends React.PureComponent<FullProps, State> {
  state = { menuShown: false };

  componentDidMount() {
    const { ping, loadNotifications } = this.props;
    ping();

    appAnalytics.setSection(AnalyticsSections.DASHBOARD);
    appAnalytics.sendEvent(appAnalytics.events.DASHBOARD_SEEN);

    loadNotifications();

    StatusBar.setBarStyle('light-content');
  }

  componentDidUpdate(pP: FullProps) {
    const { app, syncNotes, loadNotifications } = this.props;

    if (!pP.app.serverAvailable && app.serverAvailable) {
      syncNotes();
      loadNotifications();
    }
  }

  goToNoteEditor = (noteId?: string) => {
    const { navigation } = this.props;

    navigation.navigate(NavigatorEntities.NOTE_EDITOR, { noteId });
  }

  goToStatisticsScreen = () => {
    const { navigation } = this.props;

    navigation.navigate(NavigatorEntities.STATISTICS);
  }

  closeSideMenu = () => {
    this.setState({ menuShown: false })
  }

  renderRightIcon = () => {
    const { unreadNotifications } = this.props;

    if (unreadNotifications.length) {
      return <Bell isActive isBGLight={false} />;
    } else {
      return <ProfileIcon width={25} height={25} fill={COLOR.PRIMARY_WHITE} />;
    }
  }

  handleRightClick = () => {
    const { unreadNotifications } = this.props;
    if (unreadNotifications.length) {
      this.props.navigation.navigate(NavigatorEntities.NOTIFICATIONS);
    } else {
      this.props.navigation.navigate("Profile");
    }
  }

  render() {
    const { navigation, unreadNotifications } = this.props;
    const { menuShown } = this.state;

    return (
      <>
        <View style={styles.screenView}>
          <Header
            title={i18nGet('compensation')}
            leftIcon={<MenuIcon width={25} height={25} fill={COLOR.PRIMARY_WHITE} />}
            leftIconPress={() => this.setState({ menuShown: true })}
            rightIcon={this.renderRightIcon()}
            rightIconPress={this.handleRightClick}
          />
          <ScrollView style={styles.scrollView}>
            <ActiveInsulinInfoConnected navigation={navigation} />
            <LastNotesConnected
              onNotesPress={() => navigation.navigate('Notes')}
              onNotePress={(noteId) => this.goToNoteEditor(noteId)}
            />
            <ChartPreviewConnected onChartIconPress={() => navigation.navigate('Charts')} />
            <View style={styles.statisticsView}>
              <StatisticsCardConnected
                statisticsPeriod={StatisticsPeriod.DAY}
                onStatisticsIconPress={this.goToStatisticsScreen}
              />
            </View>
            <HBA1CCalculatorConnected />
            <View style={styles.stub} />
          </ScrollView>
          <View style={styles.addNoteButtonView}>
            <AddNoteButton onPress={this.goToNoteEditor} from="dashboard" />
          </View>
          <Fader hidden={!this.props.selectedDotId} />
        </View >
        <ChartDotInfoPopupConnect navigation={navigation} />
        <SideMenu
          hidden={!menuShown}
          navigation={navigation}
          closeSideMenu={this.closeSideMenu}
          areThereUnreadNotifications={!!unreadNotifications.length}
        />
      </>
    );
  }

  renderProfileIcon() {
    return (
      <StyledButton
        icon={<ProfileIcon fill={"white"} width={25} height={25} />}
        iconPosition={IconPositionType.LEFT}
        style={StyledButtonType.EMPTY}
        onPress={() => this.props.navigation.navigate("Profile")}
        withoutPadding
      />
    );
  }
}

export const DashboardScreenConnect = connect(
  (state: IStorage) => ({
    app: state.app,
    user: state.user,
    selectedDotId: state.interactive.selectedDotId,
    unreadNotifications: selectUnreadNotifications(state),
  }),
  dispatch => ({
    dispatch,
    syncNotes: () => dispatch(createSyncNotesAction({ reason: SyncReasonType.SEND_PENDING })),
    loadNotifications: () => dispatch(createGetNotificationsAction()),
    ping: () => dispatch(createAppPingAction()),
  }),
)(DashboardScreen);

const styles = StyleSheet.create({
  screenView: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: COLOR.PRIMARY,
  },
  scrollView: {
    height: '100%',
    backgroundColor: COLOR.PRIMARY_WHITE,
  },
  statisticsView: {
    display: 'flex',
  },
  addNoteButtonView: {
    position: "absolute",
    bottom: 16,
    paddingHorizontal: 16,
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
    marginTop: 62,
  },
});
