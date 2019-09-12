export interface IChartDot {
    x: number,
    y: number,
    id: number,
}
export enum ChartValueType {
    GLUCOSE = "glucose",
    BREAD_UNITS = "breadUnits",
    INSULIN = "insulin",
    LONG_INSULIN = "longInsulin"
}

export enum ChartPeriodType {
    DAY = 'day'
}

export enum ChartAxisType {
    OX = "ox",
    OX_UPSIDE = 'ox-upside',
    OY = "oy",
    OX_REVERSE = "ox-reverse",
    OY_REVERSE = "oy-reverse"
}

export interface IChartConfiguration {
    width: number | string
    height: number
    boxWidth: number
    boxHeight: number
    axisWidth?: number
    axisColor?: string
    basicPadding?: number
    yPadding?: number
    dotRadius?: number
    reversedY?: boolean
    increaseTime?: number
    flatTime?: number
    decreaseTime?: number
    timeStepMinutes?: number,

}
