import React from 'react';

import { DashboardCard } from '../../../../shared/DashboardCard';
import { PieChartConnected } from '../PieChart';

import { StatisticsType, StatisticsViewType } from '../../entities';
import { Text, StyleSheet, View } from 'react-native';
import { Color } from '../../../../../constant/Color';
import { i18nGet } from '../../../../../localisation/Translate';
import { MeasuresStatisticsConnected } from '../MeasuresStatistics';
import { NoteValueType } from '../../../../../model/INoteList';
import { connect } from 'react-redux';
import { IStorage } from '../../../../../model/IStorage';
import { selectStatisticsAvailibility } from '../../selectors/select-statistics-availibility';

interface Props {
  statisticsType: StatisticsType
  isStatisticsAvailable: boolean
};

const TITLES = {
  [StatisticsType.TODAY]: 'statistics_today',
  [StatisticsType.YESTERDAY]: 'statistics_yesterday',
  [StatisticsType.LAST_MONTH]: 'statistics_last_month',
  [StatisticsType.LAST_THREE_MONTH]: 'statistics_last_three_month',
}

export class StatisticsCard extends React.Component<Props> {
  render() {
    const { statisticsType, isStatisticsAvailable } = this.props;

    if (!isStatisticsAvailable) return null;

    return (
      <DashboardCard withRightMargin withTopMargin>
        <Text style={styles.cardTitle}>
          {i18nGet(TITLES[statisticsType])}
        </Text>
        <View style={styles.cardContent}>
          <PieChartConnected statisticsType={statisticsType} viewType={StatisticsViewType.ABS} />
          <View>
            <MeasuresStatisticsConnected statisticsType={statisticsType} measuresType={NoteValueType.GLUCOSE} />
            <MeasuresStatisticsConnected statisticsType={statisticsType} measuresType={NoteValueType.BREAD_UNITS} />
            <MeasuresStatisticsConnected statisticsType={statisticsType} measuresType={NoteValueType.SHORT_INSULIN} />
            <MeasuresStatisticsConnected statisticsType={statisticsType} measuresType={NoteValueType.LONG_INSULIN} />
          </View>
        </View>
      </DashboardCard>
    );
  }
}

export const StatisticsCardConnected = connect(
  (state: IStorage) => state,
  () => ({}),
  (sP, { }, ownProps: { statisticsType: StatisticsType }) => ({
    ...ownProps,
    isStatisticsAvailable: selectStatisticsAvailibility(sP, ownProps.statisticsType),
  })
)(StatisticsCard);

const styles = StyleSheet.create({
  cardTitle: {
    fontSize: 19,
    color: Color.TEXT_DARK_GRAY,
    fontWeight: '500',
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'row',
    paddingTop: 8,
    alignItems: 'center',
  },
})
