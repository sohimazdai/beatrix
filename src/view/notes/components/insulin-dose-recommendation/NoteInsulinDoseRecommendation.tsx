import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { IStorage } from '../../../../model/IStorage';
import { INoteListNote } from '../../../../model/INoteList';
import { IUserDiabetesProperties } from '../../../../model/IUserDiabetesProperties';
import { Measures } from '../../../../localisation/Measures';
import { i18nGet } from '../../../../localisation/Translate';
import { selectActiveInsulinValue } from '../../../dashboard/active-insulin-info/selectors/select-active-insulin-value';
import { COLOR } from '../../../../constant/Color';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { numberizeAndFix } from '../../../../api/helper/numberize-and-fix';
import { ISheduleList } from '../../../../model/IShedule';
import { selectShedule } from '../../../profile/settings/shedule/selectors/select-shedule-list';
import { ProfileIcon } from '../../../../component/icon/ProfileIcon';

interface OwnProps {
    note?: INoteListNote;
    goToInsulinSettings: () => void;
}

interface Props extends OwnProps {
    sheduleList: ISheduleList
    userDiabetesProperties?: IUserDiabetesProperties;
    activeInsulinValue?: number;
    note?: INoteListNote;
}

function NoteInsulinDoseRecommendation(props: Props) {
    const {
        note,
        sheduleList,
        userDiabetesProperties,
        activeInsulinValue,
        goToInsulinSettings,
    } = props;
    const { glycemiaMeasuringType } = userDiabetesProperties;

    const currentHour = new Date(note.date).getHours();
    const isf = sheduleList.insulinSensitivityFactor.hours[currentHour];
    const cr = sheduleList.carbohydrateRatio.hours[currentHour];
    const glucoseValueToCorrect = note.glucose - userDiabetesProperties.targetGlycemia;
    const insulinToCorrectGlucose = glucoseValueToCorrect / isf;
    const insulinToCorrectBU = note.breadUnits * cr;
    const insulinValue = (Number(insulinToCorrectBU) + Number(insulinToCorrectGlucose)).toFixed(1);

    const isFormUnfilled = !isf || !cr;

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

    if (!recommendation && !isFormUnfilled && !activeInsulinValue && !(
        activeInsulinValue && Number(insulinValue) > activeInsulinValue
    )) {
        return null;
    }

    return (
        <View style={styles.wrap}>
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
                            {` = ${numberizeAndFix((Number(insulinValue) - activeInsulinValue))}`}
                        </Text>
                    </View>
                )}
            </View>
            {!!activeInsulinValue && (
                <TouchableOpacity onPress={goToInsulinSettings}>
                    <ProfileIcon />
                </TouchableOpacity>
            )}
        </View>
    );
}

export const NoteInsulinDoseRecommendationConnect = connect(
    (state: IStorage, ownProps: OwnProps) => ({
        sheduleList: selectShedule(state),
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
    wrap: {
        borderRadius: 5,
        marginTop: 16,
        width: '100%',
        flexDirection: 'row',
        backgroundColor: 'rgba(255,255,255, 0.5)',
        padding: 8,
        justifyContent: 'space-between',
    },
    view: {
        maxWidth: '90%',
        paddingRight: 8,
    },
    textRow: {
        display: 'flex',
        flexDirection: 'row',
    },
    text: {
        fontSize: 16,
    },
    activeInsulinText: {
        fontSize: 16,
        color: COLOR.RED_DARK,
    },
    activeInsulinTextBold: {
        fontSize: 16,
        color: COLOR.RED_DARK,
    },
    recommendation: {
        fontSize: 16,
    },
    settingsLink: {
        color: COLOR.BLUE,
        fontSize: 16,
        textDecorationLine: 'underline',
        textDecorationColor: COLOR.BLUE,
    },
})
