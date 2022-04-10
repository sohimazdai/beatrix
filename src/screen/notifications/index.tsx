import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { NavigationParams, NavigationScreenProp, NavigationState, NavigationSwitchScreenProps } from "react-navigation";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { appAnalytics } from "../../app/Analytics";

import { BlockHat } from "../../component/hat/BlockHat";
import Bell from "../../component/icon/Bell";
import NotificationSpoiler from "../../view/notifications/components/Spoiler";

import { COLOR } from "../../constant/Color";
import { i18nGet } from "../../localisation/Translate";
import { INotification } from "../../model/INotification";
import { IStorage } from "../../model/IStorage";
import { createSetNotificationSeenAction } from "../../store/service/notifications/SetNotificationSeenSaga";
import selectActiveNotificationsList from "../../view/notifications/selectors/select-active-notifications-list";
import selectUnreadNotifications from "../../view/notifications/selectors/select-unread-notifications";

const mapState = (state: IStorage) => ({
  notifications: selectActiveNotificationsList(state),
  seenList: state.notifications.seenList,
  unreadNotifications: selectUnreadNotifications(state),
});

const mapDispatch = (dispatch: Dispatch) => ({
  seeNotifications: (ids: string[]) => dispatch(createSetNotificationSeenAction(ids)),
});

interface Props {
  notifications: INotification[];
  seenList: string[];
  unreadNotifications: INotification[];
  seeNotifications: (ids: string[]) => void;
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

class NotificationsScreen extends React.Component<Props> {
  componentDidMount(): void {
    appAnalytics.sendEvent(appAnalytics.events.NOTIFICATIONS_SCREEN_SEEN);
  }

  handleOpenSpoiler = (id: string) => {
    this.props.seeNotifications([id]);
  };

  handleSeeAll = () => {
    const { unreadNotifications } = this.props;

    const unreadNfsIds = unreadNotifications.map(n => n.id);

    appAnalytics.sendEvent(appAnalytics.events.NOTIFICATIONS_ALL_SEEN);

    this.props.seeNotifications(unreadNfsIds);
  }

  render() {
    const { notifications, seenList, unreadNotifications, navigation, seeNotifications } = this.props;
    const unreadNfsIds = unreadNotifications.map(n => n.id);

    const nfsToShow = [...notifications].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return (
      <View style={styles.onboardingScreen}>
        <BlockHat
          onBackPress={() => navigation.navigate('Dashboard')}
          leftIcon={<Bell isBGLight={false} isActive={!!unreadNfsIds.length} />}
          title={i18nGet('notifications')}
          rightSideSlot={<Bell isActive={!!unreadNfsIds.length} isBGLight={false} />}
        />
        <ScrollView style={styles.scrollView}>
          {!!unreadNfsIds.length && (
            <TouchableOpacity
              style={styles.readAll}
              onPress={this.handleSeeAll}
            >
              <Text style={styles.readAllText}>
                {i18nGet('mark_as_red')}
              </Text>
            </TouchableOpacity>
          )}
          {nfsToShow.map((n) => (
            <NotificationSpoiler
              key={n.id}
              notification={n}
              isSeen={!seenList.includes(n.id)}
              handleOpen={() => this.handleOpenSpoiler(n.id)}
            />
          ))}
        </ScrollView>
      </View>
    );
  }
}

export default connect(mapState, mapDispatch)(NotificationsScreen);

const styles = StyleSheet.create({
  onboardingScreen: {
    height: '100%',
    backgroundColor: COLOR.SERVICE_BACKGROUND,
  },
  readAll: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingTop: 16,
    paddingRight: 16,
    fontSize: 14,
  },
  readAllText: {
    color: COLOR.BLUE,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: COLOR.BLUE,
    padding: 8,
  },
  scrollView: {
  },
  list: {
  },
  listItem: {
  },
});