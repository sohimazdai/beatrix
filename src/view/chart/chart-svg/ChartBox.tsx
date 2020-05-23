import * as React from 'react';
import Svg from 'react-native-svg';
import { IChartConfiguration } from '../../../model/IChart';

export interface Props {
    children: any

    config: IChartConfiguration
}

export const ChartBox = (props: Props) => {
    return (
        <Svg
            width={props.config.width}
            height={props.config.height}
            viewBox={`0 0 ${props.config.boxWidth} ${props.config.boxHeight}`}
            fill='blue'
        >
            {props.children}
        </Svg>
    )
}
