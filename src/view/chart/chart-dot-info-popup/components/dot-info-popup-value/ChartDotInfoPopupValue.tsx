import React from 'react'
import { ChartValueType } from '../../../../../model/IChart'
import { View, StyleSheet, Text } from 'react-native'
import { MinusSignIcon } from '../../../../../component/icon/MinusSignIcon'
import { GlycemiaIconConnected } from '../../../../../component/icon/tooltiped/GlycemiaIcon'
import { ShortInsulinIconConnected } from '../../../../../component/icon/tooltiped/ShortInsulinIcon'
import { BreadUnitsIconConnected } from '../../../../../component/icon/tooltiped/BreadUnitsIcon'
import { LongInsulinIconConnected } from '../../../../../component/icon/tooltiped/LongInsulinIcon'

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
            return <ShortInsulinIconConnected style={styles.icon} />
        case ChartValueType.BREAD_UNITS:
            return <BreadUnitsIconConnected style={styles.icon} />
        case ChartValueType.LONG_INSULIN:
            return <LongInsulinIconConnected style={styles.icon} />
        default:
            return <GlycemiaIconConnected style={styles.icon} />
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
        width: 30,
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
