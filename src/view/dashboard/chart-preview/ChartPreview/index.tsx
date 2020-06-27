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
import { Measures } from '../../../../localisation/Measures';
import { IUserDiabetesProperties } from '../../../../model/IUserDiabetesProperties';
import { ChartWrap } from '../../../chart/chart-wrap/ChartWrap';
import { ChartValueType } from '../../../../model/IChart';
import { INoteList } from '../../../../model/INoteList';
import { ChartConfig } from '../../../../screen/chart/config/ChartConfig';

interface Props {
  userDiabetesProperties: IUserDiabetesProperties,
  noteListToday: INoteList
  onChartIconPress: () => void;
};

class ChartPreview extends React.Component<Props> {
  render() {
    const {
      onChartIconPress,
      userDiabetesProperties: { glycemiaMeasuringType },
      noteListToday,
    } = this.props;

    let isChartEmpty = false;

    if (!noteListToday) isChartEmpty = true;

    const chartConfig = new ChartConfig().getConfigs().glucosePreview;

    function renderNetXTitles() {
      let highlightsNumber;
      let highlightsTitles = [];
      let newWidth = chartConfig.boxWidth - 3 * chartConfig.basicPadding;
      let titleWidth;
      highlightsNumber = 10;
      highlightsTitles = [0, 3, 6, 9, 12, 15, 18, 21, 24];
      newWidth = chartConfig.boxWidth;
      titleWidth = 20;
      return <View
        style={{
          ...styles.highightTitlesView,
          width: newWidth + 5,
          paddingRight: 3
        }}
      >
        {highlightsTitles.map(title => {
          return <Text
            key={title}
            style={{ ...styles.highightTitle, width: titleWidth }}
          >
            {title}
          </Text>
        })}
      </View>
    }

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
        <View style={styles.cardContent}>
          {isChartEmpty
            ? (
              <Text style={styles.emptyListText}>
                {i18nGet('no_recent_notes_today')}
              </Text>
            )
            : (
              <View style={styles.chartView}>
                <ChartWrap
                  key={ChartValueType.GLUCOSE}
                  type={ChartValueType.GLUCOSE}
                  config={chartConfig}
                  currentDate={new Date(DateHelper.today())}
                  noteList={noteListToday}
                  noteListByDay={{ [DateHelper.today()]: noteListToday }}
                  minCritical={Measures.getCriticalGlycemiaForChart(glycemiaMeasuringType).min}
                  maxCritical={Measures.getCriticalGlycemiaForChart(glycemiaMeasuringType).max}
                />
                {renderNetXTitles()}
              </View>
            )}
        </View>
      </DashboardCard>
    );
  }
}

export const ChartPreviewConnected = connect(
  (state: IStorage) => ({
    noteListToday: convertFlatNoteListToNoteListByDay(state)[DateHelper.today()],
    userDiabetesProperties: state.userDiabetesProperties,
  }),
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
  chartView: {
    width: '100%',

    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',

    overflow: 'hidden'
  },
  emptyListText: {
    fontSize: 16,
    color: Color.TEXT_DARK_GRAY,
    fontWeight: '500',
  },
  highightTitlesView: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  highightTitle: {
    fontSize: 13,
    color: '#666666',
    textAlign: 'center',
  },
  axisTitleView: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  axisTitleText: {
    paddingTop: 5,
    paddingRight: 10,

    fontSize: 11,
    fontWeight: 'bold',
    color: '#eee',
  },
})
