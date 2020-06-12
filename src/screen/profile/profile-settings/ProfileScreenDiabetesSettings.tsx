import React, { Component } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { styles } from './Style';
import { connect } from 'react-redux';
import { IStorage } from '../../../model/IStorage';
import { IInteractive } from '../../../model/IInteractive';
import { Hat } from '../../../component/hat/Hat';
import { NavigationScreenProp, NavigationState, NavigationParams } from 'react-navigation';
import i18n from 'i18n-js';
import { ProfileItem } from '../../../view/profile/ProfileItem';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface Props {
    interactive: IInteractive
    navigation: NavigationScreenProp<NavigationState, NavigationParams>
}

export class ProfileScreenDiabetesSettingsComponent extends Component<Props> {
    onGlycemiaSettingsGoToPress = () => {
        this.props.navigation.navigate('GlycemiaSettings')
    }

    onCarbsSettingsGoToPress = () => {
        this.props.navigation.navigate('CarbohydratesSettings')
    }

    onInsulinSettingsGoToPress = () => {
        this.props.navigation.navigate('InsulinSettings')
    }

    render() {
        return (
            <View style={styles.keyboardAvoidingView}>
                <Hat
                    onBackPress={() => this.props.navigation.navigate('Profile')}
                    title={i18n.t('diabetic_profile')}
                />
                <View style={styles.scrollViewWrapWrap}>
                    <View style={styles.scrollViewWrap}>
                        <ScrollView style={styles.scrollView}>
                            <ProfileItem
                                title={i18n.t('glycemia_settings')}
                                description={i18n.t('glycemia_settings_description')}
                                activeElement={<TouchableOpacity onPress={this.onGlycemiaSettingsGoToPress}>
                                    <Text style={styles.activeElementToSettings}>
                                        {i18n.t('go_to')}
                                    </Text>
                                </TouchableOpacity>}
                            />
                            <ProfileItem
                                title={i18n.t('carbohydrates_settings')}
                                description={i18n.t('carbohydrates_settings_description')}
                                activeElement={<TouchableOpacity onPress={this.onCarbsSettingsGoToPress}>
                                    <Text style={styles.activeElementToSettings}>
                                        {i18n.t('go_to')}
                                    </Text>
                                </TouchableOpacity>}
                            />
                            <ProfileItem
                                title={i18n.t('insulin_settings')}
                                description={i18n.t('insulin_settings_description')}
                                activeElement={<TouchableOpacity onPress={this.onInsulinSettingsGoToPress}>
                                    <Text style={styles.activeElementToSettings}>
                                        {i18n.t('go_to')}
                                    </Text>
                                </TouchableOpacity>}
                            />
                        </ScrollView>
                    </View>
                </View>
            </View >
        )
    }
}

export const ProfileScreenDiabetesSettings = connect(
    (state: IStorage) => ({
        interactive: state.interactive
    })
)(ProfileScreenDiabetesSettingsComponent)
