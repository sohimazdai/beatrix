import React, { Component } from 'react';
import { ScrollView, KeyboardAvoidingView, Platform, View } from 'react-native';
import { connect } from 'react-redux';
import { styles } from './Style';
import { NavigationScreenProp, NavigationState, NavigationParams } from 'react-navigation';
import { IInteractive } from '../../../../model/IInteractive';
import { Hat } from '../../../../component/hat/Hat';
import { ProfileSettingsTargetGlycemiaPickerConnect } from '../../../../view/profile/settings/target-glycemia-picker/TargetGlycemiaPicker';
import { GlycemiaTypeSelectPickerConnect } from '../../../../view/profile/settings/select-picker/GlycemiaTypeSelectPicker';
import { IStorage } from '../../../../model/IStorage';
import { i18nGet } from '../../../../localisation/Translate';

interface Props {
  interactive: IInteractive
  navigation: NavigationScreenProp<NavigationState, NavigationParams>
}

export class GlycemiaSettingsComponent extends Component<Props> {
  render() {
    return (
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <Hat
          onBackPress={() => this.props.navigation.navigate('ProfileDiabetesSettings')}
          title={i18nGet('glycemia_settings')}
        />
        <View style={styles.scrollViewWrapWrap}>
          <View style={styles.scrollViewWrap}>
            <ScrollView style={styles.scrollView}>
              <ProfileSettingsTargetGlycemiaPickerConnect />
              <GlycemiaTypeSelectPickerConnect />
            </ScrollView>
          </View>
        </View>
      </KeyboardAvoidingView >
    )
  }
}

export const GlycemiaSettings = connect(
  (state: IStorage) => ({
    interactive: state.interactive
  })
)(GlycemiaSettingsComponent)
