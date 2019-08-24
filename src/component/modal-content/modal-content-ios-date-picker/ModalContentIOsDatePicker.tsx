import React from 'react';
import { IModalIOsDatePicker } from '../../../model/IModal';
import { View, StyleSheet, DatePickerIOS, TouchableOpacity, Text } from 'react-native';
import { ThemeColor } from '../../../constant/ThemeColor';

interface ModalContentIOsDatePickerProps {
    modal: IModalIOsDatePicker
    onResult: (value: Date) => void
}

export function ModalContentIOsDatePicker(props: ModalContentIOsDatePickerProps) {
    return <View style={styles.view}>
        <DatePickerIOS
            date={props.modal.data.date}
            onDateChange={props.onResult}
        />
        <TouchableOpacity
            onPress={() => props.onResult}
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
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'column',

        backgroundColor: ThemeColor.WHITE
    },
    buttonView: {
        flex: 1,
        height: 41,
        width: 234,

        margin: 20,

        borderWidth: 1,
        borderRadius: 10,
        borderColor: ThemeColor.BUTTON_STROKE_LIGHT_GRAY,
        backgroundColor: ThemeColor.WHITE,
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },

    buttonText: {
        fontSize: 16,
        color: ThemeColor.DIMGRAY,
    }
})
