import React from 'react';
import { IChartConfiguration } from '../../../../../model/IChart';
import { Line } from 'react-native-svg';
import { connect } from 'react-redux';
import { IStorage } from '../../../../../model/IStorage';
import { selectActiveInsulinDuration } from '../../selectors/select-active-insulin-duration';
import { selectNoteWithActiveInsulin } from '../../selectors/select-notes-with-active-insulin';

export interface Props {
  cfg: IChartConfiguration
  hoursOfInsulinDuration: number
  oldestNoteTime: number
}

export class Component extends React.Component<Props> {
  state = {
    now: new Date(),
    intervalId: null,
  }

  componentDidMount() {
    this.timer();

    const intervalId = setInterval(this.timer, 60 * 1000);
    this.setState({ intervalId: intervalId });
  }

  componentWillUnmount = () => {
    clearInterval(this.state.intervalId);
  };

  timer = () => {
    this.setState({
      now: new Date(),
    });
  };

  render() {
    const { now } = this.state;

    const { cfg, oldestNoteTime, hoursOfInsulinDuration } = this.props;

    const nowTime = now.getTime();

    const availableZone = getAvailableZone(cfg.boxWidth, cfg);

    const startDate = new Date(oldestNoteTime);
    startDate.setMinutes(0);
    const startTime = startDate.getTime();

    const endDate = new Date(startTime);
    endDate.setHours(endDate.getHours() + hoursOfInsulinDuration);
    const endTime = endDate.getTime();

    const timeRange = endTime - startTime;

    const nowRelatedTotal = (nowTime - startTime) / timeRange;
    const x = Math.round(nowRelatedTotal * availableZone);

    return (
      <Line
        x1={x + cfg.basicPadding}
        y1={0 + cfg.basicPadding}
        x2={x + cfg.basicPadding}
        y2={cfg.boxHeight - cfg.basicPadding}
        stroke={'crimson'}
        strokeDasharray={[4, 2]}
        strokeWidth={2}
      >
      </Line>
    );
  }
}

const mapState = (state: IStorage) => ({
  hoursOfInsulinDuration: selectActiveInsulinDuration(state),
  oldestNoteTime: selectNoteWithActiveInsulin(state).oldestNoteTime,
});

export const ChartNowLine = connect(mapState)(Component)

function getAvailableZone(parameter, cfg: IChartConfiguration) {
  return parameter - 3 * cfg.basicPadding;
}
