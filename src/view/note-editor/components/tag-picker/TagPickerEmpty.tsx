import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { COLOR } from '../../../../constant/Color';
import { i18nGet } from '../../../../localisation/Translate';
import { StyledButton, StyledButtonType } from '../../../../component/button/StyledButton';

interface Props {
  onPress: () => void;
}

export function TagPickerEmpty(props: Props) {
  const { onPress } = props;

  return (
    <View style={styles.tagPicker}>
      <Text style={styles.header}>
        {i18nGet('tags')}
      </Text>
      <Text style={styles.noTags}>
        {i18nGet('there_are_no_tags')}
      </Text>
      <View>
        <StyledButton
          label={i18nGet('create_tags')}
          onPress={onPress}
          style={StyledButtonType.PRIMARY}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  tagPicker: {
    display: 'flex',
    flexDirection: 'column',
    padding: 16,
    backgroundColor: COLOR.WHITE,
  },
  header: {
    width: '100%',
    textAlign: 'center',
    paddingHorizontal: 32,
    marginTop: 20,
    fontSize: 19,
    lineHeight: 20,
    fontWeight: "bold",
    color: COLOR.TEXT_DARK_GRAY
  },
  noTags: {
    marginTop: 8,
    fontSize: 16,
  }
})
