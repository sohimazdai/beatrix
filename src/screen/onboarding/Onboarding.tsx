import React from 'react';
import { connect } from 'react-redux';
import { View, Button, StyleSheet, Text } from 'react-native';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';

import { BlockHat } from '../../component/hat/BlockHat';
import Tooltip from '../../component/tooltip/Tooltip';
import { InfoIcon } from '../../component/icon/InfoIcon';

import { IStorage } from '../../model/IStorage';
import { COLOR } from '../../constant/Color';
import { ShortInsulinType, GlycemiaMeasuringType, IUserDiabetesProperties, CarbsMeasuringType } from '../../model/IUserDiabetesProperties';
import { SHADOW_OPTIONS } from '../../constant/OptionsShadow';
import { Measures } from '../../localisation/Measures';

import { i18nGet } from '../../localisation/Translate';
import { createCompleteOnboardingAction } from '../../store/service/onboarding/CompleteOnboardingSaga';
import { appAnalytics, AnalyticsSections } from '../../app/Analytics';

interface Props {
  userDiabetesProperties: IUserDiabetesProperties
  completeOnboarding: (diabetesProperties?: IUserDiabetesProperties) => void
};

interface State {
  selectedInsulinType?: ShortInsulinType
  selectedGlycemiaMeasuringType?: GlycemiaMeasuringType
  selectedCarbsMeasuringType?: CarbsMeasuringType
}

class Onboarding extends React.Component<Props, State> {
  state = {
    isUserUsingInsulin: true,
    selectedInsulinType: null,
    selectedGlycemiaMeasuringType: Measures.getDefaultGlucoseMeasuringType(
      this.props.userDiabetesProperties.glycemiaMeasuringType
    ),
    selectedCarbsMeasuringType: Measures.getDefaultCarbsMeasuringType(
      this.props.userDiabetesProperties.carbsMeasuringType
    ),
  };

  componentDidMount() {
    appAnalytics.setSection(AnalyticsSections.ONBOARDING);
    appAnalytics.sendEvent(appAnalytics.events.ONBOARDING_SEEN);
  }

  checkUsingInsulin = () => {
    const { isUserUsingInsulin, selectedInsulinType } = this.state;

    this.setState({
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

  selectGlycemiaMeasuringType = (type: GlycemiaMeasuringType) => {
    this.setState({
      selectedGlycemiaMeasuringType: type,
    });
  }

  selectCarbsMeasuringType = (type: CarbsMeasuringType) => {
    this.setState({
      selectedCarbsMeasuringType: type,
    });
  }

  completeOnboarding = () => {
    const { completeOnboarding, userDiabetesProperties } = this.props;
    const {
      selectedInsulinType,
      selectedGlycemiaMeasuringType,
      selectedCarbsMeasuringType,
    } = this.state;

    const diabetesProperties: IUserDiabetesProperties = {
      shortInsulinType: selectedInsulinType,
      glycemiaMeasuringType: selectedGlycemiaMeasuringType,
      carbsMeasuringType: selectedCarbsMeasuringType,
      carbsUnitWeightType: Measures.getDefaultCarbsUnitWeightType(
        userDiabetesProperties.carbsUnitWeightType,
      ),
    };

    completeOnboarding(diabetesProperties);
  }

  skipOnboarding = () => {
    const { completeOnboarding } = this.props;
    completeOnboarding();
  }

  render() {
    return (
      <View style={styles.onboardingScreen}>
        <BlockHat
          title={i18nGet('fill_information_about_yourself')}
        />
        <ScrollView style={styles.scrollView}>
          {this.renderInsulinBlock()}
          {this.renderGlucoseBlock()}
          {this.renderCarbsBlock()}
          <Text style={styles.note}>
            {i18nGet('you_can_change_it_later')}
          </Text>
          <Button
            title={i18nGet('continue')}
            onPress={this.completeOnboarding}
          />
          <Button
            title={i18nGet('skip')}
            onPress={this.skipOnboarding}
            color={COLOR.TEXT_DARK_GRAY}
          />
          <View style={{ height: 100 }} />
        </ScrollView>
      </View>
    );
  }

  renderInsulinBlock = () => {
    const { selectedInsulinType } = this.state;

    const shortStyles = selectedInsulinType === ShortInsulinType.SHORT
      ? { ...styles.typePickerItem, ...styles.typePickerItemActive }
      : { ...styles.typePickerItem };

    const ultraShortStyles = selectedInsulinType === ShortInsulinType.ULTRA_SHORT
      ? { ...styles.typePickerItem, ...styles.typePickerItemActive }
      : { ...styles.typePickerItem };

    return (
      <View style={styles.insulinPickerView}>
        <View style={styles.insulinPickerHeader}>
          <Text style={styles.label}>
            {i18nGet('select_insulin_type_you_use')}
          </Text>
          <Tooltip
            analyticsKeyOnOpen="shortInsulinTypeInfo"
            actionType="press"
            popover={(
              <View>
                <Text style={styles.tooltipText}>
                  {i18nGet('short_insulin') + ':\n'}
                  {i18nGet('short_insulin_brief')}
                </Text>
                <Text style={{ ...styles.tooltipText, paddingTop: 8 }}>
                  {i18nGet('ultra_short_insulin') + ':\n'}
                  {i18nGet('ultra_short_insulin_brief')}
                </Text>
              </View>
            )}
          >
            <InfoIcon textColor={COLOR.PRIMARY_WHITE} roundFill={COLOR.PRIMARY} />
          </Tooltip>
        </View>
        <View style={styles.typePicker}>
          <View style={styles.insulinPickerItem}>
            <TouchableOpacity
              onPress={() => this.selectInsulinType(ShortInsulinType.SHORT)}
              style={shortStyles}
            >
              <Text style={styles.typePickerItemText}>
                {i18nGet('short_insulin')}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.insulinPickerItem}>
            <TouchableOpacity
              onPress={() => this.selectInsulinType(ShortInsulinType.ULTRA_SHORT)}
              style={ultraShortStyles}
            >
              <Text style={styles.typePickerItemText}>
                {i18nGet('ultra_short_insulin')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View >
    );
  }

  renderGlucoseBlock = () => {
    const { selectedGlycemiaMeasuringType } = this.state;

    const mgdlStyles = selectedGlycemiaMeasuringType === GlycemiaMeasuringType.MG_DL
      ? { ...styles.typePickerItem, ...styles.typePickerItemActive }
      : { ...styles.typePickerItem };

    const mmollStyles = selectedGlycemiaMeasuringType === GlycemiaMeasuringType.MMOL_L
      ? { ...styles.typePickerItem, ...styles.typePickerItemActive }
      : { ...styles.typePickerItem };

    return (
      <View style={styles.insulinPickerView}>
        <Text style={styles.labelWithoutMargin}>
          {i18nGet('glycemia_unit_description')}
        </Text>
        <View style={styles.typePicker}>
          <View style={SHADOW_OPTIONS}>
            <TouchableOpacity
              onPress={() => this.selectGlycemiaMeasuringType(
                GlycemiaMeasuringType.MG_DL
              )}
              style={mgdlStyles}
            >
              <Text style={styles.typePickerItemText}>
                {i18nGet('mg/dL')}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={SHADOW_OPTIONS}>
            <TouchableOpacity
              onPress={() => this.selectGlycemiaMeasuringType(
                GlycemiaMeasuringType.MMOL_L
              )}
              style={mmollStyles}
            >
              <Text style={styles.typePickerItemText}>
                {i18nGet('mmol/L')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.defaultText}>
          {`${i18nGet('default_selection')}: ${Measures.getDefaultGlucoseMeasuringType()}`}
        </Text>
      </View>
    );
  }

  renderCarbsBlock = () => {
    const { selectedCarbsMeasuringType } = this.state;

    const buStyles = selectedCarbsMeasuringType === CarbsMeasuringType.BREAD_UNITS
      ? { ...styles.typePickerItem, ...styles.typePickerItemActive }
      : { ...styles.typePickerItem };

    const carbsStyles = selectedCarbsMeasuringType === CarbsMeasuringType.CARBOHYDRATES
      ? { ...styles.typePickerItem, ...styles.typePickerItemActive }
      : { ...styles.typePickerItem };

    return (
      <View style={styles.insulinPickerView}>
        <Text style={styles.labelWithoutMargin}>
          {i18nGet('carb_unit_description')}
        </Text>
        <View style={styles.typePicker}>
          <View style={SHADOW_OPTIONS}>
            <TouchableOpacity
              onPress={() => this.selectCarbsMeasuringType(
                CarbsMeasuringType.BREAD_UNITS
              )}
              style={buStyles}
            >
              <Text style={styles.typePickerItemText}>
                {i18nGet('breadUnits_measuring')}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={SHADOW_OPTIONS}>
            <TouchableOpacity
              onPress={() => this.selectCarbsMeasuringType(
                CarbsMeasuringType.CARBOHYDRATES
              )}
              style={carbsStyles}
            >
              <Text style={styles.typePickerItemText}>
                {i18nGet('carbohydrates_measuring')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.defaultText}>
          {`${i18nGet('default_selection')}: ${i18nGet(Measures.getDefaultCarbsMeasuringType() + '_measuring')}`}
        </Text>
      </View>
    );
  }
}

export const OnboardingConnected = connect(
  (state: IStorage) => ({
    userDiabetesProperties: state.userDiabetesProperties,
  }),
  (dispatch) => ({
    completeOnboarding: (diabetesProperties?: IUserDiabetesProperties) => {
      dispatch(createCompleteOnboardingAction(diabetesProperties))
    }
  })
)(Onboarding);

const styles = StyleSheet.create({
  onboardingScreen: {
    backgroundColor: COLOR.PRIMARY,
  },
  scrollView: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: COLOR.WHITE,
  },
  insulinPickerView: {
    borderRadius: 10,
    margin: 16,
    marginBottom: 0,
    padding: 16,
    backgroundColor: COLOR.WHITE,
    ...SHADOW_OPTIONS,
  },
  insulinPickerHeader: {
    display: 'flex',
    flexDirection: 'row',
  },
  tooltipText: {
    fontSize: 15,
    color: COLOR.PRIMARY_WHITE,
  },
  insulinPickerItem: {
    ...SHADOW_OPTIONS,
  },
  checkboxTouchable: {
    borderRadius: 3,
    borderWidth: 1,
    borderColor: COLOR.TEXT_DARK_GRAY,
    padding: 8,
  },
  checkboxTouchableActive: {
    backgroundColor: COLOR.GREEN,
    borderColor: COLOR.GREEN_DARK,
  },
  checkboxText: {
    marginLeft: 4,
    fontSize: 16,
  },
  typePicker: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 8,
  },
  typePickerItem: {
    backgroundColor: COLOR.WHITE,
    borderColor: COLOR.WHITE,
    borderWidth: 2,
    padding: 8,
    marginTop: 8,
    borderRadius: 5,
  },
  typePickerItemActive: {
    borderColor: COLOR.PRIMARY,
  },
  typePickerItemText: {
    fontSize: 16,
  },
  label: {
    fontSize: 16,
    color: COLOR.TEXT_DARK_GRAY,
  },
  labelWithoutMargin: {
    fontSize: 16,
    color: COLOR.TEXT_DARK_GRAY,
  },
  note: {
    padding: 16,
    fontSize: 15,
    color: COLOR.TEXT_DARK_GRAY,
  },
  defaultText: {
    paddingTop: 16,
    fontSize: 16,
    color: COLOR.TEXT_DARK_GRAY,
  },
})
