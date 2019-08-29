import React from 'react'
import { Circle, Line, Polyline } from 'react-native-svg';
import { ThemeColor } from '../../../constant/ThemeColor';
import { IChartDot, ChartAxisType } from '../../../model/IChart';

export interface ChartAxisProps {
    start: IChartDot
    end: IChartDot
    color: string
    width: number
    axisType: ChartAxisType
    arrowSize: number
}

export function ChartAxis(props: ChartAxisProps) {
    const { end, arrowSize } = props;
    let path = getPath(props);

    return <>
        <Line
            x1={props.start.x}
            y1={props.start.y}
            x2={props.end.x}
            y2={props.end.y}
            stroke={props.color}
            strokeWidth={props.width}
        />
        <Polyline
            points={path}
            stroke={props.color}
            strokeWidth={props.width}
            fill={'transparent'}
        />
    </>
}

const getPath = (props) => {
    const { end, arrowSize } = props;

    switch (props.axisType) {
        case ChartAxisType.OX:
            return (end.x - arrowSize) + ',' + (end.y - arrowSize) + ' ' +
                end.x + ',' + end.y + ' ' +
                (end.x - arrowSize) + ',' + (end.y + arrowSize)
        case ChartAxisType.OX_REVERSE:
            return
        case ChartAxisType.OY:
            return
        case ChartAxisType.OY_REVERSE:
            return
    }
}
