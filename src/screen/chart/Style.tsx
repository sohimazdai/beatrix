import { StyleSheet } from "react-native";
import { shadowOptions } from "../../constant/shadowOptions";
import { ThemeColor } from "../../constant/ThemeColor";

export const styles = StyleSheet.create({
    view: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#F6F8FF'
    },
    scrollView: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    viewGradient: {
        position: 'absolute',

        left: 0,
        top: 0,

        height: '100%',
        width: '100%',
    },
    ChartView: {
        width: '100%',

        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    chartView: {
        width: '100%',

        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
        backgroundColor: ThemeColor.LIGHT_BLUE,

        ...shadowOptions,

        overflow: 'hidden'
    },
    chartGradient: {
        width: '100%',

        paddingTop: 20,
        paddingBottom: 25,

        backgroundColor: ThemeColor.LIGHT_BLUE,
        justifyContent: 'center',
        alignItems: 'center',

        ...shadowOptions,
    },
    highightTitlesView: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    highightTitle: {
        fontSize: 13,
        color: '#CCCCCC',
        textAlign: 'center',
    },
    axisTitleView: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    axisTitleText: {
        paddingTop: 5,
        paddingRight: 10,

        fontSize: 11,
        fontWeight: 'bold',
        color: '#eee',
    },
    settingsView: {
        width: '100%',
        display: 'flex',

        padding: 20,
        paddingRight: 28,
        paddingBottom: 28,

        justifyContent: 'center',
        alignItems: 'center',
    },
    statisticsView: {
    },
    statisticsViewText: {
        textAlign: 'center',
    },
    addNoteButtonView: {
        position: 'absolute',
        bottom: 5,
        right: 5,

        ...shadowOptions,
    },
    addNoteButton: {
        display: 'flex',
        padding: 5,
        margin: 5,
        paddingLeft: 10,
        paddingRight: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(250,250,250, 1)',
        borderRadius: 30,
        ...shadowOptions
    },
    addNoteButtonText: {
        fontSize: 18,
        color: "#333333",
        marginRight: 5
    },
    headerTitleRightSide: {
        display: 'flex',
        flexDirection: 'row',
    },
    headerTouchableView: {
        width: 29,
        height: 29,
    },
    headerTouchable: {
    },
    rightTitle: {
        backgroundColor: 'blue',
        fontWeight: '300',
        fontSize: 19,
        color: '#ffffff',
        marginRight: 5,
    }
})
