import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import getTitlesNumber from '../../../../shared/modules/active-insulin/get-titles-number';

interface Props {
  hoursOfinsulinDuration: number;
  initialHour: number;
};

export class OXTimeTitles extends React.Component<Props> {
  render() {
    const { hoursOfinsulinDuration, initialHour } = this.props;
    let titlesNumber = getTitlesNumber(hoursOfinsulinDuration);

    let titles: number[] = [];

    for (let i = 0; i <= titlesNumber; i++) {
      const hourNumber = initialHour + hoursOfinsulinDuration - (hoursOfinsulinDuration / (titlesNumber / i));
      const adaptedHour = hourNumber > 23
        ? hourNumber - 24
        : hourNumber < 0
          ? hourNumber + 24
          : hourNumber

      titles.push(adaptedHour);
    }

    return (
      <View style={styles.view}>
        {
          titles.reverse().map((title: number, index: number) => (
            <Text
              key={title + '.' + index}
              style={styles.text}
            >
              {title}:00
            </Text>
          ))
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 14,
    minWidth: 40,
    textAlign: 'center',
  }
})
