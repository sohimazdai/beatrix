import React from 'react';
import { connect } from 'react-redux';

import { View, Text, StyleSheet } from 'react-native';
import { NoteValueType } from '../../../../../model/INoteList';
import { IStorage } from '../../../../../model/IStorage';
import { StatisticsType, StatisticsViewType } from '../../entities';
import { selectMeasuresStatisticsValue } from '../../selectors/select-measures-statistics-value';
import { GlycemiaIconConnected } from '../../../../../component/icon/tooltiped/GlycemiaIcon';
import { BreadUnitsIconConnected } from '../../../../../component/icon/tooltiped/BreadUnitsIcon';
import { ShortInsulinIconConnected } from '../../../../../component/icon/tooltiped/ShortInsulinIcon';
import { LongInsulinIconConnected } from '../../../../../component/icon/tooltiped/LongInsulinIcon';

interface Props {
  measuresType: NoteValueType,
  value: number;
};

const ICONS = {
  [NoteValueType.GLUCOSE]: (style) => <GlycemiaIconConnected style={style} />,
  [NoteValueType.BREAD_UNITS]: (style) => <BreadUnitsIconConnected style={style} />,
  [NoteValueType.SHORT_INSULIN]: (style) => <ShortInsulinIconConnected style={style} />,
  [NoteValueType.LONG_INSULIN]: (style) => <LongInsulinIconConnected style={style} />,
}

class MeasuresStatistics extends React.Component<Props> {
  render() {
    const { measuresType, value } = this.props;

    const getIcon = ICONS[measuresType];
    return (
      <View style={styles.row}>
        {getIcon(styles.icon)}
        <Text style={styles.text}>
          {value || '-'}
        </Text>
      </View>
    );
  }
}

export const MeasuresStatisticsConnected = connect(
  (state: IStorage) => state,
  () => ({}),
  (
    sP,
    { },
    ownProps: {
      measuresType: NoteValueType,
    }
  ) => ({
    measuresType: ownProps.measuresType,
    value: selectMeasuresStatisticsValue(
      sP,
      ownProps.measuresType,
      StatisticsType.TODAY,
    )
  })
)(MeasuresStatistics);

const styles = StyleSheet.create({
  row: {
    display: 'flex',
    padding: 8,
    flexDirection: 'row',
  },
  icon: {
    height: 25,
    width: 25,
  },
  text: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    lineHeight: 19,
    fontSize: 16,
    marginLeft: 8,
  }
})
