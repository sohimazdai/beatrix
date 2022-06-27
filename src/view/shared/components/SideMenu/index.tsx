import React from 'react';
import { NavigationScreenProp, NavigationState, NavigationParams } from 'react-navigation';
import { View, StyleSheet, Text, Dimensions, Alert, Linking } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { Header } from '../../../../component/hat/Header';
import { ArrowDirection, ArrowTaillessIcon } from '../../../../component/icon/ArrowTaillessIcon';
import { PopupDirection, SuperPopup } from '../../../../component/popup/SuperPopup';
import { Fader } from '../../../../component/fader/Fader';
import { NotesIcon } from '../../../../component/icon/NotesIcon';
import { ChartsIcon } from '../../../../component/icon/ChartsIcon';
import { TagsIcon } from '../../../../component/icon/TagsIcon';
import { ProfileIcon } from '../../../../component/icon/ProfileIcon';
import StatisticsPieIcon from '../../../../component/icon/StatisticsPieIcon';
import SoupIcon from '../../../../component/icon/SoupIcon';
import Bell from '../../../../component/icon/Bell';

import { NavigatorEntities } from '../../../../navigator/modules/NavigatorEntities';
import { COLOR } from '../../../../constant/Color';
import { i18nGet } from '../../../../localisation/Translate';
import { appAnalytics } from '../../../../app/Analytics';
import { SHADOW_OPTIONS } from '../../../../constant/ShadowOptions';

const MAIL = 'mailto://go@doq.su';
const TG = 'https://t.me/sohimazdai';

interface Props {
  hidden: boolean;
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
  areThereUnreadNotifications: boolean;
  closeSideMenu: () => void;
}

export class SideMenu extends React.Component<Props> {
  handleOpenTelegram = () => {
    const itCan = Linking.canOpenURL(TG);

    if (itCan) {
      appAnalytics.sendEvent(appAnalytics.events.DEV_TELEGRAM_LINK_CLICK);
      Linking.openURL(TG)
        .then(() => appAnalytics.sendEvent(appAnalytics.events.DEV_TELEGRAM_LINK_CLICK_DONE))
        .catch(() => {
          appAnalytics.sendEvent(appAnalytics.events.DEV_TELEGRAM_LINK_CLICK_FAIL);
          Alert.alert(i18nGet('cannot_open_tg_webpage'));
        });
    } else {
      Alert.alert(i18nGet('cannot_open_tg_webpage'));
      appAnalytics.sendEvent(appAnalytics.events.DEV_TELEGRAM_LINK_CLICK_FAIL);
    }
  };

  handleOpenEmail = () => {
    const itCan = Linking.canOpenURL(MAIL);

    if (itCan) {
      appAnalytics.sendEvent(appAnalytics.events.DEV_EMAIL_LINK_CLICK);
      Linking.openURL(MAIL)
        .then(() => appAnalytics.sendEvent(appAnalytics.events.DEV_EMAIL_LINK_CLICK_DONE))
        .catch(() => {
          Alert.alert(i18nGet('cannot_open_mail_app'));
          appAnalytics.sendEvent(appAnalytics.events.DEV_EMAIL_LINK_CLICK_FAIL);
        });
    } else {
      Alert.alert(i18nGet('cannot_open_mail_app'));
      appAnalytics.sendEvent(appAnalytics.events.DEV_EMAIL_LINK_CLICK_FAIL);
    }
  };

  render() {
    const { closeSideMenu, hidden, areThereUnreadNotifications } = this.props;

    return (
      <>
        <Fader hidden={hidden} onPress={closeSideMenu} />
        <SuperPopup direction={PopupDirection.LEFT_TO_RIGHT} hidden={hidden}>
          <View style={styles.view}>
            <View style={styles.topView}>
              <Header
                title={'B E A T R I X'}
                rightIcon={<ArrowTaillessIcon
                  direction={ArrowDirection.LEFT}
                  width={15}
                  height={25}
                  iconColor={COLOR.PRIMARY_WHITE}
                />}
                rightIconPress={closeSideMenu}
              />
              <View style={styles.links}>
                {this.renderItem(
                  i18nGet('notes'),
                  <NotesIcon width={25} height={25} />,
                  NavigatorEntities.NOTE_LIST,
                )}

                {this.renderItem(
                  i18nGet('charts'),
                  <ChartsIcon width={25} height={25} />,
                  NavigatorEntities.CHARTS,
                )}

                {this.renderItem(
                  i18nGet('food'),
                  <SoupIcon width={25} height={25} />,
                  NavigatorEntities.FOOD_PAGE,
                )}

                {this.renderItem(
                  i18nGet('tags'),
                  <TagsIcon width={25} height={25} />,
                  NavigatorEntities.TAG_EDITOR,
                )}

                {this.renderItem(
                  i18nGet('statistics'),
                  <StatisticsPieIcon width={25} height={25} />,
                  NavigatorEntities.STATISTICS,
                )}

                {this.renderItem(
                  i18nGet('notifications'),
                  <Bell isActive={areThereUnreadNotifications} isBGLight />,
                  NavigatorEntities.NOTIFICATIONS,
                )}

                {this.renderItem(
                  i18nGet('profile'),
                  <ProfileIcon width={25} height={25} />,
                  NavigatorEntities.PROFILE,
                )}
              </View>
            </View>
            <View style={styles.bottomView}>
              <Text style={styles.bottomParagraph}>
                {i18nGet('write_to_developer')}
              </Text>
              <TouchableOpacity onPress={this.handleOpenTelegram}>
                <Text style={styles.bottomText}>
                  Telegram: @sohimazdai
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.handleOpenEmail}>
                <Text style={styles.bottomText}>
                  Email: go@doq.su
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </SuperPopup>
      </>
    );
  }

  renderItem(title: string, icon: JSX.Element, screenName: NavigatorEntities) {
    const { navigation, closeSideMenu } = this.props;

    const navigate = () => {
      appAnalytics.sendEventWithProps(
        appAnalytics.events.NAVIGATE_FROM_SIDE_MENU,
        { from: title }
      );

      navigation.navigate(screenName, {
        backPage: NavigatorEntities.DASHBOARD
      });

      closeSideMenu();
    };

    return (
      <TouchableOpacity
        onPress={navigate}
        style={styles.touchable}
      >
        {icon}
        <Text style={styles.touchableText}>
          {title}
        </Text>
      </TouchableOpacity>
    )
  }

}

const styles = StyleSheet.create({
  view: {
    width: 250,
    height: Dimensions.get('window').height,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: COLOR.PRIMARY_WHITE,
  },
  topView: {
    flex: 1,
  },
  bottomView: {
    backgroundColor: COLOR.PRIMARY_BASE,
    ...SHADOW_OPTIONS,
    shadowColor: COLOR.PRIMARY,
    padding: 16,
    paddingBottom: 48,
  },
  title: {
    padding: 16,
    paddingTop: 40,
    paddingBottom: 28,
    fontSize: 19,
    color: COLOR.PRIMARY_WHITE,
    backgroundColor: COLOR.PRIMARY,
    overflow: 'hidden',
  },
  links: {
    paddingHorizontal: 16,
  },
  touchable: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    padding: 8
  },
  touchableText: {
    fontSize: 17,
    marginLeft: 8,
    color: COLOR.PRIMARY
  },
  bottomParagraph: {
    fontSize: 16,
  },
  bottomText: {
    fontSize: 14,
    marginTop: 8,
    color: COLOR.BLUE
  },
})
