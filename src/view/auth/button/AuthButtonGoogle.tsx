import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { connect } from 'react-redux';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { shadowOptions } from '../../../constant/shadowOptions';
import { GoogleLogoIcon } from '../../../component/icon/GoogleLogoIcon';
import * as Google from 'expo-google-app-auth';
import { googleAuthConfig } from '../../../config/googleAuthConfig';
import { createGoogleAuthAction } from '../../../store/service/auth/GoogleAuthSaga';
// import { createEmailAuthAction } from '../../../service/auth/AuthSaga';

interface Props {
    onGoogleSignin?: () => void;
    onPress?: () => void;
}

export function AuthButtonGoogle(props: Props) {
    function renderDescription() {
        return "Войти с Google"
    }

    return (
        <View style={styles.socialAuthButton}>
            <TouchableOpacity style={styles.touchable} onPress={props.onGoogleSignin}>
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
    (state) => ({}),
    (dispatch) => ({ dispatch }),
    (stateProps, { dispatch }, ownProps) => {
        return {
            ...stateProps,
            ...ownProps,
            onGoogleSignin: () => dispatch(createGoogleAuthAction())
        }
    }
)(AuthButtonGoogle)

const styles = StyleSheet.create({

    socialAuthButton: {
        width: 200,
        marginBottom: 20,
        backgroundColor: "#FFFFFF",
        borderRadius: 5,
        ...shadowOptions
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