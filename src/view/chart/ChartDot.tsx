import * as React from 'react';
import { Circle } from 'react-native-svg';
import { ThemeColor } from '../../constant/ThemeColor';

export interface Props {
    onPress: () => void
    r: number
    x: number
    y: number
}

export const ChartDot = (props: Props) => (
    <Circle
        onPress={props.onPress}
        r={props.r}
        x={props.x}
        y={props.y}
        fill={ThemeColor.BRIGHT_RED}
    />
)