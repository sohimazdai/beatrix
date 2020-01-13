import React from 'react';
import { Animated, StyleSheet } from 'react-native';


export interface FaderProps {
    hidden?: boolean;
    children?: any
}

export const Fader = (props: FaderProps) => {
    const [opacity] = React.useState(new Animated.Value(0))
    const [children, setChildren] = React.useState(null)

    React.useEffect(() => {
        Animated.timing(
            opacity,
            {
                toValue: props.hidden ? 0 : 1,
                duration: 200,
            }
        ).start(() => {
            props.hidden && setChildren(null)
        });
        !props.hidden && setChildren(props.children);
    }, [props.hidden, props.children])

    return <Animated.View style={{
        ...styles.FaderView,
        opacity: opacity,
        display: props.hidden ? 'none' : 'flex',
    }}>
        {children}
    </Animated.View>
}

const styles = StyleSheet.create({
    FaderView: {
        display: "none",
        height: '100%',
        width: '100%',

        position: 'absolute',
        top: 0,
        left: 0,
        flex: 1,

        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
    }
})