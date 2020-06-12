import React from 'react';
import { ProfilePicker } from '../../ProfilePicker';
import { Picker } from 'react-native';
import { IUserDiabetesProperties, GlycemiaMeasuringType } from '../../../../model/IUserDiabetesProperties';
import { connect } from 'react-redux';
import { IStorage } from '../../../../model/IStorage';
import { createUserDiabetesPropertiesChangeAction } from '../../../../store/modules/user-diabetes-properties/UserDiabetesPropertiesActionCreator';
import { i18nGet } from '../../../../localisation/Translate';

interface Props {
  userDiabetesProperties?: IUserDiabetesProperties;
  onPropertiesChange?: (properties: IUserDiabetesProperties) => void;
}

function GlycemiaTypePicker(props: Props) {
  const { userDiabetesProperties, onPropertiesChange } = props;

  return (
    <ProfilePicker
      title={i18nGet('glycemia_unit')}
      description={i18nGet('glycemia_unit_description')}
    >
      <Picker
        selectedValue={userDiabetesProperties.glycemiaMeasuringType}
        onValueChange={(value) => onPropertiesChange({ glycemiaMeasuringType: value })}
      >
        <Picker.Item
          label={GlycemiaMeasuringType.MG_DL}
          value={GlycemiaMeasuringType.MG_DL}
        />
        <Picker.Item
          label={GlycemiaMeasuringType.MMOL_L}
          value={GlycemiaMeasuringType.MMOL_L}
        />
      </Picker>
    </ProfilePicker>
  )
}

export const GlycemiaTypePickerConnect = connect(
  (state: IStorage) => ({
    userDiabetesProperties: state.userDiabetesProperties
  }),
  (dispatch) => ({
    onPropertiesChange: (properties: IUserDiabetesProperties) => {
      dispatch(createUserDiabetesPropertiesChangeAction(properties))
    },
  })
)(GlycemiaTypePicker)
