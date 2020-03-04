import React from 'react';
import { IUserDiabetesPropertiesDayTimeValue } from "../../../../model/IUserDiabetesProperties";
import { connect } from "react-redux";
import { IStorage } from "../../../../model/IStorage";
import { IUserPropertiesShedule, SheduleKeyType } from "../../../../model/IUserPropertiesShedule";
import { createChangeInteractive } from "../../../../store/modules/interactive/interactive";
import { InteractiveUserPropertiesShedulePopupType } from "../../../../model/IInteractive";
import { ProfilePicker } from "../../ProfilePicker";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from './Style';
import * as lodash from 'lodash';

interface Props {
    sheduleKey: SheduleKeyType
    userPropertiesShedule?: IUserPropertiesShedule
    onInsulinSensitivityPopupCall?: () => void
}

function ProfileSettingsInsulinSensitiveFactorPicker(props: Props) {
    const { userPropertiesShedule, sheduleKey } = props;
    const shedule: IUserDiabetesPropertiesDayTimeValue[] = [];
    lodash.values(userPropertiesShedule).map((prop, index, array) => {
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
    });

    function sheduleTable() {
        return shedule
            .sort((a, b) => a.since - b.since)
            .map(sheduleRow)
    }

    function sheduleRow(sheduleItem: IUserDiabetesPropertiesDayTimeValue) {
        return (
            <View style={styles.sensitivityFactorTitleView} key={sheduleItem.id}>
                <Text style={styles.sensitivityFactorItemTitle}>{sheduleItem.since}</Text>
                <Text style={styles.sensitivityFactorItemTitle}>{sheduleItem.to}</Text>
                <Text style={styles.sensitivityFactorItemTitle}>{sheduleItem.value}</Text>
            </View>
        )
    }

    function sheduleTableTitle() {
        return shedule.length > 0 && (
            <View style={styles.sensitivityFactorTitleView}>
                <Text style={styles.sensitivityFactorItemTitle}>С(часов)</Text>
                <Text style={styles.sensitivityFactorItemTitle}>До(часов)</Text>
                <Text style={styles.sensitivityFactorItemTitle}>Значение</Text>
            </View>
        )
    }

    function openPopupButton() {
        return (
            <TouchableOpacity
                style={styles.insulinSensitiveFactorPickerTouchable}
                onPress={props.onInsulinSensitivityPopupCall}
            >
                <Text style={{ fontSize: 16 }}>
                    {shedule.length > 0 ? 'Изменить' : 'Добавить'}
                </Text>
            </TouchableOpacity>
        )
    }

    return <ProfilePicker
        title={'Фактор чувствительности к инсулину или ФЧИ'}
        description={'Показывает, насколько понизит сахар крови (в ммолях) 1 ед. короткого или ультракороткого инсулина'}
        hint={'Укажите ФЧИ для разных промежутков времени'}
    >
        <View>
            <View style={styles.sensitivityFactorView}>
                {sheduleTableTitle()}
                {sheduleTable()}
                {openPopupButton()}
            </View>
        </View>
    </ProfilePicker>
}

export const ProfileSettingsInsulinSensitiveFactorPickerConnect = connect(
    (state: IStorage) => ({
        userPropertiesShedule: state.userPropertiesShedule
    }),
    (dispatch) => ({
        onInsulinSensitivityPopupCall: () => {
            dispatch(createChangeInteractive({
                userPropertiesShedulePopupType: InteractiveUserPropertiesShedulePopupType.INSULIN_SENSITIVITY
            }))
        }
    })
)(ProfileSettingsInsulinSensitiveFactorPicker)