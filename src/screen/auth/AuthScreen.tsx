import React, { Dispatch } from 'react';
import {
    View,
    ActivityIndicator,
    Dimensions,
    Text,
} from 'react-native';
import { NavigationParams, NavigationScreenProp, NavigationState } from 'react-navigation';
import { BackgroundSunIcon } from '../../component/icon/BackgroundSunIcon';
import { BackgroundMountainsIcon } from '../../component/icon/BackgroundMountainsIcon';
import { connect } from 'react-redux';
import { IStorage } from '../../model/IStorage';
import { Action } from 'redux';
import { IUser } from '../../model/IUser';
import { AuthFormConnect } from '../../view/auth/AuthForm';
import { styles } from './Style';
import { LinearGradient } from 'expo-linear-gradient'
import { i18nGet, getLocale } from '../../localisation/Translate';
import { appAnalytics, AnalyticsSections } from '../../app/Analytics';

interface AuthScreenProps {
    navigation: NavigationScreenProp<NavigationState, NavigationParams>
    user?: IUser
}

class AuthScreen extends React.Component<AuthScreenProps> {
    componentDidMount() {
        appAnalytics.setSection(AnalyticsSections.AUTH);
        appAnalytics.sendEvent(appAnalytics.events.AUTH_SCREEN_SEEN);

        appAnalytics.setUserProperties({
            locale: getLocale(),
        });
    }

    render() {
        return (
            <LinearGradient
                colors={['#F6F8FF', '#FFEBEB']}
                style={styles.AuthScreen}
            >
                {this.renderAuthForm()}
                {this.loading && <View style={styles.authFormLoading}>
                    <ActivityIndicator size="small" color="#000000" />
                </View>}
                {!this.loading && this.props.user.installationLoading && (
                    <View style={styles.authFormInstallationLoading}>
                        <ActivityIndicator size="small" color="#000000" />
                        <Text style={styles.authFormInstallationText}>
                            {i18nGet('looking_for_active_session')}
                        </Text>
                    </View>
                )}
            </LinearGradient>
        )
    }

    renderBackgroundSun() {
        const width = Dimensions.get('screen').width;
        const height = Dimensions.get('screen').height;
        return (
            <View style={styles.BackgroundSun}>
                <BackgroundSunIcon width={width} height={height} />
            </View>
        )
    }

    renderBackgroundMountains() {
        return (
            <View style={styles.BackgroundMountains}>
                <BackgroundMountainsIcon />
            </View>
        )
    }

    renderAuthForm() {
        return (
            <View style={styles.AuthForm}>
                {this.renderBackgroundSun()}
                {this.renderBackgroundMountains()}
                <AuthFormConnect />
            </View >
        )
    }

    get loading() {
        return this.props.user.loading
    }
}

export const AuthScreenConnect = connect(
    (state: IStorage) => ({ user: state.user }),
    (dispatch: Dispatch<Action>) => ({ dispatch }),
    (stateProps, { dispatch }, ownProps) => {
        return {
            ...stateProps,
            ...ownProps,
        }
    }
)(AuthScreen)
