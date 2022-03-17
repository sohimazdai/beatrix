import React from 'react';
import { CalendarIcon } from '../../../../component/icon/CalendarIcon';
import { IconPositionType, StyledButton, StyledButtonType } from '../../../../component/button/StyledButton';
import DateTimePicker, { Event } from '@react-native-community/datetimepicker';
import { View, StyleSheet } from 'react-native';
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

const mapDispatch = (dispatch) => ({
    hidePopup: (id: string) => dispatch(createHidePopupToPopupList(id))
});

interface Props {
    date: Date;
    label?: string;
    onChange: (value: Date) => void;
    hidePopup: (id: string) => void;
}

interface State {
    isOpen: boolean
    popupId: string
}

class NoteDatePicker extends React.PureComponent<Props, State> {
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

    handleOK = (event: Event, date?: Date) => {
        this.handleClose();

        const { onChange } = this.props;

        if (event.type !== 'dismissed') {
            onChange(date);
        }
    }

    handleClose = () => {
        this.setState({ isOpen: false });
        this.props.hidePopup(this.state.popupId);
    }

    render() {
        const { isOpen, popupId } = this.state;
        const { date, label } = this.props;

        const displayDate = date.getDate() > 9 ? date.getDate() : ('0' + date.getDate());
        const displayMonth = (date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1));
        const displayYear = date.getFullYear().toString()[2] + date.getFullYear().toString()[3];

        const displayedDate = label ? label : `${displayDate}.${displayMonth}.${displayYear}`;

        return (
            <View>
                <StyledButton
                    style={StyledButtonType.OUTLINE}
                    label={displayedDate}
                    onPress={() => this.setState({ isOpen: true })}
                    icon={<CalendarIcon />}
                    iconPosition={IconPositionType.LEFT}
                    small
                />
                {(isOpen && !isIOS()) && (
                    <DateTimePicker
                        style={{ minWidth: 260, height: 50 }}
                        value={date}
                        mode="date"
                        onTouchCancel={this.handleClose}
                        onChange={this.handleOK}
                        maximumDate={new Date()}
                        collapsable
                    />
                )}
                {isIOS() && (
                    <PopupIntegratorConnected
                        id={popupId}
                        isOpen={isOpen}
                        handleClose={this.handleClose}
                    >
                        <View style={styles.popupContent}>
                            <PopupHeader
                                title={i18nGet('chart_select_date_only')}
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
                                date={date}
                                mode="date"
                                onTouchCancel={this.handleClose}
                                onChange={this.handleOK}
                                maximumDate={new Date()}
                                collapsable
                            />
                        </View>
                    </PopupIntegratorConnected>
                )}
            </View>
        );
    }
}

export const NoteDatePickerConnect = connect(null, mapDispatch)(NoteDatePicker);

const styles = StyleSheet.create({
    popupContent: {
        padding: 24,
        backgroundColor: COLOR.WHITE,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        ...SHADOW_OPTIONS,
    },
});
