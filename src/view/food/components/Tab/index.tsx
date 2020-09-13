import React, { useEffect } from 'react';
import { StyleSheet, Text, Animated } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { COLOR } from '../../../../constant/Color';

interface Props {
  isSelected: boolean
  label: string
  icon: JSX.Element
  onSelect: () => void
}

export default function Tab(props: Props) {
  const { label, onSelect, icon, isSelected } = props;

  const [borderColorIndex] = React.useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(borderColorIndex, {
      toValue: isSelected ? 1 : 0,
      duration: 200,
    }).start();
  }, [isSelected])

  const borderInterpolation = borderColorIndex.interpolate({
    inputRange: [0, 1],
    outputRange: [COLOR.PRIMARY_WHITE, COLOR.PRIMARY]
  })

  const selectedStyle = {
    borderColor: borderInterpolation,
  }

  return (
    <Animated.View style={{ ...styles.tab, ...selectedStyle }}>
      <TouchableOpacity style={styles.touchable} onPress={onSelect}>
        {icon}
        <Text style={styles.text}>
          {label}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  tab: {
    flex: 1,
    borderBottomWidth: 2,
    borderColor: COLOR.PRIMARY_WHITE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  touchable: {
    display: 'flex',
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  text: {
    fontSize: 17,
    color: COLOR.PRIMARY,
    marginLeft: 8,
    textAlign: 'center',
  }
})
