import React from 'react';
import { View, StyleSheet, Text, Button, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ThemeColor } from '../../../constant/ThemeColor';
import { INoteListNote } from '../../../model/INoteList';
import { BottomPopup } from '../../../component/popup/BottomPopup';
import { ChartDotInfoPopupValue } from './chart-dot-info-popup-components/ChartDotInfoPopupValue';
import { ChartValueType } from '../../../model/IChart';
import { ArrowDownIcon } from '../../../component/icon/ArrowDownIcon';

export interface ChartDotInfoPopupProps {
    shown?: boolean
    onClose?: () => void
    dateTitle?: string
    note?: INoteListNote
}

export function ChartDotInfoPopup(props: ChartDotInfoPopupProps) {
    return <BottomPopup hidden={!props.shown}>
        <LinearGradient
            style={styles.popupGradient}
            colors={['#FFB4B4', '#D6E5ED']}
        >
            {props.note && <>
                <View style={styles.dateTitleView}>
                    <Text style ={styles.dateTitle}>
                        {props.dateTitle}
                    </Text>
                </View>
                <View style={styles.upperValues}>
                    <ChartDotInfoPopupValue
                        type={ChartValueType.GLUCOSE}
                        value={props.note[ChartValueType.GLUCOSE]}
                    />
                    <ChartDotInfoPopupValue
                        type={ChartValueType.INSULIN}
                        value={props.note[ChartValueType.INSULIN]}
                    />
                </View>
                <View style={styles.bottomValues}>
                    <ChartDotInfoPopupValue
                        type={ChartValueType.BREAD_UNITS}
                        value={props.note[ChartValueType.BREAD_UNITS]}
                    />
                    <ChartDotInfoPopupValue
                        type={ChartValueType.LONG_INSULIN}
                        value={props.note[ChartValueType.LONG_INSULIN]}
                    />
                </View>
            </>}
            <TouchableOpacity
                style={styles.arrowDown}
                onPress={props.onClose}
            >
                <ArrowDownIcon />
            </TouchableOpacity>
        </LinearGradient>
    </BottomPopup>
}

const styles = StyleSheet.create({
    animatedView: {
        width: '100%',
        display: 'flex',

        borderRadius: 25,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        backgroundColor: ThemeColor.WHITE,
        justifyContent: 'center',
        alignItems: 'center',
    },
    popupGradient: {
        width: '100%',
        display: 'flex',

        padding: 15,
        paddingBottom: 35,

        borderRadius: 25,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,

        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: ThemeColor.WHITE,
    },
    dateTitleView: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    dateTitle: {
        fontSize: 18,
    },
    upperValues: {
        display: 'flex',
        width: '100%',

        flexDirection: 'row',
        justifyContent: 'center',
    },
    bottomValues: {
        display: 'flex',
        width: '100%',

        flexDirection: 'row',
        justifyContent: 'center',
    },
    arrowDown: {
        position: 'absolute',
        right: 20,
        top: 20,
    }
})