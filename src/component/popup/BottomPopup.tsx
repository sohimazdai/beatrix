import React from 'react'
import { StyleSheet, View, Animated, Dimensions } from 'react-native'

export interface BottomPopupProps {
    hidden?: boolean;
    children: any
}

export const BottomPopup = (props: BottomPopupProps) => {
    const [currentBottom] = React.useState(new Animated.Value(-Dimensions.get('screen').height))
    const [children, setChildren] = React.useState(null)

    React.useEffect(() => {
        Animated.timing(
            currentBottom,
            {
                toValue: props.hidden ? -Dimensions.get('screen').height : 0,
                duration: 300,
            }
        ).start(() => {
            props.hidden && setChildren(null)
        });
        !props.hidden && setChildren(props.children);
    }, [props.hidden, props.children])

    return <Animated.View style={{
        ...styles.BottomPopupView,
        bottom: currentBottom
    }}>
        {children}
    </Animated.View>
}

const styles = StyleSheet.create({
    BottomPopupView: {
        position: 'absolute',
        bottom: 0,

        display: "flex",
        width: '100%',

        opacity: 1
    }
})