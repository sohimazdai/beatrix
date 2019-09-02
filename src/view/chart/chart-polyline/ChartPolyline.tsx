import React from 'react'
import { Circle, Polyline, LinearGradient, Stop } from 'react-native-svg';
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
    return <>
        <LinearGradient id="grad" x1="0" y1="0" x2="0" y2="100%">
            <Stop offset="0%" stopColor="#7C89FF" stopOpacity="1" />
            <Stop offset="100%" stopColor="#7C3869" stopOpacity="1" />
        </LinearGradient>
        <Polyline
            points={points}
            stroke="rgba(255, 255, 255, 0.64)"
            strokeWidth={2}
            strokeLinecap='round'
            fill="url(#grad)"
        />
    </>
}
