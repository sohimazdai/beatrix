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
import { ChartAxisType, IChartDot, ChartValueType, ChartPeriodType, IChartConfiguration } from '../../model/IChart';
import { NoteListSelector } from '../../store/selector/NoteListSelector';
import { ChartPolyline, PolylineType } from '../../view/chart/chart-polyline/ChartPolyline';
import { ChartNet } from '../../view/chart/chart-net/ChartNet';
import { ChartHighlightNet } from '../../view/chart/chart-highlight-net/ChartHighlightNet';

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

const glucoseConfig: IChartConfiguration = {
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
    timeStepMinutes: 15,
}

const insulinConfig: IChartConfiguration = {
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
    timeStepMinutes: 15,
}

const breadUnitsConfig: IChartConfiguration = {
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
    increaseTime: 15,
    flatTime: 15,
    decreaseTime: 90,
    timeStepMinutes: 15,
}

const chartConfig: { [id: string]: IChartConfiguration } = {
    glucose: glucoseConfig,
    breadUnits: breadUnitsConfig,
    insulin: insulinConfig,
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
        timeStepMinutes: 15,
    },

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

    get generalPadding() {
        return chartConfig.glucose.arrowSize * 3;
    }

    get initialPadding() {
        return chartConfig.glucose.arrowSize;
    }

    render() {
        const glucoseChartDots = this.getChartDots(ChartValueType.GLUCOSE);
        // console.log('!!!!boxWidth', chartConfig.glucose.boxWidth)
        // console.log('!!!!glucoseChartDots', glucoseChartDots.dots)

        const breadUnitsChartDots = this.getBreadUnitsPolylinePath(this.getChartDots(ChartValueType.BREAD_UNITS));
        // console.log('!!!!breadUnitsChartDots', breadUnitsChartDots)
        const insulinChartDots = this.getInsulinPolylinePath(this.getChartDots(ChartValueType.INSULIN));
        // console.log('!!!!insulinChartDots', insulinChartDots)
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
                                <ChartNet
                                    dots={glucoseChartDots.dots}
                                    cfg={insulinConfig}
                                    type={ChartPeriodType.DAY}
                                    paddingTop
                                />
                                <ChartHighlightNet
                                    dots={glucoseChartDots.dots}
                                    cfg={insulinConfig}
                                    type={ChartPeriodType.DAY}
                                    paddingTop
                                />
                                <ChartPolyline
                                    polylineType={PolylineType.GRADIENTED}
                                    dots={insulinChartDots}
                                    withGradient
                                />
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
                            </ChartBox>
                            <ChartBox
                                {...chartConfig.glucose}
                            >
                                {/* GLUCOSE CHART */}
                                <ChartNet
                                    dots={glucoseChartDots.dots}
                                    maxValue={glucoseChartDots.maxValue}
                                    minValue={glucoseChartDots.minValue}
                                    cfg={glucoseConfig}
                                    type={ChartPeriodType.DAY}
                                />
                                <ChartHighlightNet
                                    dots={glucoseChartDots.dots}
                                    maxValue={glucoseChartDots.maxValue}
                                    minValue={glucoseChartDots.minValue}
                                    cfg={glucoseConfig}
                                    type={ChartPeriodType.DAY}
                                />
                                <ChartPolyline
                                    polylineType={PolylineType.REGULAR}
                                    dots={glucoseChartDots.dots}
                                />
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
                                <ChartNet
                                    dots={glucoseChartDots.dots}
                                    cfg={insulinConfig}
                                    type={ChartPeriodType.DAY}
                                    paddingBottom
                                />
                                <ChartHighlightNet
                                    dots={glucoseChartDots.dots}
                                    cfg={insulinConfig}
                                    type={ChartPeriodType.DAY}
                                    paddingBottom
                                />
                                <ChartPolyline
                                    polylineType={PolylineType.GRADIENTED}
                                    dots={breadUnitsChartDots}
                                    withGradient
                                />
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
            dot.x = ((section[noteId] as INoteListNote).date - this.getClearDateBeforeToday()) * this.getXRelativity(valueKey) + this.initialPadding;
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
                return (chartConfig[valueKey].boxWidth - this.generalPadding) / dayInMS;
        }
    }

    getY(valueKey: ChartValueType, chartData, y): number {
        const min = chartData.minValue > chartConfig[valueKey].yPadding ?
            chartData.minValue - chartConfig[valueKey].yPadding :
            0;
        const max = chartData.maxValue + chartConfig[valueKey].yPadding;
        const range = max - min;
        const relativity = (chartConfig[valueKey].boxHeight - this.generalPadding) / range;
        const resultY = chartConfig[valueKey].reversedY ?
            (y - min) * relativity + this.initialPadding :
            chartConfig[valueKey].boxHeight - (y - min) * relativity - this.initialPadding;
        return resultY
    }

    getAxisDots(valueKey: ChartValueType, type: ChartAxisType) {
        const start: { x: number, y: number, id: number } = { x: 0, y: 0, id: 0 };
        const end: { x: number, y: number, id: number } = { x: 0, y: 0, id: 1 };
        const cfg = chartConfig[valueKey];
        if (type === ChartAxisType.OY) {
            start.x = this.initialPadding;
            start.y = cfg.boxHeight - this.initialPadding;
            end.x = this.initialPadding;
            end.y = this.initialPadding;
        } else if (type === ChartAxisType.OX) {
            start.x = this.initialPadding;
            start.y = cfg.boxHeight - this.initialPadding;
            end.x = cfg.boxWidth - this.initialPadding;
            end.y = cfg.boxHeight - this.initialPadding;
        } else if (type === ChartAxisType.OY_REVERSE) {
            end.x = this.initialPadding;
            end.y = cfg.boxHeight - this.initialPadding;
            start.x = this.initialPadding;
            start.y = this.initialPadding;
        } else if (type === ChartAxisType.OX_UPSIDE) {
            start.x = this.initialPadding;
            start.y = this.initialPadding;
            end.x = cfg.boxWidth - this.initialPadding;
            end.y = this.initialPadding;
        }
        return { start, end }
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
            this.getInsulinDotEffect(initDot, insulinTrain, ChartValueType.INSULIN, noteId, max);
        })
        let result: IChartDot[] = [];
        Object.keys(insulinTrain).map(time => {
            result.push({
                y: this.reCalculateInsulinYValue(insulinTrain[time].y, max, ChartValueType.INSULIN),
                x: this.reCalculateXValue(insulinTrain[time].x, ChartValueType.INSULIN),
                id: insulinTrain[time].id
            })
        })
        return result;
    }

    getApproximateTime(time: number) {
        return Math.round(time / (chartConfig.glucose.timeStepMinutes)) * chartConfig.glucose.timeStepMinutes
    }

    getInsulinDotEffect(dot: IChartDot, train: { [id: number]: IChartDot }, type: ChartValueType, noteId: number, max: { value: number }) {
        const keyCfg = (chartConfig[type] as any)
        const increaseStepNumber = keyCfg.increaseTime / keyCfg.timeStepMinutes;
        const increaseStepValue = dot.y / increaseStepNumber;
        const flatStepNumber = keyCfg.flatTime / keyCfg.timeStepMinutes;
        const decreaseStepNumber = keyCfg.decreaseTime / keyCfg.timeStepMinutes;
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
                id: nextTime,
                y: nextTrainValue + nextY,
                x: nextTime
            }
            currentTime = nextTime;
            clearCurrentY = nextY;
            max.value = train[nextTime].y > max.value ? train[nextTime].y : max.value
        };
        for (let i = 0; i < flatStepNumber; i++) {
            let nextTime = currentTime + this.getIncreaseTime(ChartValueType.INSULIN);
            let nextTrainValue = train[nextTime] && train[nextTime].y ? train[nextTime].y : 0;
            let nextY = clearCurrentY;
            train[nextTime] = {
                id: nextTime,
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
                id: nextTime,
                y: nextTrainValue + nextY,
                x: nextTime
            }
            currentTime = nextTime
            clearCurrentY = nextY;
            max.value = train[nextTime].y > max.value ? train[nextTime].y : max.value
        }
    }

    getBreadUnitsPolylinePath(chartData: {
        maxValue?: number,
        minValue?: number,
        dots?: IChartDot[],
    }) {
        const dots = chartData.dots;
        const breadUnitsTrain: { [id: number]: IChartDot } = {};
        const max = { value: chartData.maxValue }
        dots.map((dot: IChartDot, index: number) => {
            const initDot = {
                x: this.getApproximateTime(dot.x),
                y: chartConfig.breadUnits.boxHeight - dot.y,
                id: dot.id
            }
            const noteId = dot.id;
            if (Object.keys(breadUnitsTrain)) {
                breadUnitsTrain[this.getApproximateTime(dot.x)] = {
                    x: this.getApproximateTime(dot.x),
                    y: breadUnitsTrain[this.getApproximateTime(dot.x)] ?
                        chartConfig.breadUnits.boxHeight - breadUnitsTrain[this.getApproximateTime(dot.x)].y :
                        chartConfig.breadUnits.boxHeight,
                    id: dot.id
                }
            }
            this.getBreadUnitsDotEffect(initDot, breadUnitsTrain, ChartValueType.BREAD_UNITS, noteId, max);
        })
        let result: IChartDot[] = [];
        Object.keys(breadUnitsTrain).map(time => {
            result.push({
                y: this.reCalculateInsulinYValue(breadUnitsTrain[time].y, max, ChartValueType.BREAD_UNITS),
                x: this.reCalculateXValue(breadUnitsTrain[time].x, ChartValueType.BREAD_UNITS),
                id: breadUnitsTrain[time].id
            })
        })
        return result;
    }

    getBreadUnitsDotEffect(dot: IChartDot, train: { [id: number]: IChartDot }, type: ChartValueType, noteId: number, max: { value: number }) {
        const keyCfg = (chartConfig[type] as any)
        const increaseStepNumber = keyCfg.increaseTime / keyCfg.timeStepMinutes; //1
        const flatStepNumber = keyCfg.flatTime / keyCfg.timeStepMinutes; //1
        const decreaseStepNumber = keyCfg.decreaseTime / keyCfg.timeStepMinutes; //4
        const breadUnitsValue = this.props.noteList[noteId].breadUnits; //200
        const breadUnitsIncStepValue = breadUnitsValue / increaseStepNumber; //200
        const breadUnitsDecStepValue = breadUnitsValue / decreaseStepNumber; //50
        let clearCurrentY = chartConfig[type].boxHeight; //250
        let currentTime = dot.x; //100
        for (let i = 0; i < increaseStepNumber; i++) {
            let nextTime = currentTime + this.getIncreaseTime(ChartValueType.INSULIN);
            let nextTrainValue = train[nextTime] && train[nextTime].y ? train[nextTime].y : 0;
            let nextY = breadUnitsIncStepValue;
            train[nextTime] = {
                id: nextTime,
                y: clearCurrentY - nextY,
                x: nextTime
            }
            currentTime = nextTime;
            clearCurrentY = clearCurrentY - nextY;
            max.value = train[nextTime].y > max.value ? train[nextTime].y : max.value
        };
    }

    reCalculateInsulinYValue(number: number, max: { value: number }, type: ChartValueType) {
        return ((chartConfig[type].boxHeight - this.generalPadding) / max.value) * number + this.initialPadding + chartConfig[type].axisWidth / 2;
    }

    reCalculateBreadUnitsYValue(number: number, max: { value: number }, type: ChartValueType) {
        return ((chartConfig[type].boxHeight - this.generalPadding) / max.value) * number + 2 * this.initialPadding + chartConfig[type].axisWidth / 2;
    }

    reCalculateXValue(number: number, type: ChartValueType) {
        return number * (chartConfig[type].boxWidth) / chartConfig[type].boxWidth + this.initialPadding;
    }

    getIncreaseTime(type: ChartValueType) {
        let adaptedTimeStep = chartConfig.glucose.timeStepMinutes;
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
