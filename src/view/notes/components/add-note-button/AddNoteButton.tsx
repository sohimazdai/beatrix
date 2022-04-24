import React, { useCallback } from 'react';

import { IconPositionType, StyledButton, StyledButtonType } from '../../../../component/button/StyledButton';
import { AddNoteIcon } from '../../../../component/icon/AddNoteIcon';

import { appAnalytics } from '../../../../app/Analytics';
import { i18nGet } from '../../../../localisation/Translate';

interface Props {
    from: string;
    onPress: () => void;
}

export default function AddNoteButton(props: Props) {
    const { from, onPress } = props;

    const handleClick = useCallback(() => {
        appAnalytics.sendEventWithProps(
            appAnalytics.events.ADD_NOTE_CLICKED,
            { from }
        );

        onPress();
    }, [onPress]);

    return (
        <StyledButton
            fluid
            style={StyledButtonType.PRIMARY}
            onPress={handleClick}
            label={i18nGet('add_note')}
            icon={<AddNoteIcon />}
            iconPosition={IconPositionType.RIGHT}
        />
    )
}