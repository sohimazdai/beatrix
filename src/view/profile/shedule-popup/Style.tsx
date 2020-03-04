import { shadowOptions } from "../../../constant/shadowOptions";
import { ThemeColor } from "../../../constant/ThemeColor";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    scrollView: {
        position: 'relative',

        width: "100%",
        paddingTop: 20,
        paddingBottom: 40,
        backgroundColor: '#FDFFDE',

        borderRadius: 25,
        borderBottomRightRadius: 0,
        borderBottomLeftRadius: 0,
    },
    scrollViewContent: {
        width: '100%',

        display: 'flex',

        alignItems: 'center',
        justifyContent: 'center',
    },
    popupTitle: {
        width: '70%',
        fontSize: 18,
        marginBottom: 20,

        textAlign: 'center',

        color: ThemeColor.TEXT_DARK_GRAY
    },
    closeButton: {
        position: 'absolute',

        top: 15,
        right: 15
    },
    pickersItemTitle: {
        flex: 1,
        alignContent: 'center',
        textAlign: 'center',
        fontSize: 16,
    },
    pickersTitleView: {
        display: 'flex',

        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexDirection: 'row',

        padding: 20,
        paddingBottom: 10,
        paddingTop: 10
    },

    addTouchable: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

        width: 120,

        margin: 10,
        padding: 10,

        backgroundColor: 'white',
        borderRadius: 50,
        ...shadowOptions
    },
    rangeThatNeedToWriteMore: {
        padding: 10,
        fontSize: 16,

        color: "#871800",
    }
})