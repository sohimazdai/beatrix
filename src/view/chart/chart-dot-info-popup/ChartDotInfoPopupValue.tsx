import React from 'react'
import { ChartValueType } from '../../../model/IChart'
import { View, StyleSheet, Text } from 'react-native'
import { LongSyringeIcon } from '../../../component/icon/value-icons/LongSyringeIcon'
import { ShortSyringeIcon } from '../../../component/icon/value-icons/ShortSyringeIcon'
import { MinusSignIcon } from '../../../component/icon/MinusSignIcon'
import { VegetablesIcon } from '../../../component/icon/value-icons/VegetablesIcon'
import { GlucometerIcon } from '../../../component/icon/value-icons/GlucometerIcon'

export interface ChartDotInfoPopupValueProps {
    type: string
    value: number
}

export const ChartDotInfoPopupValue = (props: ChartDotInfoPopupValueProps) => {
    return <View style={styles.view}>
        {renderIcon(props)}
        <View style={styles.value}>
        {props.value ?
            <Text style={styles.valueText}>
                {props.value}
            </Text> :
            <MinusSignIcon />
        }
        </View>
    </View>
}

function renderIcon(props: ChartDotInfoPopupValueProps) {
    switch (props.type) {
        case ChartValueType.INSULIN:
            return <ShortSyringeIcon style={styles.icon}/>
        case ChartValueType.BREAD_UNITS:
            return <VegetablesIcon style={styles.icon}/>
        case ChartValueType.LONG_INSULIN:
            return <LongSyringeIcon style={styles.icon}/>
        default:
            return <GlucometerIcon style={styles.icon}/>
    }
}

const styles = StyleSheet.create({
    view: {
        display: 'flex',
        height: 40,
        width: 90,

        margin: 5,
        paddingLeft: 5,
        paddingRight: 5,

        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

        backgroundColor: '#81A8E3',
        borderRadius: 5
    },
    icon: {
        flex: 1,
        height: 30,
    },
    value: {
        display: "flex",
        width: 50,

        alignItems: 'center',
        justifyContent: 'center',
    },
    valueText: {
        fontSize: 18,
        fontWeight: '700',
        color: '#515151'
    }
})