import React from 'react'
import { View, Text } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { AuthButtonGoogleConnect } from './button/AuthButtonGoogle';
import { styles } from './Style';
import { IUser } from '../../model/IUser';
import { connect } from 'react-redux';
import { IStorage } from '../../model/IStorage';
import { AuthProblemResolver } from '../../screen/auth/auth-problem-resolver/AuthProblemResolver';

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
    installationLoading?: boolean
}

interface State {
    authType: AuthType
}

export class AuthForm extends React.Component<Props, State> {
    state = {
        email: "",
        password: "",
        checkPassword: "",
        authType: AuthType.GOOGLE,
    }

    render() {
        return (
            <View style={styles.authForm}>
                <LinearGradient
                    colors={['#F6F8FF', '#FFEBEB']}
                    style={styles.authFormGradient}
                >
                    {this.renderTitleFormTitle()}
                    {this.renderSocialButtons()}
                </LinearGradient>
            </View>
        )
    }

    renderTitleFormTitle() {
        return (
            <Text style={styles.authFormTitle}>
                {"Авторизация"}
            </Text>
        )
    }

    renderSocialButtons() {
        return <View style={styles.socialButton}>
            <AuthButtonGoogleConnect />
        </View>
    }
}

export const AuthFormConnect = connect(
    (state: IStorage) => ({
        user: state.user,
        isPasswordRestored: state.interactive.isPasswordRestored,
        installationLoading: state.user.installationLoading,
    }),
    (dispatch) => ({ dispatch }),
    (stateProps, ownProps) => {
        return {
            ...stateProps,
            ...ownProps,
            loading: stateProps.user.loading,
        }
    }
)(AuthForm)
