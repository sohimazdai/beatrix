import React from 'react'
import { Circle, Line, Polyline } from 'react-native-svg';
import { ThemeColor } from '../../../constant/ThemeColor';
import { IChartDot, ChartAxisType } from '../../../model/IChart';

export interface ChartAxisProps {
    start: IChartDot
    end: IChartDot
    axisType: ChartAxisType
    config: any
}

export function ChartAxis(props: ChartAxisProps) {
    const { end, config } = props;
    let path = getPath(props);
    return <>
        <Line
            x1={props.start.x}
            y1={props.start.y}
            x2={props.end.x}
            y2={props.end.y}
            stroke={config.axisColor}
            strokeWidth={config.axisWidth}
        />
        <Polyline
            points={getPath(props)}
            stroke={config.axisColor}
            strokeWidth={config.axisWidth}
            fill={'transparent'}
        />
    </>
}

const getPath = (props) => {
    const { end, config } = props;

    switch (props.axisType) {
        case ChartAxisType.OX:
            return (end.x - config.arrowSize) + ',' + (end.y - config.arrowSize) + ' ' +
                end.x + ',' + end.y + ' ' +
                (end.x - config.arrowSize) + ',' + (end.y + config.arrowSize)
        case ChartAxisType.OX_UPSIDE:
            return (end.x - config.arrowSize) + ',' + (end.y - config.arrowSize) + ' ' +
            end.x + ',' + end.y + ' ' +
            (end.x - config.arrowSize) + ',' + (end.y + config.arrowSize)
        case ChartAxisType.OY:
            return (end.x - config.arrowSize) + ',' + (end.y + config.arrowSize) + ' ' +
            end.x + ',' + end.y + ' ' +
            (end.x + config.arrowSize) + ',' + (end.y + config.arrowSize)
        case ChartAxisType.OY_REVERSE:
            return (end.x - config.arrowSize) + ',' + (end.y - config.arrowSize) + ' ' +
            end.x + ',' + end.y + ' ' +
            (end.x + config.arrowSize) + ',' + (end.y - config.arrowSize)
    }
}
