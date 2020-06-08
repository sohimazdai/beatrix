import React from 'react';
import { ProfilePicker } from '../../ProfilePicker';
import { View, TouchableOpacity, Text } from 'react-native';
import { ShortInsulinType, IUserDiabetesProperties, GlycemiaMeasuringType } from '../../../../model/IUserDiabetesProperties';
import { connect } from 'react-redux';
import { IStorage } from '../../../../model/IStorage';
import { createUserDiabetesPropertiesChangeAction } from '../../../../store/modules/user-diabetes-properties/UserDiabetesPropertiesActionCreator';
import { styles } from './Style';
import i18n from 'i18n-js';

interface Props {
    userDiabetesProperties?: IUserDiabetesProperties;
    onPropertiesChange?: (properties: IUserDiabetesProperties) => void;
}

function GlycemiaTypeSelectPicker(props: Props) {
    const [blocked, setBlocked] = React.useState(true);

    const selectedGlycemia = props.userDiabetesProperties.glycemiaMeasuringType;

    return (
        <ProfilePicker
            title={i18n.t('glycemia_unit')}
            description={i18n.t('glycemia_unit_description')}
        >
            <View style={styles.shortInsulinTypePickerView}>
                {blocked
                    ? (
                        <View style={styles.blockedView}>
                            <Text
                                style={styles.shortInsulinTypePickerItemTextBlockedSelected}
                            >
                                {i18n.t(selectedGlycemia)}
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
                                style={selectedGlycemia === GlycemiaMeasuringType.MG_DL ?
                                    { ...styles.shortInsulinTypeButton, ...styles.shortInsulinTypeButtonActive } :
                                    styles.shortInsulinTypeButton}
                            >
                                <TouchableOpacity
                                    onPress={() => {
                                        props.onPropertiesChange({
                                            glycemiaMeasuringType: GlycemiaMeasuringType.MG_DL
                                        });
                                        setBlocked(true);
                                    }}
                                >
                                    <Text
                                        style={selectedGlycemia === GlycemiaMeasuringType.MG_DL ?
                                            { ...styles.shortInsulinTypePickerItemText, ...styles.shortInsulinTypePickerItemTextActive } :
                                            styles.shortInsulinTypePickerItemText}
                                    >
                                        {GlycemiaMeasuringType.MG_DL}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <View
                                style={selectedGlycemia === GlycemiaMeasuringType.MMOL_L ?
                                    { ...styles.shortInsulinTypeButton, ...styles.shortInsulinTypeButtonActive } :
                                    styles.shortInsulinTypeButton}
                            >

                                <TouchableOpacity
                                    onPress={() => {
                                        props.onPropertiesChange({
                                            glycemiaMeasuringType: GlycemiaMeasuringType.MMOL_L
                                        });
                                        setBlocked(true);
                                    }}
                                >
                                    <Text
                                        style={selectedGlycemia === GlycemiaMeasuringType.MMOL_L ?
                                            { ...styles.shortInsulinTypePickerItemText, ...styles.shortInsulinTypePickerItemTextActive } :
                                            styles.shortInsulinTypePickerItemText}
                                    >
                                        {GlycemiaMeasuringType.MMOL_L}
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

export const GlycemiaTypeSelectPickerConnect = connect(
    (state: IStorage) => ({
        userDiabetesProperties: state.userDiabetesProperties
    }),
    (dispatch) => ({
        onPropertiesChange: (properties: IUserDiabetesProperties) => {
            dispatch(createUserDiabetesPropertiesChangeAction(properties))
        },
    })
)(GlycemiaTypeSelectPicker)
