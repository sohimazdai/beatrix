import React from 'react'
import { Circle, Line, Polyline } from 'react-native-svg';
import { ThemeColor } from '../../../constant/ThemeColor';
import { IChartDot, ChartAxisType, IChartConfiguration } from '../../../model/IChart';

export interface ChartAxisProps {
    axisType: ChartAxisType
    config: IChartConfiguration
}

export function ChartAxis(props: ChartAxisProps) {
    const { axisType, config } = props;
    const start: { x: number, y: number, id: number } = { x: 0, y: 0, id: 0 };
    const end: { x: number, y: number, id: number } = { x: 0, y: 0, id: 1 };
    if (axisType === ChartAxisType.OY) {
        start.x = config.basicPadding;
        start.y = config.boxHeight - config.basicPadding;
        end.x = config.basicPadding;
        end.y = config.basicPadding;
    } else if (axisType === ChartAxisType.OX) {
        start.x = config.basicPadding;
        start.y = config.boxHeight - config.basicPadding;
        end.x = config.boxWidth - config.basicPadding;
        end.y = config.boxHeight - config.basicPadding;
    } else if (axisType === ChartAxisType.OY_REVERSE) {
        end.x = config.basicPadding;
        end.y = config.boxHeight - config.basicPadding;
        start.x = config.basicPadding;
        start.y = config.basicPadding;
    } else if (axisType === ChartAxisType.OX_UPSIDE) {
        start.x = config.basicPadding;
        start.y = config.basicPadding;
        end.x = config.boxWidth - config.basicPadding;
        end.y = config.basicPadding;
    }

    const points = getPath(end, config, axisType);
    
    console.log('axis', axisType, points)
    return <>
        <Line
            x1={start.x}
            y1={start.y}
            x2={end.x}
            y2={end.y}
            stroke={config.axisColor}
            strokeWidth={config.axisWidth}
        />
        <Polyline
            points={points}
            stroke={config.axisColor}
            strokeWidth={config.axisWidth}
            fill={'transparent'}
        />
    </>
}

const getPath = (end, config, axisType) => {
    switch (axisType) {
        case ChartAxisType.OX:
            return (end.x - config.basicPadding) + ',' + (end.y - config.basicPadding) + ' ' +
                end.x + ',' + end.y + ' ' +
                (end.x - config.basicPadding) + ',' + (end.y + config.basicPadding)
        case ChartAxisType.OX_UPSIDE:
            return (end.x - config.basicPadding) + ',' + (end.y - config.basicPadding) + ' ' +
                end.x + ',' + end.y + ' ' +
                (end.x - config.basicPadding) + ',' + (end.y + config.basicPadding)
        case ChartAxisType.OY:
            return (end.x - config.basicPadding) + ',' + (end.y + config.basicPadding) + ' ' +
                end.x + ',' + end.y + ' ' +
                (end.x + config.basicPadding) + ',' + (end.y + config.basicPadding)
        case ChartAxisType.OY_REVERSE:
            return (end.x - config.basicPadding) + ',' + (end.y - config.basicPadding) + ' ' +
                end.x + ',' + end.y + ' ' +
                (end.x + config.basicPadding) + ',' + (end.y - config.basicPadding)
    }
}
