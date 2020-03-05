import { StyleSheet } from "react-native";
import { shadowOptions } from "../../../constant/shadowOptions";

export const styles = StyleSheet.create({
    view: {
        display: 'flex',

        flexDirection: "row",
        justifyContent: 'space-evenly',

        width: '100%',
        paddingBottom: 10,
    },
    itemView: {
        display: 'flex',

        justifyContent: 'center',
        alignItems: 'center',

        flexDirection: 'row',
    },
    buttonItemView: {
        display: 'flex',

        justifyContent: 'center',
        alignItems: 'center',

        flexDirection: 'row',
    },
    itemViewTitle: {
        paddingBottom: 5,

        fontSize: 17,
    },
    inputPostfix: {
        fontSize: 17
    },
    delete: {
        fontSize: 18,
    },
    deleteItemView: {
        display: 'flex',

        justifyContent: 'center',
        alignItems: 'center',

        width: 30,
        height: 30,
        marginRight: 10,
        marginLeft: 10,
        borderRadius: 50,

        borderColor: 'crimson',
        borderWidth: 1,

        backgroundColor: '#FFFFFF',

        ...shadowOptions
    },
    applyItemView: {
        display: 'flex',

        justifyContent: 'center',
        alignItems: 'center',

        width: 30,
        height: 30,
        marginRight: 10,
        marginLeft: 10,
        borderRadius: 50,

        borderColor: 'green',
        borderWidth: 1,

        backgroundColor: '#FFFFFF',

        ...shadowOptions
    },
    deleteItemViewTouchable: {
        width: '100%',
        height: '100%',

        display: "flex",
        alignItems: 'center',
        justifyContent: 'center'
    },
    savedValue: {
        width: 50,

        textAlign: 'center',
        fontSize: 17,
    }
})