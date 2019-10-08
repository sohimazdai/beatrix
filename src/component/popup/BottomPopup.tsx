import React from 'react'
import { StyleSheet, View, Animated } from 'react-native'

export interface BottomPopupProps {
    hidden: boolean;
    children: any
}

export const BottomPopup = (props: BottomPopupProps) => {
    const [currentOpacity] = React.useState(new Animated.Value(0))
    const [currentBottom] = React.useState(new Animated.Value(-100))

    React.useEffect(() => {
        Animated.timing(
            currentOpacity,
            {
                toValue: props.hidden ? 0 : 1,
                duration: 200,
            }
        ).start();
        Animated.timing(
            currentBottom,
            {
                toValue: props.hidden ? -100 : 0,
                duration: 300,
            }
        ).start();
    }, [props.hidden])

    return <Animated.View style={{
        ...styles.BottomPopupView,
        opacity: currentOpacity,
        bottom: currentBottom
    }}>
        {props.children}
    </Animated.View>
}

const styles = StyleSheet.create({
    BottomPopupView: {
        position: 'absolute',
        bottom: 0,

        display: "flex",
        width: '100%',

        opacity: 0
    },
    BottomPopupViewActive: {
        opacity: 1
    }
})