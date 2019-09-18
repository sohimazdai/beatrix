import React from 'react';
import { IChartDot, IChartConfiguration, ChartPeriodType } from '../../../model/IChart';
import { Line } from 'react-native-svg';

export interface ChartNetProps {
    maxValue?: number
    minValue?: number
    cfg: IChartConfiguration
    type: ChartPeriodType
    noXX?: boolean
    noYY?: boolean
    paddingTop?: boolean
    paddingBottom?: boolean
    horizontalLinesNumber?: number
}

const VERTICAL_DAY_LINES_COUNT = 8
const HORIZONTAL_DAY_LINES_COUNT = 4

export function ChartNet(props: ChartNetProps) {
    let toRender = [];
    !props.noXX && toRender.push(verticalLines(props));
    !props.noYY && toRender.push(horizontalLines(props))
    return <>
        {verticalLines(props)}
        {props.cfg.horizontalLineNumber && horizontalLines(props)}
    </>
}

function verticalLines(props: ChartNetProps) {
    switch (props.type) {
        case ChartPeriodType.DAY:
            const firstX = props.cfg.basicPadding;
            const firstY = props.paddingTop ? props.cfg.basicPadding : 0;
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
                    y2={props.paddingBottom ? props.cfg.boxHeight - props.cfg.basicPadding : props.cfg.boxHeight}
                    stroke={'rgba(102, 102, 102, 0.38)'}
                    strokeWidth={1}
                />
            })
    }
}

function horizontalLines(props: ChartNetProps) {
    switch (props.type) {
        case ChartPeriodType.DAY:
            const firstY = props.cfg.reversedY ? props.cfg.basicPadding : props.cfg.basicPadding * 2;
            const firstX = props.cfg.basicPadding;
            const range = props.maxValue - props.minValue;
            let lapStep = getAvailableZone(props.cfg.boxHeight, props) / props.cfg.horizontalLineNumber;
            let res: IChartDot[] = [{
                x: firstX,
                y: firstY,
                id: 0
            }];
            for (let i = 0; i < props.cfg.horizontalLineNumber; i++) {
                res.push({
                    x: res[res.length - 1].x,
                    y: res[res.length - 1].y + lapStep,
                    id: res[res.length - 1].id + lapStep
                })
            }
            return res.map((dot, index) => {
                return <Line
                    key={dot.id}
                    x1={dot.x}
                    y1={dot.y}
                    x2={props.cfg.boxWidth - 2 * props.cfg.basicPadding}
                    y2={dot.y}
                    stroke={'rgba(102, 102, 102, 0.38)'}
                    strokeWidth={1}
                />
            })
    }
}

function getAvailableZone(parameter, props: ChartNetProps) {
    return parameter - 3 * props.cfg.basicPadding;
}
