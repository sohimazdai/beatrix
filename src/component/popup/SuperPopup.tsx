import React, { useCallback } from 'react'
import { StyleSheet, Animated, Dimensions, View } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { COLOR } from '../../constant/Color';
import { SHADOW_OPTIONS } from '../../constant/ShadowOptions';
import { createHidePopupToPopupList } from '../../store/modules/popup-list/popup-list';

export enum PopupDirection {
    TOP_BOTTOM = 'top-bottom',
    BOTTOM_TOP = 'bottom-top',
    BOTTOM_CENTER = 'bottom-center',
    LEFT_TO_RIGHT = 'left-to-right',
}

const mapDispatch = (dispatch: Dispatch) => ({
    closePopup: (popupId: string) => dispatch(createHidePopupToPopupList(popupId)),
});

export interface SuperPopupProps {
    popupId?: string;
    hidden?: boolean;
    children: any
    onPopupClosed?: Function
    direction?: PopupDirection
    fadeShown?: boolean;
    handleClose?: () => void,
    closePopup?: (popupId: string) => void,
}

export const SuperPopup = (props: SuperPopupProps) => {
    const {
        popupId,
        onPopupClosed,
        hidden,
        fadeShown,
        handleClose,
        closePopup,
    } = props;

    const startValue =
        props.direction && props.direction === PopupDirection.LEFT_TO_RIGHT
            ? -Dimensions.get('screen').width
            : -Dimensions.get('screen').height;

    const [currentTop] = React.useState(new Animated.Value(startValue));
    const currentOpacity = React.useRef(new Animated.Value(0)).current;
    const [children, setChildren] = React.useState(null)
    const [direction, setDirection] = React.useState(props.direction);

    React.useEffect(() => {
        Animated.timing(
            currentTop,
            {
                toValue: hidden ? -Dimensions.get('screen').height : 0,
                duration: 200,
                useNativeDriver: false,
            }
        ).start((SuperPopupProps) => {
            SuperPopupProps.finished && hidden && setChildren(null);
            SuperPopupProps.finished && hidden && setDirection(null);
            SuperPopupProps.finished && hidden && onPopupClosed && onPopupClosed();
        });

        !hidden && setChildren(props.children);
        !hidden && setDirection(props.direction || PopupDirection.BOTTOM_TOP);
    }, [hidden, props.children, props.direction])

    React.useEffect(() => {
        Animated.timing(
            currentOpacity,
            {
                toValue: hidden ? 0 : 1,
                duration: 400,
                useNativeDriver: false,
            }
        ).start();
    }, [hidden]);

    const handleClosePopup = useCallback(() => {
        handleClose && handleClose();
        closePopup && closePopup(popupId);
    }, [handleClose]);

    const style = direction && direction === PopupDirection.TOP_BOTTOM
        ? {
            ...styles.SuperPopupView,
            width: '100%',
            top: currentTop,
        } : direction === PopupDirection.LEFT_TO_RIGHT
            ? {
                ...styles.SuperPopupView,
                left: currentTop,
            } : {
                ...styles.SuperPopupView,
                width: '100%',
                bottom: currentTop,
            };

    const viewStyle = direction && direction === PopupDirection.TOP_BOTTOM
        ? styles.TopPopup
        : direction === PopupDirection.LEFT_TO_RIGHT
            ? styles.LeftPopup
            : styles.BottomPopup;

    const fadeStyle = { ...styles.fade, opacity: currentOpacity as any };

    return (
        <Animated.View style={style}>
            {fadeShown && (
                <TouchableWithoutFeedback
                    style={fadeStyle}
                    onPress={handleClosePopup}
                />
            )}
            <View style={viewStyle}>
                {children}
            </View>
        </Animated.View>
    )
}

export default connect(null, mapDispatch)(SuperPopup);

const styles = StyleSheet.create({
    SuperPopupView: {
        display: "flex",
        position: 'absolute',
        opacity: 1,
    },
    fade: {
        position: 'relative',
        bottom: -25,
        height: Dimensions.get('screen').height * 2,
        width: Dimensions.get('screen').width,
        backgroundColor: COLOR.HALF_TRANSPARENT_DARK,
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
