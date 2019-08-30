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
        console.log(glucoseChartDots)
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
                                {...chartConfig.glucose}
                            >
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

                                {/* <ChartDot
                                    onPress={() => Alert.alert('Clicked! Huray!1')}
                                    r={10}
                                    x={20}
                                    y={55}
                                />
                                <ChartDot
                                    onPress={() => Alert.alert('Clicked! Huray!1')}
                                    r={10}
                                    x={980}
                                    y={980}
                                />
                                <ChartAxis
                                    end={{ x: 900, y: 100 }}
                                    start={{ x: 100, y: 100 }}
                                    axisType={ChartAxisType.OX}
                                    color={chartConfig.axisColor}
                                    width={chartConfig.axisWidth}
                                    arrowSize={chartConfig.arrowSize}
                                /> */}
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

    getChartDots(key: ChartValueType) {
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
                values.push((currentDayNotes[index] as INoteListNote)[key])
            })
        };
        chartData.maxValue = values.length ? Math.max(...values) : 0;
        chartData.minValue = values.length ? Math.min(...values) : 0;
        chartData.dots = values.length ? this.getChartDotsByNoteListSection(chartData, currentDayNotes, key) : [];
        return chartData;
    }

    getChartDotsByNoteListSection(data, section: INoteList, key: ChartValueType) {
        let chartDots: IChartDot[] = [];
        Object.keys(section).map(noteId => {
            let dot: IChartDot = { x: 0, y: 0, id: parseInt(noteId) };
            dot.x = ((section[noteId] as INoteListNote).date - this.getClearXDate()) * this.getXRelativity(key);
            dot.y = this.getY(key, data, (section[noteId] as INoteListNote)[key]);
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

    getXRelativity(key: ChartValueType) {
        switch (this.state.mode) {
            case NoteChartMode.DAY:
                const dayInMS = 1000 * 60 * 60 * 24;
                return chartConfig[key].boxWidth / dayInMS;
        }
    }

    getY(key: ChartValueType, chartData, y): number { //y = 5
        const min = chartData.minValue > chartConfig[key].yPadding ?
            chartData.minValue - chartConfig[key].yPadding :
            0; //1
        const max = chartData.maxValue + chartConfig[key].yPadding; //9
        const range = max - min; //8
        const relativity = chartConfig[key].boxHeight / range // 320/8 = 40
        const resultY = (y - min) * relativity; // (5 - 1) * 40
        return resultY
    }

    getAxisDots(key: ChartValueType, type: ChartAxisType) {
        const start: { x: number, y: number, id: number } = {x: 0, y: 0, id: 0};
        const end: { x: number, y: number, id: number } = {x: 0, y: 0, id: 1};
        if (type === ChartAxisType.OY) {
            start.x = chartConfig[key].arrowSize;
            start.y = chartConfig[key].boxHeight - chartConfig[key].arrowSize;
            end.x = chartConfig[key].arrowSize;
            end.y = chartConfig[key].arrowSize;
        } else if (type === ChartAxisType.OX) {
            start.x = chartConfig[key].arrowSize;
            start.y = chartConfig[key].boxHeight - chartConfig[key].arrowSize;
            end.x = chartConfig[key].boxWidth - chartConfig[key].arrowSize;
            end.y = chartConfig[key].boxHeight - chartConfig[key].arrowSize;
        }
        return { start, end }
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
