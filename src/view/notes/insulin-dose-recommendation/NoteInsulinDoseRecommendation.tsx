import * as React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { connect } from 'react-redux';
import { IStorage } from '../../../model/IStorage';
import { IUserPropertiesShedule, IUserPropertiesSheduleItem } from '../../../model/IUserPropertiesShedule';
import { INoteListNote } from '../../../model/INoteList';
import { IUserDiabetesProperties } from '../../../model/IUserDiabetesProperties';
import { Measures } from '../../../localisation/Measures';
import { i18nGet } from '../../../localisation/Translate';
import { selectActiveInsulinValue } from '../../dashboard/active-insulin-info/selectors/select-active-insulin-value';
import { Color } from '../../../constant/Color';
import { NavigationScreenProp, NavigationState, NavigationParams } from 'react-navigation';
import { appAnalytics } from '../../../app/Analytics';

interface OwnProps {
    note?: INoteListNote
    navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

interface Props {
    userDiabetesProperties?: IUserDiabetesProperties
    userPropertiesShedule?: IUserPropertiesShedule
    activeInsulinValue?: number
    navigation: NavigationScreenProp<NavigationState, NavigationParams>;
    note?: INoteListNote
}

function NoteInsulinDoseRecommendation(props: Props) {
    const {
        note,
        userPropertiesShedule,
        userDiabetesProperties,
        activeInsulinValue,
        navigation,
    } = props;
    const { glycemiaMeasuringType } = userDiabetesProperties;

    function needToShowLink() {
        const currentHour = new Date(note.date).getHours();
        const sheduleItem = userPropertiesShedule[currentHour] || {} as IUserPropertiesSheduleItem;

        return (!sheduleItem.insulinSensitivityFactor || !sheduleItem.carbohydrateRatio);
    }

    function getRecommendation() {
        const currentHour = new Date(note.date).getHours();
        const sheduleItem = userPropertiesShedule[currentHour] || {} as IUserPropertiesSheduleItem;
        if (needToShowLink) {
            const recommendIfNeededMemo = React.useMemo(() => Math.random() < 0.2, []);
            return recommendIfNeededMemo
                ? i18nGet('fill_out_your_diabetes_profile_for_recommendations')
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

    if (!recommendation && !activeInsulinValue) return null;

    return (
        <View style={styles.view}>
            {!!activeInsulinValue && (
                <Text style={styles.activeInsulinText}>
                    {`${i18nGet('rest_active_insulin')}: ${activeInsulinValue.toFixed(1)}`}
                </Text>
            )}
            {!!recommendation && (
                <>
                    <Text style={styles.recommendation}>
                        {recommendation}
                    </Text>
                    {needToShowLink && (
                        <Button
                            onPress={() => {
                                appAnalytics.sendEventWithProps(
                                    appAnalytics.events.SETTINGS_INSULIN_LINK_OPENED,
                                    {
                                        from: 'insulin-recommendation'
                                    },
                                );
                                navigation.navigate(
                                    'InsulinSettings',
                                    {
                                        backPage: 'Dashboard'
                                    }
                                )
                            }}
                            title={i18nGet('set_insulin_type')}
                        />
                    )}
                </>
            )}
        </View>
    )
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
        marginTop: 15,
        backgroundColor: 'rgba(255,255,255, 0.5)',
        padding: 15,
        borderRadius: 5,
    },
    activeInsulinText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Color.RED_DARK,
        paddingBottom: 8,
    },
    recommendation: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333333'
    }
})
