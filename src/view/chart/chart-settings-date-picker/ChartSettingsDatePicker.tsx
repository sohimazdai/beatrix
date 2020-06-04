import React from 'react';
import { Platform, View, DatePickerAndroid, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Action, Dispatch } from 'redux';
import { createModalChangeAction } from '../../../store/modules/modal/ModalActionCreator';
import { ModalType, IModalPickerType } from '../../../model/IModal';
import { Color } from '../../../constant/Color';
import { CalendarIcon } from '../../../component/icon/CalendarIcon';
import { ChartPeriodType } from '../../../model/IChart';
import { DateHelper } from '../../../utils/DateHelper';
import { appAnalytics } from '../../../app/Analytics';
import { shadowOptions } from '../../../constant/ShadowOptions';

export interface ChartSettingsDatePickerProps {
    date: Date
    selectedPeriod: ChartPeriodType
    onChange: (value) => void
}

export interface DispatchToProps {
    dispatch: Dispatch<Action>
}

export interface FullProps extends DispatchToProps, ChartSettingsDatePickerProps { }

export class ChartSettingsDatePicker extends React.PureComponent<FullProps> {
    render() {
        return (
            <View style={this.props.selectedPeriod === ChartPeriodType.THREE_MONTH ?
                { ...styles.view, ...styles.viewWide } :
                { ...styles.view }
            }>
                <TouchableOpacity
                    style={styles.touchable}
                    onPress={() => Platform.OS === 'android' ?
                        this.displayAndroidDatePicker() :
                        this.displayIOsDatePicker()
                    }
                >
                    <CalendarIcon />
                    <Text style={this.props.selectedPeriod === ChartPeriodType.THREE_MONTH ?
                        { ...styles.inputText, ...styles.inputTextWide } :
                        { ...styles.inputText }
                    }>
                        {this.getInputText()}
                    </Text>
                </TouchableOpacity>
            </View >
        )
    }
    private displayAndroidDatePicker = async () => {
        try {
            const { action, year, month, day } = await (DatePickerAndroid as any).open(this.props.date);
            if (action !== DatePickerAndroid.dismissedAction) {
                this.onDateChange(new Date(year, month, day));
            }
        } catch ({ code, message }) {
            console.warn('Cannot open date android picker', message);
        }
    }

    private displayIOsDatePicker = () => {
        this.props.dispatch(createModalChangeAction({
            type: ModalType.IOS_DATE_PICKER,
            needToShow: true,
            data: {
                date: this.props.date,
                pickerType: IModalPickerType.DATE,
                positiveButtonText: 'Обновить дату',
                onPositiveClick: this.onDateChange,
            }
        }))
    }

    onDateChange = (date: Date) => {
        this.props.onChange(date);
        appAnalytics.sendEvent(appAnalytics.events.CHART_CALENDAR_DATE_SET);
    }

    private getInputText = () => {
        const { date } = this.props;
        switch (this.props.selectedPeriod) {
            case ChartPeriodType.THREE_MONTH:
                const currentYear = new Date().getFullYear();
                let endPostfix = currentYear === date.getFullYear() &&
                    new Date(DateHelper.getDiffMonth(date, -2)).getFullYear() === date.getFullYear() ?
                    '' : ' ' + String(date.getFullYear()).slice(2);
                let startPostfix = currentYear === new Date(DateHelper.getDiffMonth(date, -2)).getFullYear() &&
                    new Date(DateHelper.getDiffMonth(date, -2)).getFullYear() === date.getFullYear() ?
                    '' : ' ' + String(new Date(DateHelper.getDiffMonth(date, -2)).getFullYear()).slice(2);
                return endPostfix && startPostfix && endPostfix !== startPostfix?
                    DateHelper.getMonthStringCommonShort(this.props.date.getMonth() - 2 >= 0 ?
                        this.props.date.getMonth() - 2 :
                        this.props.date.getMonth() + 10
                    ) + (startPostfix === endPostfix ? '' : startPostfix) + ' - ' + DateHelper.getMonthStringCommonShort(this.props.date.getMonth()) + endPostfix
                    :
                    DateHelper.getMonthStringCommon(this.props.date.getMonth() - 2 >= 0 ?
                        this.props.date.getMonth() - 2 :
                        this.props.date.getMonth() + 10
                    ) + (startPostfix === endPostfix ? '' : startPostfix) + ' - ' + DateHelper.getMonthStringCommon(this.props.date.getMonth()) + endPostfix
            case ChartPeriodType.MONTH:
                return DateHelper.getMonthStringCommon(date.getMonth()) + ' ' + date.getFullYear();
            default:
                let text = '';
                if (DateHelper.today() === date.getTime()) {
                    text = 'Сегодня'
                } else if (DateHelper.yesterday() === date.getTime()) {
                    text = 'Вчера'
                } else {
                    const displayDate = date.getDate() > 9 ? date.getDate() : ('0' + date.getDate());
                    const displayMonth = (date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1));
                    const displayYear = date.getFullYear().toString()[2] + date.getFullYear().toString()[3];
                    text = displayDate + '.' + displayMonth + '.' + displayYear
                }
                return text;
        }
    }
}


export const ChartSettingsDatePickerConnect = connect<{}, DispatchToProps>(
    () => ({}),
    (dispatch: Dispatch<Action>) => ({ dispatch })
)(ChartSettingsDatePicker)

const styles = StyleSheet.create({
    view: {
        width: 170,

        borderRadius: 5,
        backgroundColor: Color.WHITE,
        ...shadowOptions,
    },
    viewWide: {
        width: 190,
    },
    touchable: {
        flex: 1,

        paddingLeft: 7,
        paddingRight: 7,
        paddingBottom: 3,
        paddingTop: 3,

        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    inputText: {
        flex: 1,

        paddingTop: 5,
        paddingBottom: 5,

        marginLeft: 7,

        textAlign: 'center',
        fontSize: 17,
        color: Color.DIMGRAY,
    },
    inputTextWide: {
        fontSize: 14,
    },
})
