import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StyledButton, StyledButtonType } from '../../../../component/button/StyledButton';
import { COLOR } from '../../../../constant/Color';
import { i18nGet } from '../../../../localisation/Translate';
import { NumberScroller } from '../../../notes/components/number-scroller/NumberScroller';

interface Props {
  onAccept: (value: number) => void
  onBack: () => void
};

interface State {
  pickerOutput: number,
}

export class SheduleNumberScroller extends React.Component<Props, State> {
  state = {
    pickerOutput: 0,
  };

  setOutput = (value: number) => { this.setState({ pickerOutput: value }) }

  render() {
    const { pickerOutput } = this.state;
    const { onAccept, onBack } = this.props;

    return (
      <View style={styles.container}>
        <Text style={styles.titleHint}>{i18nGet('shedule_select_value')}</Text>
        <View style={styles.pickerRow}>
          <View style={styles.picker}>
            <NumberScroller
              onNumberClick={this.setOutput}
              measuresOption={{ withDecimal: true, startIndex: 2.5 }}
              selectedNumber={pickerOutput}
            />
          </View>
          <Text style={styles.text}>{pickerOutput}</Text>
        </View>
        <View style={styles.buttonsRow}>
          <StyledButton
            style={StyledButtonType.DELETE}
            onPress={onBack}
            label={i18nGet('cancel')}
          />
          <View style={styles.space} />
          <StyledButton
            fluid
            style={StyledButtonType.PRIMARY}
            onPress={() => onAccept(pickerOutput)}
            label={i18nGet('ok')}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
  },
  titleHint: {
    fontSize: 16,
  },
  pickerRow: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  picker: {
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: COLOR.RED_BASE,
    width: 220,
  },
  text: {
    minWidth: 60,
    marginLeft: 24,
    padding: 16,
    borderWidth: 2,
    borderRadius: 5,
    fontSize: 22,
    fontWeight: '500',
    textAlign:'center',
    color: COLOR.BLUE,
    borderColor: COLOR.PRIMARY,
    backgroundColor: COLOR.WHITE,
  },
  buttonsRow: {
    flexDirection: 'row',
    marginTop: 16,
  },
  space: {
    width: 4,
  }
})
