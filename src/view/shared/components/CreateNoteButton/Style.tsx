import { StyleSheet } from "react-native";
import { SHADOW_OPTIONS } from "../../../../constant/OptionsShadow";
import { COLOR } from '../../../../constant/Color';

export const styles = StyleSheet.create({
    addNoteButton: {
        margin: 5,
        paddingLeft: 10,
        paddingRight: 10,

        backgroundColor: COLOR.PRIMARY,
        borderRadius: 10,
        ...SHADOW_OPTIONS
    },
    addNoteButtonTouchable: {
        padding: 10,
        display: 'flex',

        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    addNoteButtonText: {
        fontSize: 18,
        color: COLOR.WHITE,
        fontWeight: '500',
        marginRight: 5,
    }
})
