import React from 'react';
import { Picker, Button } from 'react-native';
import { connect } from 'react-redux';
import { i18nGet } from '../../../../../../localisation/Translate';
import { IUserDiabetesProperties } from '../../../../../../model/IUserDiabetesProperties';
import { ProfilePicker } from '../../../../ProfilePicker';
import { IStorage } from '../../../../../../model/IStorage';
import { createExportDataAction } from '../../../../../../store/service/export/ExportDataSaga';

interface Props {
  userDiabetesProperties?: IUserDiabetesProperties;
  onExportPress: (from?: number, to?: number) => void
}

function ExportData(props: Props) {
  const { onExportPress } = props;

  return (
    <ProfilePicker
      title={i18nGet('export_data_settings')}
    >
      <Button
        title={i18nGet('export_data_create_xlsx')}
        onPress={() => onExportPress()}
      />
    </ProfilePicker>
  )
}

export const ExportDataConnect = connect(
  (state: IStorage) => ({
    userDiabetesProperties: state.userDiabetesProperties
  }),
  (dispatch) => ({
    onExportPress: (from?: number, to?: number) => dispatch(createExportDataAction(from, to))
  })
)(ExportData)
