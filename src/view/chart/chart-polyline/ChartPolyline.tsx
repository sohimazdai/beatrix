import React from 'react'
import { Circle, Polyline } from 'react-native-svg';
import { ThemeColor } from '../../../constant/ThemeColor';
import { IChartDot } from '../../../model/IChart';

export interface ChartPolylineProps {
    dots: { [id: number]: IChartDot };
}

export function ChartPolyline(props: ChartPolylineProps) {
    let points = ''
    Object.keys(props.dots).sort((a, b) => parseInt(a) - parseInt(b)).map(time => {
        points += props.dots[time].x + ',' + props.dots[time].y + ' '
    })
    return <Polyline
        points={points}
        stroke="tomato"
        strokeWidth={1}
        strokeLinecap='round'
    />
}
