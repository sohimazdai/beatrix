import React from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { NavigationParams, NavigationScreenProp, NavigationState } from 'react-navigation';
import { ThemeColor } from '../../constant/ThemeColor';
import { BackgroundSunIcon } from '../../component/icon/BackgroundSunIcon';
import { BackgroundMountainsIcon } from '../../component/icon/BackgroundMountainsIcon';
import { firebaseApp } from '../../firebase-config';
import "firebase/firestore";
import { shadowOptions } from '../../constant/shadowOptions';

interface RegistrationScreenProps {
    navigation: NavigationScreenProp<NavigationState, NavigationParams>
}

interface RegistrationScreenState {
    email: string
    password: string
}

class RegistrationScreen extends React.Component<RegistrationScreenProps, RegistrationScreenState>{

    state = {
        email: '',
        password: '',
    }

    render() {
        return (
            <View style={styles.AuthView}>
                {this.renderBackgroundSun()}
                {this.renderBackgroundMountains()}
                {this.renderAuthForm()}
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
                <View style={styles.form}>
                    <Text style={styles.titleFormText}>
                        Регистрация
                    </Text>
                    {this.renderInputBlock()}
                    <View style={styles.formButtons}>
                        {this.renderRegistrationButton()}
                        {this.renderToAuthButton()}
                    </View>
                </View>
            </View>
        )
    }

    renderInputBlock() {
        return (
            <View>
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
                    <TextInput
                        secureTextEntry
                        style={styles.input}
                        value={this.state.password}
                        keyboardType={'visible-password'}
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
                onPress={this.createUserWithEmailAndPassword}
                style={styles.registrationButton}
            >
                <Text style={styles.registrationButtonText}>
                    Зарегистрироваться
                </Text>
            </TouchableOpacity>
        )
    }

    renderToAuthButton() {
        return (
            <TouchableOpacity onPress={this.toAuth} >
                <View style={styles.signInButton}>
                    <Text style={styles.signInButtonText}>
                        У меня уже есть аккаунт
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }

    createUserWithEmailAndPassword = () => {
        firebaseApp.auth()
            .createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => {
                this.props.navigation.navigate('NoteList')
            })
            .catch(function (error) {
                var errorMessage = error.message;
                alert(errorMessage);
            });
    }

    toAuth = () => {
        this.props.navigation.navigate('Auth')
    }
}

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
        padding: 10,
        margin: 10,

        borderWidth: 1,
        borderRadius: 15,
        backgroundColor: ThemeColor.WHITE,
        justifyContent: 'center',
        ...shadowOptions,
    },
    signInButton: {
        display: 'flex',
        padding: 10,

        borderRadius: 15,
        borderColor: '#FFB4B4',
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
        textDecorationLine: 'underline'
    },
})


export default RegistrationScreen;