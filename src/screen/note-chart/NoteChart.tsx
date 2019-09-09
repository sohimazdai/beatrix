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
import { Header } from '../../component/header/Header';
import { Hat } from '../../component/hat/Hat';
import { NavigationScreenProp, NavigationState, NavigationParams } from 'react-navigation';

export interface NoteChartProps {
    noteListByDay: INoteListByDay
    noteList: INoteList
    navigation: NavigationScreenProp<NavigationState, NavigationParams>
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

const TIME_STEP_MINUTES = 5;

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
    timeStepMinutes: TIME_STEP_MINUTES,
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
    timeStepMinutes: TIME_STEP_MINUTES,
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
    timeStepMinutes: TIME_STEP_MINUTES,
}

const longInsulinConfig: IChartConfiguration = {
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
    timeStepMinutes: TIME_STEP_MINUTES,
}

const chartConfig: { [id: string]: IChartConfiguration } = {
    glucose: glucoseConfig,
    breadUnits: breadUnitsConfig,
    insulin: insulinConfig,
    longInsulin: longInsulinConfig,

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

    componentWillMount() {
        console.log('!!!! START !!!!',
            { config: chartConfig.glucose }
        )
    }

    get generalPadding() {
        return chartConfig.glucose.arrowSize * 3;
    }

    get initialPadding() {
        return chartConfig.glucose.arrowSize;
    }

    componentWillUnmount() {
        console.log('!!!! END !!!!')
    }

    render() {
        const glucoseChartDots = this.getGlucoseChartDots(this.getBaseChartDots(ChartValueType.GLUCOSE));
        // console.log('!!!!boxWidth', chartConfig.glucose.boxWidth)
        console.log('!!!!glucoseChartDots', glucoseChartDots.dots)

        // const breadUnitsChartDots = this.getBreadUnitsPolylinePath(this.getBaseChartDots(ChartValueType.BREAD_UNITS));
        // console.log('!!!!breadUnitsChartDots', breadUnitsChartDots)
        const insulinChartDots = this.getInsulinPolylinePath(this.getBaseChartDots(ChartValueType.INSULIN));
        console.log('!!!!insulinChartDots', insulinChartDots)
        const longInsulinChartDots = this.getBaseChartDots(ChartValueType.LONG_INSULIN);
        return (
            <View style={styles.view}>
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
                                {/* <ChartPolyline
                                    polylineType={PolylineType.GRADIENTED}
                                    dots={breadUnitsChartDots}
                                    withGradient
                                /> */}
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
                <Hat
                    onBackPress={this.props.navigation.goBack}
                />
            </View>
        )
    }

    getScaledX(date: number, valueKey: ChartValueType) {
        const beforeToday = new Date(
            this.state.currentStartDate.getFullYear(),
            this.state.currentStartDate.getMonth(),
            this.state.currentStartDate.getDate()
        ).getTime();
        const xRelativity = (chartConfig[valueKey].boxWidth) / (1000 * 60 * 60 * 24);
        return (date - beforeToday) * xRelativity;
    }

    getScaledY(valueKey: ChartValueType, chartData, y): number {
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

    getBaseChartData(currentDayNotes: INoteList, valueKey: ChartValueType) {
        let chartDots: IChartDot[] = [];
        let values = Object.keys(currentDayNotes).map(noteId => currentDayNotes[noteId][valueKey]);
        let maxValue = values.length ? Math.max(...values) : 0;
        let minValue = values.length ? Math.min(...values) : 0;
        Object.keys(currentDayNotes).map(noteId => {
            let dot: IChartDot = { x: 0, y: 0, id: parseInt(noteId) };
            dot.x = this.getScaledX((currentDayNotes[noteId] as INoteListNote).date, valueKey);
            dot.y = this.getScaledY(valueKey, { maxValue, minValue }, (currentDayNotes[noteId] as INoteListNote)[valueKey]);
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

    getBaseChartDots(valueKey: ChartValueType) {
        const { noteListByDay } = this.props;
        let baseChartData: {
            maxValue?: number,
            minValue?: number,
            dots?: IChartDot[],
        } = {};
        const currentDayNotes: INoteList = noteListByDay[this.state.currentStartDate.getTime()] || {};
        if (Object.keys(currentDayNotes).length) {
            baseChartData = this.getBaseChartData(currentDayNotes, valueKey);
        } else {
            baseChartData.dots = [];
        }
        return baseChartData;
    }

    getGlucoseChartDots(data: {
        maxValue?: number,
        minValue?: number,
        dots?: IChartDot[],
    }) {
        let dots: IChartDot[] = data.dots.map(dot => this.padd(ChartValueType.GLUCOSE, dot));;
        return {
            maxValue: data.maxValue,
            minValue: data.minValue,
            dots
        };
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

    getInsulinPolylinePath(data: {
        maxValue?: number,
        minValue?: number,
        dots?: IChartDot[],
    }) {
        const chartData = { ...data }
        const dots = chartData.dots;
        const insulinTrain: { [id: number]: IChartDot } = {};
        dots.map((dot: IChartDot, index: number) => {
            const initDot = {
                x: this.getApproximatedTime(dot.x),
                y: 0,
                id: dot.id
            }
            const noteId = dot.id;

            if (this.props.noteList[noteId].insulin) {

                insulinTrain[this.getApproximatedTime(dot.x)] = {
                    x: this.getApproximatedTime(dot.x),
                    y: insulinTrain[this.getApproximatedTime(dot.x)] ? insulinTrain[this.getApproximatedTime(dot.x)].y : 0,
                    id: dot.id
                }
                this.getInsulinDotEffect(initDot, insulinTrain, ChartValueType.INSULIN, noteId, chartData);
            }
        })
        let result: IChartDot[] = this.adaptAndGetPolylineChartDots(ChartValueType.INSULIN, insulinTrain, chartData)
        return result;
    }

    getApproximatedTime(time: number) {
        return Math.round(time / chartConfig.glucose.timeStepMinutes * 2) * chartConfig.glucose.timeStepMinutes / 2;
    }

    getInsulinDotEffect(dot: IChartDot, train: { [id: number]: IChartDot }, type: ChartValueType, noteId: number, chartData: any) {
        const cfg = chartConfig[type],
            originalNote = this.props.noteList[dot.id],
            increaseStepNumber = cfg.increaseTime / cfg.timeStepMinutes,
            flatStepNumber = cfg.flatTime / cfg.timeStepMinutes,
            decreaseStepNumber = cfg.decreaseTime / cfg.timeStepMinutes,
            increaseStepValue = originalNote[type] / increaseStepNumber,
            decreaseStepValue = originalNote[type] / decreaseStepNumber;
        let currentTime = dot.x,
            currentClearValue = 0;

        for (let i = 0; i < increaseStepNumber; i++) {
            let nextTime = currentTime + this.getApproximatedTime(this.getIncreaseTime(type)),
                nextTrainValue = train[nextTime] && train[nextTime].y ?
                    train[nextTime].y :
                    0,
                nextClearValue = currentClearValue + increaseStepValue;
            train[nextTime] = {
                y: nextClearValue + nextTrainValue,
                x: nextTime,
                id: nextTime
            };

            currentClearValue = nextClearValue;
            currentTime = nextTime;
            chartData.maxValue = (currentClearValue + nextTrainValue) > chartData.maxValue ? currentClearValue + nextTrainValue : chartData.maxValue;
        }
        for (let i = 0; i < flatStepNumber; i++) {
            let nextTime = currentTime + this.getApproximatedTime(this.getIncreaseTime(type)),
                nextTrainValue = train[nextTime] && train[nextTime].y ?
                    train[nextTime].y :
                    0,
                nextClearValue = currentClearValue;
            train[nextTime] = {
                y: nextClearValue + nextTrainValue,
                x: nextTime,
                id: nextTime
            };

            currentClearValue = nextClearValue;
            currentTime = nextTime;
            chartData.maxValue = (currentClearValue + nextTrainValue) > chartData.maxValue ? currentClearValue + nextTrainValue : chartData.maxValue
        }
        for (let i = 0; i < decreaseStepNumber; i++) {
            let nextTime = currentTime + this.getApproximatedTime(this.getIncreaseTime(type)),
                nextTrainValue = train[nextTime] && train[nextTime].y ?
                    train[nextTime].y :
                    0,
                nextClearValue = currentClearValue - decreaseStepValue;
            train[nextTime] = {
                y: nextClearValue + nextTrainValue,
                x: nextTime,
                id: nextTime
            };

            currentClearValue = nextClearValue;
            currentTime = nextTime;
            chartData.maxValue = (currentClearValue + nextTrainValue) > chartData.maxValue ? currentClearValue + nextTrainValue : chartData.maxValue
        }
    }

    getIncreaseTime(type: ChartValueType) {
        const minutesOfDay = 60 * 24;
        const step = (chartConfig[type].boxWidth / minutesOfDay) * chartConfig[type].timeStepMinutes;
        return step;
    }

    adaptAndGetPolylineChartDots(type, train, chartData) {
        const cfg = chartConfig[type]
        let result: IChartDot[] = [];

        Object.keys(train).map(id => {
            const yScale = (cfg.boxHeight / chartData.maxValue)
            result.push(this.padd(type, {
                y: train[id].y * yScale,
                x: train[id].x,
                id: (id as any)
            }));
        })
        return result;
    };

    padd(type: ChartValueType, dot: IChartDot) {
        const cfg = chartConfig[type];
        const xRelativity = (cfg.boxWidth - this.generalPadding) / cfg.boxWidth;
        const yRelativity = (cfg.boxHeight - this.generalPadding) / cfg.boxHeight;
        return {
            y: dot.y * yRelativity + this.initialPadding,
            x: dot.x * xRelativity + this.initialPadding,
            id: dot.id
        }
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
        paddingTop: 80,
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
