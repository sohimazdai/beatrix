import * as React from 'react';
import Svg, { Circle } from 'react-native-svg';
import { Color } from '../../../constant/Color';
import { IChartDot, ChartValueType } from '../../../model/IChart';
import { createChangeInteractive } from '../../../store/modules/interactive/interactive';
import { connect } from 'react-redux';
import { appAnalytics } from '../../../app/Analytics';

export interface Props {
    onPress?: (dotId: number) => void

    r: number
    x: number
    y: number
    id: number,
    noteId?: number
    fill: string
    stroke: string
    selectedDotId?: number
    type?: ChartValueType
    dotFillColor?: string
    dotStrokeColor?: string
    isAlone?: boolean
}

const mapDispatchToProps = (dispatch) => ({
    onPress: (noteId: number) => {
        dispatch(createChangeInteractive({
            selectedDotId: noteId
        }));

        appAnalytics.sendEvent(appAnalytics.events.CHART_DOT_CLICKED);
    }
})

const Component = (props: Props) => (
    <>
        <Circle
            r={getDotRadius(props)}
            stroke={getStroke(props)}
            strokeWidth={2}
            x={props.x}
            y={props.y}
            fill={getDotColor(props)}
        />
        <Circle
            onPress={() => props.onPress && onPress(props)}
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

function getStroke(props: Props) {
    if (props.selectedDotId == (props.noteId ? props.noteId : String(props.id))) {
        if (props.isAlone) {
            return Color.RED_BASE;
        }
        return props.stroke;
    }

    if (props.dotStrokeColor) {
        return props.dotStrokeColor;
    }

    return 'transparent';
}
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

    props.onPress(props.id)
}

export const ChartDot = connect(
    null,
    mapDispatchToProps
)(Component);
