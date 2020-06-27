import React, { ReactElement } from 'react'
import { View, Text, StyleSheet, ActivityIndicator, Platform } from 'react-native'
import { Loader } from '../loader/Loader'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { BackArrowIcon } from '../icon/BackArrowIcon'

interface Props {
    title?: string
    rightSideSlot?: ReactElement
    onBackPress?: () => void;
}

export class BlockHat extends React.Component<Props> {
    render() {
        return (
            <View style={styles.hatView}>
                <View style={styles.settingsView}>
                    <View style={styles.leftSide}>
                        {this.props.onBackPress && <View
                            style={styles.backArrow}
                        >
                            <TouchableOpacity
                                style={styles.backArrowTouchable}
                                onPress={() => this.props.onBackPress()}
                            >
                                <BackArrowIcon />
                            </TouchableOpacity>
                        </View>}
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
        paddingTop: 20,
    },
    leftSide: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    settingsView: {
        display: 'flex',
        width: '100%',
        paddingHorizontal: 16,
        paddingVertical: 8,

        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center',
    },
    backArrow: {
        width: 40,
    },
    backArrowTouchable: {
        padding: 5
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
