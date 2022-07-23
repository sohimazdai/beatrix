import React, { useCallback, useMemo } from 'react';
import { StyleSheet, View, Text, Alert } from 'react-native';
import { connect } from 'react-redux';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SHADOW_OPTIONS } from '../../../constant/ShadowOptions';
import { GoogleLogoIcon } from '../../../component/icon/GoogleLogoIcon';
import { createGoogleAuthAction } from '../../../store/service/auth/GoogleAuthSaga';
import { i18nGet } from '../../../localisation/Translate';
import { appAnalytics } from '../../../app/Analytics';
import { IStorage } from '../../../model/IStorage';
import { createAppPingAction } from '../../../store/service/app/AppPingSaga';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { googleAuthConfig } from '../../../config/googleAuthConfig';
import { IconPositionType, StyledButton, StyledButtonType } from '../../../component/button/StyledButton';

interface Props {
    userLoading: boolean;
    onGoogleSignin?: (accessToken: string) => void;
}

// https://docs.expo.dev/versions/latest/sdk/auth-session/
WebBrowser.maybeCompleteAuthSession();

export function AuthButtonGoogle(props: Props) {
    const { userLoading, onGoogleSignin } = props;

    const [request, response, promptAsync] = Google.useAuthRequest(googleAuthConfig);

    React.useEffect(() => {
        if (response?.type === "success") {
            onGoogleSignin(response.authentication.accessToken);
        } else { }
    }, [response]);

    const renderDescription = useMemo(() => {
        return i18nGet('sign_in_with_google');
    }, [i18nGet])

    const handlePromptAsync = useCallback(() => promptAsync(), [promptAsync])

    return (
        <View style={styles.socialAuthButton}>
            <TouchableOpacity
                disabled={!request}
                style={styles.touchable}
                onPress={handlePromptAsync}
            >
                <View style={styles.buttonContent}>
                    <View style={styles.icon}>
                        <GoogleLogoIcon />
                    </View>
                    <Text style={styles.buttonContentText}>
                        {renderDescription}
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export const AuthButtonGoogleConnect = connect(
    (state: IStorage) => ({
        app: state.app,
        userLoading: state.user.loading,
    }),
    (dispatch) => ({
        signInWithGoogle: (accessToken: string) => dispatch(createGoogleAuthAction(accessToken)),
        ping: () => dispatch(createAppPingAction()),
    }),
    (stateProps, dispatchProps, ownProps) => {
        return {
            ...stateProps,
            ...ownProps,
            onGoogleSignin: (accessToken: string) => {
                if (stateProps.app.networkConnected) {
                    appAnalytics.sendEvent(appAnalytics.events.GOOGLE_SIGN_IN_PRESSED);
                    dispatchProps.signInWithGoogle(accessToken);
                } else {
                    Alert.alert(
                        i18nGet('active_network_needed'),
                        '',
                        [
                            {
                                text: i18nGet('ok'),
                                onPress: () => dispatchProps.ping(),
                            }
                        ]
                    )
                }
            }
        }
    }
)(AuthButtonGoogle)

const styles = StyleSheet.create({

    socialAuthButton: {
        minWidth: 200,
        backgroundColor: "#FFFFFF",
        borderRadius: 5,
        ...SHADOW_OPTIONS
    },
    touchable: {
        padding: 10,
    },
    buttonContent: {
        display: 'flex',

        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    buttonContentText: {
        flex: 1,
        marginLeft: 10,
        textAlign: 'center',
        fontSize: 15,
    },
    icon: {
        width: 34,
        height: 34,
    }
})
