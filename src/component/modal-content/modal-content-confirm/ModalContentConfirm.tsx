import React from 'react';
import { IModalConfirm } from '../../../model/IModal';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { ThemeColor } from '../../../constant/ThemeColor';

interface ModalContentConfirmProps {
    modal: IModalConfirm
    onResult: () => void
}

export function ModalContentConfirm(props: ModalContentConfirmProps) {
    return <View style={styles.view}>
        <Text style={styles.questionText}>
            {props.modal.data.questionText}
        </Text>
        <View style={styles.confirmButtons}>
            <TouchableOpacity
                onPress={() => props.onResult()}
                style={styles.negativeButtonView}
            >
                <Text style={styles.negativeButtonText}>
                    {props.modal.data.negativeButtonText}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => {
                    props.modal.data.onPositiveClick();
                    props.onResult();
                }}
                style={styles.positiveButtonView}
            >
                <Text style={styles.positiveButtonText}>
                    {props.modal.data.positiveButtonText}
                </Text>
            </TouchableOpacity>
        </View>
    </View>
}

const styles = StyleSheet.create({
    view: {
        width: '100%',

        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,

        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: ThemeColor.LIGHT_PINK_RED,
    },
    questionText: {
        flex: 1,
        width: 234,

        padding: 20,

        fontSize: 18,
        textAlign: 'center',
        color: ThemeColor.TEXT_DARK_GRAY,
    },
    confirmButtons: {
        flex: 1,
        width: '90%',
        height: 41,

        margin: 20,

        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center',
    },
    negativeButtonView: {
        width: '50%',

        borderWidth: 1,
        borderRadius: 10,
        borderColor: ThemeColor.BUTTON_STROKE_LIGHT_GRAY,
        backgroundColor: 'white',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    negativeButtonText: {
        fontSize: 16,
        color: ThemeColor.DIMGRAY,
    },
    positiveButtonView: {
        width: '40%',

        borderWidth: 1,
        borderRadius: 10,
        borderColor: ThemeColor.INDIAN_RED,
        backgroundColor: 'white',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },

    positiveButtonText: {
        fontSize: 16,
        color: ThemeColor.DIMGRAY,
    }
})
