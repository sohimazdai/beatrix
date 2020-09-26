import React, { Component } from 'react';
import { ScrollView, KeyboardAvoidingView, Platform, View } from 'react-native';
import { connect } from 'react-redux';
import { styles } from './Style';
import { NavigationScreenProp, NavigationState, NavigationParams } from 'react-navigation';
import { IInteractive } from '../../../../model/IInteractive';
import { IStorage } from '../../../../model/IStorage';
import { ProfileSettingsSheduleTableConnect } from '../../../../view/profile/settings/shedule-picker/ProfileSettingsSheduleTable';
import { SheduleKeyType } from '../../../../model/IUserPropertiesShedule';
import { i18nGet } from '../../../../localisation/Translate';
import { ShortInsulinTypePickerConnect } from '../../../../view/profile/settings/select-picker/ShortInsulinTypePicker';
import { appAnalytics } from '../../../../app/Analytics';
import { BlockHat } from '../../../../component/hat/BlockHat';

interface Props {
  interactive: IInteractive
  navigation: NavigationScreenProp<NavigationState, NavigationParams>
}

export class InsulinSettingsComponent extends Component<Props> {
  componentDidMount() {
    appAnalytics.sendEventWithProps(appAnalytics.events.SETTINGS_SEEN, {
      screenName: 'Insulin'
    });
  }

  onBack = () => {
    const { navigation } = this.props;

    const backPage =
      navigation &&
      navigation.state &&
      navigation.state.params &&
      navigation.state.params.backPage ||
      'ProfileDiabetesSettings';

    navigation.navigate(backPage);
  };

  render() {
    return (
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <BlockHat
          onBackPress={this.onBack}
          title={i18nGet('insulin_settings')}
        />
        <View style={styles.scrollViewWrapWrap}>
          <View style={styles.scrollViewWrap}>
            <ScrollView style={styles.scrollView}>
              <ShortInsulinTypePickerConnect />
              <ProfileSettingsSheduleTableConnect
                sheduleKey={SheduleKeyType.INSULIN_SENSITIVITY_FACTOR}
              />
              <ProfileSettingsSheduleTableConnect
                sheduleKey={SheduleKeyType.CARBOHYDRATE_RATIO}
              />
            </ScrollView>
          </View>
        </View>
      </KeyboardAvoidingView >
    )
  }
}

export const InsulinSettings = connect(
  (state: IStorage) => ({
    interactive: state.interactive
  })
)(InsulinSettingsComponent)
