import React from 'react';
import { ProfilePicker } from '../../ProfilePicker';
import { View, TouchableOpacity, Text } from 'react-native';
import { ShortInsulinType, IUserDiabetesProperties } from '../../../../model/IUserDiabetesProperties';
import { connect } from 'react-redux';
import { IStorage } from '../../../../model/IStorage';
import { createUserDiabetesPropertiesChangeAction } from '../../../../store/modules/user-diabetes-properties/UserDiabetesPropertiesActionCreator';
import { styles } from './Style';

interface Props {
    userDiabetesProperties?: IUserDiabetesProperties;
    onPropertiesChange?: (properties: IUserDiabetesProperties) => void;
}

function ProfileSettingsInsulinTypePicker(props: Props) {
    const { shortInsulinType } = props.userDiabetesProperties;
    return (
        <ProfilePicker
            title={'Тип инсулина'}
            description={'Укажите тип инсулина по продолжительности действия'}
            hint={
                shortInsulinType === ShortInsulinType.SHORT ?
                    'Такие инсулины как АКТРАПИД НМ, ХУМУЛИН R, ИНСУМАН РАПИД. Действуют 6-8 часов.' :
                    'Такие инсулины как НОВОРАПИД, ХУМАЛОГ, АПИДРА. Действуют 3-5 часов.'
            }
        >
            <View style={styles.shortInsulinTypePickerView}>
                <View
                    style={shortInsulinType === ShortInsulinType.ULTRA_SHORT ?
                        { ...styles.shortInsulinTypeButton, ...styles.shortInsulinTypeButtonActive } :
                        styles.shortInsulinTypeButton}
                >

                    <TouchableOpacity
                        onPress={() => props.onPropertiesChange({
                            shortInsulinType: ShortInsulinType.ULTRA_SHORT
                        })}
                    >
                        <Text
                            style={shortInsulinType === ShortInsulinType.ULTRA_SHORT ?
                                { ...styles.shortInsulinTypePickerItemText, ...styles.shortInsulinTypePickerItemTextActive } :
                                styles.shortInsulinTypePickerItemText}
                        >
                            {'Ультракороткий'}
                        </Text>
                    </TouchableOpacity>
                </View>
                <View
                    style={shortInsulinType === ShortInsulinType.SHORT ?
                        { ...styles.shortInsulinTypeButton, ...styles.shortInsulinTypeButtonActive } :
                        styles.shortInsulinTypeButton}
                >

                    <TouchableOpacity
                        onPress={() => props.onPropertiesChange({
                            shortInsulinType: ShortInsulinType.SHORT
                        })}
                    >
                        <Text
                            style={shortInsulinType === ShortInsulinType.SHORT ?
                                { ...styles.shortInsulinTypePickerItemText, ...styles.shortInsulinTypePickerItemTextActive } :
                                styles.shortInsulinTypePickerItemText}
                        >
                            {'Короткий'}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ProfilePicker>
    )
}

export const ProfileSettingsInsulinTypePickerConnect = connect(
    (state: IStorage) => ({
        userDiabetesProperties: state.userDiabetesProperties
    }),
    (dispatch) => ({
        onPropertiesChange: (properties: IUserDiabetesProperties) => {
            dispatch(createUserDiabetesPropertiesChangeAction(properties))
        },
    })
)(ProfileSettingsInsulinTypePicker)