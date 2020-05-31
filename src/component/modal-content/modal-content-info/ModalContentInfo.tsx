import React from 'react';
import { IModalInfo } from '../../../model/IModal';
import { View, StyleSheet, Text, TouchableOpacity, Dimensions } from 'react-native';
import { Color } from '../../../constant/Color';
import { ChartPeriodType } from '../../../model/IChart';
import { ScrollView } from 'react-native-gesture-handler';
import { shadowOptions } from '../../../constant/shadowOptions';

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
            ОК
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
      return 'Дневной график';
    case ChartPeriodType.MONTH:
      return 'Месячный график';
    case ChartPeriodType.THREE_MONTH:
      return 'Трехмесячный график';
  }
}

function getCards(type: ChartPeriodType): ModalContentInfoCardProps[] {
  switch (type) {
    case ChartPeriodType.DAY:
      return [
        {
          color: ColorType.INSTRUCTION,
          text: "Графики визуализируют распределение сахара крови, инсулина и ХЕ в течение дня. " +
            "Как известно, сахар крови повышается с принятием пищи и понижается с введением инсулина.",
        },
        {
          text: "График глюкозы крови(посередине) является показателем корректности подобранной дозы для каждого конкретного времени дня. " +
            "Если вы замечаете систематически повторяющиеся скачки сахара крови - обратитесь к врачу для корректировки дозы короткого или пролонгированного инсулина.",
        },
        {
          text: "График инсулина(сверху) приблизительно отражает распределение короткого инсулина в организме в течение дня. В случае, когда с последней инъекции не прошло 4 часов, вы можете наблюдать механизм наложения введенного инсулина. " +
            "При наложении действующих инсулинов повышается опасность возникновения гипокликемии! Так же узнайте у врача-эндкринолога вашу максимально приемлемую дозировку инсулина и старайтесь не превышать её, в том числе, в случая наложения.",
        },
        {
          color: ColorType.ATTENTION,
          text: "Значения графика инсулина отложены вниз, что отражает противонаправленность с графиком хлебных единиц",
        },
        {
          text: "График хлебных единиц(снизу) является усредненной картиной всасывания углеводов в кровь. Узнайте у врача-эндокринолога вашу максимальную порцию углеводов и старайтесь всегда укладываться в заданные рамки."
        },
      ]
    case ChartPeriodType.MONTH:
      return [
        {
          color: ColorType.INSTRUCTION,
          text: "На месячном графике точками показаны средние показатели сахара крови, иснулина и ХЕ за соотвествующий день.",
        },
        {
          text: "Красными линиями показаны выходные. Вы можете заметить систематические повышения и снижения сахара в различные дни недели и проанализировать причину таких скачков."
        },
      ]
    case ChartPeriodType.THREE_MONTH:
      return [
        {
          color: ColorType.INSTRUCTION,
          text: 'Точки - средние значения за единицу времени. На трехмесячном графике единицей времени является неделя.',
        },
        {
          text: 'Наблюдайте за сезонным харакетром распределения глюкозы в крови. Вы можете определить систематические скачки сахара и соотнести с определенным периодом жизни. Например, отпуском, болезнью, диетой или любым специфическим периодом жизни. В следующий раз вы сможете быть подготовленным к такой же ситуации немного лучше.'
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
