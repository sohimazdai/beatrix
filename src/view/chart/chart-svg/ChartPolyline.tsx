import React from 'react'
import { Polyline, LinearGradient, Stop, Path } from 'react-native-svg';
import { IChartDot, ChartPeriodType } from '../../../model/IChart';

export enum PolylineType {
    BEZIER = 'bezier',
    REGULAR = 'regular',
}

export interface ChartPolylineProps {
    dots: IChartDot[];
    polylineType: PolylineType
    polylineColor?: string
    initGradientColor?: string;
    stopGradientColor?: string;
    chartPeriodType?: ChartPeriodType
}

export function ChartPolyline(props: ChartPolylineProps) {
    const thereIsGradient = props.initGradientColor && props.stopGradientColor;
    const points = getPoints(props);

    return <>
        {!!points && thereIsGradient && <LinearGradient id="grad" x1="0" y1="0" x2="0" y2="100%">
            <Stop offset="0%" stopColor={props.initGradientColor} stopOpacity="1" />
            <Stop offset="100%" stopColor={props.stopGradientColor} stopOpacity="1" />
        </LinearGradient>}
        {props.polylineType === PolylineType.BEZIER ?
            <Path
                d={points}
                stroke={props.polylineColor || "rgba(255, 255, 255, 0.64)"}
                strokeWidth={2}
                strokeLinecap='round'
                strokeLinejoin='round'
                fill="transparent"
            />
            :
            <Polyline
                points={points}
                stroke={props.polylineColor || "rgba(255, 255, 255, 0.64)"}
                strokeWidth={2}
                strokeLinecap='round'
                strokeLinejoin='round'
                fill={props.chartPeriodType === ChartPeriodType.DAY ? "url(#grad)" : "transparent"}
            />}
    </>
}

function getPoints(props: ChartPolylineProps) {
    let points = '';
    let thereIsYs = false;
    switch (props.polylineType) {
        case PolylineType.REGULAR:
            if (props.dots.some(dot => isNaN(dot.id) || isNaN(dot.x) || isNaN(dot.y))) return "";
            props.dots.sort((a, b) => a.x - b.x).map(dot => {
                if (!thereIsYs && dot.y) {
                    thereIsYs = true;
                }
                points += getPoint(dot);
            })
            if (!thereIsYs) return "";
            return points;
        case PolylineType.BEZIER:
            const tempDots = props.dots.sort((a, b) => a.x - b.x);
            tempDots.map((dot, index) => {
                if (index === 0) {
                    points += 'M' + dot.x + ',' + dot.y
                } else {
                    points +=
                        'C' +
                        (tempDots[index - 1].x + ((dot.x) - tempDots[index - 1].x) / 2) + ',' + tempDots[index - 1].y + ' ' +
                        (tempDots[index - 1].x + ((dot.x) - tempDots[index - 1].x) / 2) + ',' + dot.y + ' ' +
                        dot.x + ',' + dot.y
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
