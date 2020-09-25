import React from 'react';
import { IFoodListItem } from '../../../../model/IFood';
import { View, Text, StyleSheet } from 'react-native';
import { COLOR } from '../../../../constant/Color';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { i18nGet } from '../../../../localisation/Translate';

interface Props {
  item: IFoodListItem
  goToFoodCard: (foodId: string) => void
}
export default function NoteFoodItem(props: Props) {
  const { item, goToFoodCard } = props;

  return (
    <View style={styles.foodItem}>
      <TouchableOpacity style={styles.touchable} onPress={() => goToFoodCard(item.id)}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>
            {item.name}
          </Text>
          <Text style={styles.weight}>
            {item.nutrients.weight}
          </Text>
        </View>
        <View style={styles.nutrients}>
          <View style={styles.nutrientsItem}>
            <Text style={styles.nutrientItemTitle}>
              {i18nGet('food_proteins')}
            </Text>
            <Text style={styles.nutrientItemValue}>
              {item.nutrients.proteins}
            </Text>
          </View>
          <View style={styles.nutrientsItem}>
            <Text style={styles.nutrientItemTitle}>
              {i18nGet('food_fat')}
            </Text>
            <Text style={styles.nutrientItemValue}>
              {item.nutrients.fats}
            </Text>
          </View>
          <View style={styles.nutrientsItem}>
            <Text style={styles.nutrientItemTitle}>
              {i18nGet('food_carbohydrates')}
            </Text>
            <Text style={styles.nutrientItemValue}>
              {item.nutrients.carbohydrates}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  foodItem: {
    paddingVertical: 4,
    borderColor: COLOR.BUTTON_STROKE_LIGHT_GRAY,
    borderBottomWidth: 1,
  },
  touchable: {
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'column',
  },
  titleRow: {
    display: 'flex',
    flexDirection: 'row',
  },
  title: {
    flex: 1,
    fontSize: 17,
    lineHeight: 22,
    minHeight: 22,
    overflow: 'hidden',
  },
  weight: {
    width: 80,
  },
  nutrients: {
    display: 'flex',
    paddingVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  nutrientsItem: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    paddingRight: 8,
  },
  nutrientItemTitle: {
    textAlign: 'left',
    color: COLOR.TEXT_DARK_GRAY,
  },
  nutrientItemValue: {
    width: 35,
    paddingLeft: 4,
    color: COLOR.TEXT_DARK_GRAY,
  },
})
