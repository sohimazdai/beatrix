import React from 'react'
import { ChartValueType } from '../../../../model/IChart'
import { View, StyleSheet, Text } from 'react-native'
import { DishIcon } from '../../../../component/icon/value-icons/DishIcon'
import { BloodDropIcon } from '../../../../component/icon/value-icons/BloodDropIcon'
import { LongSyringeIcon } from '../../../../component/icon/value-icons/LongSyringeIcon'
import { ShortSyringeIcon } from '../../../../component/icon/value-icons/ShortSyringeIcon'
import { MinusSignIcon } from '../../../../component/icon/MinusSignIcon'

export interface ChartPopupValueProps {
    type: string
    value: number
}

export const ChartPopupValue = (props: ChartPopupValueProps) => {
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

function renderIcon(props: ChartPopupValueProps) {
    switch (props.type) {
        case ChartValueType.INSULIN:
            return <ShortSyringeIcon />
        case ChartValueType.BREAD_UNITS:
            return <DishIcon />
        case ChartValueType.LONG_INSULIN:
            return <LongSyringeIcon />
        default:
            return <BloodDropIcon />
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