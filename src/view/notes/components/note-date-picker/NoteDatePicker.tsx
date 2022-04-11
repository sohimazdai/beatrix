import React from 'react';
import { CalendarIcon } from '../../../../component/icon/CalendarIcon';
import { IconPositionType, StyledButton, StyledButtonType } from '../../../../component/button/StyledButton';
import DateTimePicker, { Event } from '@react-native-community/datetimepicker';
import { View, StyleSheet } from 'react-native';
import { isIOS } from '../../../../app/Platorm';
import { getLocale } from '../../../../localisation/Translate';

interface Props {
    date: Date;
    label?: string;
    onChange: (value: Date) => void;
}

interface State {
    isOpen: boolean
}

export class NoteDatePicker extends React.PureComponent<Props, State> {
    state = { isOpen: false };

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

    handleClose = () => {
        this.setState({ isOpen: false });
    }

    render() {
        const { isOpen } = this.state;
        const { date, label } = this.props;

        const displayDate = date.getDate() > 9 ? date.getDate() : ('0' + date.getDate());
        const displayMonth = (date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1));
        const displayYear = date.getFullYear().toString()[2] + date.getFullYear().toString()[3];

        const displayedDate = label ? label : `${displayDate}.${displayMonth}.${displayYear}`;

        return (
            <View style={styles.pickerElement}>
                {!isIOS() && (
                    <StyledButton
                        style={StyledButtonType.OUTLINE}
                        label={displayedDate}
                        onPress={() => this.setState({ isOpen: true })}
                        icon={<CalendarIcon />}
                        iconPosition={IconPositionType.LEFT}
                        small
                    />
                )}
                {(isOpen || isIOS()) && (
                    <DateTimePicker
                        value={date}
                        mode="date"
                        display={isIOS() ? 'compact' : 'default'}
                        locale={getLocale()}
                        maximumDate={new Date()}
                        style={{ flex: 1 }}
                        onTouchCancel={this.handleClose}
                        onChange={this.handleOK}
                    />
                )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    pickerElement: {
        width: 140,
        flexDirection: 'row',
        justifyContent: 'center',
    },
});
