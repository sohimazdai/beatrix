import { ChartDotsData, IChartDot, ChartValueType, IChartTrain } from "../../model/IChart";
import { INoteList } from "../../model/INoteList";
import { ChartWrapProps } from "../../view/chart/chart-wrap/ChartWrap";
import { 
    adaptDots, 
    getDotsAndEvents, 
    filterValidEffects, 
    getTrainItemId, 
    getMaxTrainItemId 
} from "./ChartCalculationHelper";

export function calculateChartDots(props: ChartWrapProps): ChartDotsData {
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
    let groundAdaptedData = adaptDots(props, dots.dots, dots.events, currentDate);
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
    return adaptDots(props, trainDots);
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