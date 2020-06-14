import React from 'react';
import { FlatList } from 'react-native-gesture-handler';
import Number from './Number';
import { IUserDiabetesProperties } from '../../../model/IUserDiabetesProperties';
import { connect } from 'react-redux';
import { IStorage } from '../../../model/IStorage';
import { Dimensions, View } from 'react-native';
import { IMeasuresOption } from '../../../localisation/Measures';

const PORTION = 50;
const LENGTH = 70;
const LENGTH_WITH_SEPARATOR = 72;

const DECIMAL_LENGTH = 40;
const DECIMAL_LENGTH_WITH_SEPARATOR = 42;
const DECIMAL_MIDDLE_NUMBER_INDEX = 5;

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
    numbersCount: this.props.selectedNumber
      ? this.props.selectedNumber * 2 * 10
      : this.props.measuresOption.startIndex * 2 * 10
  }

  get numbers(): number[] {
    const { numbersCount } = this.state;

    let numbers = [];
    for (let i = 0; i <= numbersCount; i++) {
      numbers.push(i);
    }

    return numbers;
  }

  get decimalNumbers(): number[] {
    let numbers = [];
    for (let i = 0; i <= 9; i++) {
      numbers.push(i / 10);
    }

    return numbers;
  }

  get selectedDecimal() {
    const { selectedNumber } = this.props;

    const decimalSelected = Math.round((selectedNumber - Math.floor(selectedNumber)) * 10) / 10;

    return decimalSelected;
  }

  get selectedNatural() {
    const { selectedNumber } = this.props;

    const naturalSelected = Math.round(selectedNumber - this.selectedDecimal);

    return naturalSelected;
  }


  addNumbers = () => {
    const { numbersCount } = this.state;

    this.setState({ numbersCount: numbersCount + PORTION });
  }

  get initialIndex() {
    const { selectedNumber, measuresOption } = this.props;
    const { startIndex } = measuresOption;

    const itemsOnScreen = Dimensions.get('screen').width / LENGTH_WITH_SEPARATOR;
    const initialOfsset = Math.floor(itemsOnScreen / 2);

    const isPossibleToApplyOffset = selectedNumber > initialOfsset;
    const newSelectedNumber = isPossibleToApplyOffset && selectedNumber
      ? selectedNumber - initialOfsset
      : selectedNumber;


    const initialIndex = newSelectedNumber
      ? newSelectedNumber
      : startIndex - initialOfsset;

    return initialIndex;
  }

  get initialDecimalIndex() {
    const { selectedNumber } = this.props;

    const decimalSelected = Math.round((selectedNumber - Math.floor(selectedNumber)) * 10) / 10;

    const itemsOnScreen = Dimensions.get('screen').width / DECIMAL_LENGTH_WITH_SEPARATOR;
    const initialOfsset = Math.floor(itemsOnScreen / 2);

    const isPossibleToApplyOffset = decimalSelected > initialOfsset;
    const newSelectedNumber = isPossibleToApplyOffset && decimalSelected
      ? decimalSelected - initialOfsset
      : decimalSelected;


    const initialIndex = newSelectedNumber
      ? newSelectedNumber
      : DECIMAL_MIDDLE_NUMBER_INDEX - initialOfsset;

    return initialIndex;
  }

  onDecimalNumberClick(decimal: number) {
    const { onNumberClick } = this.props;

    if (this.selectedDecimal === decimal) {
      onNumberClick(this.selectedNatural);

      return;
    }

    onNumberClick(this.selectedNatural + decimal);
  }

  onNaturalNumberClick(natural: number) {
    const { onNumberClick } = this.props;

    if (this.selectedNatural === natural) {
      onNumberClick(0);

      return;
    }

    onNumberClick(this.selectedDecimal + natural);
  }


  render() {
    const { onNumberClick, measuresOption } = this.props;
    const { withDecimal } = measuresOption;

    return (
      <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          bounces={false}

          ref={(fl) => this.flatListRef = fl}

          data={this.numbers}
          renderItem={({ item }) => (
            <Number
              value={item}
              isSelected={this.selectedNatural === (item)}
              onClick={() => this.onNaturalNumberClick(item)}
            />
          )}
          keyExtractor={item => item && item.toString() || (Math.random() * 1000000000).toString()}

          getItemLayout={(data, index) => (
            { length: LENGTH, offset: LENGTH_WITH_SEPARATOR * index, index }
          )}
          initialScrollIndex={this.initialIndex}
          onEndReached={this.addNumbers}
          onEndReachedThreshold={0.5}
        />
        {withDecimal && (
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            bounces={false}

            ref={(fl) => this.flatListRef = fl}

            data={this.decimalNumbers}
            renderItem={({ item }) => (
              <Number
                isDecimal
                value={item}
                isSelected={this.selectedDecimal === item}
                onClick={() => this.onDecimalNumberClick(item)}
              />
            )}
            keyExtractor={item => item && item.toString() || (Math.random() * 1000000000).toString()}

            getItemLayout={(data, index) => (
              { length: DECIMAL_LENGTH, offset: DECIMAL_LENGTH_WITH_SEPARATOR * index, index }
            )}
            initialScrollIndex={this.initialDecimalIndex}
          />
        )}
      </View>
    )
  }
}

export const NumberScroller = connect(
  (state: IStorage) => ({
    userDiabetesProperties: state.userDiabetesProperties
  }),
)(Component)
