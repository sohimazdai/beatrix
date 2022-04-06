import React from 'react';
import { StyleSheet, Text, View } from "react-native";

import { StyledButton, StyledButtonType } from "../../../component/button/StyledButton";

import { COLOR } from "../../../constant/Color";
import { i18nGet } from '../../../localisation/Translate';
import { INotification } from "../../../model/INotification";

interface Props {
    notification: INotification;
    isLastItem: boolean;
    handleClose: () => void;
}

export function SwiperItem(props: Props) {
    const { isLastItem, notification, handleClose } = props;

    return (
        <View style={styles.swiperItem}>
            <View style={styles.swiperItemContent}>
                <Text style={styles.swiperItemContentTitle}>
                    {notification.title}
                </Text>
                <Text style={styles.swiperItemContentText}>
                    {notification.text}
                </Text>
            </View>
            <View style={styles.buttonView}>
                {isLastItem && (
                    <StyledButton
                        style={StyledButtonType.PRIMARY}
                        onPress={handleClose}
                        label={i18nGet('got_it')}
                    />
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    swiperItem: {
        flex: 1,
        padding: 16,
        paddingBottom: 24,
        backgroundColor: COLOR.PRIMARY_WHITE,
        justifyContent: 'space-between',
    },
    swiperItemContent: {
        padding: 16,
        alignItems: 'center',
    },
    buttonView: {
        padding: 16,
        paddingBottom: 24,
    },
    swiperItemContentTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: COLOR.TEXT_BLACK,
    },
    swiperItemContentText: {
        marginTop: 16,
        fontSize: 16,
        color: COLOR.TEXT_DARK_GRAY,
    }
});