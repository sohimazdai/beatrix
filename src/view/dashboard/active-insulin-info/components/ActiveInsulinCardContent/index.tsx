import React from 'react';

import { Text, StyleSheet } from 'react-native';
import { COLOR } from '../../../../../constant/Color';
import { ActiveInsulinChartConnected } from '../InsulinChart';
import { OXTimeTitles } from '../OXTimeTitles';
import ActiveInsulinCardHeader from '../ActiveInsulinCardHeader';

interface Props {
  now: Date
  initialHour: number
  message: string
  hoursOfinsulinDuration: number
};

export function ActiveInsulinCardContent(props: Props) {
  const { now, initialHour, message, hoursOfinsulinDuration } = props;
  return (
    <>
      <ActiveInsulinCardHeader now={now} />
      <ActiveInsulinChartConnected />
      <OXTimeTitles
        hoursOfinsulinDuration={hoursOfinsulinDuration}
        initialHour={initialHour}
      />
      <Text style={styles.cardText}>
        {message}
      </Text>
    </>
  );
}

const styles = StyleSheet.create({
  cardText: {
    paddingTop: 8,
    fontSize: 14,
    color: COLOR.TEXT_BLACK,
  },
})
