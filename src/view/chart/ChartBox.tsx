import * as React from 'react';
import Svg, { Circle } from 'react-native-svg';
import { ThemeColor } from '../../constant/ThemeColor';

export interface Props {
    children: any,

    width: number,
    height: number,
    boxWidth: number,
    boxHeight: number,
}

export const ChartBox = (props: Props) =>  (
    <Svg
        width={props.width}
        height={props.height}
        viewBox={`0 0 ${props.boxWidth} ${props.boxHeight}`}
        fill='blue'
    >
        {props.children}
    </Svg>
)