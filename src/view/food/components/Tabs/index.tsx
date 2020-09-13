import React from 'react';
import { FoodSection } from '../../../../store/modules/food/food';
import { View, StyleSheet } from 'react-native';
import Tab from '../Tab';
import { i18nGet } from '../../../../localisation/Translate';
import { MagnifierIcon } from '../../../../component/icon/MagnifierIcon';
import { HistoryIcon } from '../../../../component/icon/HistoryIcon';
import { FavoritesIcom } from '../../../../component/icon/FavoritesIcon';
import { COLOR } from '../../../../constant/Color';
import { SHADOW_OPTIONS } from '../../../../constant/ShadowOptions';

interface Props {
  selectedPage: FoodSection
  onPageSelect: (section: FoodSection) => void
}

export default function Tabs(props: Props) {
  const { selectedPage, onPageSelect } = props;

  return (
    <View style={styles.tabBar}>
      <Tab
        isSelected={FoodSection.SEARCH === selectedPage}
        label={i18nGet('food_search')}
        icon={(<MagnifierIcon width={25} height={25} />)}
        onSelect={() => onPageSelect(FoodSection.SEARCH)}
      />
      <Tab
        isSelected={FoodSection.HISTORY === selectedPage}
        label={i18nGet('food_history')}
        icon={(<HistoryIcon width={25} height={25} fill={COLOR.PRIMARY} />)}
        onSelect={() => onPageSelect(FoodSection.HISTORY)}
      />
      <Tab
        isSelected={FoodSection.FAVORITES === selectedPage}
        label={i18nGet('food_favorites')}
        icon={(<FavoritesIcom width={25} height={25} />)}
        onSelect={() => onPageSelect(FoodSection.FAVORITES)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'stretch',
    backgroundColor: COLOR.PRIMARY_WHITE,
    ...SHADOW_OPTIONS
  }
})
