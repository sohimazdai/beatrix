import React from 'react';
import { IFoodListItem } from '../../../../model/IFood';
import { View, Text, StyleSheet } from 'react-native';
import { COLOR } from '../../../../constant/Color';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface Props {
  item: IFoodListItem
  goToFoodCard: (foodId: string) => void
}
export default function FoodItem(props: Props) {
  const { item, goToFoodCard } = props;

  return (
    <View style={styles.foodItem}>
      <TouchableOpacity style={styles.touchable} onPress={() => goToFoodCard(item.id)}>
        <Text style={styles.title}>
          {item.name}
        </Text>
        <View style={styles.nutrients}>
          <Text style={styles.nutrientItem}>
            {item.nutrients.proteins}
          </Text>
          <Text style={styles.nutrientItem}>
            {item.nutrients.carbohydrates}
          </Text>
          <Text style={styles.nutrientItem}>
            {item.nutrients.fat}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  foodItem: {
    marginTop: 16,
  },
  touchable: {
    display: 'flex',
    paddingHorizontal: 16,
    alignItems: 'flex-start',
    flexDirection: 'column',
  },
  title: {
    fontSize: 17,
    lineHeight: 22,
    color: COLOR.TEXT_DARK_GRAY,
    minHeight: 22,
  },
  nutrients: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  nutrientItem: {
    flex: 1,
    alignItems: 'flex-start',
    textAlign: 'left',
  },
})
