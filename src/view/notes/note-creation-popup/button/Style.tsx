import { StyleSheet } from "react-native";
import { shadowOptions } from "../../../../constant/shadowOptions";

export const styles = StyleSheet.create({
    addNoteButton: {
        margin: 5,
        paddingLeft: 10,
        paddingRight: 10,

        backgroundColor: 'rgba(250,250,250, 1)',
        borderRadius: 30,
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
        color: "#333333",
        marginRight: 5
    }
})
