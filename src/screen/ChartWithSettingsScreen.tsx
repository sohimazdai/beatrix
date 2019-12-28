import React from 'react'
import { connect } from 'react-redux';
import { IStorage } from '../model/IStorage';
import { Dispatch, Action } from 'redux';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import { INoteList, INoteListByDay } from '../model/INoteList';
import { LinearGradient } from 'expo-linear-gradient';
import { ThemeColor } from '../constant/ThemeColor';
import { shadowOptions } from '../constant/shadowOptions';
import { ChartAxisType, ChartValueType, ChartPeriodType, IChartConfiguration, ChartAveragePeriodType } from '../model/IChart';
import { NoteListSelector } from '../store/selector/NoteListSelector';
import { NavigationScreenProp, NavigationState, NavigationParams } from 'react-navigation';
import { ChartSettings } from '../view/chart/chart-settings/ChartSettings';
import { ChartWrap } from '../view/chart/chart-wrap/ChartWrap';
import { PolylineType } from '../view/chart/chart-svg/ChartPolyline';
import { ChartDotInfoPopup } from '../view/chart/chart-dot-info-popup/ChartDotInfoPopup';
import { DateHelper } from '../utils/DateHelper';
import { getArrayAverage, getWeekDaysNumbers } from '../calculation-services/chart-calculation-services/ChartCalculationHelper';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { BlockHat } from '../component/hat/BlockHat';
import { BottomPopup } from '../component/popup/BottomPopup';
import { AddNoteIcon } from '../component/icon/AddNoteIcon';
import { NoteCreationPopupConnect } from '../view/notes/note-popup/NoteCreationPopup';
import { NoteEditingPopupConnect } from '../view/notes/note-popup/NoteEditingPopup';

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
    noteCreationShown?: boolean,
    noteEditingShown?: boolean,
    editingNoteId?: number
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
        noteCreationShown: false,
        noteEditingShown: false,
        editingNoteId: null
    }

    get generalPadding() {
        return chartConfig.glucose.basicPadding * 3;
    }

    get initialPadding() {
        return chartConfig.glucose.basicPadding;
    }

    render() {
        const { noteCreationShown, noteEditingShown, selectedDotId } = this.state;
        const chartsToRender = [
            ChartValueType.INSULIN,
            ChartValueType.GLUCOSE,
            ChartValueType.BREAD_UNITS
        ];

        return (
            <View style={styles.view}>
                <ScrollView style={styles.scrollView}>
                    <BlockHat
                        title={"График"}
                        additionalTitle={this.getHatTitle()}
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
                </ScrollView>
                {!(selectedDotId || noteCreationShown || noteEditingShown) && <View style={styles.addNoteButtonView}>
                    <TouchableOpacity onPress={() => this.setState({ noteCreationShown: true })}>
                        <View style={styles.addNoteButton}>
                            <Text style={styles.addNoteButtonText}>
                                Записать
                                    </Text>
                            <AddNoteIcon />
                        </View>
                    </TouchableOpacity>
                </View>}
                <ChartDotInfoPopup
                    dateTitle={this.getChartPopupTitle()}
                    shown={this.state.popupShown}
                    onClose={this.onPopupClose}
                    note={this.getNoteForChartPopup()}
                    onEditPress={() => this.setState({
                        editingNoteId: this.state.selectedDotId,
                        noteEditingShown: true
                    })}
                />
                <BottomPopup hidden={!this.state.noteCreationShown}>
                    <NoteCreationPopupConnect
                        onBackPress={() => this.setState({ noteCreationShown: false })}
                    />
                </BottomPopup>
                <BottomPopup hidden={!this.state.noteEditingShown}>
                    <NoteEditingPopupConnect
                        noteId={this.state.editingNoteId}
                        onBackPress={() => this.setState({
                            noteEditingShown: false,
                            editingNoteId: null
                        })}
                    />
                </BottomPopup>
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
        let displayingDate = '';
        if (this.state.selectedDotId === DateHelper.today()) {
            displayingDate = 'Сегодня'
        } else if (this.state.selectedDotId === DateHelper.yesterday()) {
            displayingDate = 'Вчера'
        }
        switch (this.state.selectedPeriod) {
            case ChartPeriodType.DAY:
                if (!displayingDate) {
                    displayingDate = DateHelper.makeDateWithMonthAsString(
                        new Date(this.state.selectedDotId)
                    )
                }
                return displayingDate
            case ChartPeriodType.MONTH:
                if (!displayingDate) {
                    displayingDate = DateHelper.makeDateWithMonthAsString(new Date(this.state.selectedDotId))
                }
                return displayingDate
            case ChartPeriodType.THREE_MONTH:
                displayingDate = DateHelper.makeDateWithMonthAsNumber(new Date(this.state.selectedDotId)) +
                    ' - ' + DateHelper.makeDateWithMonthAsNumber(
                        new Date(DateHelper.getDiffDate(new Date(this.state.selectedDotId), 6))
                    )
                return displayingDate
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
                        highlightsTitles = [1, 5, 10, 15, 20, 25, 30];
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
                            {highlightsTitles.map((title, index) => {
                                return <Text
                                    key={title}
                                    style={{
                                        ...styles.highightTitle,
                                        width: index ?
                                            titleWidth :
                                            9,
                                        paddingLeft: index ?
                                            0 :
                                            4.5,
                                    }}
                                >
                                    {title}
                                </Text>
                            })}
                        </View>
                    case 28:
                    case 29:
                        highlightsNumber = 6;
                        highlightsTitles = [1, 5, 10, 15, 20, 25];
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
                            {highlightsTitles.map((title, index) => {
                                return <Text
                                    key={title}
                                    style={{
                                        ...styles.highightTitle,
                                        width: index ?
                                            titleWidth :
                                            9,
                                        paddingLeft: index ?
                                            0 :
                                            4.5
                                    }}
                                >
                                    {title}
                                </Text>
                            })}
                        </View>
                }
            case ChartPeriodType.THREE_MONTH:
                highlightsNumber = 3;
                highlightsTitles = [-2, -1, 0];
                newWidth = chartConfig.breadUnits.boxWidth;
                titleWidth = 100;
                return <View
                    style={{
                        ...styles.highightTitlesView,
                        width: newWidth + 5,
                    }}
                >
                    {highlightsTitles.map(title => {
                        return <Text
                            key={title}
                            style={{ ...styles.highightTitle, width: titleWidth }}
                        >
                            {DateHelper.getMonthStringCommon(
                                this.state.currentDate.getMonth() + title >= 0 ?
                                    this.state.currentDate.getMonth() + title :
                                    this.state.currentDate.getMonth() + title + 12
                            )}
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
        if (
            (this.state.selectedPeriod === ChartPeriodType.THREE_MONTH ||
                this.state.selectedPeriod === ChartPeriodType.MONTH) && period === ChartPeriodType.DAY
        ) {
            if (this.state.currentDate.getTime() > DateHelper.today()) {
                toStateSet.currentDate = new Date(DateHelper.today());
            }
        } else if (this.state.selectedPeriod === ChartPeriodType.DAY && period === ChartPeriodType.MONTH) {
            toStateSet.currentDate = DateHelper.getDifferentMonthDate(this.state.currentDate, 0)
        }

        if (this.state.selectedPeriod !== period) {
            toStateSet.popupShown = false;
            toStateSet.selectedDotId = null;
        }
        this.setState(toStateSet)
    }

    getNoteForChartPopup() {
        let weekDayNotes = [];
        let dayNotes = {};
        let glucoseArray = [];
        let breadUnitsArray = [];
        let insulinArray = [];
        let longInsulinArray = [];
        switch (this.state.selectedPeriod) {
            case ChartPeriodType.DAY:
                return this.props.noteList[this.state.selectedDotId]
            case ChartPeriodType.MONTH:
                dayNotes = this.props.noteListByDay[this.state.selectedDotId];
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
            case ChartPeriodType.THREE_MONTH:
                weekDayNotes = getWeekDaysNumbers(new Date(this.state.selectedDotId))
                    .map(weekDayNumber => {
                        dayNotes = this.props.noteListByDay[weekDayNumber];
                        dayNotes && Object.keys(dayNotes) && Object.keys(dayNotes).map(noteId => {
                            dayNotes[noteId].glucose && glucoseArray.push(dayNotes[noteId].glucose);
                            dayNotes[noteId].breadUnits && breadUnitsArray.push(dayNotes[noteId].breadUnits);
                            dayNotes[noteId].insulin && insulinArray.push(dayNotes[noteId].insulin);
                            dayNotes[noteId].longInsulin && longInsulinArray.push(dayNotes[noteId].longInsulin);
                        })
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
    (state: IStorage) => ({
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
        backgroundColor: '#F6F8FF'
    },
    scrollView: {
        flex: 1,
        width: '100%',
        height: '100%',
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

        ...shadowOptions,

        overflow: 'hidden'
    },
    chartGradient: {
        width: '100%',

        paddingTop: 20,
        paddingBottom: 25,

        backgroundColor: ThemeColor.LIGHT_BLUE,
        justifyContent: 'center',
        alignItems: 'center',

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
    },
    statisticsViewText: {
        textAlign: 'center',
    },
    addNoteButtonView: {
        position: 'absolute',
        bottom: 20,
        right: 20,

        ...shadowOptions,
    },
    addNoteButton: {
        display: 'flex',
        padding: 5,
        margin: 5,
        paddingLeft: 10,
        paddingRight: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(250,250,250, 1)',
        borderRadius: 30,
        ...shadowOptions
    },
    addNoteButtonText: {
        fontSize: 18,
        color: "#333333",
        marginRight: 5
    }
})