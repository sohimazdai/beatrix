import React from 'react';
import { CalendarIcon } from '../../../../component/icon/CalendarIcon';
import { IconPositionType, StyledButton, StyledButtonType } from '../../../../component/button/StyledButton';
import DateTimePicker, { Event } from '@react-native-community/datetimepicker';
import { Platform, View } from 'react-native';
import { isIOS } from '../../../../app/Platorm';

export interface Props {
    date: Date
    onChange: (value: Date) => void
    label?: string
}

interface State {
    isOpen: boolean
}

export class NoteDatePicker extends React.PureComponent<Props, State> {
    state = { isOpen: false };

    get isIOS() { return isIOS() }

    componentDidMount() {
        this.setState({ isOpen: false })
    }

    componentWillUnmout() {
        this.setState({ isOpen: false })
    }

    handleOK = (event: Event, date?: Date) => {
        this.handleClose();

        const { onChange } = this.props;

        if (event.type !== 'dismissed') {
            onChange(date);
        }
    }

    handleClose = () => this.setState({ isOpen: false })

    render() {
        const { isOpen } = this.state;
        const { date, label } = this.props;

        const displayDate = date.getDate() > 9 ? date.getDate() : ('0' + date.getDate());
        const displayMonth = (date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1));
        const displayYear = date.getFullYear().toString()[2] + date.getFullYear().toString()[3];

        const displayedDate = label ? label : `${displayDate}.${displayMonth}.${displayYear}`
        return (
            <View>
                {!this.isIOS && <StyledButton
                    style={StyledButtonType.OUTLINE}
                    label={displayedDate}
                    onPress={() => { this.setState({ isOpen: true }) }}
                    icon={<CalendarIcon />}
                    iconPosition={IconPositionType.LEFT}
                    small
                />}
                {(!!isOpen || !!this.isIOS) && (
                    <DateTimePicker
                        style={{ minWidth: 120 }}
                        value={date}
                        mode="date"
                        onTouchCancel={this.handleClose}
                        onChange={this.handleOK}
                        maximumDate={new Date()}
                        display={Platform.OS === 'ios' ? "compact" : 'default'}
                        collapsable
                    />
                )}
            </View>
        )
    }
}
