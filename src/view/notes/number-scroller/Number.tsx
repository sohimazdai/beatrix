import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Text, StyleSheet } from 'react-native';

interface Props {
  value: number;
  onClick: (value) => void;
}

export default class Number extends React.Component<Props> {
  render() {
    const { value, onClick } = this.props;

    return (
      <TouchableOpacity onPress={() => onClick(value)}>
        <Text style={styles.text}>
          {value}
        </Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  text: {
    padding: 20,
    fontSize: 16,
  },
})
