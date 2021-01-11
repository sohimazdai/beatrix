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
import { NoteDatePicker } from '../../../notes/components/note-date-picker/NoteDatePicker';

interface Props {
    date: Date
    selectedPeriod: ChartPeriodType | StatisticsPeriod
    onChange: (value) => void
}

export class DatePicker extends React.PureComponent<Props> {
    state = { isOpen: false }

    get isIOS() { return Platform.OS === 'ios' }

    handleOK = (date: Date) => {
        this.props.onChange(date);
        appAnalytics.sendEvent(appAnalytics.events.CHART_CALENDAR_DATE_SET);
    }

    handleClose = () => this.setState({ isOpen: false })

    render() {
        const { isOpen } = this.state;
        const { selectedPeriod, date } = this.props;

        return (
            <>
                {/* {(!!isOpen || !!this.isIOS) && ( */}
                <NoteDatePicker
                    date={date}
                    label={String(getDateInputText(selectedPeriod, date))}
                    onChange={this.handleOK}
                />
                {/* )} */}
                {/* {!(!!this.isIOS && !!isOpen) || (!this.isIOS) && (
                    <StyledButton
                        style={StyledButtonType.OUTLINE}
                        icon={<CalendarIcon />}
                        iconPosition={IconPositionType.LEFT}
                        onPress={() => this.setState({ isOpen: true })}
                        label={String(getDateInputText(selectedPeriod, date))}
                    />
                )} */}
            </>
        )
    }
}
