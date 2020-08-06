import React from 'react';
import { ProfilePicker } from '../../ProfilePicker';
import { View, TouchableOpacity, Text } from 'react-native';
import { IUserDiabetesProperties } from '../../../../model/IUserDiabetesProperties';
import { connect } from 'react-redux';
import { IStorage } from '../../../../model/IStorage';
import { styles } from './Style';
import { createUpdateUserDiabetesPropertiesAction } from '../../../../store/service/user/UpdateUserDiabetesPropertiesSaga';
import { i18nGet } from '../../../../localisation/Translate';
import { callSyncParametersAlert } from '../../modules/call-sync-parameters-alert';
import { ShortInsulinType } from '../../../../model/IUserDiabetesProperties';

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
