import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { NavigationScreenProp, NavigationState, NavigationParams } from 'react-navigation';
import { i18nGet } from '../../../../../localisation/Translate';

interface Props {
  navigation?: NavigationScreenProp<NavigationState, NavigationParams>
};

export function InsulinSettingsLink(props: Props) {
  const { navigation } = props;

  return (
    <View>
      <Text style={styles.text}>
        {i18nGet('to_observe_your_active_insuline_select_your_short_insulin_type_please')}
      </Text>
      <View style={styles.buttonView}>
        <Button
          onPress={() => {
            navigation.navigate(
              'InsulinSettings',
              {
                backPage: 'Dashboard'
              }
            )
          }}
          title={i18nGet('set_insulin_type')}
        />
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  text: {
    fontSize: 16,
  },
  buttonView: {
    paddingTop: 10,
  },
})
