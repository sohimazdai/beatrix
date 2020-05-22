import { shadowOptions } from "../../constant/shadowOptions";
import { StyleSheet } from "react-native";
import { ThemeColor } from "../../constant/ThemeColor";

export const styles = StyleSheet.create({
    AuthScreen: {
        display: 'flex',
        height: '100%',
        width: '100%',
        justifyContent: 'flex-end',
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
        overflow: 'hidden'
    },

    authFormGradient: {
        width: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
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
    rememberButton: {
        width: 150,
        height: 40,
        margin: 10,
        marginTop: 20,
        borderRadius: 10,
        backgroundColor: "white",
        ...shadowOptions
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
        backgroundColor: ThemeColor.WHITE,
        justifyContent: 'center',
        ...shadowOptions
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
        ...shadowOptions
    },
    authScreenRestorePasswordViewTitle: {
        height: 30,
        fontSize: 18,
        color: '#333333',
        margin: 20,
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
