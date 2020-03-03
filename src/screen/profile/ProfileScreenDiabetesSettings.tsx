import React, { Component } from 'react';
import { connect } from 'react-redux';
import { IStorage } from '../../model/IStorage';
import { View, Text, StyleSheet, TextInput, Slider, ScrollView, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import { ProfilePicker } from '../../view/profile/ProfilePicker';
import { createUserDiabetesPropertiesChangeAction } from '../../store/modules/user-diabetes-properties/UserDiabetesPropertiesActionCreator';
import { IUserDiabetesProperties, ShortInsulinType, IUserDiabetesPropertiesDayTimeValue } from '../../model/IUserDiabetesProperties';
import { isNumber } from 'util';
import { shadowOptions } from '../../constant/shadowOptions';
import ProfileDayTimeRangeValuePicker from '../../view/profile/ProfileDayTimeRangeValuePicker';
import * as lodash from "lodash"
import { createChangeInteractive } from '../../store/modules/interactive/interactive';
import { batchActions } from 'redux-batched-actions';
import { ConfirmPopupConnect } from '../../component/popup/ConfirmPopup';
import { IUserPropertiesShedule } from '../../model/IUserPropertiesShedule';
import { InteractiveUserPropertiesShedulePopupType, IInteractive } from '../../model/IInteractive';
import { Fader } from '../../component/Fader';
const uuidv1 = require('uuid/v1');


interface Props {
    userDiabetesProperties?: IUserDiabetesProperties
    userPropertiesByHour?: IUserPropertiesShedule
    interactive?: IInteractive

    onPropertiesChange?: (properties: IUserDiabetesProperties) => void
    onAddNewInsulinSensitivityRange?: () => void;
    onDeleteInsulinSensitivityFactorRange?: (itemId: string) => void
    onApplyInsulinSensitivityFactorRange?: (range: IUserDiabetesPropertiesDayTimeValue) => void

    onInsulinSensitivityPopupCall?: () => void
}

export default class ProfileScreenDiabetesSettings extends Component<Props> {
    targetGlycemia = this.props.userDiabetesProperties.targetGlycemia || 6.0;

    render() {
        return (
            <KeyboardAvoidingView
                style={styles.keyboardAvoidingView}
                behavior="padding"
                keyboardVerticalOffset={100}
            >
                <ScrollView style={styles.profileView}>
                    {this.renderInsulinTypePicker()}
                    {this.renderTargetGlycemiaInput()}
                    {this.renderInsulinSensitiveFactorPicker()}
                </ScrollView>
            </KeyboardAvoidingView>
        )
    }

    renderInsulinTypePicker() {
        const { shortInsulinType } = this.props.userDiabetesProperties;
        return (
            <ProfilePicker
                title={'Тип инсулина'}
                description={'Укажите тип инсулина по продолжительности действия'}
                hint={
                    this.props.userDiabetesProperties.shortInsulinType === ShortInsulinType.SHORT ?
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
                            onPress={() => this.props.onPropertiesChange({
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
                            onPress={() => this.props.onPropertiesChange({
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

    renderTargetGlycemiaInput() {
        const { targetGlycemia } = this.props.userDiabetesProperties;
        const transformedValue = isNumber(targetGlycemia) ?
            String(Math.round(targetGlycemia * 10) / 10) :
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
                        value={this.targetGlycemia}
                        maximumValue={8}
                        minimumValue={4}
                        step={0.1}
                        onValueChange={(value: number) => this.props.onPropertiesChange({
                            targetGlycemia: Math.round(value * 10) / 10
                        })}
                    />
                    <Text style={styles.targetGlycemiaSliderLimitsText}>
                        8
                    </Text>
                    <TextInput
                        value={transformedValue}
                        onChangeText={(text) => this.props.onPropertiesChange({ targetGlycemia: Number(text) })}
                        style={styles.glycemiaInput}
                        placeholder="6.0"
                        keyboardType={'numeric'}
                    />
                </View>
            </ProfilePicker>
        )
    }

    renderInsulinSensitiveFactorPicker() {
        const { userPropertiesByHour } = this.props;
        const insulinShedule: { since: number, to: number, value: number }[] = [];
        lodash.values(userPropertiesByHour).map((prop, index, array) => {
            if (index === 0) {
                insulinShedule.push({
                    since: prop.id,
                    to: prop.id + 1,
                    value: prop.insulinSensitivityFactor
                })
            }
            if (prop.insulinSensitivityFactor === array[index - 1].insulinSensitivityFactor) {
                insulinShedule[insulinShedule.length].to = prop.id + 1;
            }
            insulinShedule.push({
                since: prop.id,
                to: prop.id + 1,
                value: prop.insulinSensitivityFactor
            })
        });


        return <ProfilePicker
            title={'Фактор чувствительности к инсулину или ФЧИ'}
            description={'Показывает, насколько понизит сахар крови (в ммолях) 1 ед. короткого или ультракороткого инсулина'}
            hint={'Укажите ФЧИ для разных промежутков времени'}
        >
            <View>
                <View style={styles.sensitivityFactorView}>
                    {insulinShedule.length > 0 && (
                        <View style={styles.sensitivityFactorTitleView}>
                            <Text style={styles.sensitivityFactorItemTitle}>С</Text>
                            <Text style={styles.sensitivityFactorItemTitle}>До</Text>
                            <Text style={styles.sensitivityFactorItemTitle}>Значение</Text>
                            <Text style={styles.sensitivityFactorItemTitle}></Text>
                        </View>
                    )}
                    {insulinShedule
                        .sort((a, b) => a.since - b.since)
                        .map((sheduleItem) => {
                            return (
                                <View style={styles.sensitivityFactorTitleView}>
                                    <Text style={styles.sensitivityFactorItemTitle}>{sheduleItem.since}</Text>
                                    <Text style={styles.sensitivityFactorItemTitle}>{sheduleItem.to}</Text>
                                    <Text style={styles.sensitivityFactorItemTitle}>{sheduleItem.value}</Text>
                                    <Text style={styles.sensitivityFactorItemTitle}>x</Text>
                                </View>
                            )
                        })}
                    <TouchableOpacity
                        style={styles.insulinSensitiveFactorPickerTouchable}
                        onPress={this.props.onInsulinSensitivityPopupCall}
                    >
                        <Text style={{ fontSize: 16 }}>
                            {insulinShedule.length > 0 ? 'Изменить' : 'Добавить'}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ProfilePicker>
    }

}

export const ProfileScreenDiabetesSettingsConnect = connect(
    (state: IStorage) => ({
        userDiabetesProperties: state.userDiabetesProperties,
        userPropertiesByHour: state.userPropertiesShedule,
        interactive: state.interactive
    }),
    (dispatch) => ({ dispatch }),
    (stateProps, { dispatch }, ownProps) => {
        // const insulinSensitivityFactorShedule = insulinSensitivityFactor && insulinSensitivityFactor.shedule;
        return {
            ...stateProps,
            ...ownProps,
            onPropertiesChange: (properties: IUserDiabetesProperties) => {
                dispatch(createUserDiabetesPropertiesChangeAction(properties))
            },
            onInsulinSensitivityPopupCall: () => {
                dispatch(createChangeInteractive({
                    userPropertiesShedulePopupType: InteractiveUserPropertiesShedulePopupType.INSULIN_SENSITIVITY
                }))
            }
            // onAddNewInsulinSensitivityRange: () => {
            //     const newRange: IUserDiabetesPropertiesDayTimeValue = {
            //         id: uuidv1(),
            //         since: 0,
            //         to: 0,
            //         value: 0
            //     }
            //     const newSensitivityFactor: IUserDiabetesPropertiesInsulinSensitivityFactor = {
            //         ...insulinSensitivityFactor,
            //         shedule: {
            //             ...insulinSensitivityFactorShedule,
            //             [newRange.id]: newRange
            //         }
            //     }
            //     dispatch(createUserDiabetesPropertiesChangeInsulinSensitivityFactorAction(newSensitivityFactor))
            // },
            // onApplyInsulinSensitivityFactorRange: (item: IUserDiabetesPropertiesDayTimeValue) => {
            //     const newSensitivityFactor: IUserDiabetesPropertiesInsulinSensitivityFactor = {
            //         ...insulinSensitivityFactor,
            //         shedule: {
            //             ...insulinSensitivityFactorShedule,
            //             [item.id]: item
            //         }
            //     }
            //     dispatch(createUserDiabetesPropertiesChangeInsulinSensitivityFactorAction(newSensitivityFactor))
            // },
            // onDeleteInsulinSensitivityFactorRange: (itemId: string) => {
            //     const newSensitivityFactorShedule: IUserDiabetesPropertiesInsulinSensitivityFactorShedule = {
            //         ...insulinSensitivityFactorShedule
            //     }
            //     delete newSensitivityFactorShedule[itemId];
            //     const newSensitivityFactor: IUserDiabetesPropertiesInsulinSensitivityFactor = {
            //         ...insulinSensitivityFactor,
            //         shedule: newSensitivityFactorShedule
            //     }
            //     dispatch(createChangeInteractive({
            //         confirmPopupShown: true,
            //         confirmPopupRejectCallback: () => dispatch(
            //             createChangeInteractive({
            //                 confirmPopupShown: false,
            //                 confirmPopupSuccessCallback: () => { },
            //                 confirmPopupRejectCallback: () => { }
            //             })
            //         ),
            //         confirmPopupSuccessCallback: () => dispatch(batchActions([
            //             createUserDiabetesPropertiesChangeInsulinSensitivityFactorAction(newSensitivityFactor),
            //             createChangeInteractive({
            //                 confirmPopupShown: false,
            //                 confirmPopupSuccessCallback: () => { },
            //                 confirmPopupRejectCallback: () => { }
            //             })
            //         ])
            //         )
            //     }))
            // }
        }
    }
)(ProfileScreenDiabetesSettings)


const styles = StyleSheet.create({
    keyboardAvoidingView: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center'
    },
    profileView: {
        height: '100%',
        width: '100%',
        display: 'flex',

        flexDirection: 'column',
        backgroundColor: "#DDDDDD"
    },
    targetGlycemiaView: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        padding: 10,
        paddingTop: 0,
    },
    targetGlycemiaSlider: {
        height: 50,
        width: "60%",
        margin: 10,
    },
    targetGlycemiaSliderLimitsText: {
        fontSize: 18
    },
    glycemiaInput: {
        height: 50,
        width: 70,
        marginLeft: 15,
        borderWidth: 1.5,
        borderColor: "#cecece",
        backgroundColor: "white",
        borderRadius: 5,

        textAlign: 'center',
        fontSize: 18,
    },
    shortInsulinTypePickerView: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    shortInsulinTypeButton: {
        padding: 10,
        margin: 5,
        backgroundColor: "white",
        borderColor: "white",
        borderWidth: 2,
        borderRadius: 5,
        ...shadowOptions
    },
    shortInsulinTypeButtonActive: {
        borderColor: "#2E3858",
        borderWidth: 2,
        borderRadius: 5,
        ...shadowOptions
    },
    shortInsulinTypePickerItemText: {
        fontSize: 16,
        color: "rgba(0, 0, 0, 0.6)",
    },
    shortInsulinTypePickerItemTextActive: {
        fontSize: 16,
        color: "rgba(0, 0, 0, 0.8)",
        fontWeight: 'bold'
    },
    sensitivityFactorView: {
        display: 'flex',

        justifyContent: 'center',
        alignItems: 'center'
    },
    insulinSensitiveFactorPickerTouchable: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

        width: 100,

        padding: 10,

        backgroundColor: 'white',
        borderRadius: 50,
        ...shadowOptions
    },
    insulinSensitiveFactorPickerListItemTextInput: {

    },
    sensitivityFactorItemTitle: {
        flex: 1,
        alignContent: 'center',
        textAlign: 'center',
        fontSize: 17,
    },
    sensitivityFactorTitleView: {
        display: 'flex',

        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexDirection: 'row',

        padding: 20,
        paddingBottom: 10,
        paddingTop: 10
    }
})