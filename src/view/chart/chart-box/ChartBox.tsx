import * as React from 'react';
import Svg, { Circle, G } from 'react-native-svg';
import { ThemeColor } from '../../../constant/ThemeColor';
import { ChartAxisType, IChartConfiguration } from '../../../model/IChart';
import { ChartAxis } from '../chart-axis/ChartAxis';

export interface Props {
    children: any

    config: IChartConfiguration

    axisTypes: ChartAxisType[]
}

export const ChartBox = (props: Props) => (
    <Svg
        width={props.config.width}
        height={props.config.height}
        viewBox={`0 0 ${props.config.boxWidth} ${props.config.boxHeight}`}
        fill='blue'
    >
        {props.axisTypes.map(axis => {
            return <ChartAxis
                key={axis}
                axisType={axis}
                config={props.config}
            />
        })}
        {props.children}
    </Svg>
)