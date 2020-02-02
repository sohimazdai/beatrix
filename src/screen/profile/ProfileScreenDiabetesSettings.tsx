import React, { Component } from 'react';
import { connect } from 'react-redux';
import { IStorage } from '../../model/IStorage';
import { View, Text, StyleSheet, Picker, TextInput } from 'react-native';
import { ProfileItem } from '../../view/profile/ProfileItem';
import { ProfilePicker } from '../../view/profile/ProfilePicker';

export enum ShortInsulinType {
    SHORT = 'short',
    ULTRA_SHORT = 'ultra-short'
}

export default class ProfileScreenDiabetesSettings extends Component {
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
                    selectedValue={this.state.shortInsulinType}
                    onValueChange={(itemValue) => this.setState({ shortInsulinType: itemValue })}
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
        return (
            <ProfilePicker
                title={'Целевая гликемия'}
                description={'Укажите целевое значение сахара крови'}
            >
                <TextInput
                    defaultValue={this.state.targetGlycemia}
                    onChangeText={(text) => this.setState({ targetGlycemia: text })}
                    style={styles.glycemiaInput}
                    placeholder="6.0"
                />
            </ProfilePicker>
        )
    }
}

export const ProfileScreenDiabetesSettingsConnect = connect(
    (state: IStorage) => ({}),
    (dispatch) => ({ dispatch })
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
    glycemiaInput: {
        height: 50,
        width: 70,
        margin: 10,

        borderWidth: 1.5,
        borderColor: "#cecece",
        borderRadius: 5,

        textAlign: 'center',
        fontSize: 18,
    }
})