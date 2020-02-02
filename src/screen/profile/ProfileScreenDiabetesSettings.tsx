import React, { Component } from 'react';
import { connect } from 'react-redux';
import { IStorage } from '../../model/IStorage';
import { View, Text, StyleSheet } from 'react-native';

export default class ProfileScreenDiabetesSettings extends Component {
    render() {
        return (
            <View style={styles.profileView}>
                <Text>u la la</Text>
            </View>
        )
    }
}

export const ProfileScreenDiabetesSettingsConnect = connect(
    (state: IStorage) => ({}),
    (dispatch) => ({dispatch})
)(ProfileScreenDiabetesSettings)


const styles = StyleSheet.create({
    profileView: {
        height: '100%',
        width: '100%',
        display: 'flex',

        flexDirection: 'column',
        backgroundColor: "#DDDDDD"
    },
    activeElementExit: {
        fontSize: 16,
        color: 'crimson'
    },
    activeElementToSettings: {
        fontSize: 16,
        color: '#2E3858'
    }
})