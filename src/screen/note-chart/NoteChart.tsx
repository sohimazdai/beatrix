import React from 'react'
import { connect } from 'react-redux';
import { AppState } from '../../model/AppState';
import { Dispatch, Action } from 'redux';
import { StyleSheet, View, Text, Alert, Dimensions } from 'react-native';
import { INoteList, INoteListByDay, INoteListNote } from '../../model/INoteList';
import { LinearGradient } from 'expo-linear-gradient';
import { ChartBox } from '../../view/chart/chart-box/ChartBox';
import { ChartDot } from '../../view/chart/chart-dot/ChartDot';
import { ThemeColor } from '../../constant/ThemeColor';
import { shadowOptions } from '../../constant/shadowOptions';
import { ChartAxis } from '../../view/chart/chart-axis/ChartAxis';
import { ChartAxisType, IChartDot, ChartValueType, ChartPeriodType, IChartConfiguration } from '../../model/IChart';
import { NoteListSelector } from '../../store/selector/NoteListSelector';
import { ChartPolyline, PolylineType } from '../../view/chart/chart-polyline/ChartPolyline';
import { ChartNet } from '../../view/chart/chart-net/ChartNet';
import { ChartHighlightNet } from '../../view/chart/chart-highlight-net/ChartHighlightNet';
import { Hat } from '../../component/hat/Hat';
import { NavigationScreenProp, NavigationState, NavigationParams } from 'react-navigation';
import { InsulinTextRotated } from '../../component/icon/InsulinTextRotated';
import { GlucoseTextRotated } from '../../component/icon/GlucoseTextRotated';
import { BreadUnitsTextRotated } from '../../component/icon/BreadUnitsTextRotated';


export enum NoteChartMode {
    DAY = 'day',
    MONTH = 'month',
    THREE_MONTH = 'three-month',
}

const TIME_STEP_MINUTES = 15;
const BASIC_PADDING = 5;
const DOT_RADIUS = 5;
const WIDTH = Dimensions.get("screen").width * 0.95;

const glucoseConfig: IChartConfiguration = {
    width: WIDTH,
    height: Dimensions.get("screen").width / 2,
    boxWidth: WIDTH,
    boxHeight: Dimensions.get("screen").width / 2,
    axisWidth: 2,
    axisColor: '#AAAAAA',
    basicPadding: BASIC_PADDING,
    yPadding: 1,
    dotRadius: DOT_RADIUS,
    reversedY: false,
    timeStepMinutes: TIME_STEP_MINUTES,
}

const insulinConfig: IChartConfiguration = {
    width: WIDTH,
    height: Dimensions.get("screen").width / 5,
    boxWidth: WIDTH,
    boxHeight: Dimensions.get("screen").width / 5,
    axisWidth: 2,
    axisColor: '#AAAAAA',
    basicPadding: BASIC_PADDING,
    yPadding: 1,
    dotRadius: DOT_RADIUS,
    reversedY: true,
    increaseTime: 30,
    flatTime: 30,
    decreaseTime: 180,
    timeStepMinutes: TIME_STEP_MINUTES,
}

const breadUnitsConfig: IChartConfiguration = {
    width: WIDTH,
    height: Dimensions.get("screen").width / 5,
    boxWidth: WIDTH,
    boxHeight: Dimensions.get("screen").width / 5,
    axisWidth: 2,
    axisColor: '#AAAAAA',
    basicPadding: BASIC_PADDING,
    yPadding: 1,
    dotRadius: DOT_RADIUS,
    reversedY: false,
    increaseTime: 15,
    flatTime: 15,
    decreaseTime: 90,
    timeStepMinutes: TIME_STEP_MINUTES,
}

const longInsulinConfig: IChartConfiguration = {
    width: WIDTH,
    height: Dimensions.get("screen").width / 3,
    boxWidth: WIDTH,
    boxHeight: Dimensions.get("screen").width / 3,
    axisWidth: 2,
    axisColor: '#AAAAAA',
    basicPadding: BASIC_PADDING,
    yPadding: 1,
    dotRadius: DOT_RADIUS,
    reversedY: false,
    timeStepMinutes: TIME_STEP_MINUTES,
}

const chartConfig: { [id: string]: IChartConfiguration } = {
    glucose: glucoseConfig,
    breadUnits: breadUnitsConfig,
    insulin: insulinConfig,
    longInsulin: longInsulinConfig,

}
export interface NoteChartProps {
    noteListByDay: INoteListByDay
    noteList: INoteList
    navigation: NavigationScreenProp<NavigationState, NavigationParams>
}

export interface NoteChartState {
    currentStartDate: Date,
    currentEndDate: Date,
    mode: NoteChartMode,
    activeDot: IChartDot,
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
        activeDot: null,
    }

    get generalPadding() {
        return chartConfig.glucose.basicPadding * 3;
    }

    get initialPadding() {
        return chartConfig.glucose.basicPadding;
    }

    render() {
        const glucoseChartDots = this.getGlucoseChartDots(this.getBaseChartDots(ChartValueType.GLUCOSE), ChartValueType.GLUCOSE);
        // console.log('!!!!glucoseChartDots', glucoseChartDots.dots)
        const highlightDots = [...glucoseChartDots.dots, ...glucoseChartDots.events];
        // console.log('!!!! highlightDots', highlightDots, glucoseChartDots.dots, glucoseChartDots.events);
        const breadUnitsChartDots = this.getPolylinePath(this.getBaseChartDots(ChartValueType.BREAD_UNITS), ChartValueType.BREAD_UNITS);
        // console.log('!!!!breadUnitsChartDots', breadUnitsChartDots)
        const insulinChartDots = this.getPolylinePath(this.getBaseChartDots(ChartValueType.INSULIN), ChartValueType.INSULIN);
        // console.log('!!!!insulinChartDots', insulinChartDots)
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
                            {/* INSULIN CHART */}
                            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                <ChartBox
                                    config={chartConfig.insulin}
                                    axisTypes={[
                                        ChartAxisType.OX_UPSIDE,
                                        ChartAxisType.OY_REVERSE
                                    ]}
                                >
                                    <ChartNet
                                        dots={glucoseChartDots.dots}
                                        cfg={insulinConfig}
                                        type={ChartPeriodType.DAY}
                                        paddingTop
                                    />
                                    <ChartHighlightNet
                                        dots={highlightDots}
                                        cfg={insulinConfig}
                                        type={ChartPeriodType.DAY}
                                        paddingTop
                                    />
                                    <ChartPolyline
                                        polylineType={PolylineType.REGULAR}
                                        dots={insulinChartDots}
                                        initGradientColor={'#7C89FF'}
                                        stopGradientColor={'#7C3869'}
                                    />
                                </ChartBox>
                                <InsulinTextRotated />
                            </View>
                            {/* GLUCOSE CHART */}
                            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                <ChartBox
                                    config={chartConfig.glucose}
                                    axisTypes={[
                                        ChartAxisType.OX,
                                        ChartAxisType.OY
                                    ]}
                                >
                                    <ChartNet
                                        dots={glucoseChartDots.dots}
                                        maxValue={glucoseChartDots.maxValue}
                                        minValue={glucoseChartDots.minValue}
                                        cfg={glucoseConfig}
                                        type={ChartPeriodType.DAY}
                                        needHorizontalLines
                                    />
                                    <ChartHighlightNet
                                        dots={highlightDots}
                                        maxValue={glucoseChartDots.maxValue}
                                        minValue={glucoseChartDots.minValue}
                                        cfg={glucoseConfig}
                                        type={ChartPeriodType.DAY}
                                    />
                                    <ChartPolyline
                                        polylineType={PolylineType.BEZIER}
                                        dots={glucoseChartDots.dots}
                                    />
                                    {glucoseChartDots.dots.map(item => {
                                        return <ChartDot
                                            key={item.id}
                                            r={chartConfig.glucose.dotRadius}
                                            onPress={() => Alert.alert(JSON.stringify(item))}
                                            x={item.x}
                                            y={item.y}
                                            fill={ThemeColor.BRIGHT_RED}
                                            stroke={ThemeColor.WHITE}
                                        />
                                    })}
                                    {glucoseChartDots.events.map(item => {
                                        return <ChartDot
                                            key={item.id}
                                            r={chartConfig.glucose.dotRadius}
                                            onPress={() => Alert.alert(JSON.stringify(item))}
                                            x={item.x}
                                            y={item.y}
                                            fill={ThemeColor.WHITE}
                                            stroke={ThemeColor.INDIAN_RED}
                                        />
                                    })}
                                </ChartBox>
                                <GlucoseTextRotated />
                            </View>
                            {/* BREAD_UNITS CHART */}
                            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>

                                <ChartBox
                                    config={chartConfig.breadUnits}
                                    axisTypes={[
                                        ChartAxisType.OX,
                                        ChartAxisType.OY
                                    ]}
                                >
                                    <ChartNet
                                        dots={glucoseChartDots.dots}
                                        cfg={insulinConfig}
                                        type={ChartPeriodType.DAY}
                                        paddingBottom
                                    />
                                    <ChartHighlightNet
                                        dots={highlightDots}
                                        cfg={breadUnitsConfig}
                                        type={ChartPeriodType.DAY}
                                        paddingBottom
                                    />
                                    <ChartPolyline
                                        polylineType={PolylineType.REGULAR}
                                        dots={breadUnitsChartDots}
                                        initGradientColor={'#FF4D00'}
                                        stopGradientColor={'#F0EC91'}
                                    />
                                </ChartBox>
                                <BreadUnitsTextRotated />
                            </View>
                            {this.renderNetTitles()}
                            {/* {this.renderAxisName()} */}
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

    renderNetTitles() {
        switch (this.state.mode) {
            case NoteChartMode.DAY:
                const highlightsNumber = 8;
                const highlightsTitles = [3, 6, 9, 12, 15, 18, 21];
                const newWidth = chartConfig.breadUnits.boxWidth - 3 * chartConfig.breadUnits.basicPadding;
                const titleWidth = newWidth / highlightsNumber;
                return <View
                    style={{
                        ...styles.highightTitlesView,
                        width: newWidth,
                        paddingLeft: titleWidth / 2 + chartConfig.breadUnits.basicPadding,
                        paddingRight: titleWidth / 2
                    }}
                >
                    {highlightsTitles.map(title => {
                        return <Text
                            key={title}
                            style={{ ...styles.highightTitle, width: titleWidth }}
                        >
                            {title}
                        </Text>
                    })}
                </View>
        }
    }

    renderAxisName() {
        switch (this.state.mode) {
            case NoteChartMode.DAY:
                const axiosName = 'ЧАС';
                return <View style={styles.axisTitleView}>
                    <Text style={styles.axisTitleText}>
                        {axiosName}
                    </Text>
                </View>
        }
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
            (y - min) * relativity :
            chartConfig[valueKey].boxHeight - (y - min) * relativity;
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
            dot.y = this.getScaledY(valueKey, { maxValue, minValue }, (currentDayNotes[noteId] as INoteListNote)[valueKey]) + this.initialPadding;
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
    }, type: ChartValueType) {
        const { noteList } = this.props;
        let events: IChartDot[] = [];
        let dots: IChartDot[] = [];
        data.dots.map(dot => {
            let current = this.padd(type, dot);
            noteList[dot.id].glucose === 0 ?
                events.push(current) :
                dots.push(current)
        });
        return {
            maxValue: data.maxValue,
            minValue: data.minValue,
            events,
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

    getPolylinePath(data: {
        maxValue?: number,
        minValue?: number,
        dots?: IChartDot[],
    }, type: ChartValueType) {
        const chartData = { ...data }
        const dots = chartData.dots;
        const train: { [id: number]: IChartDot } = {};
        dots.map((dot: IChartDot, index: number) => {
            const initDot = {
                x: dot.x,
                y: 0,
                id: dot.id
            }
            const noteId = dot.id;

            if (this.props.noteList[noteId].insulin) {
                let id = this.getId(dot.x, type);
                train[id] = {
                    x: dot.x,
                    y: train[id] ? train[id].y : 0,
                    id: dot.id
                }
                this.getDotEffect(initDot, train, type, chartData);
            }
        })
        let result: IChartDot[] = this.adaptAndGetPolylineChartDots(type, train, chartData)
        return result;
    }

    getDotEffect(dot: IChartDot, train: { [id: number]: IChartDot }, type: ChartValueType, chartData: any) {
        const cfg = chartConfig[type],
            originalNote = this.props.noteList[dot.id],
            increaseStepNumber = cfg.increaseTime / cfg.timeStepMinutes,
            flatStepNumber = cfg.flatTime / cfg.timeStepMinutes,
            decreaseStepNumber = cfg.decreaseTime / cfg.timeStepMinutes,
            increaseStepValue = originalNote[type] / increaseStepNumber,
            decreaseStepValue = originalNote[type] / decreaseStepNumber,
            timeIncreaseStepValue = this.getIncreaseTime(type);
        let currentTime = dot.x,
            currentClearValue = 0;

        for (let i = 0; i < increaseStepNumber; i++) {
            let nextTime = currentTime + timeIncreaseStepValue,
                id = this.getId(nextTime, type),
                nextTrainValue = train[id] && train[id].y ?
                    train[id].y :
                    0,
                nextClearValue = currentClearValue + increaseStepValue;
            if (nextTime > chartConfig[type].boxWidth) {
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
            chartData.maxValue = (currentClearValue + nextTrainValue) > chartData.maxValue ? currentClearValue + nextTrainValue : chartData.maxValue;
        }
        for (let i = 0; i < flatStepNumber; i++) {
            let nextTime = currentTime + timeIncreaseStepValue,
                id = this.getId(nextTime, type),
                nextTrainValue = train[id] && train[id].y ?
                    train[id].y :
                    0,
                nextClearValue = currentClearValue;
            if (nextTime > chartConfig[type].boxWidth) {
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
            chartData.maxValue = (currentClearValue + nextTrainValue) > chartData.maxValue ? currentClearValue + nextTrainValue : chartData.maxValue
        }
        for (let i = 0; i < decreaseStepNumber; i++) {
            let nextTime = currentTime + timeIncreaseStepValue,
                id = this.getId(nextTime, type),
                nextTrainValue = train[id] && train[id].y ?
                    train[id].y :
                    0,
                nextClearValue = currentClearValue - decreaseStepValue;
            if (nextTime > chartConfig[type].boxWidth) {
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
            chartData.maxValue = (currentClearValue + nextTrainValue) > chartData.maxValue ? currentClearValue + nextTrainValue : chartData.maxValue
        }
    }

    getApproximatedTime(time: number, type: ChartValueType) {
        return Math.round(Math.round(time * this.getIncreaseTime(type)) / this.getIncreaseTime(type));
    }

    getId(time: number, type: ChartValueType) {
        return Math.floor(time / this.getIncreaseTime(type))
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
            const dot = {
                y: train[id].y * yScale,
                x: train[id].x,
                id: (id as any)
            }
            !cfg.reversedY && this.reverse(type, dot)
            result.push(this.padd(type, dot));
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

    reverse(type: ChartValueType, dot: IChartDot) {
        const cfg = chartConfig[type];
        dot.y = cfg.boxHeight - dot.y + cfg.basicPadding + cfg.axisWidth / 2;
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
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
        backgroundColor: ThemeColor.LIGHT_BLUE,

        elevation: 1,
        ...shadowOptions,
    },
    chartView: {
        width: '100%',

        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
        backgroundColor: ThemeColor.LIGHT_BLUE,

        elevation: 2,
        ...shadowOptions,
    },
    chartGradient: {
        width: '100%',

        paddingTop: 80,
        paddingBottom: 25,

        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        borderRadius: 25,
        backgroundColor: ThemeColor.LIGHT_BLUE,

        elevation: 3,
        ...shadowOptions,
    },
    highightTitlesView: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    highightTitle: {
        fontSize: 13,
        color: '#AAAAAA',
        textAlign: 'center',
    },
    axisTitleView: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    axisTitleText: {
        paddingTop: 5,
        paddingRight: 10,

        fontSize: 11,
        fontWeight: 'bold',
        color: '#eee',
    },
    settingsView: {
        padding: 20,
    },
    statisticsView: {
    }
})
