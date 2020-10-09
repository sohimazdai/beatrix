import React from 'react';
import { ProfilePicker } from '../../ProfilePicker';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { IUserDiabetesProperties } from '../../../../model/IUserDiabetesProperties';
import { connect } from 'react-redux';
import { IStorage } from '../../../../model/IStorage';
import { createUpdateUserDiabetesPropertiesAction } from '../../../../store/service/user/UpdateUserDiabetesPropertiesSaga';
import { i18nGet } from '../../../../localisation/Translate';
import { callSyncParametersAlert } from '../../modules/call-sync-parameters-alert';
import { ShortInsulinType } from '../../../../model/IUserDiabetesProperties';
import { COLOR } from '../../../../constant/Color';
import Tooltip from '../../../../component/tooltip/Tooltip';
import { SHADOW_OPTIONS } from '../../../../constant/ShadowOptions';
import { InfoIcon } from '../../../../component/icon/InfoIcon';

interface Props {
  userDiabetesProperties?: IUserDiabetesProperties;
  onPropertiesChange?: (properties: IUserDiabetesProperties) => void;
}

function ShortInsulinTypePicker(props: Props) {
  const { userDiabetesProperties: { shortInsulinType } } = props;

  return (
    <ProfilePicker
      title={i18nGet('select_insulin_type_you_use')}
      description={i18nGet('it_needs_to_show_charts_and_calculating_active_insulin')}
      titleTooltip={(
        <Tooltip
          actionType="press"
          popover={(
            <Text style={styles.tooltipText}>
            </Text>
          )}
          analyticsKeyOnOpen="short-insulin-picker-tooltip"
        >
          <InfoIcon textColor={COLOR.PRIMARY_WHITE} roundFill={COLOR.PRIMARY} />
        </Tooltip>
      )}
    >
      <View style={styles.shortInsulinTypePickerView}>
        <View style={styles.pickerContent}>
          <View
            style={shortInsulinType === ShortInsulinType.SHORT ?
              { ...styles.shortInsulinTypeButton, ...styles.shortInsulinTypeButtonActive } :
              styles.shortInsulinTypeButton}
          >
            <TouchableOpacity
              onPress={() => {
                props.onPropertiesChange({
                  shortInsulinType: ShortInsulinType.SHORT
                });
              }}
            >
              <Text
                style={shortInsulinType === ShortInsulinType.SHORT ?
                  { ...styles.shortInsulinTypePickerItemText, ...styles.shortInsulinTypePickerItemTextActive } :
                  styles.shortInsulinTypePickerItemText}
              >
                {i18nGet(ShortInsulinType.SHORT + '_insulin')}
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={shortInsulinType === ShortInsulinType.ULTRA_SHORT ?
              { ...styles.shortInsulinTypeButton, ...styles.shortInsulinTypeButtonActive } :
              styles.shortInsulinTypeButton}
          >
            <TouchableOpacity
              onPress={() => {
                props.onPropertiesChange({
                  shortInsulinType: ShortInsulinType.ULTRA_SHORT
                });
              }}
            >
              <Text
                style={shortInsulinType === ShortInsulinType.ULTRA_SHORT ?
                  { ...styles.shortInsulinTypePickerItemText, ...styles.shortInsulinTypePickerItemTextActive } :
                  styles.shortInsulinTypePickerItemText}
              >
                {i18nGet(ShortInsulinType.ULTRA_SHORT + '_insulin')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ProfilePicker >
  )
}

export const ShortInsulinTypePickerConnect = connect(
  (state: IStorage) => ({
    userDiabetesProperties: state.userDiabetesProperties,
  }),
  (dispatch) => ({ dispatch }),
  (stateProps, { dispatch }) => ({
    userDiabetesProperties: stateProps.userDiabetesProperties,
    onPropertiesChange: (properties: IUserDiabetesProperties) => {
      callSyncParametersAlert(
        () => dispatch(createUpdateUserDiabetesPropertiesAction(properties))
      );
    },
  })

)(ShortInsulinTypePicker)

const styles = StyleSheet.create({
  profileView: {
    height: '100%',
    width: '100%',
    display: 'flex',

    flexDirection: 'column',
    backgroundColor: "#DDDDDD"
  },
  blockedView: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pickerContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  targetGlycemiaView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: 10,
    paddingTop: 0,
  },
  targetGlycemiaSlider: {
    height: 50,
    width: "60%",
    margin: 10,
  },
  targetGlycemiaSliderLimitsText: {
    fontSize: 18
  },
  glycemiaInput: {
    height: 50,
    width: 70,
    marginLeft: 15,
    borderWidth: 1.5,
    borderColor: "#cecece",
    backgroundColor: "white",
    borderRadius: 5,

    textAlign: 'center',
    fontSize: 18,
  },
  shortInsulinTypePickerView: {
    paddingVertical: 15,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  shortInsulinTypeButton: {
    padding: 10,
    margin: 5,
    backgroundColor: "white",
    borderColor: "white",
    borderWidth: 2,
    borderRadius: 5,
    ...SHADOW_OPTIONS
  },
  changeButton: {
    margin: 10,
  },
  shortInsulinTypeButtonActive: {
    borderColor: "#2E3858",
    borderWidth: 2,
    borderRadius: 5,
    ...SHADOW_OPTIONS
  },
  shortInsulinTypePickerItemTextBlockedSelected: {
    color: COLOR.PRIMARY,
    fontWeight: '500',
    fontSize: 18,
    margin: 5,
  },
  shortInsulinTypePickerItemTextChange: {
    color: COLOR.PRIMARY_LIGHT,
    fontWeight: '500',
    fontSize: 16,
  },
  shortInsulinTypePickerItemText: {
    fontSize: 16,
    color: "rgba(0, 0, 0, 0.6)",
  },
  shortInsulinTypePickerItemTextActive: {
    fontSize: 16,
    color: "rgba(0, 0, 0, 0.8)",
    fontWeight: 'bold'
  },
  sensitivityFactorView: {
    display: 'flex',

    justifyContent: 'center',
    alignItems: 'center'
  },
  insulinSensitiveFactorPickerListItemTextInput: {

  },
  sensitivityFactorItemTitle: {
    flex: 1,
    alignContent: 'center',
    textAlign: 'center',
    fontSize: 17,
  },
  sensitivityFactorTitleView: {
    display: 'flex',

    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',

    padding: 20,
    paddingBottom: 10,
    paddingTop: 10
  },
  tooltipText: {
    color: COLOR.PRIMARY_WHITE,
    fontSize: 15,
    lineHeight: 20,
  }
})
