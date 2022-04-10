import React, { useCallback, useState } from "react";

import { Linking, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { IconPositionType, StyledButton, StyledButtonType } from "../../../component/button/StyledButton";
import { ArrowTaillessIcon, ArrowDirection } from "../../../component/icon/ArrowTaillessIcon";
import { COLOR } from "../../../constant/Color";
import { i18nGet } from "../../../localisation/Translate";

import { INotification } from "../../../model/INotification";

interface Props {
    notification: INotification;
    isSeen: boolean;
    handleOpen: () => void;
}

export default function NotificationSpoiler(props: Props) {
    const { notification, isSeen, handleOpen } = props;
    const [isOpen, setIsOpen] = useState(false);
    const nDate = new Date(notification.createdAt).getDate();
    const nMonth = new Date(notification.createdAt).getMonth() + 1;
    const nYear = new Date(notification.createdAt).getFullYear();

    const handleOpenSpoiler = useCallback(() => {
        handleOpen();
        setIsOpen(!isOpen);
    }, [isOpen, isSeen, notification]);

    const handleLinkClick = useCallback((link: string) => {
        Linking.openURL(link);
    }, []);

    const kLINK_DETECTION_REGEX = /(([a-z]+:\/\/)?(([a-z0-9\-]+\.)+([a-z]{2}|aero|arpa|biz|com|coop|edu|gov|info|int|jobs|mil|museum|name|nato|net|org|pro|travel|local|internal))(:[0-9]{1,5})?(\/[a-z0-9_\-\.~]+)*(\/([a-z0-9_\-\.]*)(\?[a-z0-9+_\-\.%=&amp;]*)?)?(#[a-zA-Z0-9!$&'()*+.=-_~:@/?]*)?)(\s+|$)/gi;
    const links = notification.text?.match(kLINK_DETECTION_REGEX) || [];

    return (
        <View style={styles.wrap}>
            <TouchableOpacity
                style={isOpen ? styles.headSelected : styles.head}
                onPress={handleOpenSpoiler}
            >
                <View style={styles.textBlock}>
                    <View style={styles.titleBlock}>
                        {isSeen && <View style={styles.activeDot} />}
                        <Text style={styles.title}>
                            {notification.title}
                        </Text>
                    </View>
                    <Text style={styles.date}>
                        {
                            (nDate > 9 ? nDate : `0${nDate}`) + "." +
                            (nMonth > 9 ? nMonth : `0${nMonth}`) + "." +
                            nYear
                        }
                    </Text>
                </View>
                <StyledButton
                    style={StyledButtonType.EMPTY}
                    icon={<ArrowTaillessIcon direction={isOpen ? ArrowDirection.DOWN : ArrowDirection.RIGHT} />}
                    iconPosition={IconPositionType.LEFT}
                    onPress={handleOpenSpoiler}
                />
            </TouchableOpacity>
            {isOpen && (
                <View style={styles.spoiler}>
                    <Text style={styles.text}>{notification.text}</Text>
                    {!!links.length && (
                        <>
                            <Text style={styles.linkTitle}>{i18nGet('links_in_text')}</Text>
                            <View>
                                {links.map((link, index) => (
                                    <TouchableOpacity
                                        key={link}
                                        style={styles.link}
                                        onPress={() => handleLinkClick(link)}
                                    >
                                        <Text style={styles.linkText}>
                                            {index + 1}: {link}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </>
                    )}
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    wrap: {
        flexDirection: 'column',
        marginTop: 16,
        paddingBottom: 8,
        backgroundColor: COLOR.PRIMARY_WHITE,
    },
    head: {
        paddingHorizontal: 16,
        paddingTop: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headSelected: {
        paddingHorizontal: 16,
        paddingBottom: 8,
        paddingTop: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: COLOR.PRIMARY_BASE,
    },
    textBlock: {
        width: '70%',
        justifyContent: 'flex-start',
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    titleBlock: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    activeDot: {
        marginRight: 8,
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: COLOR.RED,
    },
    title: {
        fontSize: 19,
        color: COLOR.TEXT_DARK_GRAY,
        fontWeight: 'bold',
    },
    date: {
        marginTop: 8,
        color: COLOR.TEXT_DIMGRAY,
    },
    spoiler: {
        marginTop: 16,
        paddingHorizontal: 16,
    },
    text: {
        fontSize: 16,
        color: COLOR.TEXT_DARK_GRAY,
    },
    linkTitle: {
        marginTop: 16,
        fontSize: 16,
        color: COLOR.TEXT_BLACK,
    },
    link: {
        marginTop: 8,
    },
    linkText: {
        color: COLOR.BLUE,
        fontSize: 16,
    },
});