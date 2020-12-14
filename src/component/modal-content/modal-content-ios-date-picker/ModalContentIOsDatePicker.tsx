import React, { useState } from 'react';
import { IModalIOsDatePicker } from '../../../model/IModal';
import { View, StyleSheet, DatePickerIOS } from 'react-native';
import { COLOR } from '../../../constant/Color';
import { SHADOW_OPTIONS } from '../../../constant/ShadowOptions';
import { IconPositionType, StyledButton, StyledButtonType } from '../../button/StyledButton';
import { PopupHeader } from '../../popup/PopupHeader';
import { i18nGet } from '../../../localisation/Translate';
import { ArrowDirection, ArrowTaillessIcon } from '../../icon/ArrowTaillessIcon';

interface ModalContentIOsDatePickerProps {
    modal: IModalIOsDatePicker
    onResult: () => void
}

export function ModalContentIOsDatePicker(props: ModalContentIOsDatePickerProps) {
    const [selectedDate, setDate] = useState(props.modal.data.date);

    return <View style={styles.view}>
        <PopupHeader
            title={i18nGet('chart_select_date')}
            rightSlot={<StyledButton
                style={StyledButtonType.EMPTY}
                icon={<ArrowTaillessIcon direction={ArrowDirection.DOWN} width={20} height={20} />}
                iconPosition={IconPositionType.RIGHT}
                onPress={props.onResult}
            />}
        />
        <DatePickerIOS
            date={selectedDate}
            mode={props.modal.data.pickerType}
            onDateChange={(newDate) => setDate(newDate)}
            maximumDate={new Date()}
        />
        <StyledButton
            onPress={() => {
                props.modal.data.onPositiveClick(selectedDate);
                props.onResult();
            }}
            style={StyledButtonType.PRIMARY}
            label={props.modal.data.positiveButtonText}
        />
    </View>
}

const styles = StyleSheet.create({
    view: {
        padding: 20,

        ...SHADOW_OPTIONS,

        alignItems: 'stretch',
        backgroundColor: COLOR.WHITE
    },
    buttonView: {
        height: 41,
        width: 234,

        margin: 20,

        borderWidth: 1,
        borderRadius: 10,
        borderColor: COLOR.BUTTON_STROKE_LIGHT_GRAY,
        backgroundColor: COLOR.WHITE,
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
    },

    buttonText: {
        fontSize: 16,
        color: COLOR.DIMGRAY,
    }
})
