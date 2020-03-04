import React, { Component } from 'react';
import { ScrollView, KeyboardAvoidingView } from 'react-native';
import { ProfileSettingsInsulinTypePickerConnect } from '../../../view/profile/settings/insulin-type-picker/ProfileSettingsInsulinTypePicker';
import { ProfileSettingsTargetGlycemiaPickerConnect } from '../../../view/profile/settings/target-glycemia-picker/ProfileSettingsTargetGlycemiaPicker';
import { ProfileSettingsShedulePickerConnect } from '../../../view/profile/settings/shedule-picker/ProfileSettingsShedulePicker';
import { styles } from './Style';
import { SheduleKeyType } from '../../../model/IUserPropertiesShedule';

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
                    <ProfileSettingsShedulePickerConnect
                        sheduleKey={SheduleKeyType.INSULIN_SENSITIVITY_FACTOR}
                    />
                    <ProfileSettingsShedulePickerConnect
                        sheduleKey={SheduleKeyType.CARBOHYDRATE_RATIO}
                    />
                </ScrollView>
            </KeyboardAvoidingView>
        )
    }
}