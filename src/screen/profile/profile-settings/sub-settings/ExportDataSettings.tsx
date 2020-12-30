import React, { Component } from 'react';
import { ScrollView, KeyboardAvoidingView, Platform, View } from 'react-native';
import { connect } from 'react-redux';
import { styles } from './Style';
import { NavigationScreenProp, NavigationState, NavigationParams } from 'react-navigation';
import { IInteractive } from '../../../../model/IInteractive';
import { IStorage } from '../../../../model/IStorage';
import { i18nGet } from '../../../../localisation/Translate';
import { ExportDataConnect } from '../../../../view/profile/settings/export-data-picker/components/ExportDataPicker';
import { Fader } from '../../../../component/fader/Fader';
import { IUser } from '../../../../model/IUser';
import { appAnalytics } from '../../../../app/Analytics';
import { BlockHat } from '../../../../component/hat/BlockHat';

interface Props {
  interactive: IInteractive
  user: IUser
  navigation: NavigationScreenProp<NavigationState, NavigationParams>
}

export class ExportDataSettingsComponent extends Component<Props> {
  componentDidMount() {
    appAnalytics.sendEvent(appAnalytics.events.EXPORT_DATA);
  }

  render() {
    const { user } = this.props;
    return (
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <BlockHat
          onBackPress={() => this.props.navigation.navigate('Profile')}
          title={i18nGet('export_data')}
        />
        <ScrollView style={styles.scrollView}>
          <ExportDataConnect />
        </ScrollView>
        <Fader hidden={!user.exportLoading} />
      </KeyboardAvoidingView >
    )
  }
}

export const ExportDataSettings = connect(
  (state: IStorage) => ({
    interactive: state.interactive,
    user: state.user,
  })
)(ExportDataSettingsComponent)
