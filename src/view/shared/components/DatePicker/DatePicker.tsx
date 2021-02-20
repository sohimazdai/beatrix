import React from 'react';
import { ChartPeriodType } from '../../../../model/IChart';
import { appAnalytics } from '../../../../app/Analytics';
import { getDateInputText } from '../../../../utils/get-date-input-text';
import { StatisticsPeriod } from '../../../../model/IStatistics';
import { NoteDatePicker } from '../../../notes/components/note-date-picker/NoteDatePicker';

interface Props {
    date: Date
    selectedPeriod: ChartPeriodType | StatisticsPeriod
    onChange: (value) => void
}

export class DatePicker extends React.PureComponent<Props> {
    state = { isOpen: false }

    handleOK = (date: Date) => {
        this.props.onChange(date);
        appAnalytics.sendEvent(appAnalytics.events.CHART_CALENDAR_DATE_SET);
    }

    handleClose = () => this.setState({ isOpen: false })

    render() {
        const { selectedPeriod, date } = this.props;

        return (
            <NoteDatePicker
                date={date}
                label={String(getDateInputText(selectedPeriod, date))}
                onChange={this.handleOK}
            />
        )
    }
}
