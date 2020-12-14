import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationParams, NavigationScreenProp, NavigationState } from 'react-navigation';
import { IconPositionType, StyledButton, StyledButtonType } from '../../component/button/StyledButton';
import { BlockHat } from '../../component/hat/BlockHat';
import { ArrowDirection, ArrowTaillessIcon } from '../../component/icon/ArrowTaillessIcon';
import { CalendarIcon } from '../../component/icon/CalendarIcon';
import { SingleSelect } from '../../component/single-select';
import { COLOR } from '../../constant/Color';
import { i18nGet } from '../../localisation/Translate';
import { StatisticsPeriod } from '../../model/IStatistics';
import { getDateInputText } from '../../utils/get-date-input-text';
import { PieChartConnected } from '../../view/dashboard/statistics-card/components/PieChart';
import { StatisticsViewType } from '../../view/dashboard/statistics-card/entities';
import { DatePicker, DatePickerConnect } from '../../view/shared/components/DatePicker/DatePicker';

const BUTTONS = [
  {
    value: StatisticsPeriod.DAY,
    title: 'statistics_day'
  },
  {
    value: StatisticsPeriod.MONTH,
    title: 'statistics_month'
  },
  {
    value: StatisticsPeriod.SEASON,
    title: 'statistics_season'
  },
  {
    value: StatisticsPeriod.YEAR,
    title: 'statistics_year'
  },
];

enum DIRECTION {
  LEFT = -1,
  RIGHT = 1,
};

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>
};

interface State {
  selectedPeriod: StatisticsPeriod
  selectedDate: Date
}

export class StatisticsScreen extends React.Component<Props, State> {
  state = {
    selectedPeriod: StatisticsPeriod.DAY,
    selectedDate: new Date(),
  };

  getNextDateValue = (direction: DIRECTION): Date => {
    const { selectedPeriod, selectedDate } = this.state;

    switch (selectedPeriod) {
      case StatisticsPeriod.DAY:
        return new Date(
          selectedDate.getFullYear(),
          selectedDate.getMonth(),
          selectedDate.getDate() + direction,
        );
      case StatisticsPeriod.MONTH:
        return new Date(
          selectedDate.getFullYear(),
          selectedDate.getMonth() + direction,
          selectedDate.getDate(),
        );
      case StatisticsPeriod.SEASON:
        return new Date(
          selectedDate.getFullYear(),
          selectedDate.getMonth() + direction * 3,
          selectedDate.getDate(),
        );
      case StatisticsPeriod.YEAR:
        return new Date(
          selectedDate.getFullYear() + direction,
          selectedDate.getMonth(),
          selectedDate.getDate(),
        );
    }
  }

  render() {
    const { selectedPeriod, selectedDate } = this.state;
    const date = selectedDate;

    return (
      <View style={styles.wrap}>
        <BlockHat
          onBackPress={() => this.props.navigation.navigate('Dashboard')}
          title={i18nGet('statistics')}
        />
        <View style={styles.content}>
          <SingleSelect
            buttons={BUTTONS}
            selectedValue={selectedPeriod}
            onSelect={(period: StatisticsPeriod) => this.setState({ selectedPeriod: period })}
          />
          <View style={styles.pieWrap}>
            <PieChartConnected
              viewType={StatisticsViewType.PERCENT}
              statisticsPeriod={selectedPeriod}
              date={date}
            />
          </View>
          <View style={styles.datePickerContainer}>
            <View style={styles.datePicker}>
              <StyledButton
                style={StyledButtonType.OUTLINE}
                icon={<ArrowTaillessIcon direction={ArrowDirection.LEFT} width={15} />}
                onPress={() => this.setState({ selectedDate: this.getNextDateValue(DIRECTION.LEFT) })}
              />
              <DatePickerConnect
                selectedPeriod={selectedPeriod}
                date={selectedDate}
                onChange={(date) => this.setState({ selectedDate: date })}
              />
              <StyledButton
                style={StyledButtonType.OUTLINE}
                icon={<ArrowTaillessIcon direction={ArrowDirection.RIGHT} width={15} />}
                onPress={() => this.setState({ selectedDate: this.getNextDateValue(DIRECTION.RIGHT) })}
                disabled={this.getNextDateValue(DIRECTION.RIGHT) > new Date()}
              />
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: COLOR.PRIMARY_WHITE,
  },
  content: {
    display: 'flex',
    padding: 16,
  },
  pieWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 140,
  },
  space: {
    width: 8,
  },
  datePickerContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 280,
    alignSelf: 'center',
  },
  datePicker: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  metrics: {
    marginTop: 24,
  },
});
