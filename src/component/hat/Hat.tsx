import React from 'react';
import { BackArrowIcon } from '../icon/BackArrowIcon';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { View, Text, StyleSheet } from 'react-native';
import { ThemeColor } from '../../constant/ThemeColor';

interface HatProps {
    onBackPress: () => void;
    title?: string;
}

export function Hat(props: HatProps) {
    return (
        <View style={styles.hatView}>
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
        </View >
    )
}

const styles = StyleSheet.create({
    hatView: {
        flex: 1,
        position: 'absolute',
        top: 0,
        left: 0,

        width: '100%',
        height: 72,

        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,

        shadowOpacity: 1,
        shadowRadius: 0,
        shadowColor: 'black',
        shadowOffset: { height: 10, width: 10 },

        elevation: 3,

        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',

        backgroundColor: ThemeColor.LIGHT_BLUE,
    },
    backArrow: {
        position: 'absolute',
        left: 24,
        top: 34,
    },
    title: {
        paddingTop: 16,
        fontFamily: 'Roboto',
        fontSize: 18,
        color: '#666666'
    }
})
