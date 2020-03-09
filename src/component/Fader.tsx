import React from 'react';
import { Animated, StyleSheet } from 'react-native';

export interface FaderProps {
    hidden?: boolean;
    children?: any
}

export const Fader = (props: FaderProps) => {
    const [opacity] = React.useState(new Animated.Value(0));
    const [isDisplay, setDisplay] = React.useState(false);

    React.useEffect(() => {
        !props.hidden && !isDisplay && setDisplay(true);
        Animated.timing(
            opacity,
            {
                toValue: props.hidden ? 0 : 1,
                duration: 200,
            }
        ).start(() => {
            props.hidden && isDisplay && setDisplay(false);
        });
    }, [props.hidden, props.children]);

    return isDisplay && (
        <Animated.View
            style={{
                ...styles.FaderView,
                opacity: opacity,
            }}
        />
    ) || null;
}

const styles = StyleSheet.create({
    FaderView: {
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