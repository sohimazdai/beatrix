import React, { Dispatch } from 'react';
import {
    View,
    KeyboardAvoidingView,
} from 'react-native';
import { NavigationParams, NavigationScreenProp, NavigationState } from 'react-navigation';
import { BackgroundSunIcon } from '../../component/icon/BackgroundSunIcon';
import { BackgroundMountainsIcon } from '../../component/icon/BackgroundMountainsIcon';
import { firebaseApp } from '../../config/firebase-config';
import "firebase/firestore";
import { connect } from 'react-redux';
import { IStorage } from '../../model/IStorage';
import { Action } from 'redux';
import { createUserChangeAction } from '../../store/modules/user/UserActionCreator';
import { IUser } from '../../model/IUser';
import { AuthForm, AuthFormConnect } from '../../view/auth/AuthForm';
import { Popup } from '../../component/popup/Popup';
import { TextInput, ScrollView } from 'react-native-gesture-handler';
import { Fader } from '../../component/Fader';
import { styles } from './Style';
import { AuthRememberPasswordPopupConnect } from '../../view/auth/password-recovery-popup/AuthPasswordRecoveryPopup';

interface AuthScreenProps {
    navigation: NavigationScreenProp<NavigationState, NavigationParams>
    filfullUser?: (user: IUser) => void;
    setUserInLoading?: () => void;
    setUserInLoaded?: () => void;
    user?: IUser
}

interface AuthScreenState {
    restorePasswordPopupShown: boolean
    restorePasswordEmail?: string
    // shown?: boolean
}

class AuthScreen extends React.Component<AuthScreenProps, AuthScreenState> {
    state = {
        restorePasswordEmail: "",
        restorePasswordPopupShown: false,
        // shown: false
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
                    loading={this.loading}
                    onRegistration={this.signUpWithEmailAndPassword}
                    onForget={() => this.setState({ restorePasswordPopupShown: true })}
                />
            </View >
        )
    }

    get loading() {
        const { user } = this.props;
        return user && user.loading
    }

    signUpWithEmailAndPassword = async (email: string, password: string) => {
        this.props.setUserInLoading && this.props.setUserInLoading();
        try {
            await firebaseApp.auth()
                .createUserWithEmailAndPassword(email, password)
                .then((data) => {
                    const userData = {
                        id: data.user.uid,
                        email: data.user.email,
                        name: data.user.email.split('@')[0],
                        isAuthed: false
                    }
                    return userData
                })
                .then((data) => {
                    this.props.filfullUser && this.props.filfullUser(data);
                    alert(JSON.stringify(data))
                    this.sendVerificationEmail()
                    return data
                }).then((data) => {
                    const verificationPendingData = {
                        ...data,
                        isPendingVerification: true
                    };
                })
        } catch (e) {
            this.props.setUserInLoaded && this.props.setUserInLoaded();
            alert(e.message);
        };
    }

    sendVerificationEmail = async () => {
        this.props.setUserInLoading && this.props.setUserInLoading();
        try {
            await firebaseApp.auth().currentUser
                .sendEmailVerification();
        } catch (e) {
            this.props.setUserInLoaded && this.props.setUserInLoaded();
            alert(e.message);
        }
    }
}

export const AuthScreenConnect = connect(
    (state: IStorage) => ({ user: state.user }),
    (dispatch: Dispatch<Action>) => ({ dispatch }),
    (stateProps, { dispatch }, ownProps) => {
        return {
            ...stateProps,
            ...ownProps,
            setUserInLoading() {
                dispatch(createUserChangeAction({ loading: true }))
            },
            setUserInLoaded() {
                dispatch(createUserChangeAction({ loading: false }))
            },
            filfullUser(user: IUser) {
                dispatch(createUserChangeAction({
                    ...stateProps.user,
                    ...user,
                    loading: false
                }))
            }
        }
    }
)(AuthScreen)
