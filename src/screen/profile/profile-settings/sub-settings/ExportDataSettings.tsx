import React, { Component } from 'react';
import { ScrollView, KeyboardAvoidingView, Platform, View } from 'react-native';
import { connect } from 'react-redux';
import { styles } from './Style';
import { NavigationScreenProp, NavigationState, NavigationParams } from 'react-navigation';
import { IInteractive } from '../../../../model/IInteractive';
import { Hat } from '../../../../component/hat/Hat';
import { IStorage } from '../../../../model/IStorage';
import { i18nGet } from '../../../../localisation/Translate';
import { ExportDataConnect } from '../../../../view/profile/settings/export-data-picker/components/ExportDataPicker';

interface Props {
  interactive: IInteractive
  navigation: NavigationScreenProp<NavigationState, NavigationParams>
}

export class ExportDataSettingsComponent extends Component<Props> {
  render() {
    return (
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <Hat
          onBackPress={() => this.props.navigation.navigate('Profile')}
          title={i18nGet('export_data')}
        />
        <View style={styles.scrollViewWrapWrap}>
          <View style={styles.scrollViewWrap}>
            <ScrollView style={styles.scrollView}>
              <ExportDataConnect />
            </ScrollView>
          </View>
        </View>
      </KeyboardAvoidingView >
    )
  }
}

export const ExportDataSettings = connect(
  (state: IStorage) => ({
    interactive: state.interactive
  })
)(ExportDataSettingsComponent)
