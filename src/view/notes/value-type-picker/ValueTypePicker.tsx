import React from 'react'
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native'
import { RoundClocksIcon } from '../../../component/icon/RoundClocksIcon'
import { GlucometerIcon } from '../../../component/icon/value-icons/GlucometerIcon'
import { VegetablesIcon } from '../../../component/icon/value-icons/VegetablesIcon'
import { ShortSyringeIcon } from '../../../component/icon/value-icons/ShortSyringeIcon'
import { LongSyringeIcon } from '../../../component/icon/value-icons/LongSyringeIcon'
import { shadowOptions } from '../../../constant/shadowOptions'
import { CommentIcon } from '../../../component/icon/CommentIcon'
import { NoteValueType } from '../../../model/INoteList'

interface Props {
    onSelect?: (value: NoteValueType) => void;
    selectedType?: NoteValueType
}

export class ValueTypePicker extends React.Component<Props> {
    render() {
        const { selectedType } = this.props;
        return <View style={styles.view}>
            <TouchableOpacity onPress={() => this.props.onSelect(NoteValueType.GLUCOSE)}>
                <View
                    style={selectedType === NoteValueType.GLUCOSE ?
                        { ...styles.iconButton, ...styles.iconButtonActive } :
                        styles.iconButton
                    }
                >
                    <GlucometerIcon style={styles.icon} />
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.props.onSelect(NoteValueType.FOOD)}>
                <View
                    style={selectedType === NoteValueType.FOOD ?
                        { ...styles.iconButton, ...styles.iconButtonActive } :
                        styles.iconButton
                    }
                >
                    <VegetablesIcon style={styles.icon} />
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.props.onSelect(NoteValueType.SHORT_INSULIN)}>
                <View
                    style={selectedType === NoteValueType.SHORT_INSULIN ?
                        { ...styles.iconButton, ...styles.iconButtonActive } :
                        styles.iconButton
                    }
                >
                    <ShortSyringeIcon style={styles.icon} />
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.props.onSelect(NoteValueType.LONG_INSULIN)}>
                <View
                    style={selectedType === NoteValueType.LONG_INSULIN ?
                        { ...styles.iconButton, ...styles.iconButtonActive } :
                        styles.iconButton
                    }
                >
                    <LongSyringeIcon style={styles.icon} />
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.props.onSelect(NoteValueType.COMMENT)}>
                <View
                    style={selectedType === NoteValueType.COMMENT ?
                        { ...styles.iconButton, ...styles.iconButtonActive } :
                        styles.iconButton
                    }
                >
                    <CommentIcon style={styles.icon} />
                </View>
            </TouchableOpacity>
        </View>
    }
}

const styles = StyleSheet.create({
    view: {
        margin: 20,
        flex: 1,
        width: 280,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
    },
    iconButton: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        borderRadius: 10,

        width: 40,
        height: 40,

        ...shadowOptions,

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