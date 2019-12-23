import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { shadowOptions } from '../../constant/shadowOptions'

interface Props {
    title?: string
    additionalTitle?: string
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
                <Text style={styles.additionalTitle}>
                    {this.props.additionalTitle}
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    settingsView: {
        display: 'flex',
        width: '100%',
        padding: 10,
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
    additionalTitle: {
        fontWeight: '300',
        fontSize: 19,
        color: '#ffffff'
    }
})