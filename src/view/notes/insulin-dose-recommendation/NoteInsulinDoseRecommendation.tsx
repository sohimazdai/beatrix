import * as React from 'react';
import { View, Text } from 'react-native';
import { styles } from './Style';
import { connect } from 'react-redux';
import { IStorage } from '../../../model/IStorage';
import { IUserPropertiesShedule, IUserPropertiesSheduleItem } from '../../../model/IUserPropertiesShedule';
import { INoteListNote } from '../../../model/INoteList';
import { IUserDiabetesProperties } from '../../../model/IUserDiabetesProperties';

interface OwnProps {
    note?: INoteListNote
}

interface Props {
    userDiabetesProperties?: IUserDiabetesProperties
    userPropertiesShedule?: IUserPropertiesShedule
    note?: INoteListNote
}

function NoteInsulinDoseRecommendation(props: Props) {
    const { note, userPropertiesShedule, userDiabetesProperties } = props;

    function getRecommendation() {
        const currentHour = new Date(note.date).getHours();
        const sheduleItem = userPropertiesShedule[currentHour] || {} as IUserPropertiesSheduleItem;
        if (!sheduleItem.insulinSensitivityFactor || !sheduleItem.carbohydrateRatio) {
            const recommendIfNeededMemo = React.useMemo(() => Math.random() < 0.2, []);
            return recommendIfNeededMemo
                ? 'Заполните диабетический профиль для получения рекомендаций'
                : ''
        }

        const glucoseValueToCorrect = note.glucose - userDiabetesProperties.targetGlycemia;
        const insulinToCorrectGlucose = glucoseValueToCorrect / sheduleItem.insulinSensitivityFactor;
        const insulinToCorrectBU = note.breadUnits * sheduleItem.carbohydrateRatio;
        const insulinValue = (Number(insulinToCorrectBU) + Number(insulinToCorrectGlucose)).toFixed(1);

        if (note.glucose == 0 && note.breadUnits == 0) {
            return ''
        }

        if (note.glucose === 0) {
            return 'Введите значение глюкозы, чтобы получить рекомендацию';
        }

        if (parseFloat(insulinValue) <= 0) {
            return "Вводить инсулин не рекомендуется";
        }

        if (note.glucose < 4 && note.glucose > 2) {
            return `Введите инсулин после еды. \nРекомендуемое значение инсулина: ${insulinValue}`;
        }

        if (note.glucose <= 2) {
            return 'Сначала восстановите свой уровень глюкозы';
        }

        return 'Рекомендуемое значение инсулина: ' + insulinValue;
    }

    const recommendation = getRecommendation();

    if (!recommendation) return null;
    
    return <View style={styles.view}>
        <Text style={styles.viewText}>
            {recommendation}
        </Text>
    </View>
}

export const NoteInsulinDoseRecommendationConnect = connect(
    (state: IStorage) => ({
        userPropertiesShedule: state.userPropertiesShedule,
        userDiabetesProperties: state.userDiabetesProperties
    }),
    (dispatch) => ({ dispatch }),
    (stateProps, { dispatch }, ownProps: OwnProps) => {
        const { note } = ownProps;
        const { userPropertiesShedule, userDiabetesProperties } = stateProps;

        return {
            userPropertiesShedule,
            userDiabetesProperties,
            note
        }
    }
)(NoteInsulinDoseRecommendation)
