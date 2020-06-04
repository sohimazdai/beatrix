import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { View, Text, NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import Number from './Number';

const PORTION = 50;

interface State {
  numbersCount: number,
  numbers: number[],
}

export class NumberScroller extends React.Component {
  scrollViewRef;

  state = {
    numbersCount: 200,
    numbers: [],
  }

  get numbers(): number[] {
    const { numbersCount } = this.state;

    let numbers = [];
    for (let i = 0; i <= numbersCount; i++) {
      numbers.push(i);
    }

    return numbers;
  }

  onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {

  }

  render() {
    return (
      <ScrollView

        onLayout={(e) => {
          this.scrollViewRef.scrollTo({x: e.nativeEvent.layout.width * 15, y: 0, animated: false})
        }}
        showsHorizontalScrollIndicator={false}
        ref={(sv) => this.scrollViewRef = sv}
        onScroll={this.onScroll}
        horizontal
      >
        <View style={{ flex: 1, flexDirection: 'row' }}>
          {this.numbers.map((number) => <Number key={number} value={number} onClick={() => { }} />)}
        </View>
      </ScrollView>
    )
  }
}
