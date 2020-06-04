import { StyleSheet } from "react-native";
import { shadowOptions } from "../../constant/ShadowOptions";
import { Color } from "../../constant/Color";

export const styles = StyleSheet.create({
    view: {
        flex: 1,
        justifyContent: 'flex-start',
        backgroundColor: '#F6F8FF',
        paddingBottom: 80,
    },
    scrollViewWrapWrap: {
        backgroundColor: "#2E3858",
    },
    scrollViewWrap: {
        backgroundColor: "#2E3858",
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25,
        overflow: 'hidden',
    },
    scrollView: {
        height: '100%',
        paddingTop: 10,
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25,
        backgroundColor: "#003653",
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
        backgroundColor: Color.LIGHT_BLUE,

        ...shadowOptions,

        overflow: 'hidden'
    },
    chartGradient: {
        width: '100%',

        paddingTop: 20,
        paddingBottom: 25,

        backgroundColor: Color.LIGHT_BLUE,
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
    settingsViewWrap: {
        backgroundColor: "#3E2626",
    },
    settingsView: {
        overflow: 'hidden',
        display: 'flex',
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25,

        backgroundColor: Color.PRIMARY_BASE,

        paddingTop: 20,
        paddingHorizontal: 38,
        paddingBottom: 35,
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
        marginTop: 5,
        display: 'flex',
        flexDirection: 'row',
    },
    headerTouchable: {
        marginTop: 2,
    },
    rightTitle: {
        fontWeight: '300',
        fontSize: 19,
        color: '#ffffff',
        marginRight: 5,
    }
})
