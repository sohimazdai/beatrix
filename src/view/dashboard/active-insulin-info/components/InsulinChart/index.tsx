import React from 'react';
import { connect } from 'react-redux';

import { View, StyleSheet, Text } from 'react-native';

import { IStorage } from '../../../../../model/IStorage';
import { convertFlatNoteListToNoteListByDay } from '../../../../../store/selector/NoteListSelector';
import { Color } from '../../../../../constant/Color';
import { IUserDiabetesProperties } from '../../../../../model/IUserDiabetesProperties';
import { ChartValueType, ChartPeriodType, ChartDotsData } from '../../../../../model/IChart';
import { INoteList, INoteListByDay } from '../../../../../model/INoteList';
import { ChartConfig } from '../../../../../screen/chart/config/ChartConfig';
import { shadowOptions } from '../../../../../constant/ShadowOptions';
import { ChartBox } from '../../../../chart/chart-svg/ChartBox';
import { ChartPolyline } from '../../../../chart/chart-svg/ChartPolyline';
import { calculateDayChartDots } from '../../../../../calculation-services/chart-calculation-services/ChartCalculationService';
import { selectNoteWithActiveInsulin } from '../../selectors/select-notes-with-active-insulin';

interface Props {
  activeInsulinNoteListByDay: INoteListByDay
  widthRelation: number
  userDiabetesProperties: IUserDiabetesProperties,
};

function ActiveInsulinChart(props: Props) {
  const {
    activeInsulinNoteListByDay,
    widthRelation,
    userDiabetesProperties: { shortInsulinType },
  } = props;

  if (!activeInsulinNoteListByDay) return null;

  const chartConfig = new ChartConfig().getConfigs().activeInsulin;

  let polylineDotsData: ChartDotsData = React.useMemo(
    () => calculateDayChartDots({
      noteListByDay: activeInsulinNoteListByDay,
      config: chartConfig,
      shortInsulinType,
      selectedPeriod: ChartPeriodType.DAY,
      minCritical: 0,
      maxCritical: 0,
      type: ChartValueType.INSULIN,
      currentDate: new Date(),
    }),
    [activeInsulinNoteListByDay]
  );

  return (
    <View style={styles.cardContent}>
      <View style={styles.chartView}>
        <ChartBox config={chartConfig}>

          <ChartPolyline
            widthRelation={widthRelation}
            polylineType={chartConfig.polylineType}
            dots={polylineDotsData.dots}
            chartPeriodType={ChartPeriodType.DAY}
            polylineColor={chartConfig.polylineColor}
            initGradientColor={chartConfig.initGradientColor}
            stopGradientColor={chartConfig.stopGradientColor}
          />
        </ChartBox>
      </View>
    </View>
  );
}

export const ActiveInsulinChartConnected = connect(
  (state: IStorage) => {
    const activeInsulinChartProps = selectNoteWithActiveInsulin(state);

    return {
      activeInsulinNoteListByDay: activeInsulinChartProps.noteListByDay,
      widthRelation: activeInsulinChartProps.widthRelation,
      userDiabetesProperties: state.userDiabetesProperties,
    }
  },
)(ActiveInsulinChart);


const styles = StyleSheet.create({
  titleRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardTitle: {
    fontSize: 19,
    color: Color.TEXT_DARK_GRAY,
    fontWeight: '500',
  },
  cardContent: {
    paddingTop: 16,
  },
  touchable: {
    ...shadowOptions,
  },
  iconBarWrap: {
    marginBottom: 8,
  },
  chartView: {
    width: '100%',

    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',

    overflow: 'hidden'
  },
  emptyListText: {
    fontSize: 16,
    color: Color.TEXT_DARK_GRAY,
    fontWeight: '500',
  },
  highightTitlesView: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  highightTitle: {
    fontSize: 13,
    color: '#666666',
    textAlign: 'center',
  },
  axisTitleView: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  axisTitleText: {
    paddingTop: 5,
    paddingRight: 10,

    fontSize: 11,
    fontWeight: 'bold',
    color: '#eee',
  },
})
