import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Color } from '../../../constant/Color';
import { ChartPeriodType } from '../../../model/IChart';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { shadowOptions } from '../../../constant/shadowOptions';
import { ChartSettingsDatePickerConnect } from '../chart-settings-date-picker/ChartSettingsDatePicker';
import { DateHelper } from '../../../utils/DateHelper';
import { MinusIcon } from '../../../component/icon/MinusIcon';
import { PlusIcon } from '../../../component/icon/PlusIcon';

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
    return <View style={styles.chartSettingsView}>
        <View style={styles.dateInputBlock}>
            <View style={styles.dateClicker}>
                <TouchableOpacity
                    style={styles.dateClickerTouchable}
                    onPress={() => props.onDateChange(setPreviousDateValueByChartPeriodType(props))}
                >
                    <MinusIcon />
                </TouchableOpacity>
            </View>
            <ChartSettingsDatePickerConnect
                date={props.date}
                selectedPeriod={props.selectedPeriod}
                onChange={props.onDateChange}
            />
            <View
                style={getNextDate(props.date) <= today
                    ? styles.dateClicker
                    : { ...styles.dateClicker, ...styles.dateClickerDisable }
                }
            >
                <TouchableOpacity
                    style={styles.dateClickerTouchable}
                    onPress={getNextDate(props.date) <= today
                        ? () => props.onDateChange(setNextDateValueByChartPeriodType(props))
                        : () => { }
                    }
                >
                    <PlusIcon />
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
    </View >
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
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    dateClicker: {
        display: 'flex',
        width: 45,

        justifyContent: 'center',
        alignItems: 'center',
        ...shadowOptions,
        borderRadius: 5,
        backgroundColor: Color.WHITE,
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

        paddingTop: 10,
        padding: 15,
        paddingBottom: 40,

        flexDirection: 'column',

        justifyContent: 'center',
        alignItems: 'center',
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

        paddingBottom: 10,

        justifyContent: 'center',
        textAlign: 'center',
        fontSize: 18,
        lineHeight: 21,
        color: '#333333',
    },
    periodChangingButtons: {
        maxWidth: 280,
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
        borderColor: Color.WHITE,
        backgroundColor: Color.WHITE,
        color: Color.TEXT_DARK_GRAY,
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
        borderColor: Color.WHITE,
        backgroundColor: Color.WHITE,
        color: Color.TEXT_DARK_GRAY,
    },
    dontDisplayButtonText: {
        fontSize: 14,
        lineHeight: 16,
    },
})
