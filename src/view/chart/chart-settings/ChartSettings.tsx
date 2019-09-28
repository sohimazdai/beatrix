import React from 'react';
import { View, Text, StyleSheet, CheckBox, ScrollView } from 'react-native';
import { ThemeColor } from '../../../constant/ThemeColor';
import { ChartPeriodType, ChartAvaragePeriodType } from '../../../model/IChart';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { shadowOptions } from '../../../constant/shadowOptions';
import { ChartSettingsDatePickerConnect } from '../chart-settings-date-picker/ChartSettingsDatePicker';
import { DateHelper } from '../../../utils/DateHelper';

export interface ChartSettingsProps {
    onChangingPeriod: (period: ChartPeriodType) => void;
    onDateChange: (date: Date) => void;
    date: Date;
    selectedPeriod: ChartPeriodType;
    selectedAvaragePeriod: ChartAvaragePeriodType;
    onChangingAvaragePeriod: (avaragePeriod: ChartAvaragePeriodType) => void //TODO:
}

const PERIODS = [
    ChartPeriodType.DAY,
    ChartPeriodType.MONTH,
    ChartPeriodType.THREE_MONTH
]

const AVARAGE_PERIOD = [
    ChartAvaragePeriodType.MONTH,
    ChartAvaragePeriodType.THREE_MONTH,
    ChartAvaragePeriodType.SIX_MONTH
]

export function ChartSettings(props: ChartSettingsProps) {
    const today = new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate()
    );
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
                    style={styles.dateClickerTouchable}
                    onPress={getNextDate(props.date) <= today ?
                        () => props.onDateChange(setNextDateValueByChartPeriodType(props)) :
                        () => { }
                    }
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
                        let buttonStyle = styles.periodButton;
                        let buttonTextStyle = styles.periodButtonText;
                        if (period === props.selectedPeriod) {
                            buttonStyle = {...buttonStyle, ...styles.periodButtonActive}
                            buttonTextStyle = {...buttonTextStyle, ...styles.periodButtonTextActive}
                        }
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
                <Text style={styles.scaleAvarageValueTitle}>
                    Наложить график среднего значения глюкозы за период:
                </Text>
                <View style={styles.periodChangingButtons}>
                    {AVARAGE_PERIOD.map(period => {
                        let buttonStyle = styles.periodButton;
                        let buttonTextStyle = styles.periodButtonText;
                        if (period === props.selectedAvaragePeriod) {
                            buttonStyle = {...buttonStyle, ...styles.periodButtonActive}
                            buttonTextStyle = {...buttonTextStyle, ...styles.periodButtonTextActive}
                        }
                        return <View
                            style={buttonStyle}
                            key={period}

                        >
                            <TouchableOpacity
                                style={styles.periodButtonTouchable}
                                onPress={() => props.selectedAvaragePeriod != period && props.onChangingAvaragePeriod(period)}
                            >
                                <Text style={buttonTextStyle}>
                                    {getAvaragePeriodName(period)}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    })}
                </View>
                <TouchableOpacity //TODO: add mark-up and styles
                    style={styles.periodButtonTouchable}
                    onPress={() => {}} //TODO: 
                >
                    <Text style={styles.dontDisplayButton}>
                        Не отображать
                    </Text>
                </TouchableOpacity>
                <View style={{}}>
                    <Text style={styles.scaleAvarageValueTitle}> 
                        Отобразить так же для ХЕ и инсулина
                    </Text>
                    <CheckBox
                        // value={} ???
                        onValueChange={() => {}} //TODO:
                    />
                </View>
            </View>
        </View>
    </View>
}

function setPreviousDateValueByChartPeriodType(props: ChartSettingsProps) {
    switch (props.selectedPeriod) {
        case ChartPeriodType.MONTH:
            return DateHelper.getDifferentMonthDate(props.date, - 1)
        default: return getPreviousDate(props.date)
    }
}

function setNextDateValueByChartPeriodType(props: ChartSettingsProps) {
    switch (props.selectedPeriod) {
        case ChartPeriodType.MONTH:
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

// function setPreviousDateValueByChartAvaragePeriodType(props: ChartSettingsProps) { //TODO:
//     switch (props.selectedAvaragePeriod) {
//         case ChartAvaragePeriodType.MONTH:
//             return DateHelper.getPreviousMonthDate(props.date)
//         default: return getPreviousDate(props.date)
//     }
// }

// function setNextDateValueByChartAvaragePeriodType(props: ChartSettingsProps) {
//     switch (props.selectedAvaragePeriod) {
//         case ChartAvaragePeriodType.MONTH:
//             return DateHelper.getNextMonthDate(props.date)
//         default: return getNextDate(props.date)
//     }
// }

function getAvaragePeriodName(avaragePeriod: ChartAvaragePeriodType) {
    switch(avaragePeriod) {
        case ChartAvaragePeriodType.MONTH: return 'Месяц';
        case ChartAvaragePeriodType.THREE_MONTH: return '3 месяца';
        case ChartAvaragePeriodType.SIX_MONTH: return '6 месяца'
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
        height: 30,

        borderWidth: 1,

        justifyContent: 'center',
        alignItems: 'center',
        ...shadowOptions,
        borderRadius: 5,
        backgroundColor: ThemeColor.WHITE,
        borderColor: '#FFEBEB',
    },
    dateClickerTouchable: {
        display: 'flex',
        width: 45,
        height: 25,

        justifyContent: 'center',
        alignItems: 'center',
    },
    dateClickerText: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#333'
    },
    borderedChartSettings: {
        display: 'flex',
        position: 'relative',
        width: '100%',

        paddingTop: 10,
        padding: 25,
        borderWidth: 1,

        flexDirection: 'column',

        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        borderColor: ThemeColor.WHITE,
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
        borderColor: ThemeColor.LIGHT_RED
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
        fontWeight: 'bold'
    },
    scaleAvarageValueTitle: {
        width: '100%',
        display: 'flex',

        paddingBottom: 5,

        justifyContent: 'center',
        textAlign: 'center',
        fontSize: 18,
        lineHeight: 21,
        color: '#333333',
    },
    dontDisplayButton: {
        fontSize: 14,
        lineHeight: 16,
    },
})