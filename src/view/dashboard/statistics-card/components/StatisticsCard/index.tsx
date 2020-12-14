import React from 'react';

import { DashboardCard } from '../../../../shared/components/DashboardCard';
import { PieChartConnected } from '../PieChart';

import { StatisticsType, StatisticsViewType } from '../../entities';
import { Text, StyleSheet, View } from 'react-native';
import { COLOR } from '../../../../../constant/Color';
import { i18nGet } from '../../../../../localisation/Translate';
import { MeasuresStatisticsConnected } from '../MeasuresStatistics';
import { NoteValueType } from '../../../../../model/INoteList';
import { connect } from 'react-redux';
import { IStorage } from '../../../../../model/IStorage';
import { selectStatisticsAvailibility } from '../../selectors/select-statistics-availibility';
import { TouchableOpacity } from 'react-native-gesture-handler';
import StatisticsPieIcon from '../../../../../component/icon/StatisticsPieIcon';
import { SHADOW_OPTIONS } from '../../../../../constant/ShadowOptions';
import { StatisticsPeriod } from '../../../../../model/IStatistics';

interface Props {
  statisticsPeriod: StatisticsPeriod
  isStatisticsAvailable: boolean
  onStatisticsIconPress: () => void
};

const TITLES = {
  [StatisticsType.TODAY]: 'statistics_today',
  [StatisticsType.YESTERDAY]: 'statistics_yesterday',
  [StatisticsType.LAST_MONTH]: 'statistics_last_month',
  [StatisticsType.LAST_THREE_MONTH]: 'statistics_last_three_month',
}

export class StatisticsCard extends React.Component<Props> {
  render() {
    const { isStatisticsAvailable, onStatisticsIconPress } = this.props;

    if (!isStatisticsAvailable) return null;

    return (
      <DashboardCard>
        <View style={styles.titleRow}>
          <Text style={styles.cardTitle}>
            {`${i18nGet('statistics')}. ${i18nGet(TITLES[StatisticsType.TODAY])}`}
          </Text>
          <TouchableOpacity style={styles.touchable} onPress={onStatisticsIconPress}>
            <StatisticsPieIcon width={26} />
          </TouchableOpacity>
        </View>
        <View style={styles.cardContent}>
          <View style={styles.pieWrap}>
            <PieChartConnected
              statisticsPeriod={StatisticsPeriod.DAY}
              viewType={StatisticsViewType.ABS}
              date={new Date()}
            />
          </View>
          <View style={styles.measures}>
            <View style={styles.measuresColumn}>
              <MeasuresStatisticsConnected measuresType={NoteValueType.GLUCOSE} date={new Date()} />
              <MeasuresStatisticsConnected measuresType={NoteValueType.SHORT_INSULIN} date={new Date()} />
            </View>
            <View style={styles.measuresColumn}>
              <MeasuresStatisticsConnected measuresType={NoteValueType.BREAD_UNITS} date={new Date()} />
              <MeasuresStatisticsConnected measuresType={NoteValueType.LONG_INSULIN} date={new Date()} />
            </View>
          </View>
        </View>
      </DashboardCard>
    );
  }
}

export const StatisticsCardConnected = connect(
  (state: IStorage) => state,
  () => ({}),
  (sP, { }, ownProps: { statisticsPeriod: StatisticsPeriod }) => ({
    ...ownProps,
    isStatisticsAvailable: selectStatisticsAvailibility(sP, ownProps.statisticsPeriod, new Date()),
  })
)(StatisticsCard);

const styles = StyleSheet.create({
  titleRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  touchable: {
    ...SHADOW_OPTIONS,
  },
  iconBarWrap: {
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 19,
    color: COLOR.TEXT_DARK_GRAY,
    fontWeight: '500',
  },
  pieWrap: {
    paddingTop: 8,
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  measures: {
    display: 'flex',
    flexDirection: 'row',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  measuresColumn: {
    marginLeft: 8,
  }
})
