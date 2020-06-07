import React from 'react'
import { Hat } from '../../component/hat/Hat'
import { connect } from 'react-redux'
import { IStorage } from '../../model/IStorage'
import { View, StyleSheet, ScrollView, Text } from 'react-native'
import { ProfileItem } from '../../view/profile/ProfileItem'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { NavigationParams, NavigationScreenProp } from 'react-navigation'
import { NavigationState } from 'react-navigation'
import { appAnalytics } from '../../app/Analytics'
import { IUser } from '../../model/IUser'
import { IModalConfirm, ModalType } from '../../model/IModal'
import { createModalChangeAction } from '../../store/modules/modal/ModalActionCreator'
import { createClearInstallationIdAction } from '../../store/service/auth/ClearInstallationIdSaga'
import i18n from 'i18n-js';

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
                    title={i18n.t('profile')}
                />
                <View style={styles.scrollViewWrapWrap}>
                    <View style={styles.scrollViewWrap}>
                        <ScrollView style={styles.scrollView}>
                            <ProfileItem
                                title={'email'}
                                description={user.email}
                            />
                            <ProfileItem
                                title={i18n.t('diabetic_profile')}
                                description={i18n.t('about_diabetes_profile')}
                                activeElement={<TouchableOpacity onPress={this.onProfileSettingsPress}>
                                    <Text style={styles.activeElementToSettings}>
                                        {i18n.t('go_to')}
                                    </Text>
                                </TouchableOpacity>}
                            />
                            <ProfileItem
                                description={i18n.t('log_out')}
                                hint={i18n.t('log_out_hint')}
                                activeElement={<TouchableOpacity onPress={this.props.onLogOut}>
                                    <Text style={styles.activeElementExit}>
                                        {i18n.t('leave')}
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
                const confirmData: IModalConfirm = {
                    data: {
                        questionText: i18n.t('are_you_sure'),
                        positiveButtonText: i18n.t('leave'),
                        negativeButtonText: i18n.t('cancel'),

                        onPositiveClick: () => dispatch(createClearInstallationIdAction()),
                    }
                }
                dispatch(createModalChangeAction({
                    type: ModalType.CONFIRM,
                    needToShow: true,
                    ...confirmData
                }))
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
