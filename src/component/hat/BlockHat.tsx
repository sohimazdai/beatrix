import React, { ReactElement } from 'react'
import { View, Text, StyleSheet, Dimensions, StatusBar } from 'react-native'

import { Loader } from '../loader/Loader'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { BackArrowIcon } from '../icon/BackArrowIcon'
import { COLOR } from '../../constant/Color'
import { IconPositionType, StyledButton, StyledButtonType } from '../button/StyledButton'

interface Props {
    title?: string
    rightSideSlot?: ReactElement
    onBackPress?: () => void;
    leftIcon?: JSX.Element;
    leftIconPress?: () => void;
}

export function BlockHat(props: Props) {
    const {
        title,
        rightSideSlot,
        onBackPress,
        leftIcon,
        leftIconPress,
    } = props;

    return (
        <View style={styles.view}>
            <View style={styles.leftSide}>
                {!onBackPress && leftIcon && (
                    <StyledButton
                        style={StyledButtonType.EMPTY}
                        icon={leftIcon}
                        onPress={leftIconPress}
                    />
                )}
                {onBackPress && <View
                    style={styles.backArrow}
                >
                    <TouchableOpacity
                        style={styles.backArrowTouchable}
                        onPress={onBackPress}
                    >
                        <BackArrowIcon />
                    </TouchableOpacity>
                </View>}
                <Text style={styles.title}>
                    {title}
                </Text>
                <Loader />
            </View>
            <View style={styles.rightSideSlot}>
                {rightSideSlot}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    view: {
        display: 'flex',
        maxWidth: '100%',
        paddingHorizontal: 16,
        paddingVertical: 12,
        paddingTop: 36,
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center',
        backgroundColor: COLOR.PRIMARY,
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
    },
    title: {
        paddingLeft: 4,
        maxWidth: Dimensions.get('screen').width - 120,
        fontSize: 19,
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
