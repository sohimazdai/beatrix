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
import { ProfilePicker } from '../../../../view/profile/ProfilePicker';
import { Shedule } from '../../../../view/profile/settings/shedule/Shedule';

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

  scrollViewRef = React.createRef<ScrollView>();

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
        <ScrollView style={styles.scrollView} ref={this.scrollViewRef}>
          <ShortInsulinTypePickerConnect />
          <ProfilePicker
            title={i18nGet('settings_insulin_sensitivity_factor_title')}
            description={i18nGet('settings_insulin_sensitivity_factor_description')}
            hint={i18nGet('settings_insulin_sensitivity_factor_hint')}
          >
            <Shedule
              scrollViewRef={this.scrollViewRef}
              sheduleType={SheduleKeyType.INSULIN_SENSITIVITY_FACTOR}
            />
          </ProfilePicker>
          <ProfileSettingsSheduleTableConnect
            sheduleKey={SheduleKeyType.INSULIN_SENSITIVITY_FACTOR}
          />
          <ProfileSettingsSheduleTableConnect
            sheduleKey={SheduleKeyType.CARBOHYDRATE_RATIO}
          />
        </ScrollView>
      </KeyboardAvoidingView >
    )
  }
}

export const InsulinSettings = connect(
  (state: IStorage) => ({
    interactive: state.interactive
  })
)(InsulinSettingsComponent)
