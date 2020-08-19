import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { connect } from 'react-redux';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SHADOW_OPTIONS } from '../../../constant/ShadowOptions';
import { GoogleLogoIcon } from '../../../component/icon/GoogleLogoIcon';
import { createGoogleAuthAction } from '../../../store/service/auth/GoogleAuthSaga';
import { i18nGet } from '../../../localisation/Translate';
import { appAnalytics } from '../../../app/Analytics';

interface Props {
    onGoogleSignin?: () => void;
    onPress?: () => void;
}

export function AuthButtonGoogle(props: Props) {
    function renderDescription() {
        return i18nGet('sign_in_with_google')
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
            onGoogleSignin: () => {
                appAnalytics.sendEvent(appAnalytics.events.GOOGLE_SIGN_IN_PRESSED);
                dispatch(createGoogleAuthAction())
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
