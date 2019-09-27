import { ChartWrapProps } from "../../view/chart/chart-wrap/ChartWrap";
import {
    IChartDot,
    ChartDotsData,
    ChartValueType,
    IChartConfiguration,
    IChartTrain
} from "../../model/IChart";

export function adaptDayDots(props: ChartWrapProps, dots: IChartDot[], events?: IChartDot[], date?: Date): ChartDotsData {
    let result: ChartDotsData = {};
    let ys = dots.map(d => d.y)
    let maxValue = 0;
    let minValue = ys.length ? 3 : 0;
    let newDots: IChartDot[] = [];
    let newEvents: IChartDot[] = [];
    dots.map(dot => {
        maxValue = dot.y > maxValue ? Math.ceil(dot.y) + 1 : Math.ceil(maxValue);
        if (props.type === ChartValueType.GLUCOSE) {
            minValue = minValue && dot.y <= minValue ?
                Math.floor(dot.y - 1) :
                Math.floor(minValue);
        } else {
            minValue = 0;
        }
    })
    maxValue = calculateNewMaxAndMin(props, maxValue, minValue);
    dots.map(dot => {
        dot.id === 0 && newDots.push({
            x: adaptDayTime(props, dot.x, date),
            y: adaptYValue(props, 0, maxValue, minValue),
            id: dot.id
        })
        newDots.push({
            x: adaptDayTime(props, dot.x, date),
            y: adaptYValue(props, dot.y, maxValue, minValue),
            id: dot.id
        })
        dot.id === getMaxTrainItemId(props, date) && newDots.push({
            x: adaptDayTime(props, dot.x, date),
            y: adaptYValue(props, 0, maxValue, minValue),
            id: dot.id
        })
    })
    result.dots = newDots;
    result.maxValue = maxValue;
    result.minValue = minValue;
    result.events = [];
    if (events && events.length) {
        newEvents = events.map(dot => {
            return {
                x: adaptDayTime(props, dot.x, date),
                y: adaptYValue(props, 0, maxValue, minValue),
                id: dot.id
            }
        })
        result.events = newEvents;
    }
    return result
}

function calculateNewMaxAndMin(props: ChartWrapProps, max: number, min: number) {
    if (!max) return;
    if (props.type !== ChartValueType.GLUCOSE) {
        return max = max % props.config.horizontalLineNumber == 0 ?
            max :
            props.config.horizontalLineNumber * Math.ceil(max / props.config.horizontalLineNumber)
    } else if (props.type === ChartValueType.GLUCOSE) {
        return max =
            (max - min) % props.config.horizontalLineNumber == 0 ?
                max :
                min + props.config.horizontalLineNumber * Math.ceil((max - min) / props.config.horizontalLineNumber)
    }
}

export function getDotsAndEvents(ds: IChartDot[]) {
    let dots: IChartDot[] = [];
    let events: IChartDot[] = [];

    ds.map(dot => {
        dot.y > 0 && dots.push(dot)
        dot.y == 0 && events.push(dot)
    })
    return {
        dots,
        events
    }
}

function adaptDayTime(props: ChartWrapProps, timeOrId: number, date: Date): number {
    const firstMultiplier = props.type === ChartValueType.GLUCOSE ?
        timeOrId - getDateMidnightNumber(date) :
        timeOrId
    const dayInMs = 1000 * 60 * 60 * 24;
    const polylineStepsNumber = 60 * 24 / props.config.timeStepMinutes;
    const clearChartWidth = props.config.boxWidth - generalPadding(props);
    const secondMultiplier = props.type === ChartValueType.GLUCOSE ?
        clearChartWidth / dayInMs :
        clearChartWidth / polylineStepsNumber;
    return firstMultiplier * secondMultiplier + initialPadding(props);
}

function adaptYValue(props: ChartWrapProps, value: number, max: number, min: number): number {
    const range = max - min;
    const clearBoxHeight = props.config.boxHeight - generalPadding(props);
    const multiplier = clearBoxHeight / range;
    const result = !props.config.reversedY ?
        (max - (value ? value : min)) * multiplier + 2 * initialPadding(props) :
        props.config.boxHeight - (max - value) * multiplier - 2 * initialPadding(props);

    return result;
}

export function getDateMidnightNumber(date: Date): number {
    return new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate()
    ).getTime();
}

export function getMonthStart(date: Date): number {
    return new Date(
        date.getFullYear(),
        date.getMonth(),
        1
    ).getTime();
}

export function getTrainItemId(props: ChartWrapProps, dot: IChartDot, date: Date): number {
    let result: number;
    const dayInMs = 60 * 24;
    const idStep = dayInMs / (props.config.timeStepMinutes);
    result = Math.floor(((dot.x - getDateMidnightNumber(date)) / 1000 / 60) / dayInMs * idStep)

    return result;
}

export function getMaxTrainItemId(props: ChartWrapProps, date: Date): number {
    const dayInMs = 60 * 24;
    const idStepNumber = dayInMs / (props.config.timeStepMinutes);

    return idStepNumber;
}

export function generalPadding(props: ChartWrapProps) {
    const {
        config
    } = props;

    return config.basicPadding * 3;
}

export function initialPadding(props: ChartWrapProps) {
    const {
        config
    } = props;

    return config.basicPadding;
}

export function reverse(config: IChartConfiguration, dot: IChartDot) {
    dot.y = config.boxHeight - dot.y + config.basicPadding + config.axisWidth / 2;
}

export function isGlucoseType(props): boolean {
    return props.type === ChartValueType.GLUCOSE
}

export function isBreadUnitsType(props): boolean {
    return props.type === ChartValueType.BREAD_UNITS
}

export function filterValidEffects(train: IChartTrain): IChartDot[] {
    const result: IChartDot[] = [];
    Object.keys(train).map(key => {
        train[key].id >= 0 && result.push(train[key])
    })
    return result;
}

export function getDaysBetweenDates(dateAfter: number, dateBefore: number) {
    return (dateAfter - dateBefore) / (1000 * 60 * 60 * 24)
}

export function getArrayAverage(array: any[]) {
    let sum = 0;
    array.map(item => sum = item + sum);
    return sum == 0 ? 0 : sum / array.length
}

export function getDayAfterThatNumber(date: number, inc: number) {
    const d = new Date(date);
    return new Date(
        d.getFullYear(),
        d.getMonth(),
        d.getDate() + inc
    ).getTime()
}

export function adaptMonthDots(props: ChartWrapProps, dots: IChartDot[]): ChartDotsData {
    let result: ChartDotsData = {};
    let newDots: IChartDot[] = [];
    let ys = dots.map(d => d.y)
    let maxValue = 0;
    let minValue = ys.length ? Math.min(...ys) : 0;
    dots.map(dot => {
        maxValue = dot.y > maxValue ? Math.ceil(dot.y) + 1 : Math.ceil(maxValue);
        minValue = minValue && dot.y <= minValue ?
            Math.floor(dot.y - 1) >= 0 ?
                Math.floor(dot.y - 1) :
                0 :
            Math.floor(minValue);
    }
    )
    maxValue = calculateNewMaxAndMin(props, maxValue, minValue);
    dots.map(dot => {
        dot.y && newDots.push({
            x: adaptMonthTime(props, dot.x),
            y: adaptYValue(props, dot.y, maxValue, minValue),
            id: dot.id
        })
    })
    result.dots = newDots;
    result.maxValue = maxValue;
    result.minValue = minValue;
    result.events = [];
    return result
}

function adaptMonthTime(props: ChartWrapProps, day: number): number {
    let result = 0;
    const daysCount = 31;
    const clearChartWidth = props.config.boxWidth - generalPadding(props);
    let dayStepOnChart = clearChartWidth / daysCount;
    result = day * dayStepOnChart + initialPadding(props);
    return result;
}