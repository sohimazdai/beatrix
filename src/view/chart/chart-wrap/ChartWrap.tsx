import React from 'react';
import { IChartConfiguration, ChartValueType, ChartAxisType, IChartDot, ChartPeriodType } from '../../../model/IChart';
import { StyleSheet, View, Text } from 'react-native';
import { ChartBox } from '../chart-svg/ChartBox';
import { ChartNet } from '../chart-svg/ChartNet';
import { ChartHighlightNet } from '../chart-svg/ChartHighlightNet';
import { ChartPolyline, PolylineType } from '../chart-svg/ChartPolyline';
import { InsulinTextRotated } from '../../../component/icon/InsulinTextRotated';
import { BreadUnitsTextRotated } from '../../../component/icon/BreadUnitsTextRotated';
import { GlucoseTextRotated } from '../../../component/icon/GlucoseTextRotated';
import { INoteList, INoteListByDay, INoteListNote } from '../../../model/INoteList';
import { ChartDot } from '../chart-svg/ChartDot';
import { ThemeColor } from '../../../constant/ThemeColor';

export interface ChartWrapProps {
    globalConfig: { [id: number]: IChartConfiguration }
    type: ChartValueType
    selectedPeriod: ChartPeriodType
    selectedDotId?: number
    currentStartDate?: Date
    noteList?: INoteList
    noteListByDay?: INoteListByDay
    onDotPress?: (id: number) => void
}

interface ChartDotsData {
    maxValue?: number
    minValue?: number
    dots?: IChartDot[]
    events?: IChartDot[]
    previous?: {
        maxValue?: number
        minValue?: number
        dots?: IChartDot[]
    }
}

export function ChartWrap(props: ChartWrapProps) {
    const {
        type,
        selectedPeriod,
        currentStartDate,
        noteListByDay,
        noteList,
        selectedDotId
    } = props;
    const config: IChartConfiguration = props.globalConfig[type]
    const basicDotsData: ChartDotsData = React.useMemo(
        () => getGlucoseChartDots(getBaseChartDots()),
        [currentStartDate, noteList, selectedPeriod]
    );
    const highlights: IChartDot[] = [...basicDotsData.events, ...basicDotsData.dots]
    let polylineDotsData: ChartDotsData = {}

    switch (type) {
        case ChartValueType.GLUCOSE:
            polylineDotsData = React.useMemo(
                () => getGlucoseChartDots(getBaseChartDots()),
                [currentStartDate, noteList, selectedPeriod]
            );
        case ChartValueType.INSULIN:
        case ChartValueType.BREAD_UNITS:
            polylineDotsData = React.useMemo(
                () => getPolylinePath(getBaseChartDots()),
                [currentStartDate, noteList, selectedPeriod]
            );
        default: () => { }
    }

    //GETTING BASE CHART DOTS FOR CALCULATING DOT EFFECTS
    function getBaseChartDots(): ChartDotsData {
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
                currentStartDate.getFullYear(),
                currentStartDate.getMonth(),
                currentStartDate.getDate() - 1
            ).getTime()
        ] || {};
        const currentDayNotes: INoteList = noteListByDay[currentStartDate.getTime()] || {};

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
                const relativity = (config.boxHeight - generalPadding(config)) / range;
                const resultY = config.reversedY ?
                    (y - min) * relativity :
                    config.boxHeight - (y - min) * relativity;
                return resultY
            }

            function getScaledX(date: number) {
                const beforeToday = new Date(
                    currentStartDate.getFullYear(),
                    currentStartDate.getMonth(),
                    currentStartDate.getDate()
                ).getTime();
                const xRelativity = (config.boxWidth) / (1000 * 60 * 60 * 24);
                return (date - beforeToday) * xRelativity;
            }

            Object.keys(dayNotes).map(noteId => {
                let dot: IChartDot = { x: 0, y: 0, id: parseInt(noteId) };
                dot.x = getScaledX((dayNotes[noteId] as INoteListNote).date);
                dot.y = getScaledY({ maxValue, minValue }, (dayNotes[noteId] as INoteListNote)[type]) + initialPadding(config);
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
    function getGlucoseChartDots(currentDayData: ChartDotsData) {
        let events: IChartDot[] = [];
        let dots: IChartDot[] = [];
        getNewMaxValue(currentDayData);
        currentDayData.dots.map(dot => {
            let current = padd(dot);
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
    function getPolylinePath(currentDayData: ChartDotsData) {
        const previousChartData = { ...currentDayData.previous }
        const chartData = { ...currentDayData }
        const previousDots = previousChartData.dots;
        const dots = chartData.dots;
        const previousDayTrain: { [id: number]: IChartDot } = {};
        const train: { [id: number]: IChartDot } = {};

        function getIncreaseTime() {
            const minutesOfDay = 60 * 24;
            const step = (config.boxWidth / minutesOfDay) * config.timeStepMinutes;
            return step;
        }

        function getId(time: number) {
            return Math.floor(time / getIncreaseTime())
        }

        function adaptAndGetPolylineChartDots(train, chartData) {
            let result: IChartDot[] = [];


            Object.keys(train).map(id => {
                const yScale = (config.boxHeight / chartData.maxValue)
                const dot = {
                    y: train[id].y * yScale,
                    x: train[id].x,
                    id: (id as any)
                }
                !config.reversedY && reverse(dot)
                result.push(padd(dot));
            })
            return result;
        };

        function reverse(dot: IChartDot) {
            dot.y = config.boxHeight - dot.y + config.basicPadding + config.axisWidth / 2;
        }

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
                timeIncreaseStepValue = getIncreaseTime();
            let currentTime = dot.x,
                currentClearValue = 0;

            for (let i = 0; i < increaseStepNumber; i++) {
                let nextTime = currentTime + timeIncreaseStepValue,
                    id = getId(nextTime),
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
                getNewMaxValue(chartData)
            }
            for (let i = 0; i < flatStepNumber; i++) {
                let nextTime = currentTime + timeIncreaseStepValue,
                    id = getId(nextTime),
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
                getNewMaxValue(chartData)
            }
            for (let i = 0; i < decreaseStepNumber; i++) {
                let nextTime = currentTime + timeIncreaseStepValue,
                    id = getId(nextTime),
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
            getNewMaxValue(chartData);
        }

        previousDots.map((dot: IChartDot) => {
            const initDot = {
                x: dot.x,
                y: 0,
                id: dot.id
            }
            const noteId = dot.id;

            if (noteList[noteId][type]) {
                let id = getId(dot.x);
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
                let id = getId(dot.x);
                train[id] = {
                    x: dot.x,
                    y: train[id] ? train[id].y : 0,
                    id: dot.id
                }
                getDotEffect(initDot, train, chartData);
            }
        })
        let result: IChartDot[] = adaptAndGetPolylineChartDots(train, chartData)
        return {
            dots: result,
            maxValue: chartData.maxValue,
            minValue: chartData.minValue
        }
    }

    //function that padd the chart content
    function padd(dot: IChartDot) {
        const xRelativity = (config.boxWidth - generalPadding(config)) / config.boxWidth;
        const yRelativity = (config.boxHeight - generalPadding(config)) / config.boxHeight;
        return {
            y: dot.y * yRelativity + initialPadding(config),
            x: dot.x * xRelativity + initialPadding(config),
            id: dot.id
        }
    }

    //function that update max chart value
    function getNewMaxValue(currentDayData: ChartDotsData) {
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

    return (
        <View style={styles.chartWrap}>
            <ChartBox
                config={config}
                axisTypes={config.axisTypes}
            >
                <ChartNet
                    maxValue={polylineDotsData.maxValue}
                    cfg={config}
                    type={selectedPeriod}
                    paddingTop={config.paddingTop}
                    paddingBottom={config.paddingBottom}
                />
                <ChartHighlightNet
                    dots={highlights}
                    cfg={config}
                    type={selectedPeriod}
                    paddingTop={config.paddingTop}
                    paddingBottom={config.paddingBottom}
                    selectedDotId={props.selectedDotId}
                />
                <ChartPolyline
                    polylineType={config.polylineType}
                    dots={
                        type === ChartValueType.GLUCOSE ?
                        basicDotsData.dots :
                        polylineDotsData.dots
                    }
                    initGradientColor={config.initGradientColor}
                    stopGradientColor={config.stopGradientColor}
                />
                {clickableDotsAvailable() && basicDotsData.dots.map(item => {
                    return <ChartDot
                        key={item.id}
                        id={item.id}
                        r={config.dotRadius}
                        onPress={props.onDotPress}
                        x={item.x}
                        y={item.y}
                        fill={ThemeColor.BRIGHT_RED}
                        stroke={ThemeColor.WHITE}
                        selectedDotId={selectedDotId}
                    />
                })}
                {clickableDotsAvailable() && basicDotsData.events.map(item => {
                    return <ChartDot
                        key={item.id}
                        id={item.id}
                        r={config.dotRadius}
                        onPress={props.onDotPress}
                        x={item.x}
                        y={item.y}
                        fill={ThemeColor.WHITE}
                        stroke={ThemeColor.INDIAN_RED}
                        selectedDotId={selectedDotId}
                    />
                })}
            </ChartBox>
            {netYTitles(polylineDotsData.maxValue, polylineDotsData.minValue)}
            {yAxisTitle(type)}
        </View>
    )

    function netYTitles(max: number, min: number) {
        let range = type === ChartValueType.GLUCOSE ? max - min : max;
        let start = type === ChartValueType.GLUCOSE ? min : 0;
        let step = range / config.horizontalLineNumber;
        let toRender = [];
        for (let i = 0; i <= config.horizontalLineNumber; i++) {
            toRender.push(start + i * step)
        }
        return <View style={{
            ...styles.yNetTitlesView,
            height: config.boxHeight,
            top: config.reversedY ? -9 : 9,
            flexDirection: config.reversedY ? 'column' : 'column-reverse'
        }}>
            {toRender.map((step, index) => <Text
                key={index}
                style={styles.yNetTitlesText}
            >
                {index !== 0 && Math.round(step * 10) / 10 || ''}
            </Text>)}
        </View>
    }

    function clickableDotsAvailable(): boolean {
        return type === ChartValueType.GLUCOSE
    }
}

function yAxisTitle(type: ChartValueType) {
    switch (type) {
        case ChartValueType.BREAD_UNITS:
            return <BreadUnitsTextRotated style={styles.yAxisTitleIcon} />
        case ChartValueType.GLUCOSE:
            return <GlucoseTextRotated style={styles.yAxisTitleIcon} />
        case ChartValueType.INSULIN:
            return <InsulinTextRotated style={styles.yAxisTitleIcon} />
    }
}

function generalPadding(config: IChartConfiguration) {
    return config.basicPadding * 3;
}

function initialPadding(config: IChartConfiguration) {
    return config.basicPadding;
}

const styles = StyleSheet.create({
    chartWrap: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    yAxisTitleIcon: {
        position: 'absolute',
        right: -10,
        display: 'flex',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    yNetTitlesView: {
        position: 'absolute',
        left: 12,
        display: 'flex',
        flexDirection: 'column-reverse',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    yNetTitlesText: {
        paddingRight: 3,
        fontSize: 12,
        textAlign: 'center',
        color: '#CCCCCC',
    },
})
