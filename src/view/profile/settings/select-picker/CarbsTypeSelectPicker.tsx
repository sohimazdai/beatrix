import React from 'react';
import { ProfilePicker } from '../../ProfilePicker';
import { View, TouchableOpacity, Text } from 'react-native';
import { ShortInsulinType, IUserDiabetesProperties, GlycemiaMeasuringType, CarbMeasuringType } from '../../../../model/IUserDiabetesProperties';
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

function CarbsTypeSelectPicker(props: Props) {
    const [blocked, setBlocked] = React.useState(true);

    const selectedCarbs = Measures.getDefaultCarbMeasuringType(
        props.userDiabetesProperties.carbMeasuringType
    ) + '_measuring';

    return (
        <ProfilePicker
            title={i18n.t('carb_unit_title')}
            description={i18n.t('carb_unit_description')}
        >
            <View style={styles.shortInsulinTypePickerView}>
                {blocked
                    ? (
                        <View style={styles.blockedView}>
                            <Text
                                style={styles.shortInsulinTypePickerItemTextBlockedSelected}
                            >
                                {i18n.t(selectedCarbs)}
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
                                style={selectedCarbs === CarbMeasuringType.BREAD_UNITS ?
                                    { ...styles.shortInsulinTypeButton, ...styles.shortInsulinTypeButtonActive } :
                                    styles.shortInsulinTypeButton}
                            >
                                <TouchableOpacity
                                    onPress={() => {
                                        props.onPropertiesChange({
                                            carbMeasuringType: CarbMeasuringType.BREAD_UNITS
                                        });
                                        setBlocked(true);
                                    }}
                                >
                                    <Text
                                        style={selectedCarbs === CarbMeasuringType.BREAD_UNITS ?
                                            { ...styles.shortInsulinTypePickerItemText, ...styles.shortInsulinTypePickerItemTextActive } :
                                            styles.shortInsulinTypePickerItemText}
                                    >
                                        {i18n.t(CarbMeasuringType.BREAD_UNITS + '_measuring')}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <View
                                style={selectedCarbs === CarbMeasuringType.CARBOHYDRATES ?
                                    { ...styles.shortInsulinTypeButton, ...styles.shortInsulinTypeButtonActive } :
                                    styles.shortInsulinTypeButton}
                            >

                                <TouchableOpacity
                                    onPress={() => {
                                        props.onPropertiesChange({
                                            carbMeasuringType: CarbMeasuringType.CARBOHYDRATES
                                        });
                                        setBlocked(true);
                                    }}
                                >
                                    <Text
                                        style={selectedCarbs === CarbMeasuringType.CARBOHYDRATES ?
                                            { ...styles.shortInsulinTypePickerItemText, ...styles.shortInsulinTypePickerItemTextActive } :
                                            styles.shortInsulinTypePickerItemText}
                                    >
                                        {i18n.t(CarbMeasuringType.CARBOHYDRATES + '_measuring')}
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
        userDiabetesProperties: state.userDiabetesProperties
    }),
    (dispatch) => ({
        onPropertiesChange: (properties: IUserDiabetesProperties) => {
            dispatch(createUserDiabetesPropertiesChangeAction(properties))
        },
    })
)(CarbsTypeSelectPicker)
