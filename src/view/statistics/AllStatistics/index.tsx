import React from 'react';
import { Text, View } from 'react-native';
import { StatisticsPeriod } from '../../../model/IStatistics';
import { MeasureStatistics } from '../MeasureStatistics';

interface Props {
  statisticsPeriod: StatisticsPeriod
  date: Date
};

export class AllStatistics extends React.Component<Props> {
  render() {
    return (
      <View>
        <Text>
          {`AllStatistics`}
        </Text>
      </View>
    );
  }
}
