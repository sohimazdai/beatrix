import React from 'react';
import { IUserDiabetesPropertiesDayTimeValue, IUserDiabetesProperties } from "../../../../model/IUserDiabetesProperties";
import { connect } from "react-redux";
import { IStorage } from "../../../../model/IStorage";
import { IUserPropertiesShedule, SheduleKeyType } from "../../../../model/IUserPropertiesShedule";
import { createChangeInteractive } from "../../../../store/modules/interactive/interactive";
import { ProfilePicker } from "../../ProfilePicker";
import { View, Text, TouchableOpacity, Button, Alert } from "react-native";
import { styles } from './Style';
import { createClearSheduleByKeyType } from '../../../../store/modules/user-properties-shedule/UserPropertiesShedule';
import { ProfileUserPropertiesShedulePickerActiveConnect } from './shedule-picker-active/ProfileUserPropertiesShedulePickerActive';
import { Measures } from '../../../../localisation/Measures';
import { i18nGet } from '../../../../localisation/Translate';
import { COLOR } from '../../../../constant/Color';

interface Props {
    sheduleKey: SheduleKeyType
    userPropertiesShedule?: IUserPropertiesShedule
    userDiabetesProperties: IUserDiabetesProperties
    activeUserPropertiesShedulePopupType?: SheduleKeyType

    onShedulePopupCall?: (key: SheduleKeyType) => void
    clearShedule?: (sheduleKey: SheduleKeyType) => void
}

class ProfileSettingsSheduleTable extends React.Component<Props> {
    get shedule() {
        const { userPropertiesShedule, sheduleKey } = this.props;

        const shedule: IUserDiabetesPropertiesDayTimeValue[] = [];

        Object.values(userPropertiesShedule).map((prop, index, array) => {
            if (prop[sheduleKey] > 0) {
                if (index === 0) {
                    shedule.push({
                        since: prop.id,
                        to: prop.id + 1,
                        value: prop[sheduleKey],
                        id: prop.id,
                        needToSave: prop[sheduleKey] > 0 ? false : true
                    })
                    return;
                }
                if (prop[sheduleKey] === array[index - 1][sheduleKey] &&
                    prop.id === array[index - 1].id + 1) {
                    shedule[shedule.length - 1].to = prop.id + 1;
                    return;
                }

                shedule.push({
                    since: prop.id,
                    to: prop.id + 1,
                    value: prop[sheduleKey],
                    id: prop.id,
                    needToSave: prop[sheduleKey] > 0 ? false : true
                })
                return;
            }
        });

        return shedule;
    }

    renderSheduleTable() {
        return this.shedule
            .sort((a, b) => a.since - b.since)
            .map(this.renderSheduleRow)
    }

    renderSheduleRow = (sheduleItem: IUserDiabetesPropertiesDayTimeValue) => {
        return (
            <View style={styles.sensitivityFactorTitleView} key={sheduleItem.id}>
                <Text style={styles.sensitivityFactorItemTitle}>{sheduleItem.since}</Text>
                <Text style={styles.sensitivityFactorItemTitle}>{sheduleItem.to}</Text>
                <Text style={styles.sensitivityFactorItemTitle}>{sheduleItem.value}</Text>
            </View>
        )
    }

    renderSheduleTableTitles = () => {
        return this.shedule.length > 0 && (
            <View style={styles.sensitivityFactorTitleView}>
                <Text style={styles.sensitivityFactorItemTitle}>{i18nGet('shedule_since')}</Text>
                <Text style={styles.sensitivityFactorItemTitle}>{i18nGet('shedule_until')}</Text>
                <Text style={styles.sensitivityFactorItemTitle}>{i18nGet('shedule_value')}</Text>
            </View>
        )
    }

    renderChangeButton = () => {
        return (
            <View style={styles.insulinSensitiveFactorPickerTouchable}>
                <Button
                    title={
                        this.shedule.length > 0
                            ? i18nGet('shedule_change')
                            : i18nGet('shedule_add')
                    }
                    onPress={() => this.props.onShedulePopupCall(this.props.sheduleKey)}
                />
            </View>
        )
    }

    renderClearSheduleButton() {
        return (
            <View style={styles.clearSheduleButton}>
                <Button
                    color={COLOR.CRIMSON_RED}
                    title={i18nGet('shedule_clear')}
                    onPress={() => {
                        Alert.alert(
                            i18nGet('are_you_sure'),
                            '',
                            [
                                {
                                    text: i18nGet('cancel'),
                                    onPress: () => { },
                                    style: 'cancel',
                                },
                                {
                                    text: i18nGet('yes'),
                                    onPress: () => this.props.clearShedule(this.props.sheduleKey),
                                    style: 'cancel',
                                },
                            ]
                        )
                    }}
                />
            </View>
        )
    }

    get settingTitle() {
        switch (this.props.sheduleKey) {
            case SheduleKeyType.INSULIN_SENSITIVITY_FACTOR:
                return i18nGet('insulin_sensitivity_factor')
            case SheduleKeyType.CARBOHYDRATE_RATIO:
                return i18nGet('insulin_to_carb_rate');
        }
    }

    get description() {
        const { userDiabetesProperties: { glycemiaMeasuringType, carbsMeasuringType } } = this.props;
        const glycemiaType = Measures.getDefaultGlucoseMeasuringType(glycemiaMeasuringType);
        const glycemiaTypeString = i18nGet(glycemiaType);
        const glycemiaTypeStringLong = i18nGet(glycemiaType + '_long');

        const carbohydratesType = Measures.getDefaultCarbsMeasuringType(carbsMeasuringType);
        const breadUnitsParentCase = i18nGet(carbohydratesType + '_parent_case');

        switch (this.props.sheduleKey) {
            case SheduleKeyType.INSULIN_SENSITIVITY_FACTOR:
                return i18nGet('insulin_sensitivity_factor_description')
                    .replace(
                        '%glycemia_type%',
                        glycemiaTypeStringLong + '(' + glycemiaTypeString + ')'
                    );
            case SheduleKeyType.CARBOHYDRATE_RATIO:
                return i18nGet('insulin_to_carb_rate_description')
                    .replace(
                        '%breadUnits_type%',
                        breadUnitsParentCase
                    );
        }
    }

    get hint() {
        switch (this.props.sheduleKey) {
            case SheduleKeyType.INSULIN_SENSITIVITY_FACTOR:
                return i18nGet('insulin_sensitivity_factor_hint');
            case SheduleKeyType.CARBOHYDRATE_RATIO:
                return i18nGet('insulin_to_carb_rate_hint');
        }
    }
    render() {
        const { activeUserPropertiesShedulePopupType, sheduleKey } = this.props;

        return (
            <ProfilePicker
                title={this.settingTitle}
                description={this.description}
                hint={this.hint}
            >
                <View>
                    <View style={styles.sensitivityFactorView}>
                        {activeUserPropertiesShedulePopupType !== sheduleKey
                            ? <>
                                {this.renderSheduleTableTitles()}
                                {this.renderSheduleTable()}
                                <View style={styles.buttons}>
                                    {this.shedule.length > 0 && this.renderClearSheduleButton()}
                                    {this.renderChangeButton()}
                                </View>
                            </>
                            : <ProfileUserPropertiesShedulePickerActiveConnect />
                        }
                    </View>
                </View>
            </ProfilePicker>
        )
    }
}

export const ProfileSettingsSheduleTableConnect = connect(
    (state: IStorage) => ({
        userPropertiesShedule: state.userPropertiesShedule,
        userDiabetesProperties: state.userDiabetesProperties,
        activeUserPropertiesShedulePopupType: state.interactive.userPropertiesShedulePopupType,
    }),
    (dispatch) => ({
        onShedulePopupCall: (sheduleKey: SheduleKeyType) => {
            dispatch(createChangeInteractive({
                userPropertiesShedulePopupType: sheduleKey
            }))
        },
        clearShedule: (sheduleKey: SheduleKeyType) => {
            dispatch(createClearSheduleByKeyType(sheduleKey))
        }
    })
)(ProfileSettingsSheduleTable)
