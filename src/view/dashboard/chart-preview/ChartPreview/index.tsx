import React from 'react';
import { connect } from 'react-redux';

import { View, StyleSheet, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { DashboardCard } from '../../../shared/DashboardCard';

import { IStorage } from '../../../../model/IStorage';
import { convertFlatNoteListToNoteListByDay } from '../../../../store/selector/NoteListSelector';
import { DateHelper } from '../../../../utils/DateHelper';
import { Color } from '../../../../constant/Color';
import { ChartsIcon } from '../../../../component/icon/ChartsIcon';
import { i18nGet } from '../../../../localisation/Translate';

interface Props {
  onChartIconPress: () => void;
};

class ChartPreview extends React.Component<Props> {
  render() {
    const { onChartIconPress } = this.props;

    return (
      <DashboardCard>
        <View style={styles.titleRow}>
          <Text style={styles.cardTitle}>
            {i18nGet('glucose_chart')}
          </Text>
          <TouchableOpacity onPress={onChartIconPress}>
            <ChartsIcon />
          </TouchableOpacity>
        </View>
      </DashboardCard>
    );
  }
}

export const ChartPreviewConnected = connect(
  (state: IStorage) => ({
    noteListToday: convertFlatNoteListToNoteListByDay(state)[DateHelper.today()],
  })
)(ChartPreview);


const styles = StyleSheet.create({
  titleRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardTitle: {
    fontSize: 19,
    color: Color.TEXT_DARK_GRAY,
    fontWeight: '500',
  },
  cardContent: {
    paddingTop: 16,
  },
  iconBarWrap: {
    marginBottom: 8,
  },
  emptyListText: {
    fontSize: 16,
    color: Color.TEXT_DARK_GRAY,
    fontWeight: '500',
  },
})
