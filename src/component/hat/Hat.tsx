import React from 'react';
import { BackArrowIcon } from '../icon/BackArrowIcon';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { View, Text, StyleSheet } from 'react-native';
import { ThemeColor } from '../../constant/ThemeColor';
import { shadowOptions } from '../../constant/shadowOptions';

interface HatProps {
    onBackPress: () => void;
    title?: string;
    hatColor?: string;
}

export function Hat(props: HatProps) {
    return (
        <View
            style={styles.hatView}
        >
            <View
                style={styles.backArrow}
            >
                <TouchableOpacity
                    onPress={() => props.onBackPress()}
                >
                    <BackArrowIcon />
                </TouchableOpacity>
            </View>
            <Text style={styles.title}>
                {props.title}
            </Text>
            <View>

            </View>
        </View >
    )
}

const styles = StyleSheet.create({
    hatView: {
        display: 'flex',
        width: '100%',
        padding: 16,
        paddingTop: 40,

        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center',

        backgroundColor: "#2E3858",
    },
    backArrow: {

    },
    title: {
        fontSize: 19,
        color: 'white',
        fontWeight: 'bold'
    }
})
