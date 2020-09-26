import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { COLOR } from '../../../../constant/Color';
import { i18nGet } from '../../../../localisation/Translate';
import { IFoodList } from '../../../../model/IFood';
import { sumMealTotal } from '../../../food/modules/sumMealTotal';

interface Props {
  foodList: IFoodList
};

export class MealTotal extends React.Component<Props> {
  render() {
    const { foodList } = this.props;

    const totals = sumMealTotal(foodList);
    return (
      <View style={styles.wrap}>
        <View style={styles.row}>
          <Text style={{ ...styles.text, ...styles.textFirst }}>
            {i18nGet('total')}:
          </Text>
          <Text style={styles.text}>
            {`${i18nGet('food_creation_energy')}: ${totals.energy}${i18nGet('kJ')}`}
          </Text>
          <Text style={styles.text}>
            {`${i18nGet('food_creation_calories')}: ${totals.calories}${i18nGet('kcal')}`}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={{ ...styles.text, ...styles.textFirst }}>
            {`${i18nGet('food_creation_proteins')}: ${totals.proteins}${i18nGet('gram')}`}
          </Text>
          <Text style={styles.text}>
            {`${i18nGet('food_creation_fats')}: ${totals.fats}${i18nGet('gram')}`}
          </Text>
          <Text style={styles.text}>
            {`${i18nGet('food_creation_carbohydrates')}: ${totals.carbohydrates}${i18nGet('gram')}`}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrap: {
    marginTop: 8,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 8,
    borderRadius: 10,
    backgroundColor: COLOR.PRIMARY,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 4,
  },
  text: {
    fontSize: 14,
    paddingLeft: 8,
    color: COLOR.PRIMARY_WHITE,
  },
  textFirst: {
    paddingLeft: 0,
  },
});
