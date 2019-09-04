import React from 'react'
import { Circle, Polyline, LinearGradient, Stop, Path } from 'react-native-svg';
import { ThemeColor } from '../../../constant/ThemeColor';
import { IChartDot } from '../../../model/IChart';

export enum PolylineType {
    BEZIER = 'bezier',
    REGULAR = 'regular',
    GRADIENTED = 'gradiented'
}

export interface ChartPolylineProps {
    dots: IChartDot[];
    withGradient?: boolean;
    fill?: string;
    polylineType: PolylineType
}

export function ChartPolyline(props: ChartPolylineProps) {
    let points = getPoints(props)

    return props.withGradient ?
        renderPolylineWithGradient(points) :
        renderPolyline(points)
}

function renderPolylineWithGradient(points) {
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

function renderPolyline(points) {
    return <Polyline
        points={points}
        stroke="rgba(255, 255, 255, 0.64)"
        strokeWidth={3}
        strokeLinecap='round'
        fill="transparent"
    />
}

function getPoints(props) {
    let points = ''
    switch (props.polylineType) {
        case PolylineType.GRADIENTED:
        case PolylineType.REGULAR:
            props.dots.sort((a, b) => a.x - b.x).map(dot => {
                points += getPoint(dot);
            })
            return points;
    }
}

function getPoint(dot, symbol?) {
    let res = symbol ?
        symbol + dot.x + ' ' + dot.y + ' ' :
        dot.x + ',' + dot.y + ' '
    return res;
}
