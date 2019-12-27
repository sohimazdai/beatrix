import React, { Dispatch } from 'react';
import {
    View,
    StyleSheet,
    KeyboardAvoidingView,
} from 'react-native';
import { NavigationParams, NavigationScreenProp, NavigationState } from 'react-navigation';
import { ThemeColor } from '../constant/ThemeColor';
import { BackgroundSunIcon } from '../component/icon/BackgroundSunIcon';
import { BackgroundMountainsIcon } from '../component/icon/BackgroundMountainsIcon';
import { firebaseApp } from '../app/FirebaseApp';
import "firebase/firestore";
import { shadowOptions } from '../constant/shadowOptions';
import { connect } from 'react-redux';
import { IStorage } from '../model/IStorage';
import { Action } from 'redux';
import { createUserChangeAction } from '../store/modules/user/UserActionCreator';
import { IUser } from '../model/IUser';
import { AuthForm } from '../view/auth/AuthForm';


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

export class AuthScreen extends React.Component<AuthScreenProps, AuthScreenState>{
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
                <AuthForm
                    loading={this.loading}
                    onSignIn={this.signInWithEmailAndPassword}
                    onRegistration={this.signUpWithEmailAndPassword}
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


