import React from 'react';
import { ProfilePicker } from "../../ProfilePicker";
import { View, Text, Slider, Button } from "react-native";
import { connect } from "react-redux";
import { IStorage } from "../../../../model/IStorage";
import { IUserDiabetesProperties, GlycemiaMeasuringType } from "../../../../model/IUserDiabetesProperties";
import { createUserDiabetesPropertiesChangeAction } from "../../../../store/modules/user-diabetes-properties/UserDiabetesPropertiesActionCreator";
import { styles } from './Style';
import { BaseDecimalInput } from '../../../../component/input/BaseDecimalInput';
import i18n from 'i18n-js';
import { Measures } from '../../../../localisation/Measures';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { createUpdateUserDiabetesPropertiesAction } from '../../../../store/service/user/UpdateUserDiabetesPropertiesSaga';

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

    const [blocked, setBlocked] = React.useState(true);
    const [targetGlycemiaInput, setTargetGlycemiaInput] = React.useState(targetGlycemia);

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
            {blocked
                ? (
                    <View style={styles.blockedView}>
                        <Text
                            style={styles.shortInsulinTypePickerItemTextBlockedSelected}
                        >
                            {targetGlycemia}
                        </Text>
                        <View
                            style={styles.changeButton}
                        >
                            <Button
                                title={i18n.t('profile_change')}
                                onPress={() => setBlocked(false)}
                            />
                        </View>
                    </View>
                ) : (
                    <View>

                        <View style={styles.targetGlycemiaView}>
                            <Text style={styles.targetGlycemiaSliderLimitsText}>
                                {criticalGlycemia.min}
                            </Text>
                            <Slider
                                style={styles.targetGlycemiaSlider}
                                value={Number(targetGlycemiaInput)}
                                minimumValue={criticalGlycemia.min}
                                maximumValue={criticalGlycemia.max}
                                step={isMMOL_L ? 0.1 : 1}
                                onValueChange={(value: number) => setTargetGlycemiaInput(
                                    Math.round(value * 10) / 10
                                )}
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
                        <View style={styles.applyButton}>
                            <Button
                                title={i18n.t('profile_apply')}
                                onPress={() => {
                                    setBlocked(true);
                                    onPropertiesChange({
                                        targetGlycemia: targetGlycemiaInput,
                                    })
                                }}
                            />
                        </View>
                    </View>
                )
            }
        </ProfilePicker>
    )
}

export const ProfileSettingsTargetGlycemiaPickerConnect = connect(
    (state: IStorage) => ({
        userDiabetesProperties: state.userDiabetesProperties
    }),
    (dispatch) => ({
        onPropertiesChange: (properties: IUserDiabetesProperties) => {
            dispatch(createUpdateUserDiabetesPropertiesAction(properties));
        },
    })
)(ProfileSettingsTargetGlycemiaPicker)
