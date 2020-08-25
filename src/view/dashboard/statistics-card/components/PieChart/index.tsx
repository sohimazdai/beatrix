import React from 'react';
import { connect } from 'react-redux';

import { View, Text, StyleSheet } from 'react-native';

import { StatisticsType, StatisticsViewType, PieColors, } from '../../entities';
import { IStorage } from '../../../../../model/IStorage';
import { convertFlatNoteListToNoteListByDay } from '../../../../../store/selector/NoteListSelector';
import { selectStatisticsPieParts } from '../../selectors/select-statistics-pie-parts';
import { PieChart } from 'react-native-svg-charts'
import { PieLegendItem } from '../PieLegendItem';
import Tooltip from '../../../../../component/tooltip/Tooltip';
import { PieToolTipItem } from '../PieToolTipItem';
import { i18nGet } from '../../../../../localisation/Translate';
import { COLOR } from '../../../../../constant/Color';
import { SHADOW_OPTIONS } from '../../../../../constant/ShadowOptions';

interface Props {
  viewType: StatisticsViewType
  parts: { value: number, title: string }[];
};

interface State {
  viewType: StatisticsViewType
}

class PieChartComponent extends React.Component<Props, State> {
  state = {
    viewType: this.props.viewType || StatisticsViewType.ABS,
  };

  render() {
    const { parts } = this.props;
    const isPercent = true;
    const totalValue = parts.reduce((acc, curr) => acc + curr.value, 0);

    const isThereNoParts = !parts.filter(part => !!part.value).length;

    if (isThereNoParts) {
      return (
        <Text style={{
          maxWidth: 160,
          textAlign: 'center',
          fontSize: 15,
          color: COLOR.TEXT_DARK_GRAY
        }}>
          {i18nGet('glucose_not_found_for_diagram')}
        </Text>
      );
    };

    const pieData = parts
      .map((part, index) => ({
        value: isPercent
          ? totalValue ? (part.value / totalValue) * 100 : 0
          : part.value,
        svg: {
          fill: PieColors[part.title],
        },
        key: `pie-${index}`,
      }));

    return (
      <View>
        <View style={styles.pieWithLegend}>
          <Tooltip
            analyticsKeyOnOpen="statisticsPie"
            actionType='press'
            popover={(
              <View>
                {parts.map((part, index) => (
                  <PieToolTipItem
                    isFirst={!index}
                    key={part.title}
                    title={part.title}
                  />
                ))}
              </View>
            )}
          >
            <PieChart style={styles.pieChart} data={pieData} />
          </Tooltip>
          <View>
            {parts.map((part) => (
              <PieLegendItem
                key={part.title}
                title={part.title}
                value={isPercent
                  ? totalValue ? (part.value / totalValue) * 100 : 0
                  : part.value}
                isPercent={isPercent}
              />
            ))}
          </View>
        </View>
      </View>
    );
  }
}

export const PieChartConnected = connect(
  (state: IStorage) => ({
    state,
    noteListByDay: convertFlatNoteListToNoteListByDay(state),
    userDiabetesProperties: state.userDiabetesProperties,
  }),
  () => ({}),
  (stateProps, { }, ownProps: { statisticsType: StatisticsType }) => ({
    parts: selectStatisticsPieParts(
      stateProps.state,
      ownProps.statisticsType,
      stateProps.userDiabetesProperties
    ),
  })
)(PieChartComponent);

const styles = StyleSheet.create({
  pieWithLegend: {
    display: 'flex',
    flexDirection: 'row',
    paddingTop: 8,
  },
  pieChart: {
    height: 90,
    width: 90,
    ...SHADOW_OPTIONS,
  }
})
