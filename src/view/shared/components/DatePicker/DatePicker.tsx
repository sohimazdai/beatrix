import React from 'react';
import { Platform, View, DatePickerAndroid, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Action, Dispatch } from 'redux';
import { createModalChangeAction } from '../../../../store/modules/modal/ModalActionCreator';
import { ModalType, IModalPickerType } from '../../../../model/IModal';
import { COLOR } from '../../../../constant/Color';
import { CalendarIcon } from '../../../../component/icon/CalendarIcon';
import { ChartPeriodType } from '../../../../model/IChart';
import { DateHelper } from '../../../../utils/DateHelper';
import { appAnalytics } from '../../../../app/Analytics';
import { SHADOW_OPTIONS } from '../../../../constant/ShadowOptions';
import { i18nGet } from '../../../../localisation/Translate';
import { getDateInputText } from '../../../../utils/get-date-input-text';
import { StatisticsPeriod } from '../../../../model/IStatistics';
import { IconPositionType, StyledButton, StyledButtonType } from '../../../../component/button/StyledButton';

export interface ChartSettingsDatePickerProps {
    date: Date
    selectedPeriod: ChartPeriodType | StatisticsPeriod
    onChange: (value) => void
}

export interface DispatchToProps {
    dispatch: Dispatch<Action>
}

export interface FullProps extends DispatchToProps, ChartSettingsDatePickerProps { }

export class DatePicker extends React.PureComponent<FullProps> {
    render() {
        const { selectedPeriod, date } = this.props;

        return (
            <StyledButton
                style={StyledButtonType.OUTLINE}
                icon={<CalendarIcon />}
                iconPosition={IconPositionType.LEFT}
                onPress={
                    () => Platform.OS === 'android'
                        ? this.displayAndroidDatePicker()
                        : this.displayIOsDatePicker()
                }
                label={String(getDateInputText(selectedPeriod, date))}
            />
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
                positiveButtonText: i18nGet('chart_update_date'),
                onPositiveClick: this.onDateChange,
            }
        }))
    }

    onDateChange = (date: Date) => {
        this.props.onChange(date);
        appAnalytics.sendEvent(appAnalytics.events.CHART_CALENDAR_DATE_SET);
    }
}


export const DatePickerConnect = connect<{}, DispatchToProps>(
    null,
    (dispatch: Dispatch<Action>) => ({ dispatch })
)(DatePicker)

const styles = StyleSheet.create({
    view: {
        width: 170,

        borderRadius: 5,
        backgroundColor: COLOR.WHITE,
        ...SHADOW_OPTIONS,
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
        color: COLOR.DIMGRAY,
    },
    inputTextWide: {
        fontSize: 14,
    },
})
