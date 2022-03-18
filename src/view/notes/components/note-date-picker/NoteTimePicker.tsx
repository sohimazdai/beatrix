import React from 'react';
import { ClocksIcon } from '../../../../component/icon/ClocksIcon';
import { IconPositionType, StyledButton, StyledButtonType } from '../../../../component/button/StyledButton';
import { View, StyleSheet } from 'react-native';
import DateTimePicker, { Event } from '@react-native-community/datetimepicker';
import { isIOS } from '../../../../app/Platorm';
import { connect } from 'react-redux';
import { PopupIntegratorConnected } from '../../../../component/PopupList/PopupIntegrator';
import uuid from 'uuid';
import { PopupHeader } from '../../../../component/popup/PopupHeader';
import { createHidePopupToPopupList } from '../../../../store/modules/popup-list/popup-list';
import { ArrowDirection, ArrowTaillessIcon } from '../../../../component/icon/ArrowTaillessIcon';
import { COLOR } from '../../../../constant/Color';
import { SHADOW_OPTIONS } from '../../../../constant/ShadowOptions';
import { i18nGet } from '../../../../localisation/Translate';

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
            <>
                <StyledButton
                    style={StyledButtonType.OUTLINE}
                    label={`${displayHours}:${displayMinutes}`}
                    onPress={() => { this.setState({ isOpen: true }) }}
                    icon={<ClocksIcon />}
                    iconPosition={IconPositionType.LEFT}
                    small
                />
                {(isOpen && !isIOS()) && (
                    <DateTimePicker
                        value={date}
                        mode="time"
                        onTouchCancel={this.handleClose}
                        onChange={this.handleOK}
                        collapsable
                    />
                )}
                {isIOS() && (
                    <PopupIntegratorConnected
                        id={popupId}
                        isOpen={isOpen && isIOS()}
                        handleClose={this.handleClose}
                    >
                        <View style={styles.popupContent}>
                            <PopupHeader
                                title={i18nGet('chart_select_time_only')}
                                rightSlot={(
                                    <StyledButton
                                        icon={<ArrowTaillessIcon direction={ArrowDirection.DOWN} width={20} height={20} fill={COLOR.PRIMARY} />}
                                        style={StyledButtonType.EMPTY}
                                        onPress={this.handleClose}
                                    />
                                )}
                            />
                            <DateTimePicker
                                value={date}
                                mode="time"
                                onTouchCancel={this.handleClose}
                                onChange={this.handleOK}
                                collapsable
                            />
                        </View>
                    </PopupIntegratorConnected>
                )}
            </>
        )
    }
}

const styles = StyleSheet.create({
    popupContent: {
        padding: 24,
        backgroundColor: COLOR.WHITE,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        ...SHADOW_OPTIONS,
    },
});
