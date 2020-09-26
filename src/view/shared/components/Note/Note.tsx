import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { INoteListNote } from '../../../../model/INoteList';
import { SHADOW_OPTIONS } from '../../../../constant/ShadowOptions';
import { COLOR } from '../../../../constant/Color';
import { connect } from 'react-redux';
import { IStorage } from '../../../../model/IStorage';
import { CarbsMeasuringType, IUserDiabetesProperties } from '../../../../model/IUserDiabetesProperties';
import { Measures } from '../../../../localisation/Measures';
import { numberizeAndFix } from '../../../../api/helper/numberize-and-fix';
import { sumMealTotal } from '../../../food/modules/sumMealTotal';

interface Props {
    note: INoteListNote
    userDiabetesProperties: IUserDiabetesProperties
    onPress?: () => void
}

function NoteComponent(props: Props) {
    const { userDiabetesProperties, note } = props;

    const measuring = Measures.getDefaultCarbsMeasuringType(userDiabetesProperties.carbsMeasuringType);
    const buWeight = Measures.getDefaultCarbsUnitWeightType(userDiabetesProperties.carbsUnitWeightType);
    const carbsTotal = sumMealTotal(note.foodList).carbohydrates;

    const additionalCarbs = measuring === CarbsMeasuringType.BREAD_UNITS
        ? numberizeAndFix(carbsTotal / buWeight)
        : carbsTotal;

    return (
        <View
            style={styles.noteView}
        >
            <TouchableOpacity
                style={styles.touchableContainer}
                onPress={props.onPress}
            >
                <Text style={styles.text}>
                    {getTime(new Date(props.note.date))}
                </Text>
            </TouchableOpacity>
            <Text style={styles.text}>
                {props.note.glucose || '-'}
            </Text>
            <Text style={styles.text}>
                {(props.note.breadUnits + additionalCarbs) || '-'}
            </Text>
            <Text style={styles.text}>
                {props.note.insulin || '-'}
            </Text>
            <Text style={styles.text}>
                {props.note.longInsulin || '-'}
            </Text>
        </View>
    );
}

const getTime = (date: Date) => {
    const firstItem = date.getHours() >= 10 ? '' + date.getHours() : '0' + date.getHours();
    const time = date.getMinutes() >= 10 ? '' + date.getMinutes() : "0" + date.getMinutes();
    return firstItem + ':' + time;
}

export const Note = connect(
    (state: IStorage) => ({
        userDiabetesProperties: state.userDiabetesProperties,
    })
)(NoteComponent)

const styles = StyleSheet.create({
    noteView: {
        width: '100%',
        height: 30,

        display: 'flex',
        marginTop: 5,
        marginBottom: 5,

        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    touchableContainer: {
        flex: 1,
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLOR.WHITE,
        borderRadius: 10,
        ...SHADOW_OPTIONS,
    },
    text: {
        flex: 1,

        justifyContent: 'center',
        alignItems: 'center',

        textAlign: 'center',
        fontFamily: 'Roboto',
        fontSize: 18,
        lineHeight: 21,

        color: '#333',
    }
})
