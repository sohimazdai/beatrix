import * as React from 'react';
import { connect } from 'react-redux';

import { Circle } from 'react-native-svg';

import { COLOR } from '../../../constant/Color';
import { IChartDot, ChartValueType, IChartConfiguration } from '../../../model/IChart';
import { createChangeInteractive } from '../../../store/modules/interactive/interactive';
import { appAnalytics } from '../../../app/Analytics';
import getDotColor from './get-dot-color';
import getDotRadius from './get-dot-radius';
import getDotStroke from './get-dot-stroke';

const STROKE_WIDTH = 2;

const mapState = (state) => ({
  selectedDotId: state.interactive.selectedDotId,
});

const mapDispatchToProps = (dispatch) => ({
  onSelectDot: (noteId: number) => {
    dispatch(createChangeInteractive({ selectedDotId: noteId }));

    appAnalytics.sendEvent(appAnalytics.events.CHART_DOT_CLICKED);
  }
});

export interface Props {
  config: IChartConfiguration;
  dotData: IChartDot;
  selectedDotId?: number
  type?: ChartValueType
  onSelectDot: (dotId: number) => void
}

const Component = (props: Props) => {
  const {
    selectedDotId,
    dotData,
    type,
    config,
    onSelectDot,
  } = props;

  const handleCircleClick = React.useCallback(() => {
    onSelectDot(dotData.id);

  }, [onSelectDot, dotData.id]);

  const visibleDotRadius = React.useMemo(
    () => getDotRadius(type, config.dotRadius),
    [type, config.dotRadius],
  );

  const dotColor = React.useMemo(
    () => getDotColor(type, config.dotFillColor ? config.dotFillColor : COLOR.RED),
    [config.dotFillColor, COLOR.RED]
  );

  const dotStroke = React.useMemo(
    () => getDotStroke(selectedDotId, dotData, config),
    [selectedDotId, dotData, config]
  );

  return (
    <>
      <Circle
        r={visibleDotRadius}
        stroke={dotStroke}
        strokeWidth={STROKE_WIDTH}
        x={dotData.x}
        y={dotData.y}
        fill={dotColor}
      />
      <Circle
        onPress={handleCircleClick}
        r={visibleDotRadius * 2}
        stroke={COLOR.TRANSPARENT}
        strokeWidth={STROKE_WIDTH}
        x={dotData.x}
        y={dotData.y}
        fill={COLOR.TRANSPARENT}
      />
    </>
  );
}


export const ChartDot = connect(mapState, mapDispatchToProps)(Component);
