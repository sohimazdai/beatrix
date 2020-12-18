import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { GlucometerIcon } from '../../../component/icon/value-icons/GlucometerIcon';
import { LongSyringeIcon } from '../../../component/icon/value-icons/LongSyringeIcon';
import { ShortSyringeIcon } from '../../../component/icon/value-icons/ShortSyringeIcon';
import { VegetablesIcon } from '../../../component/icon/value-icons/VegetablesIcon';
import { i18nGet } from '../../../localisation/Translate';
import { INoteListNote, NoteValueType } from '../../../model/INoteList';
import { StatisticsPeriod } from '../../../model/IStatistics';
import { IStorage } from '../../../model/IStorage';
import { IUserDiabetesProperties } from '../../../model/IUserDiabetesProperties';
import { selectNoteListForStatisticsByPeriod } from '../selectors/select-note-list-for-statistics-by-period';
import getActualMetricValues from './get-actual-metric-values';

interface OwnProps {
  date: Date
  period: StatisticsPeriod
};

interface Props {
  measureName: NoteValueType,
  noteList: INoteListNote[]
  userDiabetesProperties: IUserDiabetesProperties,
};

class StatisticsBlock extends React.Component<Props> {
  get measureSystem(): string {
    const { measureName, userDiabetesProperties } = this.props;
    switch (measureName) {
      case NoteValueType.GLUCOSE:
        return `\u00a0${i18nGet(userDiabetesProperties.glycemiaMeasuringType)}`.toLowerCase();
      case NoteValueType.BREAD_UNITS:
        return `\u00a0${i18nGet(userDiabetesProperties.carbsMeasuringType)}`.toLowerCase();
      default: return '';
    }
  }

  get icon(): JSX.Element {
    const { measureName } = this.props;

    switch (measureName) {
      case NoteValueType.GLUCOSE:
        return <GlucometerIcon width={25} height={25} />;
      case NoteValueType.BREAD_UNITS:
        return <VegetablesIcon width={25} height={25} />;
      case NoteValueType.SHORT_INSULIN:
        return <ShortSyringeIcon width={25} height={25} />;
      case NoteValueType.LONG_INSULIN:
        return <LongSyringeIcon width={25} height={25} />;
    }
  }

  render() {
    const { measureName, noteList } = this.props;
    const {
      maximum, minimum, count, daysCount, average,
    } = getActualMetricValues(noteList, measureName);

    return (
      <View style={styles.wrap}>
        <View style={styles.titleRow}>
          {this.icon}
          <Text style={styles.title}>
            {i18nGet(measureName)}
          </Text>
        </View>
        <Text style={styles.metric}>
          {`${i18nGet('average_value_of_period')}: ${average}${this.measureSystem}`}
        </Text>
        <Text style={styles.metric}>
          {`${i18nGet('count_of_measures')}: ${count}`}
        </Text>
        {daysCount > 1 && (
          <Text style={styles.metric}>
            {`${i18nGet('count_of_days_with_at_least_one_measure')}: ${daysCount}`}
          </Text>
        )}
        <Text style={styles.metric}>
          {`${i18nGet('maximal_value_of_period')}: ${maximum}${this.measureSystem}`}
        </Text>
        <Text style={styles.metric}>
          {`${i18nGet('minimal_value_of_period')}: ${minimum}${this.measureSystem}`}
        </Text>
      </View>
    );
  }
}

export const StatisticsBlockConnect = connect(
  (state: IStorage, ownProps: OwnProps) => ({
    userDiabetesProperties: state.userDiabetesProperties,
    noteList: selectNoteListForStatisticsByPeriod(state, ownProps.period, ownProps.date),
  }),
)(StatisticsBlock)

const styles = StyleSheet.create({
  wrap: {
    paddingTop: 16,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    paddingLeft: 8,
  },
  metric: {
    marginTop: 4,
    fontSize: 15,
  },
});
