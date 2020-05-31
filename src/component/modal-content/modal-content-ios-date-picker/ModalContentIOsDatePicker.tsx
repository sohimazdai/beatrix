import React from 'react';
import { IModalIOsDatePicker } from '../../../model/IModal';
import { View, StyleSheet, DatePickerIOS, TouchableOpacity, Text } from 'react-native';
import { Color } from '../../../constant/Color';
import { shadowOptions } from '../../../constant/shadowOptions';

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

        ...shadowOptions,

        alignItems: 'stretch',
        backgroundColor: Color.WHITE
    },
    buttonView: {
        height: 41,
        width: 234,

        margin: 20,

        borderWidth: 1,
        borderRadius: 10,
        borderColor: Color.BUTTON_STROKE_LIGHT_GRAY,
        backgroundColor: Color.WHITE,
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },

    buttonText: {
        fontSize: 16,
        color: Color.DIMGRAY,
    }
})
