export interface IChartDot {
    x: number
    y: number
}

export interface IChartLine {
    dots: IChartDot[]
}

export interface IChartAxis {
    type: ChartAxisType
}

export enum ChartAxisType {
    OX = 'ox',
    OY = 'oy'
}
