import React, { Dispatch } from 'react';
import {
    View,
    KeyboardAvoidingView,
    ActivityIndicator,
    Platform,
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

interface AuthScreenProps {
    navigation: NavigationScreenProp<NavigationState, NavigationParams>
    user?: IUser
}

class AuthScreen extends React.Component<AuthScreenProps> {
    render() {
        return (
            <View style={styles.AuthScreen}>
                <KeyboardAvoidingView
                    style={styles.avoidingView}
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                >
                    {this.renderAuthForm()}
                </KeyboardAvoidingView>
                {this.loading && <View style={styles.authFormLoading}>
                    <ActivityIndicator size="small" color="#000000" />
                </View>}
            </View>
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
