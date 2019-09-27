import React from 'react'
import { connect } from 'react-redux';
import { AppState } from '../../model/AppState';
import { Dispatch, Action } from 'redux';
import { StyleSheet, View, Text, Alert, Dimensions } from 'react-native';
import { INoteList, INoteListByDay, INoteListNote } from '../../model/INoteList';
import { LinearGradient } from 'expo-linear-gradient';
import { ThemeColor } from '../../constant/ThemeColor';
import { shadowOptions } from '../../constant/shadowOptions';
import { ChartAxisType, IChartDot, ChartValueType, ChartPeriodType, IChartConfiguration } from '../../model/IChart';
import { NoteListSelector } from '../../store/selector/NoteListSelector';
import { Hat } from '../../component/hat/Hat';
import { NavigationScreenProp, NavigationState, NavigationParams } from 'react-navigation';
import { ChartSettings } from '../../view/chart/chart-settings/ChartSettings';
import { ChartWrap } from '../../view/chart/chart-wrap/ChartWrap';
import { PolylineType } from '../../view/chart/chart-svg/ChartPolyline';
import { ChartPopup } from '../../view/chart/chart-popup/ChartPopup';

const TIME_STEP_MINUTES = 5;
const BASIC_PADDING = 5;
const DOT_RADIUS = 5;
const WIDTH = Dimensions.get("screen").width * 0.85;

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
    horizontalLineNumber: 6,
    axisTypes: [
        ChartAxisType.OX,
        ChartAxisType.OY
    ],
    polylineType: PolylineType.BEZIER
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
    horizontalLineNumber: 3,
    initGradientColor: '#7C89FF',
    stopGradientColor: '#7C3869',
    axisTypes: [
        ChartAxisType.OX_UPSIDE,
        ChartAxisType.OY_REVERSE,
    ],
    paddingTop: true,
    polylineType: PolylineType.REGULAR
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
    horizontalLineNumber: 3,
    initGradientColor: '#FF4D00',
    stopGradientColor: '#F0EC91',
    axisTypes: [
        ChartAxisType.OX,
        ChartAxisType.OY
    ],
    paddingBottom: true,
    polylineType: PolylineType.REGULAR
}

const chartConfig: { [id: string]: IChartConfiguration } = {
    glucose: glucoseConfig,
    breadUnits: breadUnitsConfig,
    insulin: insulinConfig,
}
export interface ChartWithSettingsProps {
    noteListByDay: INoteListByDay
    noteList: INoteList
    navigation: NavigationScreenProp<NavigationState, NavigationParams>
}

export interface ChartWithSettingsState {
    currentDate: Date,
    selectedDotId: number,
    selectedPeriod: ChartPeriodType,
    popupShown?: boolean,
}

class ChartWithSettings extends React.PureComponent<ChartWithSettingsProps, ChartWithSettingsState> {
    state = {
        currentDate: new Date(
            new Date().getFullYear(),
            new Date().getMonth(),
            new Date().getDate()
        ),
        selectedPeriod: ChartPeriodType.DAY,
        selectedDotId: null,
        popupShown: false
    }

    get generalPadding() {
        return chartConfig.glucose.basicPadding * 3;
    }

    get initialPadding() {
        return chartConfig.glucose.basicPadding;
    }

    render() {
        const chartsToRender = [
            ChartValueType.INSULIN,
            ChartValueType.GLUCOSE,
            ChartValueType.BREAD_UNITS
        ];
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
                            {chartsToRender.map(type => {
                                return <ChartWrap
                                    key={type}
                                    type={type}
                                    config={chartConfig[type]}
                                    selectedPeriod={this.state.selectedPeriod}
                                    selectedDotId={this.state.selectedDotId}
                                    currentDate={this.state.currentDate}
                                    noteList={this.props.noteList}
                                    noteListByDay={this.props.noteListByDay}
                                    onDotPress={this.onDotPress}
                                />
                            })}
                            {this.renderNetXTitles()}
                        </LinearGradient>
                    </View>
                    <View style={styles.settingsView}>
                        <ChartSettings
                            onDateChange={this.onCurrentDateChange}
                            date={this.state.currentDate}
                            onChangingPeriod={this.onChangingPeriod}
                            selectedPeriod={this.state.selectedPeriod}
                        />
                    </View>
                </View>
                <View style={styles.statisticsView}>
                    <Text>
                        Statisctics are here
                    </Text>
                </View>
                <Hat
                    onBackPress={this.props.navigation.goBack}
                    title={this.getHatTitle()}
                />
                <ChartPopup 
                    dateTitle={this.state.currentDate}
                    shown={this.state.popupShown}
                    onClose={this.onPopupClose}
                    note={this.props.noteList[this.state.selectedDotId]}
                />
            </View>
        )
    }

    getHatTitle() {
        switch(this.state.selectedPeriod) {
            case ChartPeriodType.DAY:
                return 'Дневной график'
            case ChartPeriodType.MONTH:
                return 'Месячный график'
            case ChartPeriodType.THREE_MONTH:
                return 'Три месяца'
        }
    }

    renderNetXTitles() {
        switch (this.state.selectedPeriod) {
            case ChartPeriodType.DAY:
                const highlightsNumber = 8;
                const highlightsTitles = [3, 6, 9, 12, 15, 18, 21];
                const newWidth = chartConfig.breadUnits.boxWidth - 3 * chartConfig.breadUnits.basicPadding;
                const titleWidth = newWidth / highlightsNumber;
                return <View
                    style={{
                        ...styles.highightTitlesView,
                        width: newWidth,
                        paddingLeft: titleWidth / 2,
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
        switch (this.state.selectedPeriod) {
            case ChartPeriodType.DAY:
                const axiosName = 'ЧАС';
                return <View style={styles.axisTitleView}>
                    <Text style={styles.axisTitleText}>
                        {axiosName}
                    </Text>
                </View>
        }
    }

    onCurrentDateChange = (date: Date) => {
        this.setState({ currentDate: date })
    }

    onDotPress = (dotId: number) => {
        this.setState({ 
            selectedDotId: dotId,
            popupShown: true
        })
    }

    onChangingPeriod = (period: ChartPeriodType) => {
        let toStateSet: any = { selectedPeriod: period };
        if (period === ChartPeriodType.MONTH) {
            // toStateSet.currentDate = 
        }
        this.setState(toStateSet)
    }

    onPopupClose = () => {
        this.setState({
            popupShown: false,
            selectedDotId: null
        })
    }
}

export const ChartWithSettingsConnect = connect(
    (state: AppState) => ({
        noteListByDay: NoteListSelector.convertFlatNoteListToNoteListByDay(state.noteList),
        noteList: state.noteList,
    }),
    (dispatch: Dispatch<Action>) => ({ dispatch })
)(ChartWithSettings)

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
        justifyContent: 'center',
        alignItems: 'center',

        elevation: 3,
        ...shadowOptions,
    },
    chartWrap: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    yNetTitlesView: {//
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
        color: '#CCCCCC'
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
        color: '#CCCCCC',
        textAlign: 'center',
    },
    axisTitleView: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    yAxisTitleIcon: {//
        position: 'absolute',
        right: -10,
        display: 'flex',
        height: '100%',
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
        width: '100%',
        display: 'flex',

        padding: 20,
        paddingRight: 28,
        paddingBottom: 28,

        justifyContent: 'center',
        alignItems: 'center',
    },
    statisticsView: {
    }
})
