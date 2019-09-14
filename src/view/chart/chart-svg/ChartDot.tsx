import * as React from 'react';
import { Circle } from 'react-native-svg';
import { ThemeColor } from '../../../constant/ThemeColor';
import { IChartDot } from '../../../model/IChart';

export interface Props {
    onPress: (dotId: number) => void
    r: number
    x: number
    y: number
    id: number,
    fill: string
    stroke: string
    selectedDotId?: number
}

export const ChartDot = (props: Props) => (
    <Circle
        onPress={() => props.onPress(props.id)}
        r={props.r}
        stroke={props.selectedDotId == props.id ? props.stroke : 'transparent'}
        strokeWidth={2}
        x={props.x}
        y={props.y}
        fill={props.fill}
    />
)