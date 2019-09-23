import { ChartDotsData, IChartDot, ChartValueType } from "../../model/IChart";
import { INoteList, INoteListNote } from "../../model/INoteList";
import { ChartWrapProps } from "../../view/chart/chart-wrap/ChartWrap";
import { generalPadding, initialPadding, getNewMaxValue, addPadding, getIncreaseTime, getId, adaptAndGetPolylineChartDots } from "./ChartCalculationHelper";

//GETTING BASE CHART DOTS FOR CALCULATING DOT EFFECTS
export function getBaseChartDots(props: ChartWrapProps): ChartDotsData {
    const {
        noteListByDay,
        currentDate,
        type,
        config,
    } = props;

    let currentDayBaseChartData: {
        maxValue?: number,
        minValue?: number,
        dots?: IChartDot[],
        previous?: {
            maxValue?: number,
            minValue?: number,
            dots?: IChartDot[]
        },
    } = {};
    const previousDayNotes: INoteList = noteListByDay[
        new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            currentDate.getDate() - 1
        ).getTime()
    ] || {};
    const currentDayNotes: INoteList = noteListByDay[currentDate.getTime()] || {};

    function getBaseChartData(dayNotes: INoteList) {
        let chartDots: IChartDot[] = [];
        let values = Object.keys(dayNotes).map(noteId => dayNotes[noteId][type]);
        let maxValue = values.length ? Math.max(...values) + 1 : 0;
        let minValue = values.length && Math.min(...values) - 1 > 0 ? Math.floor(Math.min(...values) - 1) : 0;

        function getScaledY(chartData, y): number {
            const min = chartData.minValue > config.yPadding ?
                chartData.minValue - config.yPadding :
                0;
            const max = chartData.maxValue + config.yPadding;
            const range = max - min;
            const relativity = (config.boxHeight - generalPadding(props)) / range;
            const resultY = config.reversedY ?
                (y - min) * relativity:
                config.boxHeight - (y - min) * relativity;
            return resultY
        }

        function getScaledX(date: number) {
            const beforeToday = new Date(
                currentDate.getFullYear(),
                currentDate.getMonth(),
                currentDate.getDate()
            ).getTime();
            const xRelativity = (config.boxWidth) / (1000 * 60 * 60 * 24);
            return (date - beforeToday) * xRelativity;
        }

        Object.keys(dayNotes).map(noteId => {
            let dot: IChartDot = { x: 0, y: 0, id: parseInt(noteId) };
            dot.x = getScaledX((dayNotes[noteId] as INoteListNote).date);
            dot.y = getScaledY({ maxValue, minValue }, (dayNotes[noteId] as INoteListNote)[type]) + initialPadding(props);
            dot.y && chartDots.push(dot);
            dot.y && values.push(dot.y);
        })
        chartDots.sort((a: IChartDot, b: IChartDot) => a.id - b.id);
        return {
            dots: chartDots,
            maxValue,
            minValue
        };
    }

    if (Object.keys(currentDayNotes).length) {
        currentDayBaseChartData = getBaseChartData(currentDayNotes);
    } else {
        currentDayBaseChartData.dots = [];
    }
    if (Object.keys(previousDayNotes).length) {
        currentDayBaseChartData.previous = getBaseChartData(previousDayNotes)
    } else {
        currentDayBaseChartData.previous = {};
        currentDayBaseChartData.previous.dots = [];
    }
    return currentDayBaseChartData
}

//GETTING GLUCOSE DOTS BY BASE DOTS
export function getGlucoseChartDots(props: ChartWrapProps, currentDayData: ChartDotsData) {
    const {
        noteList,
    } = props;

    let events: IChartDot[] = [];
    let dots: IChartDot[] = [];
    getNewMaxValue(props, currentDayData);
    currentDayData.dots.map(dot => {
        let current = addPadding(props, dot);
        noteList[dot.id].glucose === 0 ?
            events.push(current) :
            dots.push(current)
    });
    return {
        maxValue: currentDayData.maxValue,
        minValue: currentDayData.minValue,
        events,
        dots
    };
}

//GETTING DOTS EFFECT
export function getPolylinePath(props: ChartWrapProps, currentDayData: ChartDotsData) {
    const {
        noteList,
        type,
        config
    } = props;

    const previousChartData = { ...currentDayData.previous }
    const chartData = { ...currentDayData }
    const previousDots = previousChartData.dots;
    const dots = chartData.dots;
    const previousDayTrain: { [id: number]: IChartDot } = {};
    const train: { [id: number]: IChartDot } = {};

    function getDotEffect(
        dot: IChartDot,
        train: { [id: number]: IChartDot },
        chartData: any,
    ) {
        const cfg = config,
            originalNote = noteList[dot.id],
            increaseStepNumber = cfg.increaseTime / cfg.timeStepMinutes,
            flatStepNumber = cfg.flatTime / cfg.timeStepMinutes,
            decreaseStepNumber = cfg.decreaseTime / cfg.timeStepMinutes,
            increaseStepValue = originalNote[type] / increaseStepNumber,
            decreaseStepValue = originalNote[type] / decreaseStepNumber,
            timeIncreaseStepValue = getIncreaseTime(config);
        let currentTime = dot.x,
            currentClearValue = 0;

        for (let i = 0; i < increaseStepNumber; i++) {
            let nextTime = currentTime + timeIncreaseStepValue,
                id = getId(config, nextTime),
                nextTrainValue = train[id] && train[id].y ?
                    train[id].y :
                    0,
                nextClearValue = currentClearValue + increaseStepValue;
            if (nextTime > config.boxWidth) {
                train[id] = {
                    y: 0,
                    x: currentTime,
                    id: currentTime
                };
                return
            }
            train[id] = {
                y: nextClearValue + nextTrainValue,
                x: nextTime,
                id: nextTime
            };

            currentClearValue = nextClearValue;
            currentTime = nextTime;
            chartData.maxValue =
                (currentClearValue + nextTrainValue) > chartData.maxValue ?
                    Math.ceil(currentClearValue + nextTrainValue) :
                    chartData.maxValue;
            getNewMaxValue(props, chartData)
        }
        for (let i = 0; i < flatStepNumber; i++) {
            let nextTime = currentTime + timeIncreaseStepValue,
                id = getId(config, nextTime),
                nextTrainValue = train[id] && train[id].y ?
                    train[id].y :
                    0,
                nextClearValue = currentClearValue;
            if (nextTime > config.boxWidth) {
                train[id] = {
                    y: 0,
                    x: currentTime,
                    id: currentTime
                };
                return
            }
            train[id] = {
                y: nextClearValue + nextTrainValue,
                x: nextTime,
                id: nextTime
            };

            currentClearValue = nextClearValue;
            currentTime = nextTime;
            chartData.maxValue =
                (currentClearValue + nextTrainValue) > chartData.maxValue ?
                    Math.ceil(currentClearValue + nextTrainValue) :
                    chartData.maxValue;
            getNewMaxValue(props, chartData)
        }
        for (let i = 0; i < decreaseStepNumber; i++) {
            let nextTime = currentTime + timeIncreaseStepValue,
                id = getId(config, nextTime),
                nextTrainValue = train[id] && train[id].y ?
                    train[id].y :
                    0,
                nextClearValue = currentClearValue - decreaseStepValue;
            if (nextTime > config.boxWidth) {
                train[id] = {
                    y: 0,
                    x: currentTime,
                    id: currentTime
                };
                return
            }
            train[id] = {
                y: nextClearValue + nextTrainValue,
                x: nextTime,
                id: nextTime
            };

            currentClearValue = nextClearValue;
            currentTime = nextTime;
            chartData.maxValue =
                (currentClearValue + nextTrainValue) > chartData.maxValue ?
                    Math.ceil(currentClearValue + nextTrainValue) :
                    chartData.maxValue
        }
        getNewMaxValue(props, chartData);
    }

    previousDots.map((dot: IChartDot) => {
        const initDot = {
            x: dot.x,
            y: 0,
            id: dot.id
        }
        const noteId = dot.id;

        if (noteList[noteId][type]) {
            let id = getId(config, dot.x);
            previousDayTrain[id] = {
                x: dot.x,
                y: 0,
                id: dot.id
            }
            getDotEffect(initDot, previousDayTrain, previousChartData);
        }
    })


    let count = 0;
    Object.keys(previousDayTrain).map(id => {
        if (parseInt(id) >= 0) {
            if (count === 0) {
                train[-1] = {
                    x: 0,
                    y: 0,
                    id: previousDayTrain[id].id
                }
            }
            train[id] = count === 0 ?
                {
                    x: previousDayTrain[id].x,
                    y: previousDayTrain[id].y,
                    id: previousDayTrain[id].id
                }
                :
                previousDayTrain[id]
            chartData.maxValue = previousDayTrain[id].y > chartData.maxValue ? Math.ceil(previousDayTrain[id].y) : chartData.maxValue;
            ++count
        }
    });

    dots.map((dot: IChartDot, index: number) => {
        const initDot = {
            x: dot.x,
            y: 0,
            id: dot.id
        }
        const noteId = dot.id;

        if (noteList[noteId][type]) {
            let id = getId(config, dot.x);
            train[id] = {
                x: dot.x,
                y: train[id] ? train[id].y : 0,
                id: dot.id
            }
            getDotEffect(initDot, train, chartData);
        }
    })
    let result: IChartDot[] = adaptAndGetPolylineChartDots(props, config, train, chartData)
    return {
        dots: result,
        maxValue: chartData.maxValue,
        minValue: chartData.minValue
    }
}