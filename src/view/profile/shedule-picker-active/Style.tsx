import { StyleSheet } from "react-native";
import { ThemeColor } from '../../../constant/ThemeColor';
import { shadowOptions } from '../../../constant/shadowOptions';

export const styles = StyleSheet.create({
    scrollView: {
        width: '100%',
        height: '100%',
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
    },
    scrollViewContentWrap: {
        flex: 1,
        width: '100%',
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        // backgroundColor: "#FDFFDE",
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    scrollViewContent: {
        flex: 1,
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        alignItems: 'center',
    },
    popupTitle: {
        width: '70%',
        fontSize: 18,
        marginTop: 20,
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
    pickerBlock: {
        flex: 1,
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'center',

        borderRadius: 25,

        alignItems: 'center',
    },
    bottomBlock: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    addTouchable: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

        width: 120,

        margin: 10,
        marginBottom: 20,
        padding: 10,

        backgroundColor: '#BEF1C6',
        borderRadius: 50,
        ...shadowOptions
    },
    rangeThatNeedToWriteMore: {
        padding: 10,
        fontSize: 16,

        color: "#871800",
    }
})