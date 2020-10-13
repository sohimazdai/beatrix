import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { AuthButtonGoogleConnect } from './button/AuthButtonGoogle';
import { IUser } from '../../model/IUser';
import { connect } from 'react-redux';
import { IStorage } from '../../model/IStorage';
import { AuthProblemResolver } from '../../screen/auth/AuthProblemResolver/AuthProblemResolver';
import { i18nGet } from '../../localisation/Translate';
import { COLOR } from '../../constant/Color';
import { SHADOW_OPTIONS } from '../../constant/ShadowOptions';

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
                    <AuthProblemResolver />
                    {this.renderSocialButtons()}
                </LinearGradient>
            </View>
        )
    }

    renderTitleFormTitle() {
        return (
            <Text style={styles.authFormTitle}>
                {i18nGet('sign_in')}
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
        display: 'flex',
        width: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    authFormTitle: {
        textAlign: 'center',
        fontSize: 20,
        color: '#333333',
        margin: 22,
        marginRight: 0,
        marginLeft: 0,
    },
    socialButton: {
        marginTop: 30,
        marginBottom: 50
    },
    authOption: {
        margin: 20,
    },
    authOptionText: {
        color: '#333333',
        fontSize: 16,
        textAlign: 'center',
    },
    avoidingView: {
        justifyContent: 'flex-end',
    },
    authFormInputForm: {
        marginBottom: 15
    },
    authFormInputFormInput: {
        width: 280,

        padding: 10,
        borderRadius: 5,
        borderWidth: 2,

        textAlign: 'left',
        fontSize: 16,
        color: COLOR.TEXT_DARK_GRAY,

        borderColor: '#FFC19C',
        backgroundColor: COLOR.WHITE,
    },
    authFormButtons: {
        width: 280,

        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        marginBottom: 0,
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

        borderRadius: 15,
        backgroundColor: '#2E3858',
        justifyContent: 'center',
        ...SHADOW_OPTIONS
    },
    authFormButtonActionText: {
        textAlign: 'center',
        fontFamily: 'Roboto',
        fontSize: 19,
        color: '#FFFFFF',
    },
    authFormInputForget: {
        width: 280,
        backgroundColor: "rgba(250,250,250, 0.1)",
        marginBottom: 20,
    },
    authFormInputForgetText: {
        textAlign: 'left',
        textDecorationLine: 'underline',
    },
    errorHintText: {
        padding: 20,
        textAlign: 'center',
        fontSize: 16,
        color: 'crimson'
    }
});
