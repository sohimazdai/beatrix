import { StyleSheet } from "react-native";
import { SHADOW_OPTIONS } from "../../../../constant/ShadowOptions";

export const styles = StyleSheet.create({
    keyboardAvoidingView: {
        height: '100%',
        width: '100%',
        display: 'flex',

        flexDirection: 'column',
        justifyContent: 'flex-start',
        backgroundColor: "#DDDDDD"
    },
    scrollView: {
        height: '100%',
        backgroundColor: "#DDDDDD"
    },
    targetGlycemiaView: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        padding: 10,
        paddingTop: 0,
    },
    targetGlycemiaSlider: {
        height: 50,
        width: "60%",
        margin: 10,
    },
    targetGlycemiaSliderLimitsText: {
        fontSize: 18
    },
    glycemiaInput: {
        height: 50,
        width: 70,
        marginLeft: 15,
        borderWidth: 1.5,
        borderColor: "#cecece",
        backgroundColor: "white",
        borderRadius: 5,

        textAlign: 'center',
        fontSize: 18,
    },
    shortInsulinTypePickerView: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    shortInsulinTypeButton: {
        padding: 10,
        margin: 5,
        backgroundColor: "white",
        borderColor: "white",
        borderWidth: 2,
        borderRadius: 5,
        ...SHADOW_OPTIONS
    },
    shortInsulinTypeButtonActive: {
        borderColor: "#2E3858",
        borderWidth: 2,
        borderRadius: 5,
        ...SHADOW_OPTIONS
    },
    shortInsulinTypePickerItemText: {
        fontSize: 16,
        color: "rgba(0, 0, 0, 0.6)",
    },
    shortInsulinTypePickerItemTextActive: {
        fontSize: 16,
        color: "rgba(0, 0, 0, 0.8)",
        fontWeight: 'bold'
    },
    sensitivityFactorView: {
        display: 'flex',

        justifyContent: 'center',
        alignItems: 'center'
    },
    insulinSensitiveFactorPickerListItemTextInput: {

    },
    sensitivityFactorItemTitle: {
        flex: 1,
        alignContent: 'center',
        textAlign: 'center',
        fontSize: 17,
    },
    sensitivityFactorTitleView: {
        display: 'flex',

        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexDirection: 'row',

        padding: 20,
        paddingBottom: 10,
        paddingTop: 10
    }
})
