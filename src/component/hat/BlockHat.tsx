import React, { ReactElement } from 'react'
import { View, Text, StyleSheet, Dimensions, StatusBar } from 'react-native'

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
                <View style={styles.view}>
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
        paddingTop: 24,
    },
    view: {
        display: 'flex',
        maxWidth: '100%',
        paddingHorizontal: 16,
        paddingVertical: 12,
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center',
    },
    leftSide: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    backArrow: {
        width: 40,
    },
    backArrowTouchable: {
        paddingRight: 5
    },
    title: {
        maxWidth: Dimensions.get('screen').width - 120,
        fontSize: 19,
        fontWeight: 'bold',
        color: '#ffffff',
        paddingRight: 8,
    },
    rightSideSlot: {
    },
    progressBarContainer: {
        height: 3,
        marginBottom: 2,
    }
})
