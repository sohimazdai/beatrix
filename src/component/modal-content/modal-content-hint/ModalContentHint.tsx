import React from 'react';
import { IModalHint } from '../../../model/IModal';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { ThemeColor } from '../../../constant/ThemeColor';

interface ModalContentHintProps {
    modal: IModalHint,
    onResult: () => void;
}

export function ModalContentHint(props: ModalContentHintProps) {
    return <View style={styles.view}>
        <Text style={styles.questionText}>
            {props.modal.data.questionText}
        </Text>
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
        position: 'absolute',
        bottom: 0,

        width: '100%',

        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,

        alignItems: 'center',
        backgroundColor: ThemeColor.LIGHT_BLUE,
    },
    questionText: {
        flex: 1,
        width: 234,

        padding: 20,

        fontSize: 18,
        textAlign: 'center',
        color: ThemeColor.TEXT_DARK_GRAY,
    },

    buttonView: {
        flex: 1,
        height: 41,
        width: 234,

        margin: 20,

        borderWidth: 1,
        borderRadius: 10,
        borderColor: ThemeColor.BUTTON_STROKE_LIGHT_GRAY,
        backgroundColor: 'white',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },

    buttonText: {
        fontSize: 16,
        color: ThemeColor.DIMGRAY,
    }
})
