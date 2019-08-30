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

export interface NoteChartProps {
    noteListByDay: INoteListByDay
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
        reversedY: true
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
    }
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
        const insulinChartDots = this.getChartDots(ChartValueType.INSULIN);
        const longInsulinChartDots = this.getChartDots(ChartValueType.LONG_INSULIN);
        console.log(breadUnitsChartDots)
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
                                {insulinChartDots.dots.map(item => {
                                    return <ChartDot
                                        key={item.id}
                                        r={chartConfig.insulin.dotRadius}
                                        onPress={() => Alert.alert(JSON.stringify(item))}
                                        x={item.x}
                                        y={item.y}
                                    />
                                })}
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
            dot.x = ((section[noteId] as INoteListNote).date - this.getClearXDate()) * this.getXRelativity(valueKey) + this.getMargin(valueKey);
            dot.y = this.getY(valueKey, data, (section[noteId] as INoteListNote)[valueKey]);
            dot.y && chartDots.push(dot);
        })
        chartDots.sort((a: IChartDot, b: IChartDot) => a.id - b.id);
        return chartDots;
    }

    getClearXDate() {
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
        const relativity = (chartConfig[valueKey].boxHeight - 2 * this.getMargin(valueKey) ) / range;
        const resultY = chartConfig[valueKey].reversedY ?
            (y - min) * relativity + this.getMargin(valueKey):
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
}

export const NoteChartConnect = connect(
    (state: AppState) => ({
        noteListByDay: NoteListSelector.convertFlatNoteListToNoteListByDay(state.noteList)
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
