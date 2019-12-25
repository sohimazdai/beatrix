import React from 'react'
import { CloseIcon } from '../icon/CloseIcon'
import { StyleProp, ViewStyle, TouchableOpacity } from 'react-native'

interface HideButtonProps {
    onPress?: () => void
}

export function CloseButton(props: HideButtonProps) {
    return (
        <TouchableOpacity onPress={props.onPress}>
            <CloseIcon/>
        </TouchableOpacity>
    )
} 