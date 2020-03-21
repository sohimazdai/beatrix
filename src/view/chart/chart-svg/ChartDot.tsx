import * as React from 'react';
import Svg, { Circle } from 'react-native-svg';
import { ThemeColor } from '../../../constant/ThemeColor';
import { IChartDot, ChartValueType } from '../../../model/IChart';

export interface Props {
    onPress: (dotId: string) => void

    r: number
    x: number
    y: number
    id: number,
    noteId?: string
    fill: string
    stroke: string
    selectedDotId?: string
    type?: ChartValueType
}

export const ChartDot = (props: Props) => (
    <>
        <Circle
            r={getDotRadius(props)}
            stroke={props.selectedDotId == (props.noteId ? props.noteId : String(props.id)) ? props.stroke : 'transparent'}
            strokeWidth={2}
            x={props.x}
            y={props.y}
            fill={getDotColor(props)}
        />
        <Circle
            onPress={() => onPress(props)}
            r={getDotRadius(props) * 2}
            stroke={'transparent'}
            strokeWidth={2}
            x={props.x}
            y={props.y}
            fill={'transparent'}
        >
        </Circle>
    </>
)

function getDotColor(props: Props) {
    switch (props.type) {
        case ChartValueType.INSULIN:
            return '#6759FF';
        case ChartValueType.BREAD_UNITS:
            return '#FFB359';
        default: return props.fill
    }
}

function getDotRadius(props: Props) {
    switch (props.type) {
        case ChartValueType.INSULIN:
        case ChartValueType.BREAD_UNITS:
            return props.r * 0.9;
        default: return props.r
    }
}

function onPress(props: Props) {
    if (props.noteId) {
        props.onPress(props.noteId)
        return;
    }

    props.onPress(String(props.id))
}
