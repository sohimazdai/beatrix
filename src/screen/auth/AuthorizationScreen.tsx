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
        email: '',
        password: ''
    }

    static getDerivedStateFromProps(props: AuthScreenProps, state: AuthScreenState) {
        if (props.user.email) {
            return {...state, email: props.user.email}
        }

        return state;
    }

    render() {
        return (
            <View style={styles.AuthView}>
                <View style={styles.BackgroundAuth}>
                    {this.renderBackgroundSun()}
                    {this.renderBackgroundMountains()}
                    {this.renderAuthForm()}
                </View>
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

    // TODO: form does not exist in React Native
    renderAuthForm() {
        return (
            <View style={styles.AuthForm}>
                <LinearGradient
                    colors={['#F6F8FF', '#FFEBEB']}
                    style={styles.authFormGradient}
                />
                <View style={styles.form}>
                    <Text style={styles.titleFormText}>
                        Авторизация
                        </Text>
                    {this.renderInputBlock()}
                    <View style={styles.formButtons}>
                        {this.renderSignInButton()}
                        {this.renderRegistrationButton()}
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
                        style={styles.input}
                        value={this.state.password}
                        keyboardType={'visible-password'} //TODO:
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
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: '#D6E5ED',
    },
    BackgroundAuth: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    BackgroundSun: {
        flex: 1,
        width: '100%',
        height: '100%',
        position: "absolute",
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
        height: '70%',
        position: "absolute",
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFEBEB',
        borderRadius: 40,
        marginTop: 280,
        overflow: 'hidden',
    },

    authFormGradient: {
        flex: 1,
        height: '100%',
        width: '100%',
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
        flex: 1,
        marginTop: 8,
        width: 280,
        height: 60,

        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
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
    },
    form: {
        
    }
})


export default AuthorizationScreen;


{/* <TouchableOpacity onPress={() => this.props.navigation.navigate('NoteList')}>
                    <Text style={styles.text}>Go to Note List</Text>
                </TouchableOpacity> */}


