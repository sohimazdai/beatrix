import React from 'react'
import { Polyline, LinearGradient, Stop } from 'react-native-svg';
import { IChartDot } from '../../../model/IChart';

export enum PolylineType {
    BEZIER = 'bezier',
    REGULAR = 'regular',
    GRADIENTED = 'gradiented'
}

export interface ChartPolylineProps {
    dots: IChartDot[];
    polylineType: PolylineType
    initGradientColor?: string;
    stopGradientColor?: string;
}

export function ChartPolyline(props: ChartPolylineProps) {
    return props.initGradientColor &&  props.stopGradientColor ? 
        renderPolylineWithGradient(props) :
        renderPolyline(props)
}

function renderPolylineWithGradient(props) {
    return <>
        <LinearGradient id="grad" x1="0" y1="0" x2="0" y2="100%">
            <Stop offset="0%" stopColor={props.initGradientColor} stopOpacity="1" />
            <Stop offset="100%" stopColor={props.stopGradientColor} stopOpacity="1" />
        </LinearGradient>
        <Polyline
            points={getPoints(props)}
            stroke="rgba(255, 255, 255, 0.64)"
            strokeWidth={2}
            strokeLinecap='round'
            fill="url(#grad)"
        />
    </>
}

function renderPolyline(props) {
    return <Polyline
        points={getPoints(props)}
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
