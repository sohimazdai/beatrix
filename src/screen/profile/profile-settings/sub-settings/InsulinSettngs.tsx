import React, { Component } from 'react';
import { ScrollView, KeyboardAvoidingView, Platform, View } from 'react-native';
import { connect } from 'react-redux';
import { styles } from './Style';
import { NavigationScreenProp, NavigationState, NavigationParams } from 'react-navigation';
import i18n from 'i18n-js';
import { IInteractive } from '../../../../model/IInteractive';
import { Hat } from '../../../../component/hat/Hat';
import { IStorage } from '../../../../model/IStorage';
import { ProfileSettingsShedulePickerConnect } from '../../../../view/profile/settings/shedule-picker/ProfileSettingsShedulePicker';
import { SheduleKeyType } from '../../../../model/IUserPropertiesShedule';

interface Props {
  interactive: IInteractive
  navigation: NavigationScreenProp<NavigationState, NavigationParams>
}

export class InsulinSettingsComponent extends Component<Props> {
  render() {
    return (
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <Hat
          onBackPress={() => this.props.navigation.navigate('ProfileDiabetesSettings')}
          title={i18n.t('insulin_settings')}
        />
        <View style={styles.scrollViewWrapWrap}>
          <View style={styles.scrollViewWrap}>
            <ScrollView style={styles.scrollView}>
              <ProfileSettingsShedulePickerConnect
                sheduleKey={SheduleKeyType.INSULIN_SENSITIVITY_FACTOR}
              />
              <ProfileSettingsShedulePickerConnect
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
