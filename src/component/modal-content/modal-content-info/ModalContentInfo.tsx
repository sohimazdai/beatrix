import React from 'react';
import { IModalInfo } from '../../../model/IModal';
import { View, StyleSheet, Text, TouchableOpacity, Dimensions } from 'react-native';
import { Color } from '../../../constant/Color';
import { ChartPeriodType } from '../../../model/IChart';
import { ScrollView } from 'react-native-gesture-handler';
import { shadowOptions } from '../../../constant/ShadowOptions';
import i18n from 'i18n-js';

interface ModalContentInfoCardProps {
  color?: ColorType,
  text: string,
}

interface ModalContentInfoProps {
  modal: IModalInfo
  onResult: () => void
}

enum ColorType {
  DEFAULT = 'white',
  ATTENTION = '#FFE1DF',
  INSTRUCTION = '#D4EEFF'
}

export function ModalContentInfo(props: ModalContentInfoProps) {
  const { modal } = props;
  const type = modal.data.type;

  return (
    <View style={styles.view}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.infoTitle}>
          {getTitle(type)}
        </Text>
        <View style={styles.infoTextCards}>
          {getCards(type).map((card, index) => (
            <ModalContentInfoCard key={index} {...card} />
          ))}
        </View>
        <TouchableOpacity
          onPress={() => props.onResult()}
          style={styles.okButtonView}
        >
          <Text style={styles.okButtonText}>
            {i18n.t('ok')}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  )
}

function ModalContentInfoCard(props: ModalContentInfoCardProps) {
  return (
    <View style={{ ...styles.infoCard, backgroundColor: props.color || ColorType.DEFAULT }}>
      <Text style={styles.infoText}>
        {props.text}
      </Text>
    </View>
  )
}

function getTitle(type: ChartPeriodType) {
  switch (type) {
    case ChartPeriodType.DAY:
      return i18n.t('info_day_chart');
    case ChartPeriodType.MONTH:
      return i18n.t('info_month_chart');
    case ChartPeriodType.THREE_MONTH:
      return i18n.t('info_three_month_chart');
  }
}

function getCards(type: ChartPeriodType): ModalContentInfoCardProps[] {
  switch (type) {
    case ChartPeriodType.DAY:
      return [
        {
          color: ColorType.INSTRUCTION,
          text: i18n.t('info_day_chart_part_1')
        },
        {
          text: i18n.t('info_day_chart_part_2'),
        },
        {
          text: i18n.t('info_day_chart_part_3'),
        },
        {
          color: ColorType.ATTENTION,
          text: i18n.t('info_day_chart_part_4'),
        },
        {
          text: i18n.t('info_day_chart_part_5'),
        },
      ]
    case ChartPeriodType.MONTH:
      return [
        {
          color: ColorType.INSTRUCTION,
          text: i18n.t('info_month_chart_part_1'),
        },
        {
          text: i18n.t('info_month_chart_part_2'),
        },
      ]
    case ChartPeriodType.THREE_MONTH:
      return [
        {
          color: ColorType.INSTRUCTION,
          text: i18n.t('info_three_month_chart_part_1'),
        },
        {
          text: i18n.t('info_three_month_chart_part_2'),
        },
      ];
  }
}

const styles = StyleSheet.create({
  view: {
    marginTop: 20,
    width: '100%',

    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,

    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: Color.WHITE,
  },
  scrollView: {
    maxHeight: Dimensions.get('screen').height * 0.8,
    width: '100%',

    borderRadius: 25,
    flexDirection: 'column',
  },
  infoTitle: {
    flex: 1,

    padding: 20,
    paddingBottom: 0,

    fontSize: 18,
    fontWeight: 'bold',
    color: Color.TEXT_DARK_GRAY,
  },
  infoTextCards: {
    flex: 1,
    width: '100%',

    paddingHorizontal: 20,

    fontSize: 15,
    textAlign: 'left',
    color: Color.TEXT_DARK_GRAY,
  },
  infoCard: {
    backgroundColor: ColorType.DEFAULT,
    borderRadius: 15,
    marginTop: 15,
    display: 'flex',
    flexDirection: 'row',
    ...shadowOptions,
  },
  infoText: {
    flex: 1,
    width: '100%',
    flexWrap: 'wrap',
    padding: 15,

    fontSize: 16,
    textAlign: 'left',
    color: Color.TEXT_DARK_GRAY,
  },
  okButtonView: {
    alignSelf: 'center',
    width: '50%',
    marginVertical: 20,
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Color.BUTTON_STROKE_LIGHT_GRAY,
    backgroundColor: 'white',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    ...shadowOptions,
  },
  okButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Color.TEXT_DARK_GRAY,
  },
})
