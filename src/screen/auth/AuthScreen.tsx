import React, { Dispatch } from 'react';
import {
    View,
    KeyboardAvoidingView,
    ActivityIndicator,
} from 'react-native';
import { NavigationParams, NavigationScreenProp, NavigationState } from 'react-navigation';
import { BackgroundSunIcon } from '../../component/icon/BackgroundSunIcon';
import { BackgroundMountainsIcon } from '../../component/icon/BackgroundMountainsIcon';
import { connect } from 'react-redux';
import { IStorage } from '../../model/IStorage';
import { Action } from 'redux';
import { IUser } from '../../model/IUser';
import { AuthFormConnect } from '../../view/auth/AuthForm';
import { ScrollView } from 'react-native-gesture-handler';
import { Fader } from '../../component/Fader';
import { styles } from './Style';
import { AuthRememberPasswordPopupConnect } from '../../view/auth/password-recovery-popup/AuthPasswordRecoveryPopup';

interface AuthScreenProps {
    navigation: NavigationScreenProp<NavigationState, NavigationParams>
    user?: IUser
}

interface AuthScreenState {
    restorePasswordPopupShown: boolean
}

class AuthScreen extends React.Component<AuthScreenProps, AuthScreenState> {
    state = {
        restorePasswordPopupShown: false,
    }

    render() {
        return (
            <KeyboardAvoidingView behavior="padding" style={styles.AuthView}>
                <ScrollView style={styles.AuthView}>
                    {this.renderAuthForm()}
                </ScrollView>

                {this.state.restorePasswordPopupShown &&
                    <Fader hidden={!this.state.restorePasswordPopupShown} />}
                <AuthRememberPasswordPopupConnect
                    onRememberEnd={() => this.setState({ restorePasswordPopupShown: false })}
                    restorePasswordPopupShown={this.state.restorePasswordPopupShown}
                />
                {this.loading && <View style={styles.authFormLoading}>
                    <ActivityIndicator size="small" color="#000000" />
                </View>}
            </KeyboardAvoidingView>
        )
    }

    renderBackgroundSun() {
        return (
            <View style={styles.BackgroundSun}>
                <BackgroundSunIcon />
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
                <AuthFormConnect
                    onForget={() => this.setState({ restorePasswordPopupShown: true })}
                />
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