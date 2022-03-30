import React from 'react';
import { ClocksIcon } from '../../../../component/icon/ClocksIcon';
import { IconPositionType, StyledButton, StyledButtonType } from '../../../../component/button/StyledButton';
import { View, StyleSheet } from 'react-native';
import DateTimePicker, { Event } from '@react-native-community/datetimepicker';
import { isIOS } from '../../../../app/Platorm';
import uuid from 'uuid';
import { COLOR } from '../../../../constant/Color';
import { getLocale } from '../../../../localisation/Translate';

export interface Props {
    date: Date;
    onChange: (value: Date) => void;
}

interface State {
    isOpen: boolean
    popupId: string
}

export class NoteTimePicker extends React.Component<Props, State> {
    state = {
        isOpen: false,
        popupId: uuid.v1(),
    };

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

    handleClose = () => {
        this.setState({ isOpen: false });
    }

    render() {
        const { isOpen, popupId } = this.state;
        const { date } = this.props;

        const displayHours = date.getHours() > 9 ? date.getHours() : ('0' + date.getHours());
        const displayMinutes = date.getMinutes() > 9 ? date.getMinutes() : ('0' + date.getMinutes());

        return (
            <View style={styles.pickerElement}>
                {!isIOS() && (
                    <StyledButton
                        style={StyledButtonType.OUTLINE}
                        label={`${displayHours}:${displayMinutes}`}
                        onPress={() => { this.setState({ isOpen: true }) }}
                        icon={<ClocksIcon />}
                        iconPosition={IconPositionType.LEFT}
                        small
                    />
                )}
                {(isOpen || isIOS()) && (
                    <DateTimePicker
                        value={date}
                        mode="time"
                        display='compact'
                        locale={getLocale()}
                        style={{
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                        onTouchCancel={this.handleClose}
                        onChange={this.handleOK}
                    />
                )}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    pickerElement: {
        width: 120,
        flexDirection: 'row',
        justifyContent: 'center',
    },
});
