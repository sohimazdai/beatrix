import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLOR } from '../../../constant/Color';
import { ChartPeriodType } from '../../../model/IChart';
import { SHADOW_OPTIONS } from '../../../constant/ShadowOptions';
import { DatePicker } from '../../shared/components/DatePicker/DatePicker';
import { DateHelper } from '../../../utils/DateHelper';
import { i18nGet } from '../../../localisation/Translate';
import { connect } from 'react-redux';
import { IStorage } from '../../../model/IStorage';
import { createChangeInteractive } from '../../../store/modules/interactive/interactive';
import { StyledButton, StyledButtonType } from '../../../component/button/StyledButton';
import { ArrowDirection, ArrowTaillessIcon } from '../../../component/icon/ArrowTaillessIcon';

export interface ChartSettingsProps {
    onChangingPeriod: (period: ChartPeriodType) => void;
    onDateChange: (date: Date) => void;
    date: Date;
    selectedChartPeriod: ChartPeriodType;
}

const PERIODS = [
    ChartPeriodType.DAY,
    ChartPeriodType.MONTH,
    ChartPeriodType.THREE_MONTH
]

export function Comp(props: ChartSettingsProps) {
    const { selectedChartPeriod = ChartPeriodType.DAY } = props;
    const today = new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate()
    );
    return <View style={styles.chartSettingsView}>
        <View style={styles.dateInputBlock}>
            <StyledButton
                style={StyledButtonType.OUTLINE}
                onPress={() => props.onDateChange(setPreviousDateValueByChartPeriodType(props))}
                icon={<ArrowTaillessIcon direction={ArrowDirection.LEFT} />}
                small
            />
            <DatePicker
                date={props.date}
                selectedPeriod={selectedChartPeriod}
                onChange={props.onDateChange}
            />
            <StyledButton
                style={StyledButtonType.OUTLINE}
                onPress={() => props.onDateChange(setNextDateValueByChartPeriodType(props))}
                icon={<ArrowTaillessIcon direction={ArrowDirection.RIGHT} />}
                disabled={getNextDate(props.date) > today}
                small
            />
        </View>
        <View style={styles.borderedChartSettings}>
            <View style={styles.periodChangingBlock}>
                <Text style={styles.periodTitle}>
                    {i18nGet('chart_period')}
                </Text>
                <View style={styles.periodChangingButtons}>
                    {PERIODS.map(period => {
                        let btnStyle = period === selectedChartPeriod
                            ? StyledButtonType.PRIMARY
                            : StyledButtonType.OUTLINE;

                        return (
                            <View style={styles.periodButtonWrap}>
                                <StyledButton
                                    style={btnStyle}
                                    onPress={() => (
                                        selectedChartPeriod != period && props.onChangingPeriod(period)
                                    )}
                                    label={getPeriodName(period)}
                                    small
                                />
                            </View>
                        )
                    })}
                </View>
            </View>
        </View>
    </View >
}

export const ChartSettings = connect(
    (state: IStorage) => ({
        selectedChartPeriod: state.interactive.selectedChartPeriod
    }),
    (dispatch) => ({
        onChangingPeriod: (period: ChartPeriodType) => dispatch(createChangeInteractive({
            selectedChartPeriod: period
        }))
    })
)(Comp)

function setPreviousDateValueByChartPeriodType(props: ChartSettingsProps) {
    switch (props.selectedChartPeriod) {
        case ChartPeriodType.MONTH:
        case ChartPeriodType.THREE_MONTH:
            return DateHelper.getDifferentMonthDate(props.date, - 1)
        default: return getPreviousDate(props.date)
    }
}

function setNextDateValueByChartPeriodType(props: ChartSettingsProps) {
    switch (props.selectedChartPeriod) {
        case ChartPeriodType.MONTH:
        case ChartPeriodType.THREE_MONTH:
            return DateHelper.getDifferentMonthDate(props.date, 1)
        default: return getNextDate(props.date)
    }
}

function getPeriodName(period: ChartPeriodType) {
    switch (period) {
        case ChartPeriodType.DAY: return i18nGet('chart_period_day');
        case ChartPeriodType.MONTH: return i18nGet('chart_period_month');
        case ChartPeriodType.THREE_MONTH: return i18nGet('chart_period_3_month');
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
        alignItems: 'center',
    },
    dateClicker: {
        display: 'flex',
        width: 45,

        justifyContent: 'center',
        alignItems: 'center',
        ...SHADOW_OPTIONS,
        borderRadius: 5,
        backgroundColor: COLOR.WHITE,
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
        display: 'flex',
        width: '100%',

        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    periodButtonWrap: {
        paddingHorizontal: 2,
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

        ...SHADOW_OPTIONS,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: COLOR.WHITE,
        backgroundColor: COLOR.WHITE,
        color: COLOR.TEXT_DARK_GRAY,
    },
    dontDisplayButtonText: {
        fontSize: 14,
        lineHeight: 16,
    },
})
