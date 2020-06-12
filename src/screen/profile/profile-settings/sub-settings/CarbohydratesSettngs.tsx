import React, { Component } from 'react';
import { ScrollView, KeyboardAvoidingView, Platform, View } from 'react-native';
import { connect } from 'react-redux';
import { styles } from './Style';
import { NavigationScreenProp, NavigationState, NavigationParams } from 'react-navigation';
import { IInteractive } from '../../../../model/IInteractive';
import { Hat } from '../../../../component/hat/Hat';
import { IStorage } from '../../../../model/IStorage';
import { CarbsTypeSelectPickerConnect } from '../../../../view/profile/settings/select-picker/CarbsTypeSelectPicker';
import { CarbsUnitWeightSelectPickerConnect } from '../../../../view/profile/settings/select-picker/CarbsUnitWightSelectPicker';
import { i18nGet } from '../../../../localisation/Translate';

interface Props {
  interactive: IInteractive
  navigation: NavigationScreenProp<NavigationState, NavigationParams>
}

export class CarbohydratesSettngsComponent extends Component<Props> {
  render() {
    return (
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <Hat
          onBackPress={() => this.props.navigation.navigate('ProfileDiabetesSettings')}
          title={i18nGet('carbohydrates_settings')}
        />
        <View style={styles.scrollViewWrapWrap}>
          <View style={styles.scrollViewWrap}>
            <ScrollView style={styles.scrollView}>
              <CarbsTypeSelectPickerConnect />
              <CarbsUnitWeightSelectPickerConnect />
            </ScrollView>
          </View>
        </View>
      </KeyboardAvoidingView >
    )
  }
}

export const CarbohydratesSettngs = connect(
  (state: IStorage) => ({
    interactive: state.interactive
  })
)(CarbohydratesSettngsComponent)
