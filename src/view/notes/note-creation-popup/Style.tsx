import { StyleSheet, Dimensions } from "react-native";
import { shadowOptions } from "../../../constant/shadowOptions";
import { Color } from "../../../constant/Color";
import { isThemeLight } from '../../../app/AppTheme';

export const styles = StyleSheet.create({
    noteCreationViewScrollView: {
        flex: 1,
        width: '100%',
        minHeight: Dimensions.get('screen').height * 0.8,
    },
    noteCreationView: {
        flex: 1,
        width: '100%',
        height: Dimensions.get('screen').height * 0.8,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        backgroundColor: isThemeLight ? "#D4EEFF" : '#0D0B23',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    noteEditingView: {
        flex: 1,
        width: '100%',
        height: Dimensions.get('screen').height * 0.8,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        backgroundColor: "#FFE1DF",
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    buttonsBlock: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    scrollViewContent: {
        flex: 1,
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        alignItems: 'center',
    },

    inputBlock: {
        flex: 2,
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 16,

        borderRadius: 25,

        alignItems: 'center',
    },
    pickers: {
        flex: 1,
        height: 50,
        width: 240,

        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textInDatePickerIOS: {
        textAlign: 'center',
    },
    inputView: {
        flex: 3,
        width: '100%',
        margin: 15,
        marginBottom: 0,
    },
    commentInputView: {
        flex: 1,
        width: '100%',
        margin: 15,
        marginBottom: 0,
        height: 185
    },
    saveButtonTouchable: {
        width: 160,
        height: 50,

        marginVertical: 10,

        ...shadowOptions,

        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "rgba(250, 250, 250, 1)",

    },
    saveButtonText: {
        fontFamily: 'Roboto',
        fontSize: 19,
        color: '#333333',
        fontWeight: 'bold',
    },
    deleteButtonTouchable: {
        width: 80,
        height: 50,

        marginVertical: 10,

        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',

    },
    deleteButtonText: {
        fontFamily: 'Roboto',
        fontSize: 17,
        color: 'crimson',
        fontWeight: 'bold',
        textDecorationLine: 'underline',
    },
    inputViewTitle: {
        width: '100%',
        textAlign: 'center',
        margin: 5,
        fontSize: 19,
        lineHeight: 20,
        fontWeight: "bold",
        color: Color.TEXT_DARK_GRAY
    },
    commentViewTextArea: {
        backgroundColor: 'white',
        padding: 10,
        width: '100%',
        borderRadius: 15,
    },
    hideTouchable: {
        position: 'absolute',
        right: 10,
        top: 10,
        height: 30,
        width: 30
    }
})

