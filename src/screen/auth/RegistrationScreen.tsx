import React, { Dispatch } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
} from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { NavigationParams, NavigationScreenProp, NavigationState } from 'react-navigation';
import { ThemeColor } from '../../constant/ThemeColor';
import { BackgroundSunIcon } from '../../component/icon/BackgroundSunIcon';
import { BackgroundMountainsIcon } from '../../component/icon/BackgroundMountainsIcon';
import { firebaseApp } from '../../firebase-config';
import "firebase/firestore";
import { shadowOptions } from '../../constant/shadowOptions';
import { LinearGradient } from 'expo-linear-gradient';
import { IUser } from '../../model/IUser';
import { connect } from 'react-redux';
import { IAppState } from '../../model/IAppState';
import { Action } from 'redux';
import { createUserChangeAction } from '../../store/modules/user/UserActionCreator';

interface RegistrationScreenProps {
    navigation: NavigationScreenProp<NavigationState, NavigationParams>
    filfullUser?: (user: IUser) => void;
    setUserInLoading?: () => void;
    setUserInLoaded?: () => void;
    user?: IUser
}

interface RegistrationScreenState {
    email: string
    password: string
}

class RegistrationScreen extends React.Component<RegistrationScreenProps, RegistrationScreenState>{
    state = {
        email: '',
        password: ''
    }

    render() {
        return (
            <View style={styles.AuthView}>
                {this.renderBackgroundSun()}
                {this.renderBackgroundMountains()}
                {this.renderRegForm()}
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

    renderRegForm() {
        return (
            <View style={styles.AuthForm}>
                <LinearGradient
                    colors={['#F6F8FF', '#FFEBEB']}
                    style={styles.authFormGradient}
                />
                <View style={styles.form}>
                    <Text style={styles.titleFormText}>
                        Регистрация
                        </Text>
                    {this.renderInputBlock()}
                    <View style={styles.formButtons}>
                        {this.renderRegistrationButton()}
                        {this.renderToSignInButton()}
                        {
                            this.props.user && this.props.user.loading &&
                            <ActivityIndicator size="small" color="#000000" />
                        }
                    </View>
                </View>
            </View >
        )
    }

    renderInputBlock() {
        return (
            <View>
                <View style={styles.inputForm}>
                    {/* TODO:keyboardType doesnt work if make custom Input and  */}
                    <TextInput
                        style={styles.input}
                        value={this.state.email}
                        keyboardType={'email-address'} // TODO:
                        placeholder={'Почта'}
                        onChangeText={(value) => this.setState({ email: value })}
                    />
                </View>
                <View style={styles.inputForm}>
                    <TextInput
                        secureTextEntry
                        style={styles.input}
                        value={this.state.password}
                        placeholder={'Пароль'}
                        onChangeText={(value) => this.setState({ password: value })}
                    />
                </View>
            </View>
        )
    }

    renderRegistrationButton() {
        return (
            <TouchableOpacity
                onPress={this.signUpWithEmailAndPassword}
                style={styles.registrationButton}
            >
                <Text style={styles.registrationButtonText}>
                    Зарегистрироваться
                    </Text>
            </TouchableOpacity>
        )
    }

    renderToSignInButton() {
        return (
            <TouchableOpacity onPress={() => this.toRegistration()} >
                <View style={styles.signInButton}>
                    <Text style={styles.signInButtonText}>
                        У меня уже есть аккаунт
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }

    toRegistration = () => {
        this.props.navigation.navigate('Auth')
    }

    signUpWithEmailAndPassword = async () => {
        this.props.setUserInLoading && this.props.setUserInLoading();
        try {
            await firebaseApp.auth()
                .createUserWithEmailAndPassword(this.state.email, this.state.password)
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
                })
        } catch (e) {
            this.props.setUserInLoaded && this.props.setUserInLoaded();
            alert(e.message);
        };
    }
}

export const RegistrationScreenConnect = connect(
    (state: IAppState) => ({ user: state.user }),
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
)(RegistrationScreen)

const styles = StyleSheet.create({
    AuthView: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: '#F6F8FF',
    },
    BackgroundSun: {
        flex: 1,
        width: '100%',
        height: '100%',
        position: "absolute",
        top: 40,
    },
    BackgroundMountains: {
        flex: 1,
        width: '100%',
        height: '100%',
        position: "absolute",
    },
    AuthForm: {
        flex: 1,
        width: '100%',
        position: "relative",

        display: "flex",
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFEBEB',
        borderTopLeftRadius: 55,
        borderTopRightRadius: 55,
        marginTop: 280,
        overflow: 'hidden',
    },

    authFormGradient: {
        flex: 1,
        height: '100%',
        width: '100%',
    },

    form: {
        display: "flex",
        position: 'absolute',

        top: 16,

        flexDirection: 'column',
        alignItems: "center",
    },

    inputForm: {
        marginBottom: 35,
    },

    input: {
        width: 280,

        padding: 10,
        borderRadius: 5,
        borderWidth: 2,

        textAlign: 'left',
        fontSize: 16,
        color: ThemeColor.TEXT_DARK_GRAY,

        borderColor: '#FFC19C',
        backgroundColor: ThemeColor.WHITE,
    },
    titleFormText: {
        textAlign: 'center',
        fontSize: 18,
        color: '#333333',
        margin: 22,
        marginRight: 0,
        marginLeft: 0,
        fontWeight: 'bold',
    },

    formButtons: {
        flex: 1,
        width: 280,

        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    registrationButton: {
        position: 'relative',
        padding: 10,
        margin: 10,
        borderRadius: 15,
        justifyContent: 'center',
        height: 50,

        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#2E3858',
        ...shadowOptions
    },
    signInButton: {
        display: 'flex',
        padding: 10,

        justifyContent: 'center',
    },
    registrationButtonText: {
        textAlign: 'center',
        fontFamily: 'Roboto',
        fontSize: 19,
        color: '#333333',
    },
    signInButtonText: {
        textAlign: 'center',
        fontFamily: 'Roboto',
        fontSize: 16,
        color: '#333333',
        textDecorationLine: 'underline',
    }
})