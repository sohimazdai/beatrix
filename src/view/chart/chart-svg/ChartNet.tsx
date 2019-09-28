import React from 'react';
import { IChartDot, IChartConfiguration, ChartPeriodType, ChartValueType } from '../../../model/IChart';
import { Line } from 'react-native-svg';
import { DateHelper } from '../../../utils/DateHelper';

export interface ChartNetProps {
    maxValue?: number
    minValue?: number
    cfg: IChartConfiguration
    periodType: ChartPeriodType
    noXX?: boolean
    noYY?: boolean
    paddingTop?: boolean
    paddingBottom?: boolean
    horizontalLinesNumber?: number
    maxCritical?: number
    minCritical?: number
    renderCritical?: boolean
    type?: ChartValueType
    currentDate: Date
    selectedPeriod: ChartPeriodType
}

const VERTICAL_DAY_LINES_COUNT = 8;
const MIN_CRITICAL_DEFAULT = 4;
const MAX_CRITICAL_DEFAULT = 8;
const MAX_CRITICAL_COLOR_DEFAULT = '#FF6161';
const MIN_CRITICAL_COLOR_DEFAULT = '#50ABFF';

export function ChartNet(props: ChartNetProps) {
    let toRender = [];
    !props.noXX && toRender.push(verticalLines(props));
    !props.noYY && toRender.push(horizontalLines(props))
    return <>
        {verticalLines(props)}
        {props.maxValue && props.cfg.horizontalLineNumber && horizontalLines(props)}
        {props.maxValue && props.renderCritical && renderCriticals(props)}
    </>
}

function renderCriticals(props: ChartNetProps) {
    const range = props.maxValue - (props.minValue ? props.minValue : 0);
    const maxCritical = props.maxCritical ? props.maxCritical : MAX_CRITICAL_DEFAULT;
    const minCritical = props.minCritical ? props.minCritical : MIN_CRITICAL_DEFAULT;
    const thereIsMin = props.minValue < minCritical;
    const thereIsMax = props.maxValue > maxCritical;
    const maxCritPosition = thereIsMax ? props.maxValue - maxCritical : null;
    const minCritPosition = thereIsMin ? props.maxValue - minCritical : null;
    let minY = thereIsMin && ((getAvailableZone(props.cfg.boxHeight, props) / range) * minCritPosition);
    let maxY = thereIsMax && ((getAvailableZone(props.cfg.boxHeight, props) / range) * maxCritPosition);
    minY = props.cfg.reversedY ? props.cfg.boxHeight - minY : minY;
    maxY = props.cfg.reversedY ? props.cfg.boxHeight - maxY : maxY;
    maxY += props.cfg.basicPadding * 2;
    minY += props.cfg.basicPadding * 2;
    let toRender = [];
    if (thereIsMin) {
        toRender.push(
            <Line
                key={'minCritical'}
                x1={props.cfg.basicPadding}
                x2={getAvailableZone(props.cfg.boxWidth, props) + props.cfg.basicPadding}
                y1={minY}
                y2={minY}
                stroke={MIN_CRITICAL_COLOR_DEFAULT}
                strokeDasharray={[1, 1]}
            />
        )
    }
    if (thereIsMax) {
        toRender.push(
            <Line
                key={'maxCritical'}
                x1={props.cfg.basicPadding}
                x2={getAvailableZone(props.cfg.boxWidth, props) + props.cfg.basicPadding}
                y1={maxY}
                y2={maxY}
                stroke={MAX_CRITICAL_COLOR_DEFAULT}
                strokeDasharray={[1, 1]}
            />
        )
    }

    return toRender
}

function verticalLines(props: ChartNetProps) {
    const firstX = props.cfg.basicPadding;
    const firstY = props.paddingTop ? props.cfg.basicPadding : 0;
    let lapStep: number = 0;
    let res: IChartDot[] = [{
        x: firstX,
        y: firstY,
        id: 0
    }];
    switch (props.periodType) {
        case ChartPeriodType.DAY:
            lapStep = getAvailableZone(props.cfg.boxWidth, props) / VERTICAL_DAY_LINES_COUNT;
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
        case ChartPeriodType.MONTH:
            const verticalMonthLinesCount = DateHelper.getMaxDateOfDifferentMonth(props.currentDate, 0);
            lapStep = getAvailableZone(props.cfg.boxWidth, props) / verticalMonthLinesCount;
            for (let i = 0; i < verticalMonthLinesCount; i++) {
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
                    stroke={getVerticalLineColor(props, index )}
                    strokeWidth={1}
                />
            })
    }
}

function horizontalLines(props: ChartNetProps) {
    switch (props.periodType) {
        case ChartPeriodType.DAY:
        case ChartPeriodType.MONTH:
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

function getVerticalLineColor(props: ChartNetProps, dayOfMonth: number): string {
    switch (props.selectedPeriod) {
        case ChartPeriodType.DAY:
            return 'rgba(102, 102, 102, 0.38)';
        case ChartPeriodType.MONTH:
            const dayOfWeek = new Date(
                props.currentDate.getFullYear(),
                props.currentDate.getMonth(),
                dayOfMonth
            ).getDay()
            switch (dayOfWeek) {
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                    return 'rgba(102, 102, 102, 0.38)'
                case 6:
                case 0:
                    return 'rgba(184, 2, 2, 0.38)'
            }
    }
}