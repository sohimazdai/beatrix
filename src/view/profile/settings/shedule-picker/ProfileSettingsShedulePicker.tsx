import React from 'react';
import { IUserDiabetesPropertiesDayTimeValue } from "../../../../model/IUserDiabetesProperties";
import { connect } from "react-redux";
import { IStorage } from "../../../../model/IStorage";
import { IUserPropertiesShedule, SheduleKeyType } from "../../../../model/IUserPropertiesShedule";
import { createChangeInteractive } from "../../../../store/modules/interactive/interactive";
import { ProfilePicker } from "../../ProfilePicker";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from './Style';
import * as lodash from 'lodash';
import { createClearSheduleByKeyType } from '../../../../store/modules/user-properties-shedule/UserPropertiesShedule';

interface Props {
    sheduleKey: SheduleKeyType
    userPropertiesShedule?: IUserPropertiesShedule

    onShedulePopupCall?: (key: SheduleKeyType) => void
    clearShedule?: (sheduleKey: SheduleKeyType) => void
}

function ProfileSettingsShedulePicker(props: Props) {
    const { userPropertiesShedule, sheduleKey } = props;
    const shedule: IUserDiabetesPropertiesDayTimeValue[] = [];
    lodash.values(userPropertiesShedule).map((prop, index, array) => {
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
                onPress={() => props.onShedulePopupCall(props.sheduleKey)}
            >
                <Text style={{ fontSize: 16 }}>
                    {shedule.length > 0 ? 'Изменить' : 'Добавить'}
                </Text>
            </TouchableOpacity>
        )
    }

    function clearSheduleButton() {
        return (
            <TouchableOpacity
                style={styles.clearSheduleButton}
                onPress={() => props.clearShedule(props.sheduleKey)}
            >
                <Text style={{ fontSize: 16, color: 'white' }}>
                    {'Очистить'}
                </Text>
            </TouchableOpacity>
        )
    }

    function getSettingTitle() {
        switch (props.sheduleKey) {
            case SheduleKeyType.INSULIN_SENSITIVITY_FACTOR:
                return 'Фактор чувствительности к инсулину'
            case SheduleKeyType.CARBOHYDRATE_RATIO:
                return 'Углеводный коэффициент'
        }
    }

    function getDescription() {
        switch (props.sheduleKey) {
            case SheduleKeyType.INSULIN_SENSITIVITY_FACTOR:
                return 'Показывает, насколько понизит сахар крови (в ммолях) 1 ед. короткого или ультракороткого инсулина';
            case SheduleKeyType.CARBOHYDRATE_RATIO:
                return 'Показывает количество единиц инсулина для усвоения 1 ХЕ';
        }
    }

    function getHint() {
        switch (props.sheduleKey) {
            case SheduleKeyType.INSULIN_SENSITIVITY_FACTOR:
                return 'Укажите ФЧИ для разных промежутков времени';
            case SheduleKeyType.CARBOHYDRATE_RATIO:
                return 'Укажите УК для разных промежутков времени';
        }
    }

    return <ProfilePicker
        title={getSettingTitle()}
        description={getDescription()}
        hint={getHint()}
    >
        <View>
            <View style={styles.sensitivityFactorView}>
                {sheduleTableTitle()}
                {sheduleTable()}
                <View style={styles.buttons}>
                    {shedule.length > 0 && clearSheduleButton()}
                    {openPopupButton()}
                </View>
            </View>
        </View>
    </ProfilePicker>
}

export const ProfileSettingsShedulePickerConnect = connect(
    (state: IStorage) => ({
        userPropertiesShedule: state.userPropertiesShedule
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
)(ProfileSettingsShedulePicker)