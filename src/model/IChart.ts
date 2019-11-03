import { PolylineType } from "../view/chart/chart-svg/ChartPolyline";

export interface IChartDot {
    x: number,
    y: number,
    id: number
}
export enum ChartValueType {
    GLUCOSE = "glucose",
    BREAD_UNITS = "breadUnits",
    INSULIN = "insulin",
    LONG_INSULIN = "longInsulin"
}

export enum ChartPeriodType {
    DAY = 'day',
    MONTH = 'month',
    THREE_MONTH = '3 month'
}

export enum ChartPeriodThreeMonthType {
    WINTER  = 'winter',
    SUMMER = 'summer',
    AUTUMN = 'autumn',
    SPRING = 'spring'
}

export enum ChartAveragePeriodType {
    MONTH = 'month',
    THREE_MONTH = '3 month',
    SIX_MONTH = '6 month'
}

export enum ChartAxisType {
    OX = "ox",
    OX_UPSIDE = 'ox-upside',
    OY = "oy",
    OX_REVERSE = "ox-reverse",
    OY_REVERSE = "oy-reverse"
}

export interface ChartDotsData {
    maxValue?: number
    minValue?: number
    dots?: IChartDot[]
    events?: IChartDot[]
}

export interface IChartConfiguration {
    width: number | string
    height: number
    boxWidth: number
    boxHeight: number
    axisTypes: ChartAxisType[]
    axisWidth?: number
    axisColor?: string
    initGradientColor?: string
    stopGradientColor?: string
    basicPadding?: number
    yPadding?: number
    dotRadius?: number
    reversedY?: boolean
    increaseTime?: number
    flatTime?: number
    decreaseTime?: number
    timeStepMinutes?: number,
    horizontalLineNumber?: number,
    paddingTop?: boolean
    paddingBottom?: boolean
    polylineType?: PolylineType
}

export interface IChartTrain {
    [id: number]: IChartDot
}
