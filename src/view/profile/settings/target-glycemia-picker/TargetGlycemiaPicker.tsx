import React from 'react';
import { connect } from "react-redux";

import { ProfilePicker } from "../../ProfilePicker";
import { View, Text, Slider, Button } from "react-native";
import { BaseDecimalInput } from '../../../../component/input/BaseDecimalInput';
import { IStorage } from "../../../../model/IStorage";
import { IUserDiabetesProperties, GlycemiaMeasuringType } from "../../../../model/IUserDiabetesProperties";

import { createUpdateUserDiabetesPropertiesAction } from '../../../../store/service/user/UpdateUserDiabetesPropertiesSaga';
import { i18nGet } from '../../../../localisation/Translate';
import { styles } from './Style';
import { Color } from '../../../../constant/Color';
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

    const [blocked, setBlocked] = React.useState(true);
    const [targetGlycemiaInput, setTargetGlycemiaInput] = React.useState(targetGlycemia);

    const isMounted = React.useRef(false);

    React.useEffect(() => {
        if (isMounted) {
            onPropertiesChange({ targetGlycemia: normalGlycemia });
            setTargetGlycemiaInput(normalGlycemia);
        } else isMounted.current = true;
    }, [glycemiaMeasuringType]);

    return (
        <ProfilePicker
            title={i18nGet('target_glycemia')}
            description={i18nGet('target_glycemia_description')}
        >
            {blocked
                ? (
                    <View style={styles.blockedView}>
                        <Text style={styles.shortInsulinTypePickerItemTextBlockedSelected}>
                            {targetGlycemia + ' ' + i18nGet(glycemiaMeasuringType)}
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
                                value={String(targetGlycemiaInput)}
                                style={styles.glycemiaInput}
                                placeholder={String(normalGlycemia)}
                                editable={false}
                            />
                        </View>
                        <View style={styles.applyButton}>
                            <Button
                                color={Color.GREEN_DARK}
                                title={i18nGet('profile_apply')}
                                onPress={() => {
                                    setBlocked(true);
                                    onPropertiesChange({
                                        targetGlycemia: targetGlycemiaInput,
                                    });
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
