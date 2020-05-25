import React from 'react';
import { BackArrowIcon } from '../icon/BackArrowIcon';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { View, Text, StyleSheet } from 'react-native';
import { Loader } from '../loader/Loader';

interface HatProps {
    onBackPress: () => void;
    title?: string;
    hatColor?: string;
}

export function Hat(props: HatProps) {
    return (
        <View style={styles.hatViewWrapper}>
            <View
                style={styles.hatView}
            >
                <View
                    style={styles.backArrow}
                >
                    <TouchableOpacity
                        style={styles.backArrowTouchable}
                        onPress={() => props.onBackPress()}
                    >
                        <BackArrowIcon />
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row' }}>

                    <Text style={styles.title}>
                        {props.title}
                    </Text>
                    <Loader />
                </View>
                <View />
            </View >
        </View>
    )
}

const styles = StyleSheet.create({
    hatViewWrapper: {
        backgroundColor: "#2E3858",
    },
    hatView: {
        display: 'flex',
        width: '100%',
        padding: 11,
        paddingTop: 40,

        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center',
    },
    backArrow: {

    },
    backArrowTouchable: {
        padding: 5
    },
    title: {
        fontSize: 19,
        color: 'white',
        fontWeight: 'bold'
    },
    progressBarContainer: {
        height: 3,
        marginBottom: 2,
    }
})
