import { StyleSheet, Dimensions } from "react-native";
import { shadowOptions } from "../../../constant/ShadowOptions";
import { Color } from '../../../constant/Color';

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
        backgroundColor: "#D4EEFF",
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
    scrollViewContent: {
        flex: 1,
        height: Dimensions.get('screen').height * 0.8,
        width: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    inputBlock: {
        flex: 3,
        width: '100%',
        paddingBottom: 20,
        flexDirection: 'column',
        justifyContent: 'flex-start',

        borderRadius: 25,

        alignItems: 'center',
    },
    buttonsBlock: {
        marginTop: 20,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    timePickers: {
        height: 50,
        width: 240,
        marginTop: 20,

        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textInDatePickerIOS: {
        textAlign: 'center',
    },
    inputView: {
        width: '100%',
        marginTop: 20,
    },
    commentInputView: {
        flex: 1,
        width: '100%',
        margin: 15,
        marginBottom: 0,
        height: 185
    },
    saveButtonTouchable: {
        padding: 15,
        marginVertical: 10,

        ...shadowOptions,

        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Color.PRIMARY,
    },
    saveButtonText: {
        fontFamily: 'Roboto',
        fontSize: 17,
        color: Color.WHITE,
        fontWeight: 'bold',
    },
    deleteButtonTouchable: {
        marginVertical: 10,
        padding: 15,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: 'bold',
        backgroundColor: Color.RED_DARK,
    },
    deleteButtonText: {
        fontFamily: 'Roboto',
        fontSize: 17,
        color: Color.WHITE,
        fontWeight: 'bold',
    },
    inputViewTitle: {
        width: '100%',
        textAlign: 'center',
        marginTop: 20,
        fontSize: 19,
        lineHeight: 20,
        fontWeight: "bold",
        color: Color.TEXT_DARK_GRAY
    },
    numberScrollWrapper: {
        marginTop: 40,
        height: 150,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    commentViewTextArea: {
        backgroundColor: 'white',
        padding: 10,
        width: '100%',
        borderRadius: 15,
        marginTop: 20,
    },
    hideTouchable: {
        position: 'absolute',
        right: 10,
        top: 10,
        height: 30,
        width: 30
    }
})

