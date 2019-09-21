import React from 'react'
import Svg, { Polyline, LinearGradient, Stop, Path } from 'react-native-svg';
import { IChartDot } from '../../../model/IChart';
import { domainToASCII } from 'url';

export enum PolylineType {
    BEZIER = 'bezier',
    REGULAR = 'regular',
}

export interface ChartPolylineProps {
    dots: IChartDot[];
    polylineType: PolylineType
    initGradientColor?: string;
    stopGradientColor?: string;
}

export function ChartPolyline(props: ChartPolylineProps) {
    return renderPolyline(props) || null;
}

function renderPolyline(props: ChartPolylineProps) {
    const thereIsGradient = props.initGradientColor && props.stopGradientColor;
    return props.dots && props.dots.length > 0 && <>
        {thereIsGradient && <LinearGradient id="grad" x1="0" y1="0" x2="0" y2="100%">
            <Stop offset="0%" stopColor={props.initGradientColor} stopOpacity="1" />
            <Stop offset="100%" stopColor={props.stopGradientColor} stopOpacity="1" />
        </LinearGradient>}
        {props.polylineType === PolylineType.BEZIER ?
            <Path
                d={getPoints(props)}
                stroke="rgba(255, 255, 255, 0.64)"
                strokeWidth={2}
                strokeLinecap='round'
                strokeLinejoin='round'
                fill="url(#grad)"
            />
            :
            <Polyline
                points={getPoints(props)}
                stroke="rgba(255, 255, 255, 0.64)"
                strokeWidth={2}
                strokeLinecap='round'
                strokeLinejoin='round'
                fill="url(#grad)"
            />}
    </>
}

function getPoints(props) {
    let points = ''
    switch (props.polylineType) {
        case PolylineType.REGULAR:
            props.dots.sort((a, b) => a.x - b.x).map(dot => {
                points += getPoint(dot);
            })
            return points;
        case PolylineType.BEZIER:
            const tempDots = props.dots.sort((a, b) => a.x - b.x);
            tempDots.map((dot, index) => {
                if (index === 0) {
                    points += 'M' + dot.x + ',' + dot.y + ' '
                } else {
                    points +=
                        'C' +
                        (tempDots[index - 1].x + ((dot.x) - tempDots[index - 1].x) / 2) + ',' + tempDots[index - 1].y + ' ' + 
                        (tempDots[index - 1].x + ((dot.x) - tempDots[index - 1].x) / 2) + ',' + dot.y + ' ' + 
                        dot.x + ',' + dot.y + ' '
                }
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
