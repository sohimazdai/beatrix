import React from 'react'
import { Modal, KeyboardAvoidingView, Platform } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

export interface BottomPopupProps {
    hidden?: boolean;
    children: any
}

export const BottomPopup = (props: BottomPopupProps) => {
    const { children, hidden } = props;

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={!hidden}
        >
            <ScrollView style={{ display: 'flex', flexDirection: 'column-reverse' }}>
                <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                    {children}
                </KeyboardAvoidingView>
            </ScrollView>
        </Modal>
    )
}
