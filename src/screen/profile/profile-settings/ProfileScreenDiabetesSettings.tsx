import React, { Component } from 'react';
import { ScrollView, KeyboardAvoidingView } from 'react-native';
import { ProfileSettingsInsulinTypePickerConnect } from '../../../view/profile/settings/insulin-type-picker/ProfileSettingsInsulinTypePicker';
import { ProfileSettingsTargetGlycemiaPickerConnect } from '../../../view/profile/settings/target-glycemia-picker/ProfileSettingsTargetGlycemiaPicker';
import { ProfileSettingsShedulePickerConnect } from '../../../view/profile/settings/shedule-picker/ProfileSettingsShedulePicker';
import { styles } from './Style';
import { SheduleKeyType } from '../../../model/IUserPropertiesShedule';
import { Fader } from '../../../component/Fader';
import { connect } from 'react-redux';
import { IStorage } from '../../../model/IStorage';
import { IInteractive } from '../../../model/IInteractive';
import { Hat } from '../../../component/hat/Hat';
import { NavigationScreenProp, NavigationState, NavigationParams } from 'react-navigation';

interface Props {
    interactive: IInteractive
    navigation: NavigationScreenProp<NavigationState, NavigationParams>
}

export class ProfileScreenDiabetesSettingsComponent extends Component<Props> {
    render() {
        const isFadeHidden = !!!this.props.interactive.userPropertiesShedulePopupType ||
            this.props.interactive.userPropertiesShedulePopupType === SheduleKeyType.NONE;
        return (
            <KeyboardAvoidingView
                style={styles.keyboardAvoidingView}
                behavior="padding"
            // keyboardVerticalOffset={100}
            >
                <Hat
                    onBackPress={() => this.props.navigation.navigate('Profile')}
                    title={"Диабетический профиль"}
                />
                <ScrollView style={styles.profileView}>
                    {/* TODO: add change insulin type posibility */}
                    {/* <ProfileSettingsInsulinTypePickerConnect /> */}
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

export const ProfileScreenDiabetesSettings = connect(
    (state: IStorage) => ({
        interactive: state.interactive
    })
)(ProfileScreenDiabetesSettingsComponent)
