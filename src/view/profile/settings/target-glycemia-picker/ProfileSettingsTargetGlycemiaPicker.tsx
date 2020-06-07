import React from 'react';
import { ProfilePicker } from "../../ProfilePicker";
import { View, Text, Slider } from "react-native";
import { connect } from "react-redux";
import { IStorage } from "../../../../model/IStorage";
import { IUserDiabetesProperties, GlycemiaMeasuringType } from "../../../../model/IUserDiabetesProperties";
import { createUserDiabetesPropertiesChangeAction } from "../../../../store/modules/user-diabetes-properties/UserDiabetesPropertiesActionCreator";
import { styles } from './Style';
import { BaseDecimalInput } from '../../../../component/input/BaseDecimalInput';
import i18n from 'i18n-js';
import { Measures } from '../../../../localisation/Measures';

interface Props {
    userDiabetesProperties?: IUserDiabetesProperties;
    onPropertiesChange?: (properties: IUserDiabetesProperties) => void;
}

function ProfileSettingsTargetGlycemiaPicker(props: Props) {
    const { userDiabetesProperties: { glycemiaMeasuringType }, onPropertiesChange } = props;
    const normalGlycemia = Measures.getNormalGlycemia(glycemiaMeasuringType);
    const criticalGlycemia = Measures.getCriticalGlycemia(glycemiaMeasuringType);
    const isMMOL_L = glycemiaMeasuringType === GlycemiaMeasuringType.MMOL_L;

    const targetGlycemia = props.userDiabetesProperties.targetGlycemia || normalGlycemia;

    React.useEffect(() => {
        if (glycemiaMeasuringType === GlycemiaMeasuringType.MMOL_L) {
            onPropertiesChange({ targetGlycemia: normalGlycemia })
        }
        else if (glycemiaMeasuringType === GlycemiaMeasuringType.MG_DL) {
            onPropertiesChange({ targetGlycemia: normalGlycemia })
        }
    }, [glycemiaMeasuringType]);

    return (
        <ProfilePicker
            title={i18n.t('target_glycemia')}
            description={i18n.t('target_glycemia_description')}
        >
            <View style={styles.targetGlycemiaView}>
                <Text style={styles.targetGlycemiaSliderLimitsText}>
                    {criticalGlycemia.min}
                </Text>
                <Slider
                    style={styles.targetGlycemiaSlider}
                    value={Number(targetGlycemia)}
                    minimumValue={criticalGlycemia.min}
                    maximumValue={criticalGlycemia.max}
                    step={isMMOL_L ? 0.1 : 1}
                    onValueChange={(value: number) => props.onPropertiesChange({
                        targetGlycemia: Math.round(value * 10) / 10
                    })}
                />
                <Text style={styles.targetGlycemiaSliderLimitsText}>
                    {criticalGlycemia.max}
                </Text>
                <BaseDecimalInput
                    value={String(targetGlycemia)}
                    style={styles.glycemiaInput}
                    placeholder={String(normalGlycemia)}
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
