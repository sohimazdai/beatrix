import React from 'react'
import { StyleSheet, Animated, Dimensions, Modal, View, Easing } from 'react-native'

export interface BottomPopupProps {
    hidden?: boolean;
    children: any
}

export const BottomPopup = (props: BottomPopupProps) => {
    const [currentBottom] = React.useState(new Animated.Value(-Dimensions.get('screen').height))
    const [children, setChildren] = React.useState(null)
    const [hidden, setHidden] = React.useState(true)

    React.useEffect(() => {
        Animated.timing(
            currentBottom,
            {
                toValue: props.hidden ? -Dimensions.get('screen').height : 0,
                duration: 300,
                easing: Easing.linear
            }
        ).start(() => {
            props.hidden && setChildren(null)
            props.hidden && setHidden(true)
        });
        !props.hidden && setChildren(props.children);
        !props.hidden && setHidden(false);
    }, [props.hidden, props.children])

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={!hidden}
            
        >
            <View style={{ flex: 1, flexDirection: 'column-reverse' }}>
                {children}
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    BottomPopupView: {
        flex: 1,
        position: 'absolute',
        bottom: 0,
        overflow: 'visible',
        display: "flex",
        width: '100%',

        opacity: 1
    }
})
