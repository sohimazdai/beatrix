import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SvgProps } from 'react-native-svg';
import { COLOR } from '../../constant/Color';

export enum TouchableIconStyle { //it's about background palette
  LIGHT = 'light',
  DARK = 'dark'
}

export enum TouchableIconSize {
  SMALL = 'small',
  LARGE = 'large',
  MEDIUM = 'medium',
}

interface Props {
  onPress: () => void
  icon: JSX.Element
  style: TouchableIconStyle
  size: TouchableIconSize
}

export default function TouchableIcon(props: Props) {
  const { onPress, icon, size, style } = props;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.wrap}
    >
      {icon}
    </TouchableOpacity>
  )
}

export function getIconStyle(style: TouchableIconStyle, size: TouchableIconSize) {
  let styleProps: SvgProps = {};

  switch (style) {
    case TouchableIconStyle.DARK: styleProps.fill = COLOR.PRIMARY_WHITE;
    case TouchableIconStyle.LIGHT: styleProps.fill = COLOR.PRIMARY;
  }

  switch (size) {
    case TouchableIconSize.LARGE: styleProps = { ...styleProps, width: 35, height: 35 };
    case TouchableIconSize.MEDIUM: styleProps = { ...styleProps, width: 25, height: 25 };
    default: styleProps = { ...styleProps, width: 15, height: 15 };
  }

  return styleProps;
}

const styles = StyleSheet.create({
  wrap: {
  },
});
