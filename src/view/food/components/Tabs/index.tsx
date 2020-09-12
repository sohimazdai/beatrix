import React from 'react';
import { FoodSection } from '../../../../store/modules/food/food';
import { View, StyleSheet } from 'react-native';
import Tab from '../Tab';
import { i18nGet } from '../../../../localisation/Translate';
import { MagnifierIcon } from '../../../../component/icon/MagnifierIcon';
import { HistoryIcon } from '../../../../component/icon/HistoryIcon';
import { FavoritesIcom } from '../../../../component/icon/FavoritesIcon';
import { COLOR } from '../../../../constant/Color';

interface Props {
  selectedPage: FoodSection
}

export default function Tabs(props: Props) {
  const { selectedPage } = props;
  const [selected, setSelected] = React.useState(selectedPage);

  return (
    <View style={styles.tabBar}>
      <Tab
        isSelected={FoodSection.SEARCH === selected}
        label={i18nGet('food_search')}
        icon={(<MagnifierIcon width={25} height={25} />)}
        onSelect={() => setSelected(FoodSection.SEARCH)}
      />
      <Tab
        isSelected={FoodSection.HISTORY === selected}
        label={i18nGet('food_history')}
        icon={(<HistoryIcon width={25} height={25} fill={COLOR.PRIMARY} />)}
        onSelect={() => setSelected(FoodSection.HISTORY)}
      />
      <Tab
        isSelected={FoodSection.FAVORITES === selected}
        label={i18nGet('food_favorites')}
        icon={(<FavoritesIcom width={25} height={25} />)}
        onSelect={() => setSelected(FoodSection.FAVORITES)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    display: 'flex',
    flexDirection: 'row',
  }
})
