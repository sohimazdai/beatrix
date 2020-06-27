import { StyleSheet } from "react-native";
import { shadowOptions } from "../../../../constant/ShadowOptions";
import { Color } from '../../../../constant/Color';

export const styles = StyleSheet.create({
    addNoteButton: {
        margin: 5,
        paddingLeft: 10,
        paddingRight: 10,

        backgroundColor: Color.PRIMARY,
        borderRadius: 10,
        ...shadowOptions
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
        color: Color.WHITE,
        fontWeight: '500',
        marginRight: 5,
    }
})
