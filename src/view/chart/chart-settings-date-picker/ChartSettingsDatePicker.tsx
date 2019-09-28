import React from 'react';
import { Platform, View, DatePickerAndroid, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Action, Dispatch } from 'redux';
import { createModalChangeAction } from '../../../store/modules/modal/ModalActionCreator';
import { ModalType, IModalPickerType } from '../../../model/IModal';
import { ThemeColor } from '../../../constant/ThemeColor';
import { CalendarIcon } from '../../../component/icon/CalendarIcon';
import { ChartPeriodType } from '../../../model/IChart';
import { DateHelper } from '../../../utils/DateHelper';

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
            <View style={styles.view}>
                <TouchableOpacity
                    style={styles.touchable}
                    onPress={() => Platform.OS === 'android' ?
                        this.displayAndroidDatePicker() :
                        this.displayIOsDatePicker()
                    }
                >
                    <CalendarIcon />
                    <Text style={styles.inputText}>
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
                this.props.onChange(new Date(year, month, day))
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
                onPositiveClick: this.props.onChange,
            }
        }))
    }

    private getInputText = () => {
        const { date } = this.props;
        switch (this.props.selectedPeriod) {
            case ChartPeriodType.MONTH:
                return DateHelper.getMonthStringCommon(date.getMonth()) + ' ' + date.getFullYear();
            default:
                const displayDate = date.getDate() > 9 ? date.getDate() : ('0' + date.getDate());
                const displayMonth = (date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1));
                const displayYear = date.getFullYear().toString()[2] + date.getFullYear().toString()[3];
                return displayDate + '.' + displayMonth + '.' + displayYear
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
        height: 30,

        borderWidth: 1,

        borderRadius: 5,
        backgroundColor: ThemeColor.WHITE,
        borderColor: ThemeColor.TAN
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

        marginLeft: 7,

        textAlign: 'center',
        fontSize: 17,
        color: ThemeColor.DIMGRAY,
    }
})
