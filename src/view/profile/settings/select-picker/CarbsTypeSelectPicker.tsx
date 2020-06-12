import React from 'react';
import { ProfilePicker } from '../../ProfilePicker';
import { View, TouchableOpacity, Text, Button } from 'react-native';
import { ShortInsulinType, IUserDiabetesProperties, GlycemiaMeasuringType, CarbsMeasuringType } from '../../../../model/IUserDiabetesProperties';
import { connect } from 'react-redux';
import { IStorage } from '../../../../model/IStorage';
import { createUserDiabetesPropertiesChangeAction } from '../../../../store/modules/user-diabetes-properties/UserDiabetesPropertiesActionCreator';
import { styles } from './Style';
import { Measures } from '../../../../localisation/Measures';
import { IUserPropertiesShedule, IUserPropertiesSheduleItem } from '../../../../model/IUserPropertiesShedule';
import { createUpdateUserDiabetesPropertiesAction } from '../../../../store/service/user/UpdateUserDiabetesPropertiesSaga';
import { userDiabetesPropertiesReducer } from '../../../../store/modules/user-diabetes-properties/UserDiabetesPropertiesReducer';
import { i18nGet } from '../../../../localisation/Translate';
import { IUser } from '../../../../model/IUser';
import { callSyncParametersAlert } from '../../modules/call-sync-parameters-alert';

interface Props {
    userDiabetesProperties?: IUserDiabetesProperties;
    onPropertiesChange?: (properties: IUserDiabetesProperties) => void;
    syncLoading?: boolean
}

function CarbsTypeSelectPicker(props: Props) {
    const [blocked, setBlocked] = React.useState(true);

    const selectedCarbs = Measures.getDefaultCarbsMeasuringType(
        props.userDiabetesProperties.carbsMeasuringType
    );

    return (
        <ProfilePicker
            title={i18nGet('carb_unit_title')}
            description={i18nGet('carb_unit_description')}
        >
            <View style={styles.shortInsulinTypePickerView}>
                {blocked
                    ? (
                        <View style={styles.blockedView}>
                            <Text
                                style={styles.shortInsulinTypePickerItemTextBlockedSelected}
                            >
                                {i18nGet(selectedCarbs + '_measuring')}
                            </Text>
                            <View
                                style={styles.changeButton}
                            >
                                <Button
                                    title={i18nGet('profile_change')}
                                    onPress={() => setBlocked(false)}
                                />
                            </View>
                        </View>
                    ) : (
                        <View style={styles.pickerContent}>
                            <View
                                style={selectedCarbs === CarbsMeasuringType.BREAD_UNITS ?
                                    { ...styles.shortInsulinTypeButton, ...styles.shortInsulinTypeButtonActive } :
                                    styles.shortInsulinTypeButton}
                            >
                                <TouchableOpacity
                                    onPress={() => {
                                        props.onPropertiesChange({
                                            carbsMeasuringType: CarbsMeasuringType.BREAD_UNITS
                                        });
                                        setBlocked(true);
                                    }}
                                >
                                    <Text
                                        style={selectedCarbs === CarbsMeasuringType.BREAD_UNITS ?
                                            { ...styles.shortInsulinTypePickerItemText, ...styles.shortInsulinTypePickerItemTextActive } :
                                            styles.shortInsulinTypePickerItemText}
                                    >
                                        {i18nGet(CarbsMeasuringType.BREAD_UNITS + '_measuring')}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <View
                                style={selectedCarbs === CarbsMeasuringType.CARBOHYDRATES ?
                                    { ...styles.shortInsulinTypeButton, ...styles.shortInsulinTypeButtonActive } :
                                    styles.shortInsulinTypeButton}
                            >
                                <TouchableOpacity
                                    onPress={() => {
                                        props.onPropertiesChange({
                                            carbsMeasuringType: CarbsMeasuringType.CARBOHYDRATES
                                        });
                                        setBlocked(true);
                                    }}
                                >
                                    <Text
                                        style={selectedCarbs === CarbsMeasuringType.CARBOHYDRATES ?
                                            { ...styles.shortInsulinTypePickerItemText, ...styles.shortInsulinTypePickerItemTextActive } :
                                            styles.shortInsulinTypePickerItemText}
                                    >
                                        {i18nGet(CarbsMeasuringType.CARBOHYDRATES + '_measuring')}
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

export const CarbsTypeSelectPickerConnect = connect(
    (state: IStorage) => ({
        userDiabetesProperties: state.userDiabetesProperties,
        userPropertiesShedule: state.userPropertiesShedule,
        syncLoading: state.user.syncLoading || state.user.loading,
    }),
    (dispatch) => ({ dispatch }),
    (stateProps, { dispatch }, ownProps) => ({
        userDiabetesProperties: stateProps.userDiabetesProperties,
        onPropertiesChange: (properties: IUserDiabetesProperties) => {
            callSyncParametersAlert(
                () => dispatch(createUpdateUserDiabetesPropertiesAction(properties))
            );
        },
    })

)(CarbsTypeSelectPicker)
