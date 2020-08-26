import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { SHADOW_OPTIONS } from '../../constant/ShadowOptions';
import { COLOR } from '../../constant/Color';

export enum StyledButtonType {
  PRIMARY = 'primary',
  OUTLINE = 'outline',
  DELETE = 'delete',
}
interface Props {
  onPress: () => void;
  label: string;
  style: StyledButtonType;
};

export class StyledButton extends React.Component<Props> {
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
    }

    return { ...styles.text, ...additionalStyle };
  }

  render() {
    const { label, onPress } = this.props;
    return (
      <View style={styles.buttonView}>
        <TouchableOpacity
          onPress={onPress}
          style={this.touchableStyle}
        >
          <Text style={this.textStyle}>
            {label}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonView: {
    ...SHADOW_OPTIONS,
  },
  touchable: {
    borderRadius: 10,
    padding: 10,
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
})
