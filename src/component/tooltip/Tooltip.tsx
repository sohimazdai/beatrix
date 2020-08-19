
import * as React from 'react';
import {
  TouchableOpacity,
  Modal,
  View,
  ViewPropTypes as RNViewPropTypes,
} from 'react-native';

import Triangle from './Triangle';
import { ScreenWidth, ScreenHeight, isIOS } from './helpers';
import getTooltipCoordinate from './getTooltipCoordinate';
import { COLOR } from '../../constant/Color';
import { appAnalytics } from '../../app/Analytics';

const defaultProps = {
  pointerColor: COLOR.PRIMARY,
  overlayColor: "white",
  toggleWrapperProps: {},
  withOverlay: false,
  highlightColor: 'transparent',
  withPointer: true,
  height: 40,
  width: 150,
  containerStyle: {},
  pointerStyle: {},
  backgroundColor: COLOR.PRIMARY,
  onClose: () => { },
  actionType: 'press',
};

interface State {
  isVisible: boolean,
  yOffset: number,
  xOffset: number,
  elementWidth: number,
  elementHeight: number,
};

interface Props {
  onOpen?: () => void
  analyticsKeyOnOpen: string
  popover: React.ReactNode,
  actionType: 'press' | 'longPress' | 'none',
};

class Tooltip extends React.Component<Props, State> {
  state = {
    isVisible: false,
    yOffset: 0,
    xOffset: 0,
    elementWidth: 0,
    elementHeight: 0,
  };

  renderedElement;
  timeout;

  handleOpen = () => {
    const { onOpen, analyticsKeyOnOpen } = this.props;

    appAnalytics.sendEventWithProps(appAnalytics.events.TOOLTIP_SHOWN, {
      tooltipName: analyticsKeyOnOpen
    });

    onOpen && onOpen();
  }

  toggleTooltip = () => {
    const { onClose } = defaultProps;
    this.getElementPosition();
    this.setState(prevState => {
      if (prevState.isVisible && !isIOS) {
        onClose && onClose();
      }

      return { isVisible: !prevState.isVisible };
    });
  };

  wrapWithAction = (actionType, children) => {
    switch (actionType) {
      case 'press':
        return (
          <TouchableOpacity
            onPress={this.toggleTooltip}
            activeOpacity={1}
            {...defaultProps.toggleWrapperProps}
          >
            {children}
          </TouchableOpacity>
        );
      case 'longPress':
        return (
          <TouchableOpacity
            onLongPress={this.toggleTooltip}
            activeOpacity={1}
            {...defaultProps.toggleWrapperProps}
          >
            {children}
          </TouchableOpacity>
        );
      default:
        return children;
    }
  };

  getTooltipStyle = () => {
    const { yOffset, xOffset, elementHeight, elementWidth } = this.state;
    const {
      height,
      backgroundColor,
      width,
      withPointer,
      containerStyle,
    } = defaultProps;

    const { x, y } = getTooltipCoordinate(
      xOffset,
      yOffset,
      elementWidth,
      elementHeight,
      ScreenWidth,
      ScreenHeight,
      width,
      height,
      withPointer,
    );

    return {
      position: 'absolute',
      left: x,
      top: y,
      backgroundColor,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      maxWidth: ScreenWidth / 2,
      borderRadius: 10,
      padding: 10,
      ...containerStyle,
    };
  };

  renderPointer = tooltipY => {
    const { yOffset, xOffset, elementHeight, elementWidth } = this.state;
    const { backgroundColor, pointerColor, pointerStyle } = defaultProps;
    const pastMiddleLine = yOffset > tooltipY;

    return (
      <View
        style={{
          position: 'absolute',
          top: pastMiddleLine ? yOffset - 13 : yOffset + elementHeight - 2,
          left: xOffset + elementWidth / 2 - 7.5,
        }}
      >
        <Triangle
          style={{
            borderBottomColor: pointerColor || backgroundColor,
            ...pointerStyle,
          }}
          isDown={pastMiddleLine}
        />
      </View>
    );
  };
  renderContent = withTooltip => {
    const { popover } = this.props;
    const { withPointer, highlightColor, actionType } = defaultProps;

    if (!withTooltip)
      return this.wrapWithAction(actionType, this.props.children);

    const { yOffset, xOffset, elementWidth, elementHeight } = this.state;
    const tooltipStyle = this.getTooltipStyle();
    return (
      <View>
        <View
          style={{
            position: 'absolute',
            top: yOffset,
            left: xOffset,
            backgroundColor: highlightColor,
            overflow: 'visible',
          }}
        >
          {this.props.children}
        </View>
        {withPointer && this.renderPointer(tooltipStyle.top)}
        <View style={tooltipStyle as any}>{popover}</View>
      </View>
    );
  };

  componentDidMount() {
    // wait to compute onLayout values.
    this.timeout = setTimeout(this.getElementPosition, 500);
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  getElementPosition = () => {
    this.renderedElement &&
      this.renderedElement.measureInWindow(
        (pageOffsetX, pageOffsetY, width, height) => {
          this.setState({
            xOffset: pageOffsetX,
            yOffset: pageOffsetY,
            elementWidth: width,
            elementHeight: height,
          });
        },
      );
  };

  render() {
    const { isVisible } = this.state;
    const { onClose, withOverlay, overlayColor } = defaultProps;

    return (
      <View collapsable={false} ref={e => (this.renderedElement = e)}>
        {this.renderContent(false)}
        <Modal
          animationType="fade"
          visible={isVisible}
          transparent
          onDismiss={onClose}
          onShow={this.handleOpen}
          onRequestClose={onClose}
        >
          <TouchableOpacity
            style={styles.container(withOverlay, overlayColor)}
            onPress={this.toggleTooltip}
            activeOpacity={1}
          >
            {this.renderContent(true)}
          </TouchableOpacity>
        </Modal>
      </View>
    );
  }
}

const styles = {
  container: (withOverlay, overlayColor) => ({
    backgroundColor: withOverlay
      ? overlayColor
        ? overlayColor
        : 'rgba(250, 250, 250, 0.70)'
      : 'transparent',
    flex: 1,
  }),
};

export default Tooltip;
