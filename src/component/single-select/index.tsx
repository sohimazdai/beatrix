import React from 'react';
import { StyleSheet, View } from 'react-native';
import { i18nGet } from '../../localisation/Translate';
import { StyledButton, StyledButtonType } from '../button/StyledButton';

interface SingleSelectItem {
  value: string | number
  title: string
}

interface Props {
  selectedValue: string | number
  buttons: SingleSelectItem[]
  onSelect: (value: string | number) => void
};

export class SingleSelect extends React.Component<Props> {
  render() {
    const { buttons, selectedValue, onSelect } = this.props;

    return (
      <View style={styles.row}>
        {buttons.map((button) => {
          const isSelected = button.value === selectedValue;

          return (
            <View style={styles.wrap}>
              <StyledButton
                style={isSelected ? StyledButtonType.PRIMARY : StyledButtonType.OUTLINE}
                label={i18nGet(button.title)}
                onPress={() => onSelect(button.value)}
              />
            </View>
          )
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrap: {
    marginRight: 4,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
  },
  place: {
    width: 4,
  },
});

