import React from 'react';
import { FlatList } from 'react-native-gesture-handler';
import Number from './Number';
import { IUserDiabetesProperties } from '../../../model/IUserDiabetesProperties';
import { connect } from 'react-redux';
import { IStorage } from '../../../model/IStorage';
import { Dimensions } from 'react-native';
import { IMeasuresOption } from '../../../localisation/Measures';

const PORTION = 50;
const LENGTH = 70;
const LENGTH_WITH_SEPARATOR = 72;

interface Props {
  selectedNumber?: number;
  onNumberClick: (number) => void;
  userDiabetesProperties?: IUserDiabetesProperties,
  measuresOption: IMeasuresOption
}

interface State {
  numbersCount: number,
  numbers: number[],
}

export class Component extends React.Component<Props, State> {
  flatListRef;

  state = {
    numbers: [],
    numbersCount: this.props.measuresOption.withDecimal
      ? this.props.selectedNumber
        ? this.props.selectedNumber * 2 * 10
        : this.props.measuresOption.startIndex * 2 * 10
      : this.props.selectedNumber
        ? this.props.selectedNumber * 2
        : this.props.measuresOption.startIndex * 2,
  }

  get numbers(): number[] {
    const { numbersCount } = this.state;

    let numbers = [];
    for (let i = 0; i <= numbersCount; i++) {
      numbers.push(i);
    }

    return numbers;
  }

  addNumbers = () => {
    const { numbersCount } = this.state;

    this.setState({ numbersCount: numbersCount + PORTION });
  }

  get initialIndex() {
    const { selectedNumber, measuresOption } = this.props;
    const { startIndex, withDecimal } = measuresOption;

    const startIndexWithDecimal = withDecimal ? startIndex * 10 : startIndex;
    const selectedNumberWithDecimal = withDecimal ? selectedNumber * 10 : selectedNumber;

    const itemsOnScreen = Dimensions.get('screen').width / LENGTH_WITH_SEPARATOR;
    const initialOfsset = Math.floor(itemsOnScreen / 2);

    const isPossibleToApplyOffset = selectedNumberWithDecimal > initialOfsset;
    const newSelectedNumber = isPossibleToApplyOffset && selectedNumberWithDecimal
      ? selectedNumberWithDecimal - initialOfsset
      : selectedNumberWithDecimal;


    const initialIndex = newSelectedNumber
      ? newSelectedNumber
      : startIndexWithDecimal - initialOfsset;

    return initialIndex;
  }

  render() {
    const { onNumberClick, selectedNumber, measuresOption } = this.props;
    const { withDecimal } = measuresOption;

    return (
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        bounces={false}

        ref={(fl) => this.flatListRef = fl}

        data={this.numbers}
        renderItem={({ item }) => (
          <Number
            value={withDecimal ? item / 10 : item}
            isSelected={selectedNumber === (withDecimal ? item / 10 : item)}
            onClick={onNumberClick}
          />
        )}
        keyExtractor={item => item.toString()}

        getItemLayout={(data, index) => (
          { length: LENGTH, offset: LENGTH_WITH_SEPARATOR * index, index }
        )}
        initialScrollIndex={this.initialIndex}
        onEndReached={this.addNumbers}
        onEndReachedThreshold={0.5}
      />
    )
  }
}

export const NumberScroller = connect(
  (state: IStorage) => ({
    userDiabetesProperties: state.userDiabetesProperties
  }),
)(Component)
