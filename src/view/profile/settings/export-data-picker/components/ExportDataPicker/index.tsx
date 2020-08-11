import React from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { i18nGet } from '../../../../../../localisation/Translate';
import { IUserDiabetesProperties } from '../../../../../../model/IUserDiabetesProperties';
import { ProfilePicker } from '../../../../ProfilePicker';
import { IStorage } from '../../../../../../model/IStorage';
import { createExportDataAction } from '../../../../../../store/service/export/ExportDataSaga';
import { NoteDatePickerConnect } from '../../../../../notes/note-date-picker/NoteDatePicker';
import { convertFlatNoteListToNoteListByDay } from '../../../../../../store/selector/NoteListSelector';
import { INoteListByDay } from '../../../../../../model/INoteList';
import { selectFirstNoteDate } from '../../selectors/selectFirstNoteDate';
import { Color } from '../../../../../../constant/Color';
import { appAnalytics } from '../../../../../../app/Analytics';

interface Props {
  userDiabetesProperties?: IUserDiabetesProperties;
  noteListByDay: INoteListByDay
  firstNoteDate: number
  onExportPress: (from?: number, to?: number) => void
}

interface State {
  from: Date,
  to: Date,
}

class ExportData extends React.Component<Props, State> {
  state = {
    from: new Date(this.props.firstNoteDate),
    to: new Date(),
  }
  render() {
    const { onExportPress } = this.props;
    const { from, to } = this.state;

    return (
      <ProfilePicker
        title={i18nGet('export_data_creating')}
      >
        <Text style={styles.title}>
          {i18nGet('export_data_date_period')}
        </Text>
        <View style={styles.options}>
          <View style={styles.optionsCell}>
            <Text style={styles.optionsCellText}>
              {i18nGet('export_data_date_from')}
            </Text>
            <NoteDatePickerConnect
              date={from}
              onChange={(value) => {
                this.setState({ from: value })
              }}
            />
          </View>
          <View style={styles.optionsCell}>
            <Text style={styles.optionsCellText}>
              {i18nGet('export_data_date_to')}
            </Text>
            <NoteDatePickerConnect
              date={to}
              onChange={(value) => {
                this.setState({ to: value })
              }}
            />
          </View>
        </View>
        <View style={styles.buttonView}>
          <Button
            title={i18nGet('export_data_create_xlsx')}
            onPress={() => onExportPress(from.getTime(), to.getTime())}
          />
        </View>
      </ProfilePicker>
    );
  }
}

export const ExportDataConnect = connect(
  (state: IStorage) => ({
    userDiabetesProperties: state.userDiabetesProperties,
    noteListByDay: convertFlatNoteListToNoteListByDay(state),
    firstNoteDate: selectFirstNoteDate(state),
  }),
  (dispatch) => ({
    onExportPress: (from?: number, to?: number) => {
      appAnalytics.sendEventWithProps(appAnalytics.events.EXPORT_PRESS, { from, to });
      dispatch(createExportDataAction(from, to))
    },
  })
)(ExportData)

const styles = StyleSheet.create({
  title: {
    color: Color.TEXT_DARK_GRAY,
    fontSize: 19,
    marginBottom: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  options: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  optionsCell: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionsCellText: {
    fontSize: 16,
    color: Color.TEXT_DARK_GRAY,
    marginRight: 8,
  },
  buttonView: {
    margin: 16,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
})
