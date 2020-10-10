import React from 'react';
import { Animated, Dimensions, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Loader } from '../loader/Loader';

export enum FaderType {
    SYNC = 'sync',
    EMPTY = 'empty',
}

export interface FaderProps {
    hidden?: boolean;
    children?: any;
    type?: FaderType;
    onPress?: () => void
}

export const Fader = (props: FaderProps) => {
    const { onPress } = props;

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
                ...styles.faderView,
                opacity: opacity,
            }}
        >
            {props.type !== FaderType.EMPTY && (
                <Loader />
            )}
            {!!onPress && <TouchableOpacity
                style={styles.touchableZone}
                onPress={onPress}
            />}
        </Animated.View>
    ) || null;
}

const styles = StyleSheet.create({
    faderView: {
        height: '100%',
        width: '100%',

        position: 'absolute',
        top: 0,
        left: 0,
        flex: 1,

        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        padding: 16,
    },
    touchableZone: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    }
})
