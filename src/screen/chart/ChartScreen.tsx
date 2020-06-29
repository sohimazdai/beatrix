import React from 'react'
import { connect } from 'react-redux';
import { IStorage } from '../../model/IStorage';
import { Dispatch, Action } from 'redux';
import { View, Text } from 'react-native';
import { INoteList, INoteListByDay } from '../../model/INoteList';
import { LinearGradient } from 'expo-linear-gradient';
import { ChartValueType, ChartPeriodType, ChartAveragePeriodType } from '../../model/IChart';
import { convertFlatNoteListToNoteListByDay } from '../../store/selector/NoteListSelector';
import { NavigationScreenProp, NavigationState, NavigationParams } from 'react-navigation';
import { ChartSettings } from '../../view/chart/chart-settings/ChartSettings';
import { ChartWrap } from '../../view/chart/chart-wrap/ChartWrap';
import { ChartDotInfoPopupConnect } from '../../view/chart/chart-dot-info-popup/components/chart-dot-info-popup/ChartDotInfoPopup';
import { DateHelper } from '../../utils/DateHelper';
import { getArrayAverage, getWeekDaysNumbers } from '../../calculation-services/chart-calculation-services/ChartCalculationHelper';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { BlockHat } from '../../component/hat/BlockHat';
import { NoteCreationPopupButtonConnect } from '../../view/notes/note-creation-popup/button/NoteCreationPopupButton';
import { styles } from './Style';
import { ChartConfig } from './config/ChartConfig';
import { appAnalytics } from '../../app/Analytics';
import { InfoIcon } from '../../component/icon/InfoIcon';
import { ModalType } from '../../model/IModal';
import { createModalChangeAction } from '../../store/modules/modal/ModalActionCreator';
import { IUserDiabetesProperties } from '../../model/IUserDiabetesProperties';
import { Measures } from '../../localisation/Measures';
import { i18nGet } from '../../localisation/Translate';
import { createChangeInteractive } from '../../store/modules/interactive/interactive';

export interface ChartProps {
    noteListByDay: INoteListByDay
    noteList: INoteList
    navigation: NavigationScreenProp<NavigationState, NavigationParams>
    userDiabetesProperties: IUserDiabetesProperties
    onInfoPress: (chartPeriodType: ChartPeriodType) => void
    clearSelectedPeriod: () => void
}

export interface ChartState {
    currentDate: Date,
    selectedDotId: string,
    selectedPeriod: ChartPeriodType,
    popupShown?: boolean,
    glucoseAverageShown?: boolean
    noteCreationShown?: boolean,
    editingNoteId?: number
}

class Chart extends React.Component<ChartProps, ChartState> {
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
        editingNoteId: null
    }

    componentWillUnmount() {
        this.props.clearSelectedPeriod()
    }

    get chartConfig() {
        return new ChartConfig().getConfigs();
    }

    get generalPadding() {
        return this.chartConfig.glucose.basicPadding * 3;
    }

    get initialPadding() {
        return this.chartConfig.glucose.basicPadding;
    }

    componentDidMount() {
        appAnalytics.sendEventWithProps(
            appAnalytics.events.CHARTS_SEEN,
            { period: 'day' }
        );
    }

    componentDidUpdate({ }, prevState: ChartState) {
        if (this.state.selectedPeriod !== prevState.selectedPeriod) {
            switch (this.state.selectedPeriod) {
                case ChartPeriodType.DAY:
                    appAnalytics.sendEventWithProps(
                        appAnalytics.events.CHARTS_SEEN,
                        { period: 'day' }
                    );
                    return;
                case ChartPeriodType.MONTH:
                    appAnalytics.sendEventWithProps(
                        appAnalytics.events.CHARTS_SEEN,
                        { period: 'month' }
                    );
                    return;
                case ChartPeriodType.THREE_MONTH:
                    appAnalytics.sendEventWithProps(
                        appAnalytics.events.CHARTS_SEEN,
                        { period: '3 month' }
                    );
                    return;
            }
        }
        if (this.state.selectedDotId !== prevState.selectedDotId) {
            appAnalytics.sendEventWithProps(
                appAnalytics.events.CHART_DOT_SELECTED,
                { selectedPeriod: this.state.selectedPeriod }
            );
        }
        if (this.state.currentDate !== prevState.currentDate) {
            appAnalytics.sendEventWithProps(
                appAnalytics.events.ANOTHER_CHART_DATE_SEEN,
                { selectedPeriod: this.state.selectedPeriod }
            );
        }
    }

    render() {
        const { navigation } = this.props;

        return (
            <View style={styles.view}>
                <BlockHat
                    onBackPress={() => navigation.navigate('Dashboard')}
                    title={i18nGet('charts')}
                    rightSideSlot={this.getHatTitle()}
                />
                <View style={styles.scrollViewWrapWrap}>
                    <View style={styles.scrollViewWrap}>
                        <ScrollView style={styles.scrollView}>
                            <View
                                style={styles.ChartView}
                            >
                                {this.renderChart()}
                                <View style={styles.settingsViewWrap}>
                                    {this.renderSettings()}
                                </View>
                            </View>
                        </ScrollView>
                    </View>
                </View>
                {!this.state.popupShown && <View style={styles.addNoteButtonView}>
                    <NoteCreationPopupButtonConnect />
                </View>}
            </View>
        )
    }

    renderChart() {
        const chartsToRender = [
            ChartValueType.INSULIN,
            ChartValueType.GLUCOSE,
            ChartValueType.BREAD_UNITS
        ];

        const { userDiabetesProperties, userDiabetesProperties: { glycemiaMeasuringType } } = this.props;

        return (
            <View style={styles.chartView}>
                <LinearGradient
                    colors={['#003653', '#3E2626']}
                    style={styles.chartGradient}
                >
                    {chartsToRender.map(type => {
                        return <ChartWrap
                            key={type}
                            type={type}
                            config={this.chartConfig[type]}
                            currentDate={this.state.currentDate}
                            noteList={this.props.noteList}
                            noteListByDay={this.props.noteListByDay}
                            onDotPress={this.onDotPress}
                            minCritical={Measures.getCriticalGlycemiaForChart(glycemiaMeasuringType).min}
                            maxCritical={Measures.getCriticalGlycemiaForChart(glycemiaMeasuringType).max}
                        />
                    })}
                    {this.renderNetXTitles()}
                </LinearGradient>
            </View>
        )
    }

    renderSettings() {
        return (
            <View style={styles.settingsView}>
                <ChartSettings
                    onDateChange={this.onCurrentDateChange}
                    date={this.state.currentDate}
                />
            </View>
        )
    }

    getHatTitle() {
        const { onInfoPress } = this.props;
        const { selectedPeriod } = this.state;

        let title = ""
        switch (selectedPeriod) {
            case ChartPeriodType.DAY:
                title = i18nGet('chart_period_day');
                break;
            case ChartPeriodType.MONTH:
                title = i18nGet('chart_period_month');
                break;
            case ChartPeriodType.THREE_MONTH:
                title = i18nGet('chart_period_three_month');
                break;
        }

        return (
            <View style={styles.headerTitleRightSide}>
                <Text style={styles.rightTitle}>
                    {title}
                </Text>
                <TouchableOpacity
                    style={styles.headerTouchable}
                    onPress={() => onInfoPress(selectedPeriod)}
                >
                    <InfoIcon />
                </TouchableOpacity>
            </View>
        )
    }

    getChartPopupTitle() {
        const { selectedPeriod } = this.state;

        let displayingDate = '';
        let selectedDotId = this.state.selectedDotId;

        switch (selectedPeriod) {
            case ChartPeriodType.DAY:
                const note = this.props.noteList[selectedDotId];
                displayingDate = note && DateHelper.makeTimewithDateWithMonthAsString(new Date(note.date));
                return displayingDate
            case ChartPeriodType.MONTH:
                selectedDotId = Number(selectedDotId);
                if (selectedDotId === DateHelper.today()) {
                    return i18nGet('chart_today');
                }
                if (selectedDotId === DateHelper.yesterday()) {
                    return i18nGet('chart_yesterday');
                }
                displayingDate = DateHelper.makeDateWithMonthAsString(new Date(selectedDotId))
                return displayingDate
            case ChartPeriodType.THREE_MONTH:
                selectedDotId = Number(selectedDotId);
                displayingDate = DateHelper.makeDateWithMonthAsNumber(new Date(selectedDotId)) +
                    ' - ' + DateHelper.makeDateWithMonthAsNumber(
                        new Date(DateHelper.getDiffDate(new Date(selectedDotId), 6))
                    )
                return displayingDate
        }
    }

    renderNetXTitles() {
        let highlightsNumber;
        let highlightsTitles = [];
        let newWidth = this.chartConfig.breadUnits.boxWidth - 3 * this.chartConfig.breadUnits.basicPadding;
        let titleWidth;
        switch (this.state.selectedPeriod) {
            case ChartPeriodType.DAY:
                highlightsNumber = 10;
                highlightsTitles = [0, 3, 6, 9, 12, 15, 18, 21, 24];
                newWidth = this.chartConfig.breadUnits.boxWidth;
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
                        newWidth = this.chartConfig.breadUnits.boxWidth;
                        titleWidth = 20;
                        return (
                            <View
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
                        )
                    case 28:
                    case 29:
                        highlightsNumber = 6;
                        highlightsTitles = [1, 5, 10, 15, 20, 25];
                        newWidth = this.chartConfig.breadUnits.boxWidth;
                        titleWidth = 20;
                        return (
                            <View
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
                        )
                }
            case ChartPeriodType.THREE_MONTH:
                highlightsNumber = 3;
                highlightsTitles = [-2, -1, 0];
                newWidth = this.chartConfig.breadUnits.boxWidth;
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

    onCurrentDateChange = (date: Date) => {
        this.setState({ currentDate: date })
    }

    onDotPress = (dotId: string) => {
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
        let dayNotes: INoteList = {};
        let glucoseArray = [];
        let breadUnitsArray = [];
        let insulinArray = [];
        let longInsulinArray = [];
        switch (this.state.selectedPeriod) {
            case ChartPeriodType.DAY:
                return this.props.noteList[this.state.selectedDotId]
            case ChartPeriodType.MONTH:
                dayNotes = this.props.noteListByDay[this.state.selectedDotId];
                dayNotes && Object.values(dayNotes) && Object.values(dayNotes).map(note => {
                    note.glucose && glucoseArray.push(note.glucose);
                    note.breadUnits && breadUnitsArray.push(note.breadUnits);
                    note.insulin && insulinArray.push(note.insulin);
                    note.longInsulin && longInsulinArray.push(note.longInsulin);
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
                        dayNotes && Object.values(dayNotes) && Object.values(dayNotes).map(note => {
                            note.glucose && glucoseArray.push(note.glucose);
                            note.breadUnits && breadUnitsArray.push(note.breadUnits);
                            note.insulin && insulinArray.push(note.insulin);
                            note.longInsulin && longInsulinArray.push(note.longInsulin);
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

export const ChartConnect = connect(
    (state: IStorage) => ({
        noteListByDay: convertFlatNoteListToNoteListByDay(state),
        noteList: state.noteList,
        userDiabetesProperties: state.userDiabetesProperties,
    }),
    (dispatch: Dispatch<Action>) => ({ dispatch }),
    (stateProps, { dispatch }, ownProps) => {
        return {
            ...ownProps,
            ...stateProps,
            dispatch,
            onInfoPress(chartPeriodType: ChartPeriodType) {
                dispatch(createModalChangeAction({
                    type: ModalType.INFO,
                    needToShow: true,
                    data: {
                        type: chartPeriodType
                    }
                }))
                switch (chartPeriodType) {
                    case ChartPeriodType.DAY:
                        appAnalytics.sendEvent(appAnalytics.events.DAY_CHART_INFO_OPEN);
                        break;
                    case ChartPeriodType.MONTH:
                        appAnalytics.sendEvent(appAnalytics.events.MONTH_CHART_INFO_OPEN);
                        break;
                    case ChartPeriodType.THREE_MONTH:
                        appAnalytics.sendEvent(appAnalytics.events.THREE_MONTH_CHART_INFO_OPEN);
                        break;
                }
            },
            clearSelectedPeriod: () => dispatch(
                createChangeInteractive({ selectedChartPeriod: ChartPeriodType.DAY })
            )
        }
    }
)(Chart)
