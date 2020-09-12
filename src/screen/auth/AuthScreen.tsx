import React, { Dispatch } from 'react';
import {
    View,
    ActivityIndicator,
    Dimensions,
    Text,
    StyleSheet,
} from 'react-native';
import { NavigationParams, NavigationScreenProp, NavigationState } from 'react-navigation';
import { BackgroundSunIcon } from '../../component/icon/BackgroundSunIcon';
import { BackgroundMountainsIcon } from '../../component/icon/BackgroundMountainsIcon';
import { connect } from 'react-redux';
import { IStorage } from '../../model/IStorage';
import { Action } from 'redux';
import { IUser } from '../../model/IUser';
import { AuthFormConnect } from '../../view/auth/AuthForm';
import { LinearGradient } from 'expo-linear-gradient'
import { i18nGet, getLocale } from '../../localisation/Translate';
import { appAnalytics, AnalyticsSections } from '../../app/Analytics';
import { SHADOW_OPTIONS } from '../../constant/ShadowOptions';
import { COLOR } from '../../constant/Color';

interface AuthScreenProps {
    navigation: NavigationScreenProp<NavigationState, NavigationParams>
    user?: IUser
}

class AuthScreen extends React.Component<AuthScreenProps> {
    componentDidMount() {
        appAnalytics.setSection(AnalyticsSections.AUTH);
        appAnalytics.sendEvent(appAnalytics.events.AUTH_SCREEN_SEEN);

        appAnalytics.setUserProperties({
            locale: getLocale(),
        });
    }

    render() {
        return (
            <LinearGradient
                colors={['#F6F8FF', '#FFEBEB']}
                style={styles.AuthScreen}
            >
                {this.renderAuthForm()}
                {this.loading && <View style={styles.authFormLoading}>
                    <ActivityIndicator size="small" color="#000000" />
                </View>}
                {!this.loading && this.props.user.installationLoading && (
                    <View style={styles.authFormInstallationLoading}>
                        <ActivityIndicator size="small" color="#000000" />
                        <Text style={styles.authFormInstallationText}>
                            {i18nGet('looking_for_active_session')}
                        </Text>
                    </View>
                )}
            </LinearGradient>
        )
    }

    renderBackgroundSun() {
        const width = Dimensions.get('screen').width;
        const height = Dimensions.get('screen').height;
        return (
            <View style={styles.BackgroundSun}>
                <BackgroundSunIcon width={width} height={height} />
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
                <AuthFormConnect />
            </View >
        )
    }

    get loading() {
        return this.props.user.loading
    }
}

export const AuthScreenConnect = connect(
    (state: IStorage) => ({ user: state.user }),
    () => ({}),
    (stateProps, { }, ownProps) => {
        return {
            ...stateProps,
            ...ownProps,
        }
    }
)(AuthScreen)

const styles = StyleSheet.create({
    AuthScreen: {
        display: 'flex',
        height: '100%',
        width: '100%',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    avoidingView: {
        justifyContent: 'flex-end'
    },
    scrollView: {
        display: 'flex',
    },
    BackgroundSun: {
        position: "absolute",
        top: -400,
    },
    BackgroundMountains: {
        top: -100,
        right: 0,
        position: "absolute",
    },
    AuthForm: {
        maxWidth: 480,
        width: '100%',
        position: "relative",

        display: "flex",
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },

    form: {
        width: '100%',
        display: 'flex',
        borderTopLeftRadius: 55,
        borderTopRightRadius: 55,
        overflow: 'hidden',
    },

    authFormGradient: {
        width: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        ...SHADOW_OPTIONS,
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
        color: COLOR.TEXT_DARK_GRAY,

        borderColor: '#FFC19C',
        backgroundColor: COLOR.WHITE,
    },
    rememberButton: {
        width: 150,
        height: 40,
        margin: 10,
        marginTop: 20,
        borderRadius: 10,
        backgroundColor: "white",
        ...SHADOW_OPTIONS
    },
    rememberButtonTouchable: {
        width: '100%',
        height: '100%',

        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    cancelRememberButton: {
        width: 150,
        height: 40,
        display: 'flex',
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        textDecorationLine: 'underline',
        textDecorationColor: 'black',
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
        width: 280,

        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        marginBottom: 30,
    },
    registrationButton: {
        padding: 10,
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
        backgroundColor: COLOR.WHITE,
        justifyContent: 'center',
        ...SHADOW_OPTIONS
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

    authScreenRestorePasswordView: {
        position: 'relative',
        width: 300,

        display: 'flex',
        justifyContent: 'space-evenly',
        flexDirection: 'column',
        alignItems: 'center',

        backgroundColor: 'white',
        borderRadius: 10,
        ...SHADOW_OPTIONS
    },
    authScreenRestorePasswordViewTitle: {
        height: 30,
        fontSize: 18,
        color: '#333333',
        margin: 20,
    },
    authFormInstallationLoading: {
        position: 'absolute',
        top: 30,
        left: 16,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    authFormInstallationText: {
        color: COLOR.TEXT_DARK_GRAY,
        marginLeft: 8,
        fontSize: 15,
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
    },
})
