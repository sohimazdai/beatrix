import React, { Component } from 'react';
import { ScrollView, KeyboardAvoidingView } from 'react-native';
import { ProfileSettingsInsulinTypePickerConnect } from '../../../view/profile/settings/insulin-type-picker/ProfileSettingsInsulinTypePicker';
import { ProfileSettingsTargetGlycemiaPickerConnect } from '../../../view/profile/settings/target-glycemia-picker/ProfileSettingsTargetGlycemiaPicker';
import { ProfileSettingsInsulinSensitiveFactorPickerConnect } from '../../../view/profile/settings/insulin-sensitive-factor-picker/ProfileSettingsInsulinSensitiveFactorPicker';
import { styles } from './Style';

interface Props {
}

export class ProfileScreenDiabetesSettings extends Component<Props> {
    render() {
        return (
            <KeyboardAvoidingView
                style={styles.keyboardAvoidingView}
                behavior="padding"
                keyboardVerticalOffset={100}
            >
                <ScrollView style={styles.profileView}>
                    <ProfileSettingsInsulinTypePickerConnect />
                    <ProfileSettingsTargetGlycemiaPickerConnect />
                    <ProfileSettingsInsulinSensitiveFactorPickerConnect />
                </ScrollView>
            </KeyboardAvoidingView>
        )
    }
}