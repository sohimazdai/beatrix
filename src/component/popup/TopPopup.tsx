import React from 'react'
import { StyleSheet, View, Animated, Dimensions } from 'react-native'

export interface TopPopupProps {
    hidden?: boolean;
    children: any
}

export const TopPopup = (props: TopPopupProps) => {
    const [currentTop] = React.useState(new Animated.Value(-Dimensions.get('screen').height))
    const [children, setChildren] = React.useState(null)

    React.useEffect(() => {
        Animated.timing(
            currentTop,
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
        ...styles.TopPopupView,
        top: currentTop
    }}>
        {children}
    </Animated.View>
}

const styles = StyleSheet.create({
    TopPopupView: {
        position: 'absolute',
        top: 0,
        overflow: 'visible',
        display: "flex",
        width: '100%',

        opacity: 1
    }
})
