import React, { Component } from 'react';
import { connect } from 'react-redux';
import { IStorage } from '../../model/IStorage';
import { View, Text, StyleSheet, Picker, TextInput, Slider } from 'react-native';
import { ProfileItem } from '../../view/profile/ProfileItem';
import { ProfilePicker } from '../../view/profile/ProfilePicker';
import { createUserDiabetesPropertiesChangeAction } from '../../store/modules/user-diabetes-properties/UserDiabetesPropertiesActionCreator';
import { IUserDiabetesProperties, ShortInsulinType } from '../../model/IUserDiabetesProperties';
import { isNumber } from 'util';



interface Props {
    userDiabetesProperties?: IUserDiabetesProperties

    onPropertiesChange?: (properties: IUserDiabetesProperties) => void
}

interface State {
    shortInsulinType?: ShortInsulinType
    targetGlycemia?: string
}

export default class ProfileScreenDiabetesSettings extends Component<Props, State> {
    targetGlycemia = this.props.userDiabetesProperties.targetGlycemia || 6.0;
    state = {
        shortInsulinType: ShortInsulinType.ULTRA_SHORT,
        targetGlycemia: "",
    }

    render() {
        return (
            <View style={styles.profileView}>
                {this.renderInsulinTypePicker()}
                {this.renderTargetGlycemiaInput()}
            </View>
        )
    }

    renderInsulinTypePicker() {
        return (
            <ProfilePicker
                title={'Тип инсулина'}
                description={'Укажите тип инсулина по продолжительности действия'}
                hint={
                    this.state.shortInsulinType === ShortInsulinType.SHORT ?
                        'Такие как АКТРАПИД НМ, ХУМУЛИН R, ИНСУМАН РАПИД' :
                        'Такие как НОВОРАПИД, ХУМАЛОГ, АПИДРА'
                }
            >
                <Picker
                    selectedValue={this.props.userDiabetesProperties.shortInsulinType}
                    onValueChange={(itemValue) => this.props.onPropertiesChange({ shortInsulinType: itemValue })}
                    style={styles.insulinPicker}
                    itemStyle={styles.insulinPickerItem}
                >
                    <Picker.Item label="Ультракороткий" value={ShortInsulinType.ULTRA_SHORT} />
                    <Picker.Item label="Короткий" value={ShortInsulinType.SHORT} />
                </Picker>
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
    profileView: {
        height: '100%',
        width: '100%',
        display: 'flex',

        flexDirection: 'column',
        backgroundColor: "#DDDDDD"
    },
    insulinPicker: {
        width: 300,
    },
    insulinPickerItem: {
        height: 150
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
    }
})