import * as React from 'react';
import { View, StyleSheet } from "react-native";

import { AddNoteIcon } from "../../../../component/icon/AddNoteIcon";

import { i18nGet } from '../../../../localisation/Translate';
import { COLOR } from '../../../../constant/Color';
import { SHADOW_OPTIONS } from '../../../../constant/ShadowOptions';
import { StyledButton, IconPositionType, StyledButtonType } from '../../../../component/button/StyledButton';
import { appAnalytics } from '../../../../app/Analytics';

interface Props {
    onClick: () => void;
}

export const NoteCreationButton = (props: Props) => (
    <View style={styles.addNoteButton}>
        <StyledButton
            icon={<AddNoteIcon />}
            iconPosition={IconPositionType.RIGHT}
            label={i18nGet('add')}
            style={StyledButtonType.PRIMARY}
            onPress={() => {
                appAnalytics.sendEvent(appAnalytics.events.ADD_NOTE_CLICKED);
                props.onClick();
            }}
        />
    </View>
)

const styles = StyleSheet.create({
    addNoteButton: {
        margin: 5,
        paddingLeft: 10,
        paddingRight: 10,

        backgroundColor: COLOR.PRIMARY,
        borderRadius: 10,
        ...SHADOW_OPTIONS
    },
    addNoteButtonTouchable: {
        padding: 10,
        display: 'flex',

        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    addNoteButtonText: {
        fontSize: 18,
        color: COLOR.WHITE,
        fontWeight: '500',
        marginRight: 5,
    }
})
