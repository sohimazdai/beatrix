import React from 'react';
import { connect } from 'react-redux';

import { View, StyleSheet, Text } from 'react-native';

import { IStorage } from '../../../../../model/IStorage';
import { COLOR } from '../../../../../constant/Color';
import { IUserDiabetesProperties } from '../../../../../model/IUserDiabetesProperties';
import { ChartValueType, ChartPeriodType, ChartDotsData } from '../../../../../model/IChart';
import { INoteListByDay } from '../../../../../model/INoteList';
import { ChartConfig } from '../../../../../screen/chart/config/ChartConfig';
import { SHADOW_OPTIONS } from '../../../../../constant/ShadowOptions';
import { ChartBox } from '../../../../chart/chart-svg/ChartBox';
import { ChartPolyline } from '../../../../chart/chart-svg/ChartPolyline';
import { calculateDayChartDots } from '../../../../../calculation-services/chart-calculation-services/ChartCalculationService';
import { selectNoteWithActiveInsulin } from '../../selectors/select-notes-with-active-insulin';
import { selectActiveInsulinDuration } from '../../selectors/select-active-insulin-duration';
import { ChartAxisPair } from '../../../../chart/chart-svg/ChartAxisPair';
import { ChartNowLine } from '../ChartNowLine';
import { ChartNet } from '../../../../chart/chart-svg/ChartNet';
import { getWidthShiftLeft } from './get-width-shift-left';
import { ActiveInsulinCounterConnected } from '../ActiveInsulinCounter';

const TIMESTEPS_AT_DAY = 24 * 60 / 5; // h * m / timeStep

interface Props {
  activeInsulinNoteListByDay: INoteListByDay
  hoursOfinsulinDuration: number
  userDiabetesProperties: IUserDiabetesProperties,
  oldestActiveInsulinDate: number,
};

function ActiveInsulinChart(props: Props) {
  const {
    activeInsulinNoteListByDay,
    hoursOfinsulinDuration,
    userDiabetesProperties: { shortInsulinType },
    oldestActiveInsulinDate
  } = props;

  if (!activeInsulinNoteListByDay) return null;

  const chartConfig = new ChartConfig().getConfigs().activeInsulin;
  const widthRelation = (hoursOfinsulinDuration * 60 / chartConfig.timeStepMinutes) / TIMESTEPS_AT_DAY;
  const widthShiftLeft = getWidthShiftLeft(
    hoursOfinsulinDuration,
    oldestActiveInsulinDate,
    chartConfig
  );


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
          <ChartNet
            cfg={chartConfig}
            maxValue={polylineDotsData.maxValue}
            minValue={polylineDotsData.minValue}
            type={ChartValueType.INSULIN}
            periodType={ChartPeriodType.PARTICULAR}
            paddingTop={chartConfig.paddingTop}
            paddingBottom={chartConfig.paddingBottom}
            renderCritical={false}
            selectedPeriod={ChartPeriodType.PARTICULAR}
            currentDate={new Date()}
          />
          <ChartPolyline
            widthRelation={widthRelation}
            widthShiftLeft={widthShiftLeft}
            polylineType={chartConfig.polylineType}
            dots={polylineDotsData.dots}
            chartPeriodType={ChartPeriodType.DAY}
            polylineColor={chartConfig.polylineColor}
            initGradientColor={chartConfig.initGradientColor}
            stopGradientColor={chartConfig.stopGradientColor}
          />
          <ChartNowLine cfg={chartConfig} />
          <ChartAxisPair config={chartConfig} />
        </ChartBox>
      </View>
    </View>
  );
}

export const ActiveInsulinChartConnected = connect(
  (state: IStorage) => ({
    activeInsulinNoteListByDay: selectNoteWithActiveInsulin(state).noteListByDay,
    oldestActiveInsulinDate: selectNoteWithActiveInsulin(state).oldestNoteTime,
    hoursOfinsulinDuration: selectActiveInsulinDuration(state),
    userDiabetesProperties: state.userDiabetesProperties,
  }),
)(ActiveInsulinChart);


const styles = StyleSheet.create({
  titleRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardTitle: {
    fontSize: 19,
    color: COLOR.TEXT_DARK_GRAY,
    fontWeight: '500',
  },
  cardContent: {
    paddingTop: 16,
  },
  touchable: {
    ...SHADOW_OPTIONS,
  },
  iconBarWrap: {
    marginBottom: 8,
  },
  chartView: {
    width: '100%',

    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  emptyListText: {
    fontSize: 16,
    color: COLOR.TEXT_DARK_GRAY,
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
