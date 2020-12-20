import React from 'react';
import { Text, StyleSheet, View, ViewStyle } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { SHADOW_OPTIONS } from '../../constant/ShadowOptions';
import { COLOR } from '../../constant/Color';

export enum StyledButtonType {
  PRIMARY = 'primary',
  OUTLINE = 'outline',
  DELETE = 'delete',
  EMPTY = 'empty',
}

export enum IconPositionType {
  LEFT = 'left',
  RIGHT = 'right',
}

interface Props {
  fluid?: boolean
  onPress: () => void;
  label?: string;
  style: StyledButtonType;
  icon?: JSX.Element;
  iconPosition?: IconPositionType;
  marginLeft?: boolean
  disabled?: boolean
  withoutPadding?: boolean
};

export class StyledButton extends React.Component<Props> {
  get viewStyle() {
    const { fluid, style, marginLeft } = this.props;

    let additionStyle = {};

    let viewStyle: ViewStyle = fluid
      ? {
        ...styles.buttonView,
        flex: 1,
        width: '100%',
      } : styles.buttonView;

    if (marginLeft) {
      viewStyle = {
        ...viewStyle,
        marginLeft: 8
      }
    }

    switch (style) {
      case StyledButtonType.EMPTY:
        additionStyle = styles.buttonViewEmpty;
        break;
      default: additionStyle = {};
    }

    return { ...viewStyle, ...additionStyle };
  };

  get touchableStyle() {
    const { style, withoutPadding } = this.props;
    let additionalStyle = {};

    switch (style) {
      case StyledButtonType.PRIMARY:
        additionalStyle = styles.touchablePrimary;
        break;
      case StyledButtonType.OUTLINE:
        additionalStyle = styles.touchableOutline;
        break;
      case StyledButtonType.DELETE:
        additionalStyle = styles.touchableDelete
        break;
      case StyledButtonType.EMPTY:
        additionalStyle = styles.touchableEmpty
        break;
    }

    const paddingStyle = withoutPadding
      ? { padding: 0 }
      : {};


    return { ...styles.touchable, ...additionalStyle, ...paddingStyle };
  }

  get textStyle() {
    const { style, fluid } = this.props;
    let additionalStyle = {};

    switch (style) {
      case StyledButtonType.PRIMARY:
        additionalStyle = styles.textPrimary;
        break;
      case StyledButtonType.OUTLINE:
        additionalStyle = styles.textOutline;
        break;
      case StyledButtonType.DELETE:
        additionalStyle = styles.textDelete
        break;
      case StyledButtonType.DELETE:
        additionalStyle = styles.textEmpty
        break;
    }

    return { ...styles.text, ...additionalStyle };
  }

  get iconStyle() {
    const { iconPosition, label } = this.props;

    const iconLeft = iconPosition === IconPositionType.LEFT;

    return !label
      ? styles.icon
      : iconLeft
        ? { ...styles.icon, marginRight: 8 }
        : { ...styles.icon, marginLeft: 8 }
  }

  render() {
    const { label, onPress, icon, disabled, iconPosition } = this.props;

    const iconRight = iconPosition === IconPositionType.RIGHT;

    return (
      <View style={this.viewStyle}>
        <TouchableOpacity
          onPress={onPress}
          style={this.touchableStyle}
          disabled={disabled}
        >
          {!!icon && !iconRight && <View style={this.iconStyle}>
            {this.icon()}
          </View>}

          {!!label && <Text style={this.textStyle}>
            {label}
          </Text>}

          {!!icon && iconRight && <View style={this.iconStyle}>
            {this.icon()}
          </View>}
        </TouchableOpacity>
        {disabled && <View style={styles.disabledView} />}
      </View>
    );
  }

  icon() {
    const { icon } = this.props;

    if (!icon) return null;

    return icon;
  }
}

const styles = StyleSheet.create({
  buttonView: {
    position: 'relative',
    ...SHADOW_OPTIONS,
  },
  buttonViewEmpty: {
    shadowColor: COLOR.TRANSPARENT,
  },
  touchable: {
    borderRadius: 10,
    padding: 12,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  touchablePrimary: {
    backgroundColor: COLOR.PRIMARY,
    borderColor: COLOR.PRIMARY,
    borderWidth: 1,
  },
  touchableOutline: {
    backgroundColor: COLOR.WHITE,
    borderColor: COLOR.PRIMARY,
    borderWidth: 1,
  },
  touchableDelete: {
    backgroundColor: COLOR.RED_DARK,
    borderWidth: 0,
  },
  touchableEmpty: {
    backgroundColor: COLOR.TRANSPARENT,
    paddingHorizontal: 0,
  },
  text: {
    fontSize: 17,
  },
  textPrimary: {
    color: COLOR.TEXT_WHITE,
  },
  textOutline: {
    color: COLOR.PRIMARY,
  },
  textDelete: {
    color: COLOR.TEXT_WHITE,
  },
  textEmpty: {
    color: COLOR.TEXT_DARK_GRAY,
  },
  icon: {
    marginHorizontal: 0,
  },
  disabledView: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: COLOR.TEXT_WHITE,
    borderRadius: 10,
    opacity: 0.5,
  },
})
