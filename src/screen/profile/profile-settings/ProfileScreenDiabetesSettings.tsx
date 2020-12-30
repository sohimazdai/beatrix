import React, { Component } from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { styles } from './Style';
import { connect } from 'react-redux';
import { IStorage } from '../../../model/IStorage';
import { IInteractive } from '../../../model/IInteractive';
import { NavigationScreenProp, NavigationState, NavigationParams } from 'react-navigation';
import { ProfileItem } from '../../../view/profile/ProfileItem';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { i18nGet } from '../../../localisation/Translate';
import { appAnalytics } from '../../../app/Analytics';
import { BlockHat } from '../../../component/hat/BlockHat';
import { BreadUnitsIconConnected } from '../../../component/icon/tooltiped/BreadUnitsIcon';
import { GlycemiaIconConnected } from '../../../component/icon/tooltiped/GlycemiaIcon';
import { ShortInsulinIconConnected } from '../../../component/icon/tooltiped/ShortInsulinIcon';

interface Props {
    interactive: IInteractive
    navigation: NavigationScreenProp<NavigationState, NavigationParams>
}

export class ProfileScreenDiabetesSettingsComponent extends Component<Props> {
    componentDidMount() {
        appAnalytics.sendEvent(appAnalytics.events.DIABETES_PROFILE_SEEN);
    }

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
                <BlockHat
                    onBackPress={() => this.props.navigation.navigate('Profile')}
                    title={i18nGet('diabetic_profile')}
                />
                <ScrollView style={styles.scrollView}>
                    <ProfileItem
                        title={i18nGet('glycemia_settings')}
                        titleIcon={<GlycemiaIconConnected style={ownStyles.titleIcon} />}
                        description={i18nGet('glycemia_settings_description')}
                        activeElement={(
                            <TouchableOpacity
                                style={styles.touchable}
                                onPress={this.onGlycemiaSettingsGoToPress}
                            >
                                <Text style={styles.activeElementToSettings}>
                                    {i18nGet('go_to')}
                                </Text>
                            </TouchableOpacity>
                        )}
                    />
                    <ProfileItem
                        title={i18nGet('carbohydrates_settings')}
                        titleIcon={<BreadUnitsIconConnected style={ownStyles.titleIcon} />}
                        description={i18nGet('carbohydrates_settings_description')}
                        activeElement={(
                            <TouchableOpacity
                                style={styles.touchable}
                                onPress={this.onCarbsSettingsGoToPress}
                            >
                                <Text style={styles.activeElementToSettings}>
                                    {i18nGet('go_to')}
                                </Text>
                            </TouchableOpacity>
                        )}
                    />
                    <ProfileItem
                        title={i18nGet('insulin_settings')}
                        titleIcon={<ShortInsulinIconConnected style={ownStyles.titleIcon} />}
                        description={i18nGet('insulin_settings_description')}
                        activeElement={(
                            <TouchableOpacity
                                style={styles.touchable}
                                onPress={this.onInsulinSettingsGoToPress}
                            >
                                <Text style={styles.activeElementToSettings}>
                                    {i18nGet('go_to')}
                                </Text>
                            </TouchableOpacity>
                        )}
                    />
                </ScrollView>
            </View>
        )
    }
}

export const ProfileScreenDiabetesSettings = connect(
    (state: IStorage) => ({
        interactive: state.interactive
    })
)(ProfileScreenDiabetesSettingsComponent)

const ownStyles = StyleSheet.create({
    titleIcon: {
        marginRight: 8,
        height: 25,
        width: 25,
    },
})
