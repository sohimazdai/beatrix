import { ChartWrapProps } from "../../view/chart/chart-wrap/ChartWrap";
import { IChartDot, ChartDotsData, ChartValueType, IChartConfiguration } from "../../model/IChart";

//export function that addPadding the chart content
export function addPadding(props: ChartWrapProps, dot: IChartDot) {
    const {
        config
    } = props;

    const xRelativity = (config.boxWidth - generalPadding(props)) / config.boxWidth;
    const yRelativity = (config.boxHeight - generalPadding(props)) / config.boxHeight;
    return {
        y: dot.y * yRelativity + initialPadding(props),
        x: dot.x * xRelativity + initialPadding(props),
        id: dot.id
    }
}

//export function that update max chart value
export function getNewMaxValue(props: ChartWrapProps, currentDayData: ChartDotsData) {
    const {
        type,
        config
    } = props;

    if (!currentDayData.maxValue) return;
    if (type !== ChartValueType.GLUCOSE) {
        currentDayData.maxValue = currentDayData.maxValue % config.horizontalLineNumber == 0 ?
            currentDayData.maxValue :
            config.horizontalLineNumber * Math.ceil(currentDayData.maxValue / config.horizontalLineNumber)
    } else if (type === ChartValueType.GLUCOSE) {
        currentDayData.maxValue =
            (currentDayData.maxValue - currentDayData.minValue) % config.horizontalLineNumber == 0 ?
                currentDayData.maxValue :
                currentDayData.minValue + config.horizontalLineNumber * Math.ceil((currentDayData.maxValue - currentDayData.minValue) / config.horizontalLineNumber)
    }
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

export function adaptAndGetPolylineChartDots(props: ChartWrapProps, config: IChartConfiguration, train, chartData: ChartDotsData) {
    let result: IChartDot[] = [];

    Object.keys(train).map(id => {
        const yScale = (config.boxHeight / chartData.maxValue)
        const dot = {
            y: train[id].y * yScale,
            x: train[id].x,
            id: (id as any)
        }
        !config.reversedY && reverse(config, dot)
        result.push(addPadding(props, dot));
    })
    return result;
};

export function getIncreaseTime(config: IChartConfiguration) {
    const minutesOfDay = 60 * 24;
    const step = (config.boxWidth / minutesOfDay) * config.timeStepMinutes;
    return step;
}

export function getId(config: IChartConfiguration, time: number) {
    return Math.floor(time / getIncreaseTime(config))
}



export function reverse(config: IChartConfiguration ,dot: IChartDot) {
    dot.y = config.boxHeight - dot.y + config.basicPadding + config.axisWidth / 2;
}