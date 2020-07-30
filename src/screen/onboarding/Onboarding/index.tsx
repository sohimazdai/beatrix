import React from 'react';
import { connect } from 'react-redux';

import { View, Button, StyleSheet, Text } from 'react-native';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';

import { i18nGet } from '../../../localisation/Translate';
import { IStorage } from '../../../model/IStorage';
import { createUserChangeAction } from '../../../store/modules/user/UserActionCreator';
import { Color } from '../../../constant/Color';
import { ShortInsulinType } from '../../../model/IUserDiabetesProperties';
import { shadowOptions } from '../../../constant/ShadowOptions';

interface Props {
  completeOnboarding: () => void
};

interface State {
  isUserUsingInsulin: boolean,
  selectedInsulinType?: ShortInsulinType
}

class Onboarding extends React.Component<Props, State> {
  state = {
    isUserUsingInsulin: true,
    selectedInsulinType: null,
  }

  checkUsingInsulin = () => {
    const { isUserUsingInsulin, selectedInsulinType } = this.state;

    this.setState({
      isUserUsingInsulin: !isUserUsingInsulin,
      selectedInsulinType: isUserUsingInsulin
        ? null
        : selectedInsulinType,
    })
  }

  selectInsulinType = (type: ShortInsulinType) => {
    this.setState({
      selectedInsulinType: type,
    });
  }

  render() {
    const { completeOnboarding } = this.props;

    return (
      <View style={styles.onboardingScreen}>
        <ScrollView >
          <Text style={styles.header}>
            {i18nGet('fill_information_about_yourself')}
          </Text>
          {this.renderInsulinBlock()}
          <Text style={styles.note}>
            {i18nGet('you_can_change_it_later')}
          </Text>
          <Button title={i18nGet('continue')} onPress={completeOnboarding} />
          <Button title={i18nGet('skip')} onPress={() => {/*TODO:*/ }} color={Color.TEXT_DARK_GRAY} />
        </ScrollView>
      </View>
    );
  }

  renderInsulinBlock = () => {
    const { selectedInsulinType, isUserUsingInsulin } = this.state;

    const touchableStyle = isUserUsingInsulin
      ? { ...styles.checkboxTouchable, ...styles.checkboxTouchableActive }
      : { ...styles.checkboxTouchable };

    const shortStyles = selectedInsulinType === ShortInsulinType.SHORT
      ? { ...styles.insulinTypePickerItem, ...styles.insulinTypePickerItemActive }
      : { ...styles.insulinTypePickerItem };

    const ultraShortStyles = selectedInsulinType === ShortInsulinType.ULTRA_SHORT
      ? { ...styles.insulinTypePickerItem, ...styles.insulinTypePickerItemActive }
      : { ...styles.insulinTypePickerItem };

    return (
      <View style={styles.insulinPickerView}>
        <View style={styles.checkboxView}>
          <TouchableOpacity onPress={this.checkUsingInsulin} style={touchableStyle} />
          <Text style={styles.checkboxText}>
            {i18nGet('do_you_use_insulin')}
          </Text>
        </View>
        {isUserUsingInsulin && (
          <>
            <Text style={styles.label}>
              {i18nGet('select_insulin_type_you_use')}
            </Text>
            <View style={styles.insulinTypePicker}>
              <View style={shadowOptions}>
                <TouchableOpacity
                  onPress={() => this.selectInsulinType(ShortInsulinType.SHORT)}
                  style={shortStyles}
                >
                  <Text style={styles.insulinTypePickerItemText}>
                    {i18nGet('short_insulin')}
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={shadowOptions}>
                <TouchableOpacity
                  onPress={() => this.selectInsulinType(ShortInsulinType.ULTRA_SHORT)}
                  style={ultraShortStyles}
                >
                  <Text style={styles.insulinTypePickerItemText}>
                    {i18nGet('ultra_short_insulin')}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        )}
      </View>
    );
  }
}

export const OnboardingConnected = connect(
  (state: IStorage) => ({

  }),
  (dispatch) => ({
    completeOnboarding: () => dispatch(createUserChangeAction({
      isOnboardingCompleted: false //TODO:
    }))
  })
)(Onboarding);

const styles = StyleSheet.create({
  onboardingScreen: {
  },
  header: {
    marginLeft: 16,
    marginTop: 16,
    fontSize: 18,
    color: Color.TEXT_BLACK,
  },
  insulinPickerView: {
    borderRadius: 10,
    margin: 16,
    marginBottom: 0,
    padding: 16,
    backgroundColor: Color.WHITE,
    ...shadowOptions,
  },
  checkboxView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxTouchable: {
    borderRadius: 3,
    borderWidth: 1,
    borderColor: Color.TEXT_DARK_GRAY,
    padding: 8,
  },
  checkboxTouchableActive: {
    backgroundColor: Color.GREEN,
    borderColor: Color.GREEN_DARK,
  },
  checkboxText: {
    marginLeft: 4,
    fontSize: 16,
  },
  insulinTypePicker: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  insulinTypePickerItem: {
    backgroundColor: Color.WHITE,
    borderColor: Color.WHITE,
    borderWidth: 2,
    padding: 8,
    marginTop: 8,
    borderRadius: 5,
  },
  insulinTypePickerItemActive: {
    borderColor: Color.PRIMARY,
  },
  insulinTypePickerItemText: {
    fontSize: 16,
  },
  label: {
    marginTop: 16,
    marginBottom: 4,
    fontSize: 16,
    color: Color.TEXT_DARK_GRAY,
  },
  note: {
    padding: 16,
    fontSize: 15,
    color: Color.TEXT_DARK_GRAY,
  },
})
