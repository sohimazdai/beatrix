import React, { ReactElement } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { ProgressBarConnect } from '../progress-bar/ProgressBar'

interface Props {
    title?: string
    rightSideSlot?: ReactElement
}

export class BlockHat extends React.Component<Props> {
    render() {
        return (
            <View style={styles.hatView}>
                <View style={styles.settingsView}>
                    <Text style={styles.title}>
                        {this.props.title}
                    </Text>
                    <View style={styles.rightSideSlot}>
                        {this.props.rightSideSlot}
                    </View>
                </View>
                <View style={styles.progressBarContainer}>
                    <ProgressBarConnect />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    hatView: {
        backgroundColor: "#2E3858",
    },
    settingsView: {
        display: 'flex',
        maxHeight: 80,
        width: '100%',
        padding: 16,
        paddingTop: 40,

        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center',
    },
    title: {
        fontSize: 19,
        fontWeight: 'bold',
        color: '#ffffff'
    },
    rightSideSlot: {
    },
    progressBarContainer: {
        height: 3,
        marginBottom: 2,
    }
})
