import React from 'react';
import { ClocksIcon } from '../../../../component/icon/ClocksIcon';
import { IconPositionType, StyledButton, StyledButtonType } from '../../../../component/button/StyledButton';
import { Platform } from 'react-native';
import DateTimePicker, { Event } from '@react-native-community/datetimepicker';

export interface Props {
    date: Date
    onChange: (value: Date) => void
}

interface State {
    isOpen: boolean
}

export class NoteTimePicker extends React.Component<Props, State> {
    state = { isOpen: false };

    get isIOS() { return Platform.OS === 'ios' }

    componentDidMount() {
        this.setState({ isOpen: false })
    }

    componentWillUnmout() {
        this.setState({ isOpen: false })
    }

    handleOK = async (event: Event, date?: Date) => {
        this.handleClose();

        const { onChange } = this.props;
        if (event.type !== 'dismissed') {
            onChange(date);
        }

    }

    handleClose = () => this.setState({ isOpen: false })

    render() {
        const { isOpen } = this.state;
        const { date } = this.props;

        const displayHours = date.getHours() > 9 ? date.getHours() : ('0' + date.getHours());
        const displayMinutes = date.getMinutes() > 9 ? date.getMinutes() : ('0' + date.getMinutes());

        return (
            <>
                {!this.isIOS && <StyledButton
                    style={StyledButtonType.OUTLINE}
                    label={`${displayHours}:${displayMinutes}`}
                    onPress={() => { this.setState({ isOpen: true }) }}
                    icon={<ClocksIcon />}
                    iconPosition={IconPositionType.LEFT}
                    small
                />}
                {(!!isOpen || !!this.isIOS) && (
                    <DateTimePicker
                        value={date}
                        mode="time"
                        style={this.isIOS ? { minWidth: 120, justifyContent: 'center' } : {}}
                        onTouchCancel={() => { this.setState({ isOpen: false }) }}
                        onChange={this.handleOK}
                        display={Platform.OS === 'ios' ? "compact" : 'default'}
                        collapsable
                    />
                )}
            </>
        )
    }
}
