import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { connect } from 'react-redux';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { shadowOptions } from '../../../constant/shadowOptions';
import { GoogleLogoIcon } from '../../../component/icon/GoogleLogoIcon';
import * as Google from 'expo-google-app-auth';
import { googleAuthConfig } from '../../../config/googleAuthConfig';
// import { createEmailAuthAction } from '../../../service/auth/AuthSaga';

interface Props {
    onPress?: () => void;
}

export function AuthButtonGoogle(props: Props) {
    async function onGoogleSignIn() {
        try {
            const result = await Google.logInAsync({
                androidClientId: googleAuthConfig.androidClientId,
                clientId: googleAuthConfig.iosClientId,
                scopes: ["profile", "email"]
            })
        } catch (e) {
            console.log("error", e)
        }
    }

    function renderDescription() {
        return "Войти с Google"
    }

    return (
        <View style={styles.socialAuthButton}>
            <TouchableOpacity onPress={onGoogleSignIn}>
                <View style={styles.buttonContent}>
                    <View style={styles.icon}>
                        <GoogleLogoIcon />
                    </View>
                    <Text style={styles.buttonContentText}>
                        {renderDescription()}
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export const AuthButtonGoogleConnect = connect(
    (state) => ({ }),
    (dispatch) => ({ dispatch }),
    (stateProps, { dispatch }, ownProps) => {
        return {
            ...stateProps,
            ...ownProps,
            onGoogleSignInEnd: (result: Google.LogInResult) => {
                // dispatch(createEmailAuthAction(result))
            }
        }
    }
)(AuthButtonGoogle)

const styles = StyleSheet.create({

    socialAuthButton: {
        width: 200,
        marginBottom: 20,
        padding: 10,
        backgroundColor: "#FFFFFF",
        borderRadius: 5,
        ...shadowOptions
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
