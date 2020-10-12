import React from 'react';
import { IFoodListItem } from '../../../../model/IFood';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { i18nGet } from '../../../../localisation/Translate';
import { numberizeAndFix } from '../../../../api/helper/numberize-and-fix';
import { COLOR } from '../../../../constant/Color';

interface Props {
  item: IFoodListItem
  isLast?: boolean
  goToFoodCard: (foodId: string) => void
}
export default function NoteFoodItem(props: Props) {
  const { item, isLast, goToFoodCard } = props;

  return (
    <View style={{ ...styles.foodItem, ...(isLast ? styles.foodItemLast : {}) }} >
      <TouchableOpacity style={styles.touchable} onPress={() => goToFoodCard(item.id)}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>
            {item.name}
          </Text>
          <Text style={styles.weight}>
            {numberizeAndFix(item.nutrients.weight) + ' ' + i18nGet('gram')}
          </Text>
        </View>
        <View style={styles.nutrients}>
          <Text style={styles.nutrientText}>
            {`${i18nGet('food_proteins')} ${item.nutrients.proteins}`}
          </Text>
          <Text style={styles.nutrientText}>
            {`${i18nGet('food_fat')} ${item.nutrients.fats}`}
          </Text>
          <Text style={styles.nutrientText}>
            {`${i18nGet('food_creation_carbohydrates')} ${item.nutrients.carbohydrates}`}
          </Text>
        </View>
      </TouchableOpacity>
    </ View>
  );
}

const styles = StyleSheet.create({
  foodItem: {
    paddingVertical: 4,
    borderColor: COLOR.BUTTON_STROKE_LIGHT_GRAY,
    borderBottomWidth: 1,
  },
  foodItemLast: {
    borderBottomWidth: 0,
  },
  touchable: {
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'column',
  },
  titleRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    flex: 1,
    fontSize: 17,
    lineHeight: 22,
    minHeight: 22,
    overflow: 'hidden',
  },
  weight: {
    minWidth: 70,
    paddingLeft: 8,
    fontSize: 16,
    lineHeight: 22,
    textAlign: "right",
  },
  nutrients: {
    display: 'flex',
    paddingVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  nutrientText: {
    flex: 1,
    color: COLOR.TEXT_DARK_GRAY,
  }
})
