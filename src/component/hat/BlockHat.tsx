import React, { ReactElement } from 'react'
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'
import { Loader } from '../loader/Loader'

interface Props {
    title?: string
    rightSideSlot?: ReactElement
}

export class BlockHat extends React.Component<Props> {
    render() {
        return (
            <View style={styles.hatView}>
                <View style={styles.settingsView}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.title}>
                            {this.props.title}
                        </Text>
                        <Loader />
                    </View>
                    <View style={styles.rightSideSlot}>
                        {this.props.rightSideSlot}
                    </View>
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
