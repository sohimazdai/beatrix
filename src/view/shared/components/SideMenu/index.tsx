import React from 'react';
import { NavigationScreenProp, NavigationState, NavigationParams } from 'react-navigation';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { NavigatorEntities } from '../../../../navigator/modules/NavigatorEntities';
import { COLOR } from '../../../../constant/Color';
import { i18nGet } from '../../../../localisation/Translate';
import { NotesIcon } from '../../../../component/icon/NotesIcon';
import { ChartsIcon } from '../../../../component/icon/ChartsIcon';
import { TagsIcon } from '../../../../component/icon/TagsIcon';
import { ProfileIcon } from '../../../../component/icon/ProfileIcon';
import SoupIcon from '../../../../component/icon/SoupIcon';
import { Header } from '../../../../component/hat/Header';
import { ArrowDirection, ArrowTaillessIcon } from '../../../../component/icon/ArrowTaillessIcon';
import { appAnalytics } from '../../../../app/Analytics';
import { PopupDirection, SuperPopup } from '../../../../component/popup/SuperPopup';
import { Fader } from '../../../../component/fader/Fader';

interface Props {
  hidden: boolean;
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
  closeSideMenu: () => void;
}

export class SideMenu extends React.Component<Props> {
  render() {
    const { closeSideMenu, hidden } = this.props;

    return (
      <>
        <Fader hidden={hidden} onPress={closeSideMenu} />
        <SuperPopup direction={PopupDirection.LEFT_TO_RIGHT} hidden={hidden}>
          <View style={styles.view}>
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
                i18nGet('profile'),
                <ProfileIcon width={25} height={25} />,
                NavigatorEntities.PROFILE,
              )}
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
    height: Dimensions.get('window').height,
    width: 250,
    backgroundColor: COLOR.PRIMARY_WHITE,
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
})
