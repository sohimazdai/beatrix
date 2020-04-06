import { shadowOptions } from "../../../constant/shadowOptions";
import { ThemeColor } from "../../../constant/ThemeColor";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    animatedView: {
        width: '100%',
        display: 'flex',

        borderRadius: 25,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        backgroundColor: ThemeColor.WHITE,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden'
    },
    popupGradient: {
        width: '100%',
        display: 'flex',

        padding: 15,
        paddingBottom: 35,

        // borderRadius: 25,
        // borderBottomLeftRadius: 0,
        // borderBottomRightRadius: 0,

        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: ThemeColor.WHITE,
    },
    dateTitleView: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    dateTitle: {
        fontSize: 18,
    },
    upperValues: {
        display: 'flex',
        width: '100%',

        flexDirection: 'row',
        justifyContent: 'center',
    },
    bottomValues: {
        display: 'flex',
        width: '100%',

        flexDirection: 'row',
        justifyContent: 'center',
    },
    commentValue: {
        marginTop: 15,
        width: '100%',
        maxHeight: 200,
        borderRadius: 10,
        backgroundColor: "white",
        padding: 15,
        overflow: 'scroll'
    },
    commentValueText: {
        fontSize: 18,
        color: "#333333"
    },
    closeTouchable: {
        position: 'absolute',
        right: 20,
        top: 20,
        ...shadowOptions
    },
    editNoteIconTouchable: {
        position: 'absolute',
        left: 20,
        top: 20,
        ...shadowOptions,
    },
    editNoteIcon: {
        width: 30,
        height: 30
    }
})