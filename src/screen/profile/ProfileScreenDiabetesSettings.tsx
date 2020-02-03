import React, { Component } from 'react';
import { connect } from 'react-redux';
import { IStorage } from '../../model/IStorage';
import { View, Text, StyleSheet, TextInput, Slider, ScrollView, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import { ProfilePicker } from '../../view/profile/ProfilePicker';
import { createUserDiabetesPropertiesChangeAction } from '../../store/modules/user-diabetes-properties/UserDiabetesPropertiesActionCreator';
import { IUserDiabetesProperties, ShortInsulinType } from '../../model/IUserDiabetesProperties';
import { isNumber } from 'util';
import { shadowOptions } from '../../constant/shadowOptions';



interface Props {
    userDiabetesProperties?: IUserDiabetesProperties

    onPropertiesChange?: (properties: IUserDiabetesProperties) => void
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
                        'Такие инсулины как АКТРАПИД НМ, ХУМУЛИН R, ИНСУМАН РАПИДю Действуют 6-8 часов.' :
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

}

export const ProfileScreenDiabetesSettingsConnect = connect(
    (state: IStorage) => ({
        userDiabetesProperties: state.userDiabetesProperties
    }),
    (dispatch) => ({
        onPropertiesChange: (properties: IUserDiabetesProperties) => {
            dispatch(createUserDiabetesPropertiesChangeAction(properties))
        }
    })
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
    }
})