import React from 'react'
import { connect } from 'react-redux';
import { IAppState } from '../../model/IAppState';
import { Dispatch, Action } from 'redux';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import { INoteList, INoteListByDay } from '../../model/INoteList';
import { LinearGradient } from 'expo-linear-gradient';
import { ThemeColor } from '../../constant/ThemeColor';
import { shadowOptions } from '../../constant/shadowOptions';
import { ChartAxisType, ChartValueType, ChartPeriodType, IChartConfiguration, ChartAveragePeriodType } from '../../model/IChart';
import { NoteListSelector } from '../../store/selector/NoteListSelector';
import { Hat } from '../../component/hat/Hat';
import { NavigationScreenProp, NavigationState, NavigationParams } from 'react-navigation';
import { ChartSettings } from '../../view/chart/chart-settings/ChartSettings';
import { ChartWrap } from '../../view/chart/chart-wrap/ChartWrap';
import { PolylineType } from '../../view/chart/chart-svg/ChartPolyline';
import { ChartPopup } from '../../view/chart/chart-popup/ChartPopup';
import { DateHelper } from '../../utils/DateHelper';
import { getArrayAverage } from '../../calculation-services/chart-calculation-services/ChartCalculationHelper';

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
    glucoseAverageShown?: boolean
}

class ChartWithSettings extends React.PureComponent<ChartWithSettingsProps, ChartWithSettingsState> {
    state = {
        currentDate: new Date(
            new Date().getFullYear(),
            new Date().getMonth(),
            new Date().getDate()
        ),
        selectedPeriod: ChartPeriodType.DAY,
        selectedAveragePeriod: ChartAveragePeriodType.MONTH,
        selectedDotId: null,
        popupShown: false,
        glucoseAverageShown: false,
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
                            onChangingAveragePeriod={this.onChangingAveragePeriod}
                            selectedPeriod={this.state.selectedPeriod}
                            selectedAveragePeriod={this.state.selectedAveragePeriod}
                            glucoseAverageShown={this.state.glucoseAverageShown}
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
                    dateTitle={this.getChartPopupTitle()}
                    shown={this.state.popupShown}
                    onClose={this.onPopupClose}
                    note={this.getNoteForChartPopup()}
                />
            </View>
        )
    }

    getHatTitle() {
        switch (this.state.selectedPeriod) {
            case ChartPeriodType.DAY:
                return 'Дневной график'
            case ChartPeriodType.MONTH:
                return 'Месячный график'
            case ChartPeriodType.THREE_MONTH:
                return 'Три месяца'
        }
    }

    getChartPopupTitle() {
        switch (this.state.selectedPeriod) {
            case ChartPeriodType.DAY:
                return this.state.currentDate
            case ChartPeriodType.MONTH:
                return new Date(this.state.selectedDotId)
        }
    }

    renderNetXTitles() {
        let highlightsNumber;
        let highlightsTitles = [];
        let newWidth = chartConfig.breadUnits.boxWidth - 3 * chartConfig.breadUnits.basicPadding;
        let titleWidth;
        switch (this.state.selectedPeriod) {
            case ChartPeriodType.DAY:
                highlightsNumber = 10;
                highlightsTitles = [0, 3, 6, 9, 12, 15, 18, 21, 24];
                newWidth = chartConfig.breadUnits.boxWidth;
                titleWidth = 20;
                return <View
                    style={{
                        ...styles.highightTitlesView,
                        width: newWidth + 5,
                        // paddingLeft: 3,
                        paddingRight: 3
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
            case ChartPeriodType.MONTH:
                switch (DateHelper.getMaxDateOfDifferentMonth(this.state.currentDate, 0)) {
                    case 31:
                    case 30:
                        highlightsNumber = 7;
                        highlightsTitles = [0, 5, 10, 15, 20, 25, 30];
                        newWidth = chartConfig.breadUnits.boxWidth;
                        titleWidth = 20;
                        return <View
                            style={{
                                ...styles.highightTitlesView,
                                width: newWidth + 5,
                                paddingRight: DateHelper.getMaxDateOfDifferentMonth(this.state.currentDate, 0) === 30 ?
                                    3 :
                                    12
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
                    case 28:
                    case 29:
                        highlightsNumber = 6;
                        highlightsTitles = [0, 5, 10, 15, 20, 25];
                        newWidth = chartConfig.breadUnits.boxWidth;
                        titleWidth = 20;
                        return <View
                            style={{
                                ...styles.highightTitlesView,
                                width: newWidth + 5,
                                paddingRight: DateHelper.getMaxDateOfDifferentMonth(this.state.currentDate, 0) === 28 ?
                                    36 :
                                    45
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
        if (this.state.selectedPeriod === ChartPeriodType.MONTH && period === ChartPeriodType.DAY) {
            if (this.state.currentDate.getTime() > DateHelper.today()) {
                toStateSet.currentDate = new Date(DateHelper.today());
            }
        } else if (this.state.selectedPeriod === ChartPeriodType.DAY && period === ChartPeriodType.MONTH) {
            toStateSet.currentDate = DateHelper.getDifferentMonthDate(this.state.currentDate, 0)
        }
        this.setState(toStateSet)
    }

    onChangingAveragePeriod = (averagePeriod: ChartAveragePeriodType) => {
        let toStateSet: any = { selectedAveragePeriod: averagePeriod };
        if (averagePeriod === ChartAveragePeriodType.MONTH) { //TODO:
            // toStateSet.currenDate =    
        }
        this.setState(toStateSet)
    }
    getNoteForChartPopup() {
        switch (this.state.selectedPeriod) {
            case ChartPeriodType.DAY:
                return this.props.noteList[this.state.selectedDotId]
            case ChartPeriodType.MONTH:
                const dayNotes = this.props.noteListByDay[this.state.selectedDotId];
                let glucoseArray = [];
                let breadUnitsArray = [];
                let insulinArray = [];
                let longInsulinArray = [];
                dayNotes && Object.keys(dayNotes) && Object.keys(dayNotes).map(noteId => {
                    dayNotes[noteId].glucose && glucoseArray.push(dayNotes[noteId].glucose);
                    dayNotes[noteId].breadUnits && breadUnitsArray.push(dayNotes[noteId].breadUnits);
                    dayNotes[noteId].insulin && insulinArray.push(dayNotes[noteId].insulin);
                    dayNotes[noteId].longInsulin && longInsulinArray.push(dayNotes[noteId].longInsulin);
                })
                return {
                    glucose: Math.round(getArrayAverage(glucoseArray) * 10) / 10,
                    breadUnits: Math.round(getArrayAverage(breadUnitsArray) * 10) / 10,
                    insulin: Math.round(getArrayAverage(insulinArray) * 10) / 10,
                    longInsulin: Math.round(getArrayAverage(longInsulinArray) * 10) / 10,
                    date: this.state.selectedDotId
                }
        }
    }

    onPopupClose = () => {
        this.setState({
            popupShown: false,
            selectedDotId: null
        })
    }
}

export const ChartWithSettingsConnect = connect(
    (state: IAppState) => ({
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
