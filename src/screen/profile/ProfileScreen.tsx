import React from 'react'
import { Hat } from '../../component/hat/Hat'
import { connect } from 'react-redux'
import { IStorage } from '../../model/IStorage'
import { View, StyleSheet, ScrollView, Text, Alert } from 'react-native'
import { ProfileItem } from '../../view/profile/ProfileItem'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { NavigationParams, NavigationScreenProp } from 'react-navigation'
import { NavigationState } from 'react-navigation'
import { appAnalytics } from '../../app/Analytics'
import { IUser } from '../../model/IUser'
import { IModalConfirm, ModalType } from '../../model/IModal'
import { createModalChangeAction } from '../../store/modules/modal/ModalActionCreator'
import { createClearInstallationIdAction } from '../../store/service/auth/ClearInstallationIdSaga'
import { i18nGet } from '../../localisation/Translate'

interface Props {
    onLogOut?: () => void;
    user?: IUser;
    navigation: NavigationScreenProp<NavigationState, NavigationParams>
}

interface State {

}

class ProfileScreenComponent extends React.Component<Props, State> {
    componentDidMount() {
        appAnalytics.sendEvent(appAnalytics.events.PROFILE_SEEN);
    }

    render() {
        const { user } = this.props;
        return (
            <View style={styles.profileView}>
                <Hat
                    onBackPress={() => this.props.navigation.navigate('Main')}
                    title={i18nGet('profile')}
                />
                <View style={styles.scrollViewWrapWrap}>
                    <View style={styles.scrollViewWrap}>
                        <ScrollView style={styles.scrollView}>
                            <ProfileItem
                                title={'email'}
                                description={user.email}
                            />
                            <ProfileItem
                                title={i18nGet('diabetic_profile')}
                                description={i18nGet('about_diabetes_profile')}
                                activeElement={<TouchableOpacity onPress={this.onProfileSettingsPress}>
                                    <Text style={styles.activeElementToSettings}>
                                        {i18nGet('go_to')}
                                    </Text>
                                </TouchableOpacity>}
                            />
                            <ProfileItem
                                description={i18nGet('log_out')}
                                hint={i18nGet('log_out_hint')}
                                activeElement={<TouchableOpacity onPress={this.props.onLogOut}>
                                    <Text style={styles.activeElementExit}>
                                        {i18nGet('leave')}
                                    </Text>
                                </TouchableOpacity>}
                            />
                        </ScrollView>
                    </View>
                </View>
            </View>
        )
    }

    onProfileSettingsPress = () => {
        this.props.navigation.navigate('ProfileDiabetesSettings')
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
                        },
                        {
                            text: i18nGet('cancel'),
                        },
                    ]
                );

                appAnalytics.sendEvent(appAnalytics.events.LOG_OUT);
            }
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
        paddingTop: 10,
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25,
        backgroundColor: "#DDDDDD"
    },
    activeElementExit: {
        fontSize: 16,
        color: 'crimson'
    },
    activeElementToSettings: {
        fontSize: 16,
        color: '#2E3858'
    }
})
