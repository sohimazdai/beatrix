import * as React from 'react';
import { View, Text } from 'react-native';
import { styles } from './Style';
import { connect } from 'react-redux';
import { IStorage } from '../../../model/IStorage';
import { IUserPropertiesShedule, IUserPropertiesSheduleItem } from '../../../model/IUserPropertiesShedule';
import { INoteListNote } from '../../../model/INoteList';
import { IUserDiabetesProperties } from '../../../model/IUserDiabetesProperties';
import i18n from 'i18n-js';
import { Measures } from '../../../localisation/Measures';

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
    const { glycemiaMeasuringType } = userDiabetesProperties;

    function getRecommendation() {
        const currentHour = new Date(note.date).getHours();
        const sheduleItem = userPropertiesShedule[currentHour] || {} as IUserPropertiesSheduleItem;
        if (!sheduleItem.insulinSensitivityFactor || !sheduleItem.carbohydrateRatio) {
            const recommendIfNeededMemo = React.useMemo(() => Math.random() < 0.2, []);
            return recommendIfNeededMemo
                ? i18n.t('fill_out_your_diabetes_profile_for_recommendations')
                : ''
        }

        const insulinToCarbRatio = sheduleItem.carbohydrateRatio;
        const glucoseValueToCorrect = note.glucose - userDiabetesProperties.targetGlycemia;
        const insulinToCorrectGlucose = glucoseValueToCorrect / sheduleItem.insulinSensitivityFactor;
        const insulinToCorrectBU = note.breadUnits / insulinToCarbRatio;
        const insulinValue = (Number(insulinToCorrectBU) + Number(insulinToCorrectGlucose)).toFixed(1);

        if (note.glucose == 0 && note.breadUnits == 0) {
            return '';
        }

        if (note.glucose === 0) {
            return i18n.t('enter_blood_glucose_value_to_get_recommendation');
        }

        if (parseFloat(insulinValue) <= 0) {
            return i18n.t('insulin_is_not_recommended')
        }

        if (
            note.glucose < Measures.getCriticalGlycemia(glycemiaMeasuringType).min &&
            note.glucose > Measures.getCriticalGlycemia(glycemiaMeasuringType).min / 2
        ) {
            return i18n.t('inject_insulin_after_meal') + ': ' + insulinValue;
        }

        if (note.glucose < Measures.getCriticalGlycemia(glycemiaMeasuringType).min / 2) {
            return i18n.t('restore_your_glucose_level_first');
        }

        return i18n.t('recommended_insulin_value') + ': ' + insulinValue;
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
