import * as React from 'react';
import { IChartConfiguration } from '../../../model/IChart';
import { ChartAxis } from './ChartAxis';

interface Props {
  config: IChartConfiguration,
}

export function ChartAxisPair(props: Props) {
  const { config } = props;

  return <>
    {
      config.axisTypes.map(axis => {
        return <ChartAxis
          key={axis}
          axisType={axis}
          config={props.config}
        />
      })
    }
  </>

}
