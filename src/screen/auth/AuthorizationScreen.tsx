import React, { Dispatch } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    KeyboardAvoidingView,
} from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { NavigationParams, NavigationScreenProp, NavigationState } from 'react-navigation';
import { ThemeColor } from '../../constant/ThemeColor';
import { BackgroundSunIcon } from '../../component/icon/BackgroundSunIcon';
import { BackgroundMountainsIcon } from '../../component/icon/BackgroundMountainsIcon';
import { firebaseApp } from '../../app/FirebaseApp';
import "firebase/firestore";
import { shadowOptions } from '../../constant/shadowOptions';
import { connect } from 'react-redux';
import { IAppState } from '../../model/IAppState';
import { Action } from 'redux';
import { createUserChangeAction } from '../../store/modules/user/UserActionCreator';
import { IUser } from '../../model/IUser';
import { LinearGradient } from 'expo-linear-gradient';

interface AuthScreenProps {
    navigation: NavigationScreenProp<NavigationState, NavigationParams>
    filfullUser?: (user: IUser) => void;
    setUserInLoading?: () => void;
    setUserInLoaded?: () => void;
    user?: IUser
}

interface AuthScreenState {
    email: string
    password: string
}


export class AuthorizationScreen extends React.Component<AuthScreenProps, AuthScreenState>{
    state = {
        email: this.props.user.email || '',
        password: ''
    }

    static getDerivedStateFromProps(props: AuthScreenProps, state: AuthScreenState) {
        if (props.user.email === state.email) {
            return { ...state, email: props.user.email }
        }

        return state;
    }

    render() {
        return (
            <KeyboardAvoidingView behavior="padding" style={styles.AuthView}>

                {this.renderAuthForm()}
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

    // TODO: form does not exist in React Native
    renderAuthForm() {
        return (
            <View style={styles.AuthForm}>
                {this.renderBackgroundSun()}
                {this.renderBackgroundMountains()}
                <View style={styles.form}>

                    <LinearGradient
                        colors={['#F6F8FF', '#FFEBEB']}
                        style={styles.authFormGradient}
                    >
                        <Text style={styles.titleFormText}>
                            Авторизация
                        </Text>
                        <View style={styles.inputForm}>
                            <TextInput
                                style={styles.input}
                                value={this.state.email}
                                keyboardType={'email-address'}
                                placeholder={'Почта'}
                                onChangeText={(value) => this.setState({ email: value })}
                            />
                        </View>
                        <View style={styles.inputForm}>
                            <KeyboardAvoidingView behavior="padding">
                                <TextInput
                                    secureTextEntry
                                    style={styles.input}
                                    value={this.state.password}
                                    placeholder={'Пароль'}
                                    onChangeText={(value) => this.setState({ password: value })}
                                />
                            </KeyboardAvoidingView>
                        </View>
                        <View style={styles.formButtons}>
                            {this.renderSignInButton()}
                            {this.renderRegistrationButton()}
                            {
                                this.props.user && this.props.user.loading &&
                                <ActivityIndicator size="small" color="#000000" />
                            }
                        </View>
                    </LinearGradient>
                </View>
            </View >
        )
    }

    renderRegistrationButton() {
        return (
            <TouchableOpacity
                style={styles.registrationButton}
            >
                <Text style={styles.registrationButtonText}>
                    Зарегистрироваться
                </Text>
            </TouchableOpacity>
        )
    }

    renderSignInButton() {
        return (
            <TouchableOpacity onPress={() => this.signInWithEmailAndPassword()} >
                <View style={styles.signInButton}>
                    <Text style={styles.signInButtonText}>
                        Войти
                        </Text>
                </View>
            </TouchableOpacity>
        )
    }

    toRegistration = () => {
        this.props.navigation.navigate('Registration')
    }

    signInWithEmailAndPassword = async () => {
        this.props.setUserInLoading && this.props.setUserInLoading();
        try {
            await firebaseApp.auth()
                .signInWithEmailAndPassword(this.state.email, this.state.password)
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
}

export const AuthorizationScreenConnect = connect(
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
)(AuthorizationScreen)

const styles = StyleSheet.create({
    AuthView: {
        display: "flex",
        width: '100%',
        height: '100%',
        backgroundColor: '#F6F8FF',
        flexDirection: "column-reverse",
    },
    BackgroundSun: {
        position: "absolute",
        top: -300,
    },
    BackgroundMountains: {
        top: -100,
        right: 0,
        position: "absolute",
    },
    AuthForm: {
        width: '100%',
        height: '70%',
        position: "absolute",
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },

    form: {
        width: '100%',
        display: 'flex',
        borderTopLeftRadius: 55,
        borderTopRightRadius: 55,
        overflow: 'hidden'
    },

    authFormGradient: {
        width: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },

    inputForm: {
        margin: 10,
    },
    input: {
        width: 280,
        height: 30,

        padding: 5,
        borderRadius: 5,
        borderWidth: 2,

        textAlign: 'left',
        fontSize: 16,
        color: ThemeColor.TEXT_DARK_GRAY,

        borderColor: ThemeColor.TAN,
        backgroundColor: ThemeColor.WHITE,
    },
    titleFormText: {
        textAlign: 'center',
        fontFamily: 'Roboto',
        fontSize: 16,
        color: '#666666',
        margin: 10,
    },
    formButtons: {
        width: 280,
        height: 60,

        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 30,
    },
    registrationButton: {
        width: 160,
        height: 30,

        // marginLeft: 20,
        // paddingLeft: 10,

        // elevation: 2,
        // ...shadowOptions,

        // textAlign: 'center',
        borderWidth: 1,
        borderRadius: 15,
        justifyContent: 'center',
    },
    signInButton: {
        display: 'flex',
        padding: 10,
        margin: 10,
        width: 100,
        height: 50,

        borderWidth: 1,
        borderRadius: 15,
        borderColor: '#FFB4B4',
        backgroundColor: ThemeColor.WHITE,
        justifyContent: 'center',
        ...shadowOptions
    },
    registrationButtonText: {
        textAlign: 'center',
        fontFamily: 'Roboto',
        fontSize: 16,
        color: '#333333',
        textDecorationLine: 'underline',
    },
    signInButtonText: {
        textAlign: 'center',
        fontFamily: 'Roboto',
        fontSize: 19,
        color: '#333333',
    }
})


export default AuthorizationScreen;


{/* <TouchableOpacity onPress={() => this.props.navigation.navigate('NoteList')}>
                    <Text style={styles.text}>Go to Note List</Text>
                </TouchableOpacity> */}


