import React from 'react';
import { IModalIOsDatePicker } from '../../../model/IModal';
import { View, StyleSheet, DatePickerIOS, TouchableOpacity, Text } from 'react-native';
import { COLOR } from '../../../constant/Color';
import { SHADOW_OPTIONS } from '../../../constant/OptionsShadow';

interface ModalContentIOsDatePickerProps {
    modal: IModalIOsDatePicker
    onResult: () => void
}

export function ModalContentIOsDatePicker(props: ModalContentIOsDatePickerProps) {
    return <View style={styles.view}>
        <DatePickerIOS
            date={props.modal.data.date}
            mode={props.modal.data.pickerType}
            onDateChange={props.modal.data.onPositiveClick}
        />
        <TouchableOpacity
            onPress={() => props.onResult()}
            style={styles.buttonView}
        >
            <Text style={styles.buttonText}>
                {props.modal.data.positiveButtonText}
            </Text>
        </TouchableOpacity>
    </View>
}

const styles = StyleSheet.create({
    view: {
        padding: 20,
        borderRadius: 20,

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
