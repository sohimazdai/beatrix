import React from 'react'
import { connect } from 'react-redux';
import { AppState } from '../../model/AppState';
import { Dispatch, Action } from 'redux';
import { StyleSheet, View, Text, Alert, Dimensions } from 'react-native';
import { INoteList, INoteListByDay, INoteListNote } from '../../model/INoteList';
import { LinearGradient } from 'expo-linear-gradient';
import { ChartBox } from '../../view/chart/ChartBox';
import { ChartDot } from '../../view/chart/ChartDot';
import { ThemeColor } from '../../constant/ThemeColor';
import { shadowOptions } from '../../constant/shadowOptions';
import { ChartAxis } from '../../view/chart/chart-axis/ChartAxis';
import { ChartAxisType, IChartDot, ChartValueType, ChartPeriodType } from '../../model/IChart';
import { NoteListSelector } from '../../store/selector/NoteListSelector';
import { ChartPolyline } from '../../view/chart/chart-polyline/ChartPolyline';

export interface NoteChartProps {
    noteListByDay: INoteListByDay
    noteList: INoteList
}

export interface NoteChartState {
    currentStartDate: Date,
    currentEndDate: Date,
}

export enum NoteChartMode {
    DAY = 'day',
    MONTH = 'month',
    THREE_MONTH = 'three-month',
}

const chartConfig = {
    glucose: {
        width: Dimensions.get("screen").width,
        height: Dimensions.get("screen").width / 2,
        boxWidth: Dimensions.get("screen").width,
        boxHeight: Dimensions.get("screen").width / 2,
        axisWidth: 2,
        axisColor: '#AAAAAA',
        arrowSize: 5,
        yPadding: 1,
        dotRadius: 5,
        reversedY: false,
    },
    breadUnits: {
        width: Dimensions.get("screen").width,
        height: Dimensions.get("screen").width / 3,
        boxWidth: Dimensions.get("screen").width,
        boxHeight: Dimensions.get("screen").width / 3,
        axisWidth: 2,
        axisColor: '#AAAAAA',
        arrowSize: 5,
        yPadding: 1,
        dotRadius: 5,
        reversedY: false,
    },
    insulin: {
        width: Dimensions.get("screen").width,
        height: Dimensions.get("screen").width / 3,
        boxWidth: Dimensions.get("screen").width,
        boxHeight: Dimensions.get("screen").width / 3,
        axisWidth: 2,
        axisColor: '#AAAAAA',
        arrowSize: 5,
        yPadding: 1,
        dotRadius: 5,
        reversedY: true,
        increaseTime: 30,
        flatTime: 30,
        decreaseTime: 180,
    },
    longInsulin: {
        width: Dimensions.get("screen").width,
        height: Dimensions.get("screen").width / 3,
        boxWidth: Dimensions.get("screen").width,
        boxHeight: Dimensions.get("screen").width / 3,
        axisWidth: 2,
        axisColor: '#AAAAAA',
        arrowSize: 5,
        yPadding: 1,
        dotRadius: 5,
        reversedY: false,
    },
    timeStepMinutes: 15,

}

class NoteChart extends React.PureComponent<NoteChartProps, NoteChartState> {
    state = {
        currentStartDate: new Date(
            new Date().getFullYear(),
            new Date().getMonth(),
            new Date().getDate()
        ),
        currentEndDate: new Date(
            new Date().getFullYear(),
            new Date().getMonth(),
            new Date().getDate()
        ),
        mode: NoteChartMode.DAY,
    }

    componentDidUpdate() {

    }

    render() {
        const glucoseChartDots = this.getChartDots(ChartValueType.GLUCOSE);
        const breadUnitsChartDots = this.getChartDots(ChartValueType.BREAD_UNITS);
        const insulinChartDots = this.getInsulinPolylinePath(this.getChartDots(ChartValueType.INSULIN));
        const longInsulinChartDots = this.getChartDots(ChartValueType.LONG_INSULIN);
        return (
            <View style={styles.view}>
                <View style={styles.statusBar} />
                <LinearGradient
                    colors={['#FFF2CF', '#4249FF']}
                    style={styles.viewGradient}
                />
                <View
                    style={styles.chartWithSettingsView}
                >
                    <View style={styles.chartView}>
                        <LinearGradient
                            colors={['#163B50', '#3E2626']}
                            style={styles.chartGradient}
                        >
                            <ChartBox
                                {...chartConfig.insulin}
                            >
                                {/* INSULIN CHART */}
                                <ChartAxis
                                    {...this.getAxisDots(ChartValueType.INSULIN, ChartAxisType.OY_REVERSE)}
                                    axisType={ChartAxisType.OY_REVERSE}
                                    config={chartConfig[ChartValueType.INSULIN]}
                                />
                                <ChartAxis
                                    {...this.getAxisDots(ChartValueType.INSULIN, ChartAxisType.OX_UPSIDE)}
                                    axisType={ChartAxisType.OX_UPSIDE}
                                    config={chartConfig[ChartValueType.INSULIN]}
                                />
                                <ChartPolyline dots={insulinChartDots} />
                                {/* {insulinChartDots.dots.map(item => {
                                    return <ChartDot
                                        key={item.id}
                                        r={chartConfig.insulin.dotRadius}
                                        onPress={() => Alert.alert(JSON.stringify(item))}
                                        x={item.x}
                                        y={item.y}
                                    />
                                })} */}
                            </ChartBox>
                            <ChartBox
                                {...chartConfig.glucose}
                            >
                                {/* GLUCOSE CHART */}
                                <ChartAxis
                                    {...this.getAxisDots(ChartValueType.GLUCOSE, ChartAxisType.OY)}
                                    axisType={ChartAxisType.OY}
                                    config={chartConfig[ChartValueType.GLUCOSE]}
                                />
                                <ChartAxis
                                    {...this.getAxisDots(ChartValueType.GLUCOSE, ChartAxisType.OX)}
                                    axisType={ChartAxisType.OX}
                                    config={chartConfig[ChartValueType.GLUCOSE]}
                                />
                                {glucoseChartDots.dots.map(item => {
                                    return <ChartDot
                                        key={item.id}
                                        r={chartConfig.glucose.dotRadius}
                                        onPress={() => Alert.alert(JSON.stringify(item))}
                                        x={item.x}
                                        y={item.y}
                                    />
                                })}
                            </ChartBox>
                            <ChartBox
                                {...chartConfig.breadUnits}
                            >
                                {/* BREAD_UNITS CHART */}
                                <ChartAxis
                                    {...this.getAxisDots(ChartValueType.BREAD_UNITS, ChartAxisType.OY)}
                                    axisType={ChartAxisType.OY}
                                    config={chartConfig[ChartValueType.BREAD_UNITS]}
                                />
                                <ChartAxis
                                    {...this.getAxisDots(ChartValueType.BREAD_UNITS, ChartAxisType.OX)}
                                    axisType={ChartAxisType.OX}
                                    config={chartConfig[ChartValueType.BREAD_UNITS]}
                                />
                                {breadUnitsChartDots.dots.map(item => {
                                    return <ChartDot
                                        key={item.id}
                                        r={chartConfig.breadUnits.dotRadius}
                                        onPress={() => Alert.alert(JSON.stringify(item))}
                                        x={item.x}
                                        y={item.y}
                                    />
                                })}
                            </ChartBox>
                        </LinearGradient>
                    </View>
                    <View style={styles.settingsView}>
                        <Text>
                            Settings are here
                        </Text>
                    </View>
                </View>
                <View style={styles.statisticsView}>
                    <Text>
                        Statisctics are here
                    </Text>
                </View>
            </View>
        )
    }

    getChartDots(valueKey: ChartValueType) {
        const { noteListByDay } = this.props;
        const chartData: {
            maxValue?: number,
            minValue?: number,
            dots?: IChartDot[],
        } = {};
        const currentDayNotes: INoteList = noteListByDay[this.state.currentStartDate.getTime()] || {};
        let values: number[] = [];
        if (this.state.mode === NoteChartMode.DAY) {
            Object.keys(currentDayNotes).map(index => {
                values.push((currentDayNotes[index] as INoteListNote)[valueKey])
            })
        };
        chartData.maxValue = values.length ? Math.max(...values) : 0;
        chartData.minValue = values.length ? Math.min(...values) : 0;
        chartData.dots = values.length ? this.getChartDotsByNoteListSection(chartData, currentDayNotes, valueKey) : [];
        return chartData;
    }

    getChartDotsByNoteListSection(data, section: INoteList, valueKey: ChartValueType) {
        let chartDots: IChartDot[] = [];
        Object.keys(section).map(noteId => {
            let dot: IChartDot = { x: 0, y: 0, id: parseInt(noteId) };
            dot.x = ((section[noteId] as INoteListNote).date - this.getClearDateBeforeToday()) * this.getXRelativity(valueKey) + this.getMargin(valueKey);
            dot.y = this.getY(valueKey, data, (section[noteId] as INoteListNote)[valueKey]);
            dot.y && chartDots.push(dot);
        })
        chartDots.sort((a: IChartDot, b: IChartDot) => a.id - b.id);
        return chartDots;
    }

    getClearDateBeforeToday() {
        switch (this.state.mode) {
            case NoteChartMode.DAY:
                return new Date(
                    this.state.currentStartDate.getFullYear(),
                    this.state.currentStartDate.getMonth(),
                    this.state.currentStartDate.getDate()
                ).getTime()
        }
    }

    getXRelativity(valueKey: ChartValueType) {
        switch (this.state.mode) {
            case NoteChartMode.DAY:
                const dayInMS = 1000 * 60 * 60 * 24;
                return (chartConfig[valueKey].boxWidth - 2 * this.getMargin(valueKey)) / dayInMS;
        }
    }

    getY(valueKey: ChartValueType, chartData, y): number {
        const min = chartData.minValue > chartConfig[valueKey].yPadding ?
            chartData.minValue - chartConfig[valueKey].yPadding :
            0;
        const max = chartData.maxValue + chartConfig[valueKey].yPadding;
        const range = max - min;
        const relativity = (chartConfig[valueKey].boxHeight - 2 * this.getMargin(valueKey)) / range;
        const resultY = chartConfig[valueKey].reversedY ?
            (y - min) * relativity + this.getMargin(valueKey) :
            chartConfig[valueKey].boxHeight - (y - min) * relativity - this.getMargin(valueKey);
        return resultY
    }

    getAxisDots(valueKey: ChartValueType, type: ChartAxisType) {
        const start: { x: number, y: number, id: number } = { x: 0, y: 0, id: 0 };
        const end: { x: number, y: number, id: number } = { x: 0, y: 0, id: 1 };
        const cfg = chartConfig[valueKey];
        if (type === ChartAxisType.OY) {
            start.x = cfg.arrowSize;
            start.y = cfg.boxHeight - cfg.arrowSize;
            end.x = cfg.arrowSize;
            end.y = cfg.arrowSize;
        } else if (type === ChartAxisType.OX) {
            start.x = cfg.arrowSize;
            start.y = cfg.boxHeight - cfg.arrowSize;
            end.x = cfg.boxWidth - cfg.arrowSize;
            end.y = cfg.boxHeight - cfg.arrowSize;
        } else if (type === ChartAxisType.OY_REVERSE) {
            end.x = cfg.arrowSize;
            end.y = cfg.boxHeight - cfg.arrowSize;
            start.x = cfg.arrowSize;
            start.y = cfg.arrowSize;
        } else if (type === ChartAxisType.OX_UPSIDE) {
            start.x = cfg.arrowSize;
            start.y = cfg.arrowSize;
            end.x = cfg.boxWidth - cfg.arrowSize;
            end.y = cfg.arrowSize;
        }
        return { start, end }
    }

    getMargin(valueKey: ChartValueType): number {
        const cfg = chartConfig[valueKey];
        const generalChartMargin = cfg.arrowSize;
        return generalChartMargin;
    }

    getInsulinPolylinePath(chartData: {
        maxValue?: number,
        minValue?: number,
        dots?: IChartDot[],
    }) {
        const dots = chartData.dots;
        const insulinTrain: { [id: number]: IChartDot } = {};
        const max = { value: 0 }
        dots.map((dot: IChartDot, index: number) => {
            const initDot = {
                x: this.getApproximateTime(dot.x),
                y: dot.y,
                id: dot.id
            }
            const noteId = dot.id;
            if (Object.keys(insulinTrain)) {

                insulinTrain[this.getApproximateTime(dot.x)] = {
                    x: this.getApproximateTime(dot.x),
                    y: insulinTrain[this.getApproximateTime(dot.x)] ? insulinTrain[this.getApproximateTime(dot.x)].y : 0,
                    id: dot.id
                }
            }
            this.getDotEffect(initDot, insulinTrain, ChartValueType.INSULIN, noteId, max);
        })
        Object.keys(insulinTrain).map(time => {
            insulinTrain[time].y = this.calculateInsulineConcreteValue(insulinTrain[time].y, max)
        })
        return insulinTrain
    }

    getApproximateTime(time: number) {
        return Math.round(time / (chartConfig.timeStepMinutes)) * chartConfig.timeStepMinutes
    }

    getDotEffect(dot: IChartDot, train: { [id: number]: IChartDot }, type: ChartValueType, noteId: number, max: { value: number }) {
        const keyCfg = (chartConfig[type] as any)
        const increaseStepNumber = keyCfg.increaseTime / chartConfig.timeStepMinutes;
        const increaseStepValue = dot.y / increaseStepNumber;
        const flatStepNumber = keyCfg.flatTime / chartConfig.timeStepMinutes;
        const decreaseStepNumber = keyCfg.decreaseTime / chartConfig.timeStepMinutes;
        const decreaseStepValue = dot.y / decreaseStepNumber;
        const insulinValue = this.props.noteList[noteId].insulin;
        const insulinIncStepValue = insulinValue / increaseStepNumber;
        const insulinDecStepValue = insulinValue / decreaseStepNumber;
        let clearCurrentY = 0;
        let currentTime = dot.x;
        for (let i = 0; i < increaseStepNumber; i++) {
            let nextTime = currentTime + this.getIncreaseTime(ChartValueType.INSULIN);
            let nextTrainValue = train[nextTime] && train[nextTime].y ? train[nextTime].y : 0;
            let nextY = clearCurrentY + insulinIncStepValue;
            train[nextTime] = {
                id: 0,
                y: nextTrainValue + nextY,
                x: nextTime
            }
            currentTime = nextTime;
            clearCurrentY = nextY;
            max.value =  train[nextTime].y > max.value ? train[nextTime].y : max.value
        };
        for (let i = 0; i < flatStepNumber; i++) {
            let nextTime = currentTime + this.getIncreaseTime(ChartValueType.INSULIN);
            let nextTrainValue = train[nextTime] && train[nextTime].y ? train[nextTime].y : 0;
            let nextY = clearCurrentY;
            train[nextTime] = {
                id: 0,
                y: nextTrainValue + nextY,
                x: nextTime
            }
            currentTime = nextTime;
            clearCurrentY = nextY;
            max.value = train[nextTime].y > max.value ? train[nextTime].y : max.value

        }
        for (let i = 0; i < decreaseStepNumber; i++) {
            let nextTime = currentTime + this.getIncreaseTime(ChartValueType.INSULIN);
            let nextTrainValue = train[nextTime] && train[nextTime].y ? train[nextTime].y : 0;
            let nextY = clearCurrentY - insulinDecStepValue;
            train[nextTime] = {
                id: 0,
                y: nextTrainValue + nextY,
                x: nextTime
            }
            currentTime = nextTime
            clearCurrentY = nextY;
            max.value = train[nextTime].y > max.value ? train[nextTime].y : max.value
        }
    }

    calculateInsulineConcreteValue(number: number, max: { value: number }) {
        return ((chartConfig.insulin.boxHeight - chartConfig.insulin.arrowSize) / max.value) * number + chartConfig.insulin.arrowSize
    }

    getIncreaseTime(type: ChartValueType) {
        let adaptedTimeStep = chartConfig.timeStepMinutes;
        let atsWithChartScale = (chartConfig[type].boxWidth / (60 * 24)) * adaptedTimeStep;
        return atsWithChartScale;
    }
}

export const NoteChartConnect = connect(
    (state: AppState) => ({
        noteListByDay: NoteListSelector.convertFlatNoteListToNoteListByDay(state.noteList),
        noteList: state.noteList,
    }),
    (dispatch: Dispatch<Action>) => ({ dispatch })
)(NoteChart)

const styles = StyleSheet.create({
    view: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    statusBar: {
        height: 24,
        width: '100%',
        backgroundColor: ThemeColor.WHITE,
    },
    viewGradient: {
        position: 'absolute',

        left: 0,
        top: 0,

        height: '100%',
        width: '100%',
    },
    chartWithSettingsView: {
        width: '100%',

        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: ThemeColor.LIGHT_BLUE,
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,

        elevation: 1,
        ...shadowOptions,
    },
    chartView: {
        width: '100%',

        elevation: 4,
        ...shadowOptions,
        backgroundColor: ThemeColor.LIGHT_BLUE,
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
    },
    chartGradient: {
        paddingBottom: 25,
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
        backgroundColor: ThemeColor.LIGHT_BLUE,

        elevation: 4,
        ...shadowOptions,
    },
    settingsView: {
        padding: 20,
    },
    statisticsView: {
    }
})
