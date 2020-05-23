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

            <View
                style={selectedType === NoteValueType.FOOD ?
                    { ...styles.iconButton, ...styles.iconButtonActive } :
                    styles.iconButton
                }
            >
                <TouchableOpacity
                    onPress={() => this.props.onSelect(NoteValueType.FOOD)}
                    style={styles.touchableView}
                >
                    <VegetablesIcon style={styles.icon} />
                </TouchableOpacity>
            </View>

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

        </View>
    }
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        margin: 20,
        width: 280,

        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
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
