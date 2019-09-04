import React from 'react';
import { IChartDot, IChartConfiguration, ChartPeriodType } from '../../../model/IChart';
import { Line } from 'react-native-svg';

export interface ChartNetProps {
    dots: IChartDot[]
    maxValue?: number
    minValue?: number
    cfg: IChartConfiguration
    type: ChartPeriodType
    noXX?: boolean
    noYY?: boolean
    paddingTop?: boolean
    paddingBottom?: boolean
}

const VERTICAL_DAY_LINES_COUNT = 8

export function ChartNet(props: ChartNetProps) {
    let toRender = [];
    !props.noXX && toRender.push(verticalLines(props));
    !props.noYY && toRender.push(horizontalLines(props))
    return <>
        {verticalLines(props)}
    </>
}

function verticalLines(props: ChartNetProps) {
    switch (props.type) {
        case ChartPeriodType.DAY:
            const firstX = props.cfg.arrowSize;
            const firstY = props.paddingTop ? props.cfg.arrowSize : 0;
            let lapStep = getAvailableZone(props.cfg.boxWidth, props) / VERTICAL_DAY_LINES_COUNT;
            let res: IChartDot[] = [{
                x: firstX,
                y: firstY,
                id: 0
            }];
            for (let i = 0; i < VERTICAL_DAY_LINES_COUNT; i++) {
                res.push({
                    x: res[res.length - 1].x + lapStep,
                    y: res[res.length - 1].y,
                    id: res[res.length - 1].id + lapStep
                })
            }
            return res.map((dot, index) => {
                return index != 0 && <Line
                    key={dot.id}
                    x1={dot.x}
                    y1={dot.y}
                    x2={dot.x}
                    y2={props.paddingBottom ? props.cfg.boxHeight - props.cfg.arrowSize : props.cfg.boxHeight}
                    stroke={'rgba(102, 102, 102, 0.38)'}
                    strokeWidth={1}
                />
            })
    }
}

function horizontalLines(props: ChartNetProps) {
    switch (props.type) {

    }
}

function line(props: ChartNetProps, start: IChartDot, end: IChartDot) {
    return <Line
        x1={start.x}
        y1={start.y}
        x2={end.x}
        y2={end.y}
        stroke={'rgba(102, 102, 102, 0.38)'}
        strokeWidth={1}
    />
}

function getAvailableZone(parameter, props: ChartNetProps) {
    return parameter - 3 * props.cfg.arrowSize;
}
