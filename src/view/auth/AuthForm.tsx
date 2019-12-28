import React from 'react'
import { View, StyleSheet, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { ThemeColor } from '../../constant/ThemeColor';
import { shadowOptions } from '../../constant/shadowOptions';

enum AuthFormMode {
    AUTH = 'auth',
    REG = 'reg'
}

interface Props {
    loading?: boolean

    onSignIn?: (email: string, password: string) => void
    onRegistration?: (email: string, password: string) => void
    onForget?: (email: string) => void
}

interface State {
    email?: string,
    password?: string,
    checkPassword?: string
    mode: AuthFormMode
}

export class AuthForm extends React.Component<Props, State> {
    state = {
        email: "",
        password: "",
        checkPassword: "",
        mode: AuthFormMode.AUTH
    }

    render() {
        const { loading } = this.props;
        const { mode } = this.state;
        return (
            <View style={styles.authForm}>
                <LinearGradient
                    colors={['#F6F8FF', '#FFEBEB']}
                    style={styles.authFormGradient}
                >
                    <Text style={styles.authFormTitle}>
                        {mode === AuthFormMode.AUTH ? "Авторизация" : "Регистрация"}
                    </Text>
                    <View style={styles.authFormInputForm}>
                        <TextInput
                            style={styles.authFormInputFormInput}
                            value={this.state.email}
                            keyboardType={'email-address'}
                            placeholder={'Почта'}
                            onChangeText={(value) => this.setState({ email: value })}
                        />
                    </View>
                    <View style={styles.authFormInputForm}>
                        <TextInput
                            secureTextEntry
                            style={styles.authFormInputFormInput}
                            value={this.state.password}
                            placeholder={'Пароль'}
                            onChangeText={(value) => this.setState({ password: value })}
                        />
                    </View>
                    {mode === AuthFormMode.AUTH && <TouchableOpacity
                        onPress={() => this.props.onForget(this.state.email)}
                        style={styles.authFormInputForget}
                    >
                        <Text style={styles.authFormInputForgetText}>
                            Забыли пароль?
                        </Text>
                    </TouchableOpacity>}
                    {mode === AuthFormMode.REG && <View style={styles.authFormInputForm}>
                        <TextInput
                            secureTextEntry
                            style={styles.authFormInputFormInput}
                            value={this.state.checkPassword}
                            placeholder={'Повторите пароль'}
                            onChangeText={(value) => this.setState({ checkPassword: value })}
                        />
                    </View>}
                    <View style={styles.authFormButtons}>
                        {this.renderActionButton()}
                        {this.renderChangeModeButton()}

                    </View>
                    {loading && <View style={styles.authFormLoading}>
                        <ActivityIndicator size="small" color="#000000" />
                    </View>}
                </LinearGradient>
            </View>
        )
    }

    renderActionButton() {
        const { mode } = this.state;
        return (
            <TouchableOpacity onPress={this.onActionButtonPress} >
                <View style={styles.authFormButtonAction}>
                    <Text style={styles.authFormButtonActionText}>
                        {mode === AuthFormMode.AUTH ? "Войти" : "Зарегистрироваться"}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }

    renderChangeModeButton() {
        const { mode } = this.state;
        return (
            <TouchableOpacity
                onPress={this.onChangeModeButtonPress}
                style={styles.authFormButtonChangeMode}
            >
                <Text style={styles.authFormButtonChangeModeText}>
                    {mode === AuthFormMode.AUTH ? "Регистрация" : "У меня уже есть аккаунт!"}
                </Text>
            </TouchableOpacity>
        )
    }

    onActionButtonPress = () => {
        const { mode } = this.state;
        mode === AuthFormMode.AUTH ?
            this.props.onSignIn(this.state.email, this.state.password) :
            this.state.password === this.state.checkPassword ?
                this.props.onRegistration(this.state.email, this.state.password) :
                alert("Пароли не совпадают!")
    }

    onChangeModeButtonPress = () => this.setState({
        mode: this.state.mode === AuthFormMode.AUTH ? AuthFormMode.REG : AuthFormMode.AUTH
    })
}

const styles = StyleSheet.create({
    authForm: {
        position: 'relative',
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
    authFormTitle: {
        textAlign: 'center',
        fontSize: 18,
        color: '#333333',
        margin: 22,
        marginRight: 0,
        marginLeft: 0,
        fontWeight: 'bold',
    },
    authFormInputForm: {
        marginBottom: 35
    },
    authFormInputFormInput: {
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
    authFormButtons: {
        width: 280,

        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        marginBottom: 30,
    },
    authFormButtonChangeMode: {
        padding: 10,
        borderRadius: 15,
        justifyContent: 'center',
    },
    authFormButtonChangeModeText: {
        textAlign: 'center',
        fontFamily: 'Roboto',
        fontSize: 16,
        color: '#333333',
        textDecorationLine: 'underline',
    },
    authFormButtonAction: {
        display: 'flex',
        padding: 10,
        margin: 10,
        height: 50,

        borderWidth: 1,
        borderRadius: 15,
        borderColor: '#FFB4B4',
        backgroundColor: ThemeColor.WHITE,
        justifyContent: 'center',
        ...shadowOptions
    },
    authFormButtonActionText: {
        textAlign: 'center',
        fontFamily: 'Roboto',
        fontSize: 19,
        color: '#333333',
    },
    authFormInputForget: {
        width: 280,
        backgroundColor: "rgba(250,250,250, 0.1)",
        marginTop: -20,
        marginBottom: 20,
    },
    authFormInputForgetText: {
        textAlign: 'left',
        textDecorationLine: 'underline',
    },
    authFormLoading: {
        position: 'absolute',
        top: 0,
        height: "100%",
        width: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.2)",

        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
});