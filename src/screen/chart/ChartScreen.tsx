import React from 'react'
import { connect } from 'react-redux';
import { IStorage } from '../../model/IStorage';
import { Dispatch, Action } from 'redux';
import { View, Text } from 'react-native';
import { INoteList, INoteListByDay, INoteListNote } from '../../model/INoteList';
import { LinearGradient } from 'expo-linear-gradient';
import { ChartValueType, ChartPeriodType, IChartConfiguration, ChartAveragePeriodType } from '../../model/IChart';
import { NoteListSelector } from '../../store/selector/NoteListSelector';
import { NavigationScreenProp, NavigationState, NavigationParams } from 'react-navigation';
import { ChartSettings } from '../../view/chart/chart-settings/ChartSettings';
import { ChartWrap } from '../../view/chart/chart-wrap/ChartWrap';
import { ChartDotInfoPopupConnect } from '../../view/chart/chart-dot-info-popup/ChartDotInfoPopup';
import { DateHelper } from '../../utils/DateHelper';
import { getArrayAverage, getWeekDaysNumbers } from '../../calculation-services/chart-calculation-services/ChartCalculationHelper';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { BlockHat } from '../../component/hat/BlockHat';
import { NoteCreationPopupButtonConnect } from '../../view/notes/note-creation-popup/button/NoteCreationPopupButton';
import { styles } from './Style';
import { ChartConfig } from './config/ChartConfig';
import { appAnalytics } from '../../app/Analytics';
import InfoIcon from '../../component/icon/InfoIcon';

export interface ChartProps {
    noteListByDay: INoteListByDay
    noteList: INoteList
    navigation: NavigationScreenProp<NavigationState, NavigationParams>
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

class Chart extends React.PureComponent<ChartProps, ChartState> {
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
            appAnalytics.sendEvent(appAnalytics.events.CHART_DOT_SELECTED);
        }
        if (this.state.currentDate !== prevState.currentDate) {
            appAnalytics.sendEvent(appAnalytics.events.ANOTHER_CHART_DATE_SEEN);
        }
    }

    render() {
        return (
            <View style={styles.view}>
                <ScrollView style={styles.scrollView}>
                    <BlockHat
                        title={"График"}
                        rightSideSlot={this.getHatTitle()}
                    />
                    <View
                        style={styles.ChartView}
                    >
                        {this.renderChat()}
                        {this.renderSettings()}
                    </View>
                </ScrollView>
                {this.state.selectedDotId && <ChartDotInfoPopupConnect
                    dateTitle={this.getChartPopupTitle()}
                    shown={this.state.popupShown}
                    onClose={this.onPopupClose}
                    note={this.getNoteForChartPopup()}
                    editable={this.state.selectedPeriod === ChartPeriodType.DAY}
                />}
                {!this.state.popupShown && <View style={styles.addNoteButtonView}>
                    <NoteCreationPopupButtonConnect />
                </View>}
            </View>

        )
    }

    renderChat() {
        const chartsToRender = [
            ChartValueType.INSULIN,
            ChartValueType.GLUCOSE,
            ChartValueType.BREAD_UNITS
        ];

        return (
            <View style={styles.chartView}>
                <LinearGradient
                    colors={['#163B50', '#3E2626']}
                    style={styles.chartGradient}
                >
                    {chartsToRender.map(type => {
                        return <ChartWrap
                            key={type}
                            type={type}
                            config={this.chartConfig[type]}
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
        )
    }

    renderSettings() {
        return (
            <View style={styles.settingsView}>
                <ChartSettings
                    onDateChange={this.onCurrentDateChange}
                    date={this.state.currentDate}
                    onChangingPeriod={this.onChangingPeriod}
                    selectedPeriod={this.state.selectedPeriod}
                />
            </View>
        )
    }

    getHatTitle() {
        let title = ""
        switch (this.state.selectedPeriod) {
            case ChartPeriodType.DAY:
                title = 'День';
                break;
            case ChartPeriodType.MONTH:
                title = 'Месяц';
                break;
            case ChartPeriodType.THREE_MONTH:
                title = 'Три месяца';
                break;
        }

        return (
            <View style={styles.headerTitleRightSide}>
                <Text style={styles.rightTitle}>
                    {title}
                </Text>
                <View style={styles.headerTouchableView}>
                    <TouchableOpacity style={styles.headerTouchable}>
                        <InfoIcon />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    getChartPopupTitle() {
        let displayingDate = '';
        let selectedDotId = this.state.selectedDotId;

        switch (this.state.selectedPeriod) {
            case ChartPeriodType.DAY:
                const note = this.props.noteList[selectedDotId];
                displayingDate = note && DateHelper.makeTimewithDateWithMonthAsString(new Date(note.date));
                return displayingDate
            case ChartPeriodType.MONTH:
                selectedDotId = Number(this.state.selectedDotId);
                if (selectedDotId === DateHelper.today()) {
                    return 'Сегодня'
                }
                if (selectedDotId === DateHelper.yesterday()) {
                    return 'Вчера';
                }
                displayingDate = DateHelper.makeDateWithMonthAsString(new Date(selectedDotId))
                return displayingDate
            case ChartPeriodType.THREE_MONTH:
                selectedDotId = Number(this.state.selectedDotId);
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
                        newWidth = this.chartConfig.breadUnits.boxWidth;
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
        noteListByDay: NoteListSelector.convertFlatNoteListToNoteListByDay(state),
        noteList: state.noteList,
    }),
    (dispatch: Dispatch<Action>) => ({ dispatch }),
    (stateProps, { dispatch }, ownProps) => {
        return {
            ...stateProps,
            dispatch,
            ownProps,
        }
    }
)(Chart)
