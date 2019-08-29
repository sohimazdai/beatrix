import React from 'react'
import { Circle } from 'react-native-svg';
import { ThemeColor } from '../../../constant/ThemeColor';

export interface ChartDotProps {
    x: number
    y: number
    r: number
    color: string
    onClick: () => void
}

export function ChartDot(props: ChartDotProps) {
    return <Circle
        onPress={props.onClick}
        r={props.r}
        y={props.y}
        x={props.x}
        fill={props.color}
    />
}
