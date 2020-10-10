import React from 'react'
import { StyleSheet, Animated, Dimensions, View } from 'react-native'
import { Directions } from 'react-native-gesture-handler';
import { SHADOW_OPTIONS } from '../../constant/ShadowOptions';

export enum PopupDirection {
    TOP_BOTTOM = 'top-bottom',
    BOTTOM_TOP = 'bottom-top',
    BOTTOM_CENTER = 'bottom-center',
    LEFT_TO_RIGHT = 'left-to-right',
}

export interface SuperPopupProps {
    hidden?: boolean;
    children: any
    onPopupClosed?: Function
    direction?: PopupDirection
}

export const SuperPopup = (props: SuperPopupProps) => {
    const { onPopupClosed, hidden } = props;

    const startValue =
        props.direction && props.direction === PopupDirection.LEFT_TO_RIGHT
            ? -Dimensions.get('screen').width
            : -Dimensions.get('screen').height;

    const [current] = React.useState(new Animated.Value(startValue))
    const [children, setChildren] = React.useState(null)
    const [direction, setDirection] = React.useState(props.direction);

    React.useEffect(() => {
        Animated.timing(
            current,
            {
                toValue: hidden ? -Dimensions.get('screen').height : 0,
                duration: 300,
            }
        ).start((SuperPopupProps) => {
            SuperPopupProps.finished && hidden && setChildren(null);
            SuperPopupProps.finished && hidden && setDirection(null);
            SuperPopupProps.finished && hidden && onPopupClosed && onPopupClosed();
        });

        !hidden && setChildren(props.children);
        !hidden && setDirection(props.direction || PopupDirection.BOTTOM_TOP);
    }, [hidden, props.children, props.direction])

    const style = direction && direction === PopupDirection.TOP_BOTTOM
        ? {
            ...styles.SuperPopupView,
            width: '100%',
            top: current,
        } : direction === PopupDirection.LEFT_TO_RIGHT
            ? {
                ...styles.SuperPopupView,
                left: current,
            } : {
                ...styles.SuperPopupView,
                width: '100%',
                bottom: current,
            };

    const viewStyle = direction && direction === PopupDirection.TOP_BOTTOM
        ? styles.TopPopup
        : direction === PopupDirection.LEFT_TO_RIGHT
            ? styles.LeftPopup
            : styles.BottomPopup;

    return (
        <Animated.View style={style}>
            <View style={viewStyle}>
                {children}
            </View>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    SuperPopupView: {
        display: "flex",
        position: 'absolute',
        opacity: 1,
    },
    TopPopup: {
        overflow: 'hidden',
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
        ...SHADOW_OPTIONS,
    },
    BottomPopup: {
        overflow: 'hidden',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        ...SHADOW_OPTIONS,
    },
    LeftPopup: {
        overflow: 'hidden',
        borderTopRightRadius: 25,
        borderBottomRightRadius: 25,
        ...SHADOW_OPTIONS,
    },
})
