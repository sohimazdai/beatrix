import * as React from 'react';
import { Circle } from 'react-native-svg';
import { ThemeColor } from '../../constant/ThemeColor';

export interface Props {
    onPress: () => void
    r: number
    x: number
    y: number
    fill: string
    stroke: string
    isSelected?: boolean
}

export const ChartDot = (props: Props) => (
    <Circle
        onPress={props.onPress}
        r={props.r}
        stroke={props.isSelected ? props.stroke : 'transparent'}
        strokeWidth={2}
        x={props.x}
        y={props.y}
        fill={props.fill}
    />
)