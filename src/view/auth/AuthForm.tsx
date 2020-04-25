import React from 'react'
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { AuthButtonGoogle, AuthButtonGoogleConnect } from './button/AuthButtonGoogle';
import { styles } from './Style';
import { IUser } from '../../model/IUser';
import { connect } from 'react-redux';
import { IStorage } from '../../model/IStorage';
import { createEmailAuthAction } from '../../store/service/auth/EmailAuthSaga';
import { createEmailSignUpAction } from '../../store/service/auth/EmailSignUpSaga';
import { ScrollView } from 'react-native-gesture-handler';

enum AuthFormMode {
    AUTH = 'auth',
    REG = 'reg'
}

enum AuthType {
    EMAIL = 'email',
    GOOGLE = 'google'
}

interface Props {
    user?: IUser
    loading?: boolean
    isPasswordRestore?: boolean

    onEmailLogin?: (email: string, password: string) => void
    onEmailSignUp?: (email: string, password: string) => void

    onForget?: (email: string) => void
}

interface State {
    email?: string,
    password?: string,
    checkPassword?: string
    mode: AuthFormMode
    authType: AuthType
}

export class AuthForm extends React.Component<Props, State> {
    state = {
        email: "",
        password: "",
        checkPassword: "",
        mode: AuthFormMode.AUTH,
        authType: AuthType.GOOGLE,
    }

    changeAuthType = () => {
        this.setState({
            authType: this.state.authType === AuthType.EMAIL ?
                AuthType.GOOGLE :
                AuthType.EMAIL
        })
    }

    render() {
        return (
            <View style={styles.authForm}>
                <LinearGradient
                    colors={['#F6F8FF', '#FFEBEB']}
                    style={styles.authFormGradient}
                >
                    {this.renderTitleFormTitle()}
                    {this.renderAuthBlock()}
                </LinearGradient>
            </View>
        )
    }

    renderTitleFormTitle() {
        const { mode } = this.state;
        return (
            <Text style={styles.authFormTitle}>
                {mode === AuthFormMode.AUTH ? "Авторизация" : "Регистрация"}
            </Text>
        )
    }

    renderAuthBlock() {
        if (this.state.authType === AuthType.GOOGLE) {
            return this.renderSocialButtons()
        }
        return this.renderAuthForm()
    }

    renderSocialButtons() {
        return <View style={styles.socialButton}>
            <AuthButtonGoogleConnect />
            <TouchableOpacity
                style={styles.authOption}
                onPress={this.changeAuthType}
            >
                <Text style={styles.authOptionText}>
                    {'Или войти с email'}
                </Text>
            </TouchableOpacity>
        </View>
    }

    renderAuthForm() {
        const { mode } = this.state;
        return [
            <View key={'email'} style={styles.authFormInputForm}>
                <TextInput
                    style={styles.authFormInputFormInput}
                    value={this.state.email}
                    keyboardType={'email-address'}
                    textContentType={'emailAddress'}
                    placeholder={'Почта'}
                    onChangeText={(value) => this.setState({ email: value })}
                />
            </View>,
            <View key={'pw'} style={styles.authFormInputForm}>
                <TextInput
                    secureTextEntry
                    style={styles.authFormInputFormInput}
                    value={this.state.password}
                    placeholder={'Пароль'}
                    onChangeText={(value) => this.setState({ password: value })}
                    keyboardType={'default'}
                />
            </View>,
            mode === AuthFormMode.AUTH && (
                <TouchableOpacity
                    key={'forgetpw'}
                    onPress={() => this.props.onForget(this.state.email)}
                    style={styles.authFormInputForget}
                >
                    <Text style={styles.authFormInputForgetText}>
                        {this.props.isPasswordRestore
                            ? 'Проверьте почту. Отправить снова?'
                            : 'Забыли пароль?'
                        }
                    </Text>
                </TouchableOpacity>
            ),
            mode === AuthFormMode.REG && (
                <View key={'pwrepeat'} style={styles.authFormInputForm}>
                    <TextInput
                        secureTextEntry
                        style={styles.authFormInputFormInput}
                        value={this.state.checkPassword}
                        placeholder={'Повторите пароль'}
                        onChangeText={(value) => this.setState({ checkPassword: value })}
                    />
                </View>
            ),
            <View key={'buttons'} style={styles.authFormButtons}>
                {this.renderActionButton()}
                {this.renderChangeModeButton()}
            </View>,
            <TouchableOpacity
                key={'authoption'}
                style={styles.authOption}
                onPress={this.changeAuthType}
            >
                <Text style={styles.authOptionText}>
                    {'Или войти с Google'}
                </Text>
            </TouchableOpacity>
        ]
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
            this.props.onEmailLogin(this.state.email, this.state.password) :
            this.state.password === this.state.checkPassword ?
                this.props.onEmailSignUp(this.state.email, this.state.password) :
                alert("Пароли не совпадают!")
    }

    onChangeModeButtonPress = () => this.setState({
        mode: this.state.mode === AuthFormMode.AUTH ? AuthFormMode.REG : AuthFormMode.AUTH
    })
}

export const AuthFormConnect = connect(
    (state: IStorage) => ({ user: state.user }),
    (dispatch) => ({ dispatch }),
    (stateProps, { dispatch }, ownProps) => {
        return {
            ...stateProps,
            ...ownProps,
            loading: stateProps.user.loading,
            onEmailLogin: (email: string, password: string) => dispatch(
                createEmailAuthAction(email, password)
            ),
            onEmailSignUp: (email: string, password: string) => dispatch(
                createEmailSignUpAction(email, password)
            )
        }
    }
)(AuthForm)
