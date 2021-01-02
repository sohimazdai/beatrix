import React from 'react';
import { IChartDot, IChartConfiguration, ChartPeriodType } from '../../../model/IChart';
import { Line } from 'react-native-svg';
import { COLOR } from '../../../constant/Color';

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
    // let toRender = [];
    // !props.noXX && toRender.push(verticalLines());
    // !props.noYY && toRender.push(horizontalLines(props));

    if (props.cfg.isAlone) return null;

    function isSelectedDot(dot: IChartDot) {
        return props.selectedDotId == dot.id || String(props.selectedDotId) == dot.noteId
    }

    function verticalLines() {
        switch (props.type) {
            case ChartPeriodType.DAY:
                return props.dots.map((dot, index) => {
                    return <Line
                        key={dot.id}
                        x1={dot.x}
                        y1={props.paddingTop ? props.cfg.basicPadding : 0}
                        x2={dot.x}
                        y2={props.paddingBottom ? props.cfg.boxHeight - props.cfg.basicPadding : props.cfg.boxHeight}
                        stroke={isSelectedDot(dot) ? '#FF6347' : COLOR.PRIMARY}
                        strokeWidth={isSelectedDot(dot) ? 2 : 1}
                    />
                })
            case ChartPeriodType.MONTH:
            case ChartPeriodType.THREE_MONTH:
                return props.dots.map((dot, index) => {
                    return (dot.noteId ? dot.noteId : dot.id) == props.selectedDotId && <Line
                        key={dot.id}
                        x1={dot.x}
                        y1={props.paddingTop ? props.cfg.basicPadding : 0}
                        x2={dot.x}
                        y2={props.paddingBottom ? props.cfg.boxHeight - props.cfg.basicPadding : props.cfg.boxHeight}
                        stroke={isSelectedDot(dot) ? '#FF6347' : 'rgba(255, 255, 255, 0.55)'}
                        strokeWidth={isSelectedDot(dot) ? 2 : 1}
                    />
                })

        }
    }

    return <>
        {verticalLines()}
    </>
}
