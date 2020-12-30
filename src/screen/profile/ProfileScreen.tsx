import React from 'react'
import { connect } from 'react-redux'
import { View, StyleSheet, ScrollView, Text, Alert } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { NavigationParams, NavigationScreenProp, NavigationState } from 'react-navigation'

import { ProfileItem } from '../../view/profile/ProfileItem'

import { IStorage } from '../../model/IStorage'
import { IUser } from '../../model/IUser'

import { appAnalytics, AnalyticsSections } from '../../app/Analytics'
import { createClearInstallationIdAction } from '../../store/service/auth/ClearInstallationIdSaga'
import { i18nGet } from '../../localisation/Translate'
import { BlockHat } from '../../component/hat/BlockHat'
import { COLOR } from '../../constant/Color'
import { createSyncUserAction } from '../../store/service/user/SyncUserSaga'

interface Props {
    user?: IUser;
    navigation: NavigationScreenProp<NavigationState, NavigationParams>;
    onLogOut: () => void;
    syncUser: () => void;
}

class ProfileScreenComponent extends React.Component<Props> {
    componentDidMount() {
        appAnalytics.setSection(AnalyticsSections.PROFILE);
        appAnalytics.sendEvent(appAnalytics.events.PROFILE_SEEN);
    }

    render() {
        const { user } = this.props;

        return (
            <View style={styles.profileView}>
                <BlockHat
                    onBackPress={() => this.props.navigation.navigate('Dashboard')}
                    title={i18nGet('profile')}
                />
                <ScrollView style={styles.scrollView}>
                    <ProfileItem
                        title={'email'}
                        description={user.email}
                    />
                    <ProfileItem
                        title={i18nGet('diabetic_profile')}
                        description={i18nGet('about_diabetes_profile')}
                        activeElement={(
                            <TouchableOpacity
                                style={styles.touchable}
                                onPress={this.onProfileSettingsPress}
                            >
                                <Text style={styles.activeElementToSettings}>
                                    {i18nGet('go_to')}
                                </Text>
                            </TouchableOpacity>
                        )}
                    />
                    <ProfileItem
                        title={i18nGet('export_data')}
                        description={i18nGet('export_data_description')}
                        activeElement={(
                            <TouchableOpacity
                                style={styles.touchable}
                                onPress={this.onExportDataPress}
                            >
                                <Text style={styles.activeElementToSettings}>
                                    {i18nGet('go_to')}
                                </Text>
                            </TouchableOpacity>
                        )}
                    />
                    <ProfileItem
                        description={i18nGet('sync_data_with_server_description')}
                        activeElement={(
                            <TouchableOpacity
                                onPress={this.props.syncUser}
                                style={styles.touchable}
                            >
                                <Text style={styles.activeElementSync}>
                                    {i18nGet('sync_data_with_server')}
                                </Text>
                            </TouchableOpacity>
                        )}
                    />
                    <ProfileItem
                        description={i18nGet('log_out')}
                        hint={i18nGet('log_out_hint')}
                        activeElement={(
                            <TouchableOpacity
                                onPress={this.props.onLogOut}
                                style={styles.touchable}
                            >
                                <Text style={styles.activeElementExit}>
                                    {i18nGet('leave')}
                                </Text>
                            </TouchableOpacity>
                        )}
                    />
                </ScrollView>
            </View>
        )
    }

    onProfileSettingsPress = () => {
        this.props.navigation.navigate('ProfileDiabetesSettings')
    }

    onExportDataPress = () => {
        this.props.navigation.navigate('ExportDataSettings')
    }
}

export const ProfileScreenConnect = connect(
    (state: IStorage) => ({
        user: state.user
    }),
    (dispatch) => ({ dispatch }),
    (stateProps, { dispatch }, ownProps) => {
        return {
            ...stateProps,
            ...ownProps,
            onLogOut() {
                Alert.alert(
                    i18nGet('are_you_sure'),
                    '',
                    [
                        {
                            text: i18nGet('leave'),
                            onPress: () => dispatch(createClearInstallationIdAction()),
                            style: 'destructive',
                        },
                        {
                            text: i18nGet('cancel'),
                            style: 'cancel'
                        },
                    ]
                );

                appAnalytics.sendEvent(appAnalytics.events.LOG_OUT);
            },
            syncUser: () => dispatch(createSyncUserAction(stateProps.user)),
        }
    }
)(ProfileScreenComponent)

const styles = StyleSheet.create({
    profileView: {
        height: '100%',
        width: '100%',
        display: 'flex',

        flexDirection: 'column',
        justifyContent: 'flex-start',
        backgroundColor: "#DDDDDD"
    },
    scrollViewWrapWrap: {
        backgroundColor: "#2E3858",
    },
    scrollViewWrap: {
        backgroundColor: "#2E3858",
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25,
        overflow: 'hidden',
    },
    scrollView: {
        height: '100%',
        backgroundColor: "#DDDDDD"
    },
    activeElementSync: {
        fontSize: 16,
        color: COLOR.PRIMARY,
    },
    activeElementExit: {
        fontSize: 16,
        color: 'crimson'
    },
    activeElementToSettings: {
        fontSize: 16,
        color: '#2E3858'
    },
    touchable: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    }
})
