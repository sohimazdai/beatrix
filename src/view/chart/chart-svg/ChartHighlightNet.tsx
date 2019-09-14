import React from 'react';
import { IChartDot, IChartConfiguration, ChartPeriodType } from '../../../model/IChart';
import { Line } from 'react-native-svg';
import { ThemeColor } from '../../../constant/ThemeColor';

export interface ChartHighlightNetProps {
    dots: IChartDot[]
    maxValue?: number
    minValue?: number
    cfg: IChartConfiguration
    type: ChartPeriodType

    noXX?: boolean
    noYY?: boolean
    paddingTop?: boolean
    paddingBottom?: boolean
    selectedDotId: number
}

export function ChartHighlightNet(props: ChartHighlightNetProps) {
    let toRender = [];
    !props.noXX && toRender.push(verticalLines(props));
    !props.noYY && toRender.push(horizontalLines(props))
    return <>
        {verticalLines(props)}
    </>
}

function verticalLines(props: ChartHighlightNetProps) {
    switch (props.type) {
        case ChartPeriodType.DAY:
            return props.dots.map((dot, index) => {
                return <Line
                    key={dot.id}
                    x1={dot.x}
                    y1={props.paddingTop ? props.cfg.basicPadding : 0}
                    x2={dot.x}
                    y2={props.paddingBottom ? props.cfg.boxHeight - props.cfg.basicPadding : props.cfg.boxHeight}
                    stroke={props.selectedDotId == dot.id ? ThemeColor.WHITE : 'rgba(255, 255, 255, 0.55)'}
                    strokeWidth={props.selectedDotId == dot.id ? 2 : 1}
                />
            })
    }
}

function horizontalLines(props: ChartHighlightNetProps) {
    switch (props.type) {

    }
}
