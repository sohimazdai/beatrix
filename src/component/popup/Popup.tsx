import React from 'react';
import { Animated, Dimensions, StyleSheet } from 'react-native';


export interface PopupProps {
    hidden?: boolean;
    children: any
}

export const Popup = (props: PopupProps) => {
    const [currentTop] = React.useState(new Animated.Value(0))
    const [children, setChildren] = React.useState(null)

    React.useEffect(() => {
        Animated.timing(
            currentTop,
            {
                toValue: props.hidden ? Dimensions.get('screen').height : 0,
                duration: 300,
            }
        ).start(() => {
            props.hidden && setChildren(null)
        });
        !props.hidden && setChildren(props.children);
    }, [props.hidden, props.children])

    return <Animated.View style={{
        ...styles.PopupView,
        top: currentTop
    }}>
        {children}
    </Animated.View>
}

const styles = StyleSheet.create({
    PopupView: {
        position: 'absolute',
        top: 0,
        left: 0,
        flex: 1,
        height: '100%',
        width: '100%',

        justifyContent: 'center',
        alignItems: 'center',
    }
})