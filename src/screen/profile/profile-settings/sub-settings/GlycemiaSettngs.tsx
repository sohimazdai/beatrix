import React, { Component } from 'react';
import { ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { connect } from 'react-redux';
import { styles } from './Style';
import { NavigationScreenProp, NavigationState, NavigationParams } from 'react-navigation';
import { IInteractive } from '../../../../model/IInteractive';
import { ProfileSettingsTargetGlycemiaPickerConnect } from '../../../../view/profile/settings/target-glycemia-picker/TargetGlycemiaPicker';
import { GlycemiaTypeSelectPickerConnect } from '../../../../view/profile/settings/select-picker/GlycemiaTypeSelectPicker';
import { IStorage } from '../../../../model/IStorage';
import { i18nGet } from '../../../../localisation/Translate';
import { appAnalytics } from '../../../../app/Analytics';
import { BlockHat } from '../../../../component/hat/BlockHat';

interface Props {
  interactive: IInteractive
  navigation: NavigationScreenProp<NavigationState, NavigationParams>
}

export class GlycemiaSettingsComponent extends Component<Props> {
  componentDidMount() {
    appAnalytics.sendEventWithProps(appAnalytics.events.SETTINGS_SEEN, {
      screenName: 'Glycemia'
    });
  }

  render() {
    return (
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <BlockHat
          onBackPress={() => this.props.navigation.navigate('ProfileDiabetesSettings')}
          title={i18nGet('glycemia_settings')}
        />
        <ScrollView style={styles.scrollView}>
          <ProfileSettingsTargetGlycemiaPickerConnect />
          <GlycemiaTypeSelectPickerConnect />
        </ScrollView>
      </KeyboardAvoidingView >
    )
  }
}

export const GlycemiaSettings = connect(
  (state: IStorage) => ({
    interactive: state.interactive
  })
)(GlycemiaSettingsComponent)
