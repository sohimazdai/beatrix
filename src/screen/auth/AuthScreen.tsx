import React, { Dispatch } from 'react';
import {
    View,
    StyleSheet,
    KeyboardAvoidingView,
    TouchableOpacity,
    Text,
} from 'react-native';
import { NavigationParams, NavigationScreenProp, NavigationState } from 'react-navigation';
import { BackgroundSunIcon } from '../../component/icon/BackgroundSunIcon';
import { BackgroundMountainsIcon } from '../../component/icon/BackgroundMountainsIcon';
import { firebaseApp } from '../../firebase-config';
import "firebase/firestore";
import { connect } from 'react-redux';
import { IStorage } from '../../model/IStorage';
import { Action } from 'redux';
import { createUserChangeAction } from '../../store/modules/user/UserActionCreator';
import { IUser } from '../../model/IUser';
import { AuthForm } from '../../view/auth/AuthForm';
import { Popup } from '../../component/popup/Popup';
import { TextInput } from 'react-native-gesture-handler';
import { Fader } from '../../component/Fader';
import { styles } from './Style';

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
}

class AuthScreen extends React.Component<AuthScreenProps, AuthScreenState>{
    state = {
        restorePasswordEmail: "",
        restorePasswordPopupShown: false,
    }

    render() {
        return (
            <KeyboardAvoidingView behavior="padding" style={styles.AuthView}>
                {this.renderAuthForm()}
                <Fader hidden={!this.state.restorePasswordPopupShown} />
                <Popup hidden={!this.state.restorePasswordPopupShown}>
                    <View style={styles.authScreenRestorePasswordView}>
                        <Text style={styles.authScreenRestorePasswordViewTitle}>
                            Восстановление пароля
                                </Text>
                        <TextInput
                            style={styles.input}
                            value={this.state.restorePasswordEmail}
                            keyboardType={'email-address'}
                            placeholder={'Почта'}
                            onChangeText={(value) => this.setState({ restorePasswordEmail: value })}
                        />
                        <View style={styles.rememberButton}>
                            <TouchableOpacity
                                onPress={() => this.rememberPassword(this.state.restorePasswordEmail)}
                                style={styles.rememberButtonTouchable}
                            >
                                <Text>
                                    Напомнить
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.cancelRememberButton}>
                            <TouchableOpacity
                                onPress={() => this.setState({ restorePasswordPopupShown: false })}
                            >
                                <Text>
                                    Отмена
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Popup>
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
                <AuthForm
                    loading={this.loading}
                    onSignIn={this.signInWithEmailAndPassword}
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

    signInWithEmailAndPassword = async (email: string, password: string) => {
        this.props.setUserInLoading && this.props.setUserInLoading();
        try {
            await firebaseApp.auth()
                .signInWithEmailAndPassword(email, password)
                .then((data) => {
                    const userData = {
                        id: data.user.uid,
                        email: data.user.email,
                        name: data.user.email.split('@')[0],
                        isAuthed: true
                    }
                    return userData
                })
                .then((data) => {
                    this.props.filfullUser && this.props.filfullUser(data)
                    this.props.navigation.navigate('NoteList')
                })
        } catch (e) {
            this.props.setUserInLoaded && this.props.setUserInLoaded();
            alert(e.message);
        };
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

    rememberPassword = async (email: string) => {
        this.props.setUserInLoading && this.props.setUserInLoading();
        try {
            await firebaseApp.auth()
                .sendPasswordResetEmail(email)
                .then((data) => {
                    alert(JSON.stringify(data))
                    this.props.filfullUser && this.props.filfullUser({})
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