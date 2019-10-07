import { ChartDotsData, IChartDot, ChartValueType, IChartTrain } from "../../model/IChart";
import { INoteList } from "../../model/INoteList";
import { ChartWrapProps } from "../../view/chart/chart-wrap/ChartWrap";
import {
    adaptDayDots,
    getDotsAndEvents,
    filterValidEffects,
    getTrainItemId,
    getMaxTrainItemId,
    getArrayAverage,
    getDayAfterThatNumber,
    adaptMonthDots,
    getMonthStart,
    getWeekDaysNumbers,
    adaptThreeMonthDots,
} from "./ChartCalculationHelper";
import { DateHelper } from "../../utils/DateHelper";

export function calculateDayChartDots(props: ChartWrapProps): ChartDotsData {
    const {
        noteListByDay,
        currentDate,
        type,
    } = props;

    const previousDayNotes: INoteList = noteListByDay[
        new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            currentDate.getDate() - 1
        ).getTime()
    ] || {};
    const currentDayNotes: INoteList = noteListByDay[currentDate.getTime()] || {};
    const currentGroundDots = getGroundDots(props, currentDayNotes)
    let dots = getDotsAndEvents(currentGroundDots);
    let groundAdaptedData = adaptDayDots(props, dots.dots, dots.events, currentDate);
    if (type === ChartValueType.GLUCOSE) {
        return groundAdaptedData;
    }
    const previousGroundDots = getGroundDots(props, previousDayNotes);
    const train: IChartTrain = {};
    previousGroundDots.map(dot => {
        calculateDotEffect(props, dot, train, currentDate);
    })
    currentGroundDots.map(dot => {
        calculateDotEffect(props, dot, train, currentDate);
    })
    const trainDots = filterValidEffects(train);
    return adaptDayDots(props, trainDots);
}

function getGroundDots(props: ChartWrapProps, noteList: INoteList): IChartDot[] {
    let groundDots: IChartDot[] = [];
    Object.keys(noteList).map(noteId => {
        groundDots.push({
            x: noteList[noteId as any].date,
            y: noteList[noteId as any][props.type],
            id: noteList[noteId as any].date
        })
    })
    return groundDots
}

function calculateDotEffect(props: ChartWrapProps, dot: IChartDot, train: IChartTrain, date: Date) {
    const { config } = props;
    const id = getTrainItemId(props, dot, date);

    const increaseStepNumber = config.increaseTime / config.timeStepMinutes,
        flatStepNumber = config.flatTime / config.timeStepMinutes,
        decreaseStepNumber = config.decreaseTime / config.timeStepMinutes,
        increaseStepValue = dot.y / increaseStepNumber,
        decreaseStepValue = dot.y / decreaseStepNumber;
    let ownCurrentY = 0;
    let ownCurrentId = id;

    let trainYValue = train[id] && train[id].y ?
        ownCurrentY + train[id].y :
        ownCurrentY
    train[ownCurrentId] = {
        y: trainYValue,
        x: ownCurrentId,
        id: ownCurrentId,
    }
    ownCurrentY += increaseStepValue;
    ownCurrentId++;
    for (let i = 1; i < increaseStepNumber; i++) {
        let trainYValue = train[ownCurrentId] && train[ownCurrentId].y ?
            ownCurrentY + train[ownCurrentId].y :
            ownCurrentY
        train[ownCurrentId] = {
            y: trainYValue,
            x: ownCurrentId,
            id: ownCurrentId,
        }
        ownCurrentY += increaseStepValue;
        ownCurrentId++;
        if (ownCurrentId > getMaxTrainItemId(props, date)) return
    }
    for (let i = 0; i < flatStepNumber; i++) {
        let trainYValue = train[ownCurrentId] && train[ownCurrentId].y ?
            ownCurrentY + train[ownCurrentId].y :
            ownCurrentY
        train[ownCurrentId] = {
            y: trainYValue,
            x: ownCurrentId,
            id: ownCurrentId,
        }
        ownCurrentId++;
        if (ownCurrentId > getMaxTrainItemId(props, date)) return
    }
    for (let i = 0; i < decreaseStepNumber + 1; i++) {
        let trainYValue = train[ownCurrentId] && train[ownCurrentId].y ?
            ownCurrentY + train[ownCurrentId].y :
            ownCurrentY
        train[ownCurrentId] = {
            y: trainYValue,
            x: ownCurrentId,
            id: ownCurrentId,
        }
        ownCurrentY = ownCurrentY - decreaseStepValue
        ownCurrentId++;
        if (ownCurrentId > getMaxTrainItemId(props, date)) return
    }
}

export function calculateMonthChartDots(props: ChartWrapProps): ChartDotsData {
    let result: ChartDotsData = {};

    const dateFinishedCalculation = getMonthStart(props.currentDate);
    const dayAverages: IChartDot[] = [];
    for (let i = 0; i <= DateHelper.getMaxDateOfDifferentMonth(props.currentDate, 0); i++) {
        let accumulator: number[] = [];
        const currentDayNotes: INoteList = props.noteListByDay[getDayAfterThatNumber(dateFinishedCalculation, i)] || {};
        Object.keys(currentDayNotes).map(noteId => {
            currentDayNotes[noteId][props.type] != 0 && accumulator.push(currentDayNotes[noteId][props.type])
        })
        i + 1 <= DateHelper.getMaxDateOfDifferentMonth(props.currentDate, 0) &&
            dayAverages.push({
                x: i + 1,
                y: getArrayAverage(accumulator),
                id: getDayAfterThatNumber(dateFinishedCalculation, i),
            })
    }
    result = adaptMonthDots(props, dayAverages)
    return result;
}

export function calculateThreeMonthChartDots(props: ChartWrapProps): ChartDotsData {
    let result: ChartDotsData = {};
    let weekAverages: IChartDot[] = [];
    let startWeekDate = new Date(
        props.currentDate.getFullYear(),
        props.currentDate.getMonth(),
        DateHelper.getMaxDateOfDifferentMonth(props.currentDate, 0)
    )
    let weekNumber = DateHelper.getWeekNumber();
    for (let i = 0; i < weekNumber; i++) {
        let weekDotsValues: number[] = [];
        let weekDaysIds = getWeekDaysNumbers(DateHelper.getDiffWeek(startWeekDate, -i))
            .sort((a, b) => a - b);
        weekDaysIds.map(weekDayId => {
            props.noteListByDay[weekDayId] && Object.keys(props.noteListByDay[weekDayId]).map(noteId => {
                props.noteList[noteId][props.type] && weekDotsValues.push(props.noteList[noteId][props.type])
            })
        })
        weekAverages.push({
            x: weekNumber - i,
            y: Math.round(getArrayAverage(weekDotsValues) * 10) / 10,
            id: weekDaysIds[0]
        })
    }
    result = adaptThreeMonthDots(props, weekAverages)
    return result;
}