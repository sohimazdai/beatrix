import React, { ReactElement } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { shadowOptions } from '../../constant/shadowOptions'
import { JsxElement } from 'typescript'

interface Props {
    title?: string
    rightSideSlot?: ReactElement
}

interface State {

}

export class BlockHat extends React.Component<Props, State> {
    render() {
        return (
            <View style={styles.settingsView}>
                <Text style={styles.title}>
                    {this.props.title}
                </Text>
                <View style={styles.rightSideSlot}>
                    {this.props.rightSideSlot}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    settingsView: {
        display: 'flex',
        width: '100%',
        padding: 16,
        paddingTop: 40,

        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center',

        backgroundColor: "#2E3858",
    },
    title: {
        fontSize: 19,
        fontWeight: 'bold',
        color: '#ffffff'
    },
    rightSideSlot: {
        // fontWeight: '300',
        // fontSize: 19,
        // color: '#ffffff'
    }
})