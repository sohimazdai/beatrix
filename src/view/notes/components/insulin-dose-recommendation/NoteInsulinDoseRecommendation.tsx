import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { IStorage } from '../../../../model/IStorage';
import { IUserPropertiesShedule, IUserPropertiesSheduleItem } from '../../../../model/IUserPropertiesShedule';
import { INoteListNote } from '../../../../model/INoteList';
import { IUserDiabetesProperties } from '../../../../model/IUserDiabetesProperties';
import { Measures } from '../../../../localisation/Measures';
import { i18nGet } from '../../../../localisation/Translate';
import { selectActiveInsulinValue } from '../../../dashboard/active-insulin-info/selectors/select-active-insulin-value';
import { COLOR } from '../../../../constant/Color';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface OwnProps {
    note?: INoteListNote;
    goToInsulinSettings: () => void;
}

interface Props extends OwnProps {
    userDiabetesProperties?: IUserDiabetesProperties;
    userPropertiesShedule?: IUserPropertiesShedule;
    activeInsulinValue?: number;
    note?: INoteListNote;
}

function NoteInsulinDoseRecommendation(props: Props) {
    const {
        note,
        userPropertiesShedule,
        userDiabetesProperties,
        activeInsulinValue,
        goToInsulinSettings,
    } = props;
    const { glycemiaMeasuringType } = userDiabetesProperties;

    const currentHour = new Date(note.date).getHours();
    const sheduleItem = userPropertiesShedule[currentHour] || {} as IUserPropertiesSheduleItem;
    const insulinToCarbRatio = sheduleItem.carbohydrateRatio;
    const glucoseValueToCorrect = note.glucose - userDiabetesProperties.targetGlycemia;
    const insulinToCorrectGlucose = glucoseValueToCorrect / sheduleItem.insulinSensitivityFactor;
    const insulinToCorrectBU = note.breadUnits / insulinToCarbRatio;
    const insulinValue = (Number(insulinToCorrectBU) + Number(insulinToCorrectGlucose)).toFixed(1);

    const isFormUnfilled = !sheduleItem.insulinSensitivityFactor || !sheduleItem.carbohydrateRatio;

    function getRecommendation() {
        if (isFormUnfilled) return '';

        if (note.glucose == 0 && note.breadUnits == 0) {
            return '';
        }

        if (note.glucose === 0) {
            return i18nGet('enter_blood_glucose_value_to_get_recommendation');
        }

        if (parseFloat(insulinValue) <= 0) {
            return i18nGet('insulin_is_not_recommended')
        }

        if (
            note.glucose < Measures.getCriticalGlycemia(glycemiaMeasuringType).min &&
            note.glucose > Measures.getCriticalGlycemia(glycemiaMeasuringType).min / 2
        ) {
            return i18nGet('inject_insulin_after_meal') + ': ' + insulinValue;
        }

        if (note.glucose < Measures.getCriticalGlycemia(glycemiaMeasuringType).min / 2) {
            return i18nGet('restore_your_glucose_level_first');
        }

        return i18nGet('recommended_insulin_value') + ': ' + insulinValue;
    }

    const recommendation = getRecommendation();

    return (
        <View style={styles.view}>
            {!!recommendation && (
                <Text style={styles.recommendation}>
                    {recommendation}
                </Text>
            )}
            {!!isFormUnfilled && (
                <TouchableOpacity onPress={goToInsulinSettings}>
                    <Text style={styles.settingsLink}>
                        {i18nGet('fill_out_your_diabetes_profile_for_recommendations')}
                    </Text>
                </TouchableOpacity>
            )}
            {!!activeInsulinValue && (
                <View style={styles.textRow}>
                    <Text style={styles.activeInsulinText}>
                        {`${i18nGet('rest_active_insulin')}: ${activeInsulinValue.toFixed(1)}`}
                    </Text>
                </View>
            )}
            {!!activeInsulinValue && Number(insulinValue) > activeInsulinValue && (
                <View style={styles.textRow}>
                    <Text style={styles.text}>
                        {`${i18nGet('need_to_inject')}: ${insulinValue} - `}
                    </Text>
                    <Text style={styles.activeInsulinTextBold}>
                        {activeInsulinValue.toFixed(1)}
                    </Text>
                    <Text style={styles.text}>
                        {` = ${(Number(insulinValue) - activeInsulinValue).toFixed(1)}`}
                    </Text>
                </View>
            )}
        </View>
    );
}

export const NoteInsulinDoseRecommendationConnect = connect(
    (state: IStorage, ownProps: OwnProps) => ({
        userPropertiesShedule: state.userPropertiesShedule,
        userDiabetesProperties: state.userDiabetesProperties,
        activeInsulinValue: selectActiveInsulinValue(
            state,
            new Date(ownProps.note.date)
        ),
    }),
    (dispatch) => ({ dispatch }),
    (stateProps, { }, ownProps: OwnProps) => {

        return {
            ...ownProps,
            ...stateProps,
        }
    }
)(NoteInsulinDoseRecommendation)

const styles = StyleSheet.create({
    view: {
        width: '100%',
        marginTop: 16,
        backgroundColor: 'rgba(255,255,255, 0.5)',
        padding: 16,
        borderRadius: 5,
    },
    textRow: {
        display: 'flex',
        flexDirection: 'row',
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
        lineHeight: 30,
    },
    activeInsulinText: {
        fontSize: 16,
        color: COLOR.RED_DARK,
        lineHeight: 30,
    },
    activeInsulinTextBold: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLOR.RED_DARK,
        lineHeight: 30,
    },
    recommendation: {
        fontSize: 16,
        color: COLOR.TEXT_DARK_GRAY,
        lineHeight: 30,
    },
    settingsLink: {
        color: COLOR.BLUE,
        fontWeight: 'bold',
        fontSize: 16,
        textDecorationLine: 'underline',
        textDecorationColor: COLOR.BLUE,
    }
})
