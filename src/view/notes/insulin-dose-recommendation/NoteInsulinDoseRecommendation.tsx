import * as React from 'react';
import { View, Text } from 'react-native';
import { styles } from './Style';
import { connect } from 'react-redux';
import { IStorage } from '../../../model/IStorage';
import { IUserPropertiesShedule, IUserPropertiesSheduleItem } from '../../../model/IUserPropertiesShedule';
import { INoteListNote } from '../../../model/INoteList';
import * as lodash from 'lodash';
import { IUserDiabetesProperties } from '../../../model/IUserDiabetesProperties';

interface OwnProps {
    note?: INoteListNote
}

interface Props {
    userDiabetesProperties?: IUserDiabetesProperties
    userPropertiesShedule?: IUserPropertiesShedule
    note?: INoteListNote
}

class NoteInsulinDoseRecommendation extends React.Component<Props> {
    render() {
        const recommendation = this.recommendation;
        if (!recommendation) return null;

        return <View style={styles.view}>
            <Text style={styles.viewText}>
                {this.recommendation}
            </Text>
        </View>
    }

    get recommendation() {
        const { note, userPropertiesShedule, userDiabetesProperties } = this.props;
        const currentHour = new Date(note.date).getHours();
        const sheduleItem = userPropertiesShedule[currentHour];
        if (!sheduleItem.insulinSensitivityFactor || !sheduleItem.carbohydrateRatio) {
            return Math.random() < 0.1 ?
            'Заполните диабетический профиль для получения рекомендаций' :
            ''
        }

        const glucoseValueToCorrect = note.glucose - userDiabetesProperties.targetGlycemia;
        const insulinToCorrectGlucose = glucoseValueToCorrect / sheduleItem.insulinSensitivityFactor;
        const insulinToCorrectBU = note.breadUnits * sheduleItem.carbohydrateRatio;
        const insulinValue = Number(insulinToCorrectBU) + Number(insulinToCorrectGlucose);

        if (note.glucose == 0 && note.breadUnits == 0) {
            return ''
        }

        if (insulinValue <= 0) {
            return "Вводить инсулин не рекомендуется";
        }

        if (note.glucose === 0) {
            return 'Введите значение глюкозы, чтобы получить рекомендацию';
        }

        if (note.glucose < 4 && note.glucose > 2) {
            return `Введите инсулин после еды. \nРекомендуемое значение инсулина: ${insulinValue}`;
        }

        if (note.glucose <= 2) {
            return 'Сначала восстановите свой уровень глюкозы';
        }

        return 'Рекомендуемое значение инсулина: ' + insulinValue;
        
    }
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