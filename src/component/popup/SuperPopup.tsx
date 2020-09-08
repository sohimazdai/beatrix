import React from 'react'
import { StyleSheet, Animated, Dimensions, View } from 'react-native'

export enum PopupDirection {
    TOP_BOTTOM = 'top-bottom',
    BOTTOM_TOP = 'bottom-top',
}

export interface SuperPopupProps {
    hidden?: boolean;
    children: any
    onPopupClosed?: Function
    direction?: PopupDirection
}

export const SuperPopup = (props: SuperPopupProps) => {
    const { onPopupClosed, hidden } = props;

    const [currentBottom] = React.useState(new Animated.Value(-Dimensions.get('screen').height))
    const [children, setChildren] = React.useState(null)
    const [direction, setDirection] = React.useState(props.direction);

    React.useEffect(() => {
        Animated.timing(
            currentBottom,
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
            top: currentBottom,
        } : {
            ...styles.SuperPopupView,
            bottom: currentBottom,
        };

    const viewStyle = direction && direction === PopupDirection.TOP_BOTTOM
        ? styles.TopPopup
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
        width: '100%',
        opacity: 1
    },
    TopPopup: {
        position: 'relative',
        overflow: 'hidden',
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
    },
    BottomPopup: {
        position: 'relative',
        overflow: 'hidden',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
    },
})
