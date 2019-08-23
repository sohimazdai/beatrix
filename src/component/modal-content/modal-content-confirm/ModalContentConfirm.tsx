import React from 'react';
import { IModalConfirm, IModal } from '../../../model/IModal';
import { View, StyleSheet, Text, Button } from 'react-native';

interface ModalContentConfirmProps {
    modal: IModalConfirm,
    onConfirmClick: () => void;
}

export function ModalContentConfirm(props: ModalContentConfirmProps ) {
    return <View style={styles.view}>
        <Text style={styles.questionText}>{props.modal.data.questionText}</Text>
        <Button
            title={props.modal.data.confirmButtonText}
            onPress={() => props.onConfirmClick}
        />
    </View>
}

const styles = StyleSheet.create({
    view: {
        position: 'absolute',
        bottom: 0,

        width: '100%',

        alignItems: 'center',

    },
    questionText: {
        fontSize: 16,
    }

})
