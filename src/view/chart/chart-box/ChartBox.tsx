import React from 'react';
import Svg from 'react-native-svg';

export interface ChartBoxProps {
    children: any

    height: number
    width: number
    boxHeight: number
    boxWidth: number
}

export function ChartBox(props: ChartBoxProps) {
    return (
        <Svg
            width={props.width}
            height={props.height}
            viewBox={`0 0 ${props.boxWidth} ${props.boxHeight}`}
            fill='transparent'
        >
            {props.children}
        </Svg>
    )
}
