import React from 'react';
import { ProfilePicker } from "../../ProfilePicker";
import { View, Text, Slider, TextInput } from "react-native";
import { connect } from "react-redux";
import { IStorage } from "../../../../model/IStorage";
import { IUserDiabetesProperties } from "../../../../model/IUserDiabetesProperties";
import { createUserDiabetesPropertiesChangeAction } from "../../../../store/modules/user-diabetes-properties/UserDiabetesPropertiesActionCreator";
import { styles } from './Style';
import { BaseDecimalInput } from '../../../../component/input/BaseDecimalInput';

interface Props {
    userDiabetesProperties?: IUserDiabetesProperties;
    onPropertiesChange?: (properties: IUserDiabetesProperties) => void;
}

function ProfileSettingsTargetGlycemiaPicker(props: Props) {
    const targetGlycemia = props.userDiabetesProperties.targetGlycemia || 6;
    const transformedValue = !isNaN(targetGlycemia) ?
        String(targetGlycemia) :
        ""

    return (
        <ProfilePicker
            title={'Целевая гликемия'}
            description={'Укажите целевое значение сахара крови'}
        >
            <View style={styles.targetGlycemiaView}>
                <Text style={styles.targetGlycemiaSliderLimitsText}>
                    4
            </Text>
                <Slider
                    style={styles.targetGlycemiaSlider}
                    value={targetGlycemia}
                    maximumValue={8}
                    minimumValue={4}
                    step={0.1}
                    onValueChange={(value: number) => props.onPropertiesChange({
                        targetGlycemia: Math.round(value * 10) / 10
                    })}
                />
                <Text style={styles.targetGlycemiaSliderLimitsText}>
                    8
                </Text>
                <BaseDecimalInput
                    value={transformedValue}
                    onChangeText={(text) => props.onPropertiesChange({ targetGlycemia: text })}
                    style={styles.glycemiaInput}
                    placeholder="6.0"
                    keyboardType={'numeric'}
                    editable={false}
                />
            </View>
        </ProfilePicker>
    )
}

export const ProfileSettingsTargetGlycemiaPickerConnect = connect(
    (state: IStorage) => ({
        userDiabetesProperties: state.userDiabetesProperties
    }),
    (dispatch) => ({
        onPropertiesChange: (properties: IUserDiabetesProperties) => {
            dispatch(createUserDiabetesPropertiesChangeAction(properties));
        },
    })
)(ProfileSettingsTargetGlycemiaPicker)
