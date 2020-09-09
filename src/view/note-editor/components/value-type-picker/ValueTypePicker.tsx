import React from 'react'
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native'

import { GlucometerIcon } from '../../../../component/icon/value-icons/GlucometerIcon'
import { VegetablesIcon } from '../../../../component/icon/value-icons/VegetablesIcon'
import { ShortSyringeIcon } from '../../../../component/icon/value-icons/ShortSyringeIcon'
import { LongSyringeIcon } from '../../../../component/icon/value-icons/LongSyringeIcon'
import { CommentIcon } from '../../../../component/icon/CommentIcon'

import { SHADOW_OPTIONS } from '../../../../constant/OptionsShadow'
import { NoteValueType } from '../../../../model/INoteList'
import { ValueTypeInfo } from '../value-type-info/ValueTypeInfo'

interface Props {
    onSelect?: (value: NoteValueType) => void;
    selectedType?: NoteValueType

    glucose?: number
    breadUnits?: number
    insulin?: number
    longInsulin?: number
    commentary?: string
}

export class ValueTypePicker extends React.Component<Props> {
    render() {
        const {
            selectedType,
            glucose,
            insulin,
            longInsulin,
            breadUnits,
            commentary
        } = this.props;
        return <View style={styles.view}>
            <View style={styles.valueTypeColumn}>
                <View
                    style={selectedType === NoteValueType.GLUCOSE ?
                        { ...styles.iconButton, ...styles.iconButtonActive } :
                        styles.iconButton
                    }
                >
                    <TouchableOpacity
                        onPress={() => this.props.onSelect(NoteValueType.GLUCOSE)}
                        style={styles.touchableView}
                    >
                        <GlucometerIcon style={styles.icon} />
                    </TouchableOpacity>
                </View>
                <ValueTypeInfo value={glucose} />
            </View>

            <View style={styles.valueTypeColumn}>
                <View
                    style={selectedType === NoteValueType.BREAD_UNITS ?
                        { ...styles.iconButton, ...styles.iconButtonActive } :
                        styles.iconButton
                    }
                >
                    <TouchableOpacity
                        onPress={() => this.props.onSelect(NoteValueType.BREAD_UNITS)}
                        style={styles.touchableView}
                    >
                        <VegetablesIcon style={styles.icon} />
                    </TouchableOpacity>
                </View>
                <ValueTypeInfo value={breadUnits} />
            </View>

            <View style={styles.valueTypeColumn}>
                <View
                    style={selectedType === NoteValueType.SHORT_INSULIN ?
                        { ...styles.iconButton, ...styles.iconButtonActive } :
                        styles.iconButton
                    }
                >
                    <TouchableOpacity
                        onPress={() => this.props.onSelect(NoteValueType.SHORT_INSULIN)}
                        style={styles.touchableView}
                    >
                        <ShortSyringeIcon style={styles.icon} />
                    </TouchableOpacity>
                </View>
                <ValueTypeInfo value={insulin} />
            </View>

            <View style={styles.valueTypeColumn}>
                <View
                    style={selectedType === NoteValueType.LONG_INSULIN ?
                        { ...styles.iconButton, ...styles.iconButtonActive } :
                        styles.iconButton
                    }
                >
                    <TouchableOpacity
                        onPress={() => this.props.onSelect(NoteValueType.LONG_INSULIN)}
                        style={styles.touchableView}
                    >
                        <LongSyringeIcon style={styles.icon} />
                    </TouchableOpacity>
                </View>
                <ValueTypeInfo value={longInsulin} />
            </View>

            <View style={styles.valueTypeColumn}>
                <View
                    style={selectedType === NoteValueType.COMMENT ?
                        { ...styles.iconButton, ...styles.iconButtonActive } :
                        styles.iconButton
                    }
                >
                    <TouchableOpacity
                        onPress={() => this.props.onSelect(NoteValueType.COMMENT)}
                        style={styles.touchableView}
                    >
                        <CommentIcon style={styles.icon} />
                    </TouchableOpacity>
                </View>
                <ValueTypeInfo value={commentary} isTooltip />
            </View>
        </View>
    }
}

const styles = StyleSheet.create({
    view: {
        width: '100%',
        marginTop: 20,

        justifyContent: 'space-between',
        alignItems: 'flex-start',
        flexDirection: 'row',
    },
    valueTypeColumn: {
        alignItems: 'center',
    },
    touchableView: {
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconButton: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        borderRadius: 10,

        width: 40,
        height: 40,

        ...SHADOW_OPTIONS,

        backgroundColor: '#ffffff',
    },

    iconButtonActive: {
        borderWidth: 2,
        borderColor: '#2E3858'
    },

    icon: {
        width: 30,
        height: 30,
    }
})
