import React from 'react';
import { View, Text, StyleSheet} from 'react-native';
import { ThemeColor } from '../../../constant/ThemeColor';
import { ChartPeriodType } from '../../../model/IChart';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { shadowOptions } from '../../../constant/shadowOptions';
import { ChartSettingsDatePickerConnect } from '../chart-settings-date-picker/ChartSettingsDatePicker';
import { DateHelper } from '../../../utils/DateHelper';

export interface ChartSettingsProps {
    onChangingPeriod: (period: ChartPeriodType) => void;
    onDateChange: (date: Date) => void;
    date: Date;
    selectedPeriod: ChartPeriodType;
}

const PERIODS = [
    ChartPeriodType.DAY,
    ChartPeriodType.MONTH,
    ChartPeriodType.THREE_MONTH
]

export function ChartSettings(props: ChartSettingsProps) {
    const today = new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate()
    );
    const dateClickerStyle = getNextDate(props.date) > today ?
        { ...styles.dateClicker, ...styles.dateClickerDisable } :
        styles.dateClicker
    return <View style={styles.chartSettingsView}>
        <View style={styles.dateInputBlock}>
            <View style={styles.dateClicker}>
                <TouchableOpacity
                    style={styles.dateClickerTouchable}
                    onPress={() => props.onDateChange(setPreviousDateValueByChartPeriodType(props))}
                >
                    <Text style={styles.dateClickerText}>
                        {'-'}
                    </Text>
                </TouchableOpacity>
            </View>

            <ChartSettingsDatePickerConnect
                date={props.date}
                selectedPeriod={props.selectedPeriod}
                onChange={props.onDateChange}
            />
            <View style={styles.dateClicker}>
                <TouchableOpacity
                    style={dateClickerStyle}
                    onPress={getNextDate(props.date) <= today ?
                        () => props.onDateChange(setNextDateValueByChartPeriodType(props)) :
                        () => { }
                    }
                    disabled={getNextDate(props.date) > today}
                >
                    <Text style={styles.dateClickerText}>
                        {'+'}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
        <View style={styles.borderedChartSettings}>

            <View style={styles.periodChangingBlock}>
                <Text style={styles.periodTitle}>
                    Период
                </Text>
                <View style={styles.periodChangingButtons}>
                    {PERIODS.map(period => {
                        let buttonStyle = period === props.selectedPeriod ?
                            { ...styles.periodButton, ...styles.periodButtonActive } :
                            styles.periodButton;
                        let buttonTextStyle = period === props.selectedPeriod ?
                            { ...styles.periodButtonText, ...styles.periodButtonTextActive } :
                            styles.periodButtonText;
                        return <View
                            style={buttonStyle}
                            key={period}

                        >
                            <TouchableOpacity
                                style={styles.periodButtonTouchable}
                                onPress={() => props.selectedPeriod != period && props.onChangingPeriod(period)}
                            >
                                <Text style={buttonTextStyle}>
                                    {getPeriodName(period)}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    })}
                </View>
            </View>
        </View>
    </View>
}

function setPreviousDateValueByChartPeriodType(props: ChartSettingsProps) {
    switch (props.selectedPeriod) {
        case ChartPeriodType.MONTH:
        case ChartPeriodType.THREE_MONTH:
            return DateHelper.getDifferentMonthDate(props.date, - 1)
        default: return getPreviousDate(props.date)
    }
}

function setNextDateValueByChartPeriodType(props: ChartSettingsProps) {
    switch (props.selectedPeriod) {
        case ChartPeriodType.MONTH:
        case ChartPeriodType.THREE_MONTH:
            return DateHelper.getDifferentMonthDate(props.date, 1)
        default: return getNextDate(props.date)
    }
}

function getPeriodName(period: ChartPeriodType) {
    switch (period) {
        case ChartPeriodType.DAY: return 'День';
        case ChartPeriodType.MONTH: return 'Месяц';
        case ChartPeriodType.THREE_MONTH: return '3 месяца';
    }
}

function getPreviousDate(date: Date) {
    return new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate() - 1
    )
}

function getNextDate(date: Date) {
    return new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate() + 1
    )
}

const styles = StyleSheet.create({
    chartSettingsView: {
        display: 'flex',
        position: 'relative',
        width: '100%',

        flexDirection: 'column',

        justifyContent: 'center',
        alignItems: 'center',
    },
    dateInputBlock: {
        display: 'flex',
        width: '100%',

        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    dateClicker: {
        display: 'flex',
        width: 45,

        borderWidth: 1,

        justifyContent: 'center',
        alignItems: 'center',
        ...shadowOptions,
        borderRadius: 5,
        backgroundColor: ThemeColor.WHITE,
        borderColor: '#2E3858',
    },
    dateClickerDisable: {
        opacity: 0.5,
    },
    dateClickerTouchable: {
        display: 'flex',
        width: 45,
        justifyContent: 'center',
        alignItems: 'center',
    },
    dateClickerText: {
        fontWeight: 'bold',
        fontSize: 16,
        padding: 10,
        color: '#333'
    },
    borderedChartSettings: {
        display: 'flex',
        position: 'relative',
        width: '100%',

        margin: 20,
        paddingTop: 10,
        padding: 25,
        borderWidth: 1,

        flexDirection: 'column',

        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        borderColor: "#2E3858",
    },
    periodChangingBlock: {
        display: 'flex',
        width: '100%',

        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    periodTitle: {
        width: '100%',
        display: 'flex',

        paddingBottom: 5,

        justifyContent: 'center',
        textAlign: 'center',
        fontSize: 18,
        lineHeight: 21,
        color: '#333333',
    },
    periodChangingButtons: {
        display: 'flex',
        width: '100%',

        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    periodButton: {
        display: 'flex',
        width: 87,
        height: 25,

        borderWidth: 2,

        ...shadowOptions,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: ThemeColor.WHITE,
        backgroundColor: ThemeColor.WHITE,
        color: ThemeColor.TEXT_DARK_GRAY,
    },
    periodButtonActive: {
        backgroundColor: "#2E3858",
        borderColor: "#2E3858"
    },
    periodButtonTouchable: {
        display: 'flex',
        width: 87,
        height: 25,

        justifyContent: 'center',
        alignItems: 'center'
    },
    periodButtonText: {
        fontSize: 14,
        lineHeight: 16,
    },
    periodButtonTextActive: {
        fontWeight: 'bold',
        color: "#FFFFFF"
    },
    scaleAverageValueTitle: {
        width: '100%',
        display: 'flex',

        paddingBottom: 5,

        justifyContent: 'center',
        textAlign: 'center',
        fontSize: 14,
        lineHeight: 21,
        color: '#333333',
    },
    dontDisplayButtonTouchable: {
        display: 'flex',
        width: 100,
        height: 25,

        borderWidth: 2,

        ...shadowOptions,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: ThemeColor.WHITE,
        backgroundColor: ThemeColor.WHITE,
        color: ThemeColor.TEXT_DARK_GRAY,
    },
    dontDisplayButtonText: {
        fontSize: 14,
        lineHeight: 16,
    },
})