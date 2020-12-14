import React from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { NoteValueType } from '../../../model/INoteList';
import { StatisticsPeriod } from '../../../model/IStatistics';
import { IStorage } from '../../../model/IStorage';
import { StatisticsType } from '../../dashboard/statistics-card/entities';
import { selectMeasuresStatisticsValue } from '../../dashboard/statistics-card/selectors/select-measures-statistics-value';

interface OwnProps {
  noteValueType: NoteValueType
  statisticsPeriod: StatisticsPeriod
};

interface Props {
  metrics: any
}

class Component extends React.Component<Props> {
  render() {
    return (
      <View>
        <Text>
          {`MeasureStatistics`}
        </Text>
      </View>
    );
  }
}

export const MeasureStatistics = connect(
  (state: IStorage, ownProps: OwnProps) => ({
    metrics: selectMeasuresStatisticsValue(state, ownProps.noteValueType, ownProps.statisticsPeriod)
  }),
)(Component);
