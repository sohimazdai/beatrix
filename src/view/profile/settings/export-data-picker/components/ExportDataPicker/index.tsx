import React from 'react';
import { Button, View, Text, StyleSheet, CheckBox } from 'react-native';
import { connect } from 'react-redux';
import { i18nGet } from '../../../../../../localisation/Translate';
import { IUserDiabetesProperties } from '../../../../../../model/IUserDiabetesProperties';
import { ProfilePicker } from '../../../../ProfilePicker';
import { IStorage } from '../../../../../../model/IStorage';
import { createExportDataAction } from '../../../../../../store/service/export/ExportDataSaga';
import { NoteDatePickerConnect } from '../../../../../notes/components/note-date-picker/NoteDatePicker';
import { selectFirstNoteDate } from '../../selectors/selectFirstNoteDate';
import { COLOR } from '../../../../../../constant/Color';
import { appAnalytics } from '../../../../../../app/Analytics';
import { SortType } from '../../../../../../model/IExport';
import { StyledButton, StyledButtonType } from '../../../../../../component/button/StyledButton';
import { Checkbox } from '../../../../../../component/checkbox/Checkbox';

interface Props {
  userDiabetesProperties?: IUserDiabetesProperties;
  firstNoteDate: number
  onExportPress: (from: number, to: number, dateSort: SortType) => void
}

interface State {
  from: Date,
  to: Date,
  dateSort: SortType
}

class ExportData extends React.Component<Props, State> {
  state = {
    from: new Date(this.props.firstNoteDate),
    to: new Date(),
    dateSort: SortType.ASCENDING,
  }

  onDateSortCheck = (type: SortType) => {
    this.setState({ dateSort: type })
  }

  onExportClick = () => {
    const { onExportPress } = this.props;
    const { from, to, dateSort } = this.state;

    onExportPress(from.getTime(), to.getTime(), dateSort)
  }

  render() {
    const { from, to, dateSort } = this.state;

    return (
      <ProfilePicker
        title={i18nGet('export_data_creating')}
      >
        <View style={styles.option}>
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
        </View>

        <View style={{ ...styles.option, ...styles.withMarginTop }}>
          <Text style={styles.title}>
            {i18nGet('export_date_sort')}
          </Text>
          <View style={styles.options}>
            <View style={styles.optionsCell}>
              <Checkbox
                label={i18nGet('export_date_ascending')}
                onCheck={() => this.onDateSortCheck(SortType.ASCENDING)}
                isChecked={dateSort === SortType.ASCENDING}
              />
            </View>
            <View style={styles.optionsCell}>
              <Checkbox
                label={i18nGet('export_date_descending')}
                onCheck={() => this.onDateSortCheck(SortType.DESCENDING)}
                isChecked={dateSort === SortType.DESCENDING}
              />
            </View>
          </View>
        </View>
        <View style={styles.buttonView}>
          <StyledButton
            style={StyledButtonType.PRIMARY}
            label={i18nGet('export_data_create_xlsx')}
            onPress={this.onExportClick}
          />
        </View>
      </ProfilePicker>
    );
  }
}

export const ExportDataConnect = connect(
  (state: IStorage) => ({
    userDiabetesProperties: state.userDiabetesProperties,
    firstNoteDate: selectFirstNoteDate(state),
  }),
  (dispatch) => ({
    onExportPress: (from: number, to: number, dateSort: SortType) => {
      appAnalytics.sendEventWithProps(appAnalytics.events.EXPORT_PRESS, { from, to });
      dispatch(createExportDataAction(from, to, dateSort))
    },
  })
)(ExportData)

const styles = StyleSheet.create({
  option: {
    paddingHorizontal: 16,
  },
  withMarginTop: {
    marginTop: 24,
  },
  title: {
    color: COLOR.TEXT_DARK_GRAY,
    fontSize: 19,
    display: 'flex',
    textAlign: 'left',
  },
  options: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  optionsCell: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  optionsCellText: {
    fontSize: 16,
    color: COLOR.TEXT_DARK_GRAY,
    marginRight: 8,
  },
  buttonView: {
    marginTop: 24,
    marginBottom: 16,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
})
