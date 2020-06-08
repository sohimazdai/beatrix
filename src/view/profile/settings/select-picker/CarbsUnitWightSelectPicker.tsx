import React from 'react';
import { ProfilePicker } from '../../ProfilePicker';
import { View, TouchableOpacity, Text } from 'react-native';
import { IUserDiabetesProperties, CarbsUnitWeightType, CarbsMeasuringType } from '../../../../model/IUserDiabetesProperties';
import { connect } from 'react-redux';
import { IStorage } from '../../../../model/IStorage';
import { createUserDiabetesPropertiesChangeAction } from '../../../../store/modules/user-diabetes-properties/UserDiabetesPropertiesActionCreator';
import { styles } from './Style';
import i18n from 'i18n-js';
import { Measures } from '../../../../localisation/Measures';

interface Props {
    userDiabetesProperties?: IUserDiabetesProperties;
    onPropertiesChange?: (properties: IUserDiabetesProperties) => void;
}

function CarbsUnitWeightSelectPicker(props: Props) {
    const [blocked, setBlocked] = React.useState(true);

    const selectedCarbsUnitWeight = Measures.getDefaultCarbsUnitWeightType(
        props.userDiabetesProperties.carbsUnitWeightType
    );
    const selectedCarbsMeasuringType = Measures.getDefaultCarbsMeasuringType(
        props.userDiabetesProperties.carbsMeasuringType
    );

    return selectedCarbsMeasuringType === CarbsMeasuringType.BREAD_UNITS && ( 
        <ProfilePicker
            title={i18n.t('carb_unit_weight_title')}
            description={i18n.t('carb_unit_weight_description')}
        >
            <View style={styles.shortInsulinTypePickerView}>
                {blocked
                    ? (
                        <View style={styles.blockedView}>
                            <Text
                                style={styles.shortInsulinTypePickerItemTextBlockedSelected}
                            >
                                {selectedCarbsUnitWeight + ' ' + i18n.t('carb_gram')}
                            </Text>
                            <View
                                style={styles.shortInsulinTypeButton}
                            >
                                <TouchableOpacity
                                    onPress={() => setBlocked(false)}
                                >
                                    <Text style={styles.shortInsulinTypePickerItemTextChange}>
                                        {i18n.t('profile_change')}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ) : (
                        <View style={styles.pickerContent}>
                            <View
                                style={selectedCarbsUnitWeight === CarbsUnitWeightType.TEN ?
                                    { ...styles.shortInsulinTypeButton, ...styles.shortInsulinTypeButtonActive } :
                                    styles.shortInsulinTypeButton}
                            >
                                <TouchableOpacity
                                    onPress={() => {
                                        props.onPropertiesChange({
                                            carbsUnitWeightType: CarbsUnitWeightType.TEN
                                        });
                                        setBlocked(true);
                                    }}
                                >
                                    <Text
                                        style={selectedCarbsUnitWeight === CarbsUnitWeightType.TEN ?
                                            { ...styles.shortInsulinTypePickerItemText, ...styles.shortInsulinTypePickerItemTextActive } :
                                            styles.shortInsulinTypePickerItemText}
                                    >
                                        {CarbsUnitWeightType.TEN + ' ' + i18n.t('carb_gram')}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <View
                                style={selectedCarbsUnitWeight === CarbsUnitWeightType.ELEVEN ?
                                    { ...styles.shortInsulinTypeButton, ...styles.shortInsulinTypeButtonActive } :
                                    styles.shortInsulinTypeButton}
                            >
                                <TouchableOpacity
                                    onPress={() => {
                                        props.onPropertiesChange({
                                            carbsUnitWeightType: CarbsUnitWeightType.ELEVEN
                                        });
                                        setBlocked(true);
                                    }}
                                >
                                    <Text
                                        style={selectedCarbsUnitWeight === CarbsUnitWeightType.ELEVEN ?
                                            { ...styles.shortInsulinTypePickerItemText, ...styles.shortInsulinTypePickerItemTextActive } :
                                            styles.shortInsulinTypePickerItemText}
                                    >
                                        {CarbsUnitWeightType.ELEVEN + ' ' + i18n.t('carb_gram')}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <View
                                style={selectedCarbsUnitWeight === CarbsUnitWeightType.TWELVE ?
                                    { ...styles.shortInsulinTypeButton, ...styles.shortInsulinTypeButtonActive } :
                                    styles.shortInsulinTypeButton}
                            >
                                <TouchableOpacity
                                    onPress={() => {
                                        props.onPropertiesChange({
                                            carbsUnitWeightType: CarbsUnitWeightType.TWELVE
                                        });
                                        setBlocked(true);
                                    }}
                                >
                                    <Text
                                        style={selectedCarbsUnitWeight === CarbsUnitWeightType.TWELVE ?
                                            { ...styles.shortInsulinTypePickerItemText, ...styles.shortInsulinTypePickerItemTextActive } :
                                            styles.shortInsulinTypePickerItemText}
                                    >
                                        {CarbsUnitWeightType.TWELVE + ' ' + i18n.t('carb_gram')}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )
                }
            </View>
        </ProfilePicker >
    )
}

export const CarbsUnitWeightSelectPickerConnect = connect(
    (state: IStorage) => ({
        userDiabetesProperties: state.userDiabetesProperties
    }),
    (dispatch) => ({
        onPropertiesChange: (properties: IUserDiabetesProperties) => {
            dispatch(createUserDiabetesPropertiesChangeAction(properties))
        },
    })
)(CarbsUnitWeightSelectPicker)
