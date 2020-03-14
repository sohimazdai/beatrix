import { shadowOptions } from '../../constant/shadowOptions';
import { ThemeColor } from '../../constant/ThemeColor';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
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
        fontSize: 18,
        color: '#333333',
        margin: 22,
        marginRight: 0,
        marginLeft: 0,
        fontWeight: 'bold',
    },
    socialButton: {
        marginTop: 40,
        marginBottom: 40
    },
    authOption: {
        margin: 20,
    },
    authOptionText: {
        color: '#333333',
        fontSize: 16,
        textAlign: 'center',
        textDecorationLine: 'underline'
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

        borderRadius: 15,
        backgroundColor: '#2E3858',
        justifyContent: 'center',
        ...shadowOptions
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
    errorHintText: {
        padding: 20,
        textAlign: 'center',
        fontSize: 16,
        color: 'crimson'
    }
});
