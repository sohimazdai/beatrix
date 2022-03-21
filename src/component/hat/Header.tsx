import React from 'react';
import { View, Text, StyleSheet } from 'react-native'
import { COLOR } from '../../constant/Color';
import { StyledButton, StyledButtonType } from '../button/StyledButton';
import { Loader } from '../loader/Loader';

interface Props {
  title: string

  leftIcon?: JSX.Element
  leftIconPress?: () => void
  rightIcon?: JSX.Element
  rightIconPress?: () => void
}

export function Header(props: Props) {
  const { leftIcon, rightIcon, leftIconPress, rightIconPress, title } = props;

  return (
    <View style={styles.wrap}>
      {!!leftIcon && (
        <View style={styles.left}>
          <StyledButton
            style={StyledButtonType.EMPTY}
            icon={leftIcon}
            onPress={leftIconPress}
            disabled={!leftIconPress}
          />
        </View>
      )}
      <View style={styles.central}>
        <Text style={styles.title}>
          {title}
        </Text>
        <Loader />
      </View>
      {!!rightIcon && (
        <View style={styles.right}>
          <StyledButton
            style={StyledButtonType.EMPTY}
            icon={rightIcon}
            onPress={rightIconPress}
            disabled={!rightIconPress}
          />
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  wrap: {
    display: 'flex',
    paddingHorizontal: 12,
    paddingTop: 40,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLOR.PRIMARY,
  },

  left: {
    paddingRight: 8,
  },

  central: {
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  title: {
    color: COLOR.PRIMARY_WHITE,
    fontSize: 19
  },

  right: {
    paddingLeft: 8
  },
});
