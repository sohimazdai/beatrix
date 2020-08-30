import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
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
  label: string;
  style: StyledButtonType;
  icon?: JSX.Element;
  iconPosition?: IconPositionType;
};

export class StyledButton extends React.Component<Props> {
  get viewStyle() {
    const { fluid, style } = this.props;

    let additionStyle = {};

    const viewStyle = fluid
      ? { ...styles.buttonView, flex: 1, width: '100%' }
      : styles.buttonView;

    switch (style) {
      case StyledButtonType.EMPTY:
        additionStyle = styles.buttonViewEmpty;
        break;
      default: additionStyle = {};
    }

    return { ...viewStyle, ...additionStyle };
  };

  get touchableStyle() {
    const { style } = this.props;
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

    return { ...styles.touchable, ...additionalStyle };
  }

  get textStyle() {
    const { style } = this.props;
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
    const { iconPosition } = this.props;

    const iconLeft = iconPosition === IconPositionType.LEFT;

    return iconLeft
      ? { ...styles.icon, marginRight: 8 }
      : { ...styles.icon, marginLeft: 8 }
  }

  render() {
    const { label, onPress, iconPosition } = this.props;

    const iconLeft = iconPosition === IconPositionType.LEFT;

    return (
      <View style={this.viewStyle}>
        <TouchableOpacity
          onPress={onPress}
          style={this.touchableStyle}
        >
          {iconLeft && <View style={this.iconStyle}>
            {this.icon()}
          </View>}

          <Text style={this.textStyle}>
            {label}
          </Text>

          {!iconLeft && <View style={this.iconStyle}>
            {this.icon()}
          </View>}
        </TouchableOpacity>
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
    ...SHADOW_OPTIONS,
  },
  buttonViewEmpty: {
    shadowColor: COLOR.TRANSPARENT,
  },
  touchable: {
    borderRadius: 10,
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  touchablePrimary: {
    backgroundColor: COLOR.PRIMARY,
  },
  touchableOutline: {
    backgroundColor: COLOR.WHITE,
    borderColor: COLOR.TEXT_DIMGRAY,
    borderWidth: 1,
  },
  touchableDelete: {
    backgroundColor: COLOR.WHITE,
    borderColor: COLOR.RED,
    borderWidth: 1,
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
    color: COLOR.TEXT_DIMGRAY,
  },
  textDelete: {
    color: COLOR.TEXT_DIMGRAY,
  },
  textEmpty: {
    color: COLOR.TEXT_DARK_GRAY,
  },
  icon: {
    marginHorizontal: 0,
  }
})
