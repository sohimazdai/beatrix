import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { ProfileTextInput } from './ProfileTextInput';
import { IUserDiabetesPropertiesDayTimeValue } from '../../model/IUserDiabetesProperties';
import { shadowOptions } from '../../constant/shadowOptions';

interface Props {
    range?: IUserDiabetesPropertiesDayTimeValue
    onApplyChange?: (range: IUserDiabetesPropertiesDayTimeValue) => void
    onDelete?: (range: IUserDiabetesPropertiesDayTimeValue) => void
    placeholder?: string
}

interface State extends IUserDiabetesPropertiesDayTimeValue {
    isErrored?: boolean
    isNeedToSave?: boolean
}

export default class ProfileDayTimeRangeValuePicker extends Component<Props, State> {
    state = {
        id: this.props.range.id,
        since: this.props.range.since,
        to: this.props.range.to,
        value: this.props.range.value,
        isNeedToSave: this.props.range.needToSave,

        isErrored: false,
    }

    componentDidUpdate(pP: Props) {
        if (pP.range.to != this.props.range.to) {
            this.setState({
                ...this.state,
                ...this.props.range
            })
        }
    }

    render() {
        return (
            <View
                style={styles.view}
            >
                <View style={styles.itemView}>
                    <ProfileTextInput
                        value={String(this.state.since)}
                        onChangeText={value => this.setState({
                            since: Number(value),
                            isNeedToSave: true,
                            isErrored: false
                        })}
                    />
                </View>
                <View style={styles.itemView}>
                    <ProfileTextInput
                        value={String(this.state.to)}
                        onChangeText={value => this.setState({
                            to: Number(value),
                            isNeedToSave: true,
                            isErrored: false
                        })}
                    />
                </View>
                <View style={styles.itemView}>
                    <ProfileTextInput
                        value={String(this.state.value)}
                        onChangeText={value => {
                            if (value.split('.').length > 0) {
                                value = value.split('.')[0] + '.' + 0
                            } else if (value.split(',').length > 0) {
                                value = value.split(',')[0] + '.' + 0
                            }
                            this.setState({
                                value: Number(value),
                                isNeedToSave: true,
                                isErrored: false
                            })
                        }}
                    />
                </View>
                <View style={styles.buttonItemView}>
                    {this.state.isNeedToSave ? (
                        <View style={styles.applyItemView}>
                            <TouchableOpacity
                                onPress={this.onApplyPress}
                                style={styles.deleteItemViewTouchable}
                            >
                                <Text style={styles.delete}>
                                    {'+'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                            <View style={styles.deleteItemView}>
                                <TouchableOpacity
                                    onPress={() => this.props.onDelete(this.props.range)}
                                    style={styles.deleteItemViewTouchable}
                                >
                                    <Text style={styles.delete}>
                                        {'-'}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        )
                    }
                </View>
            </View>
        )
    }

    onApplyPress = () => {
        if (this.state.value > 0 && this.state.to > 0) {
            this.props.onApplyChange({
                id: this.props.range.id,
                since: this.state.since,
                to: this.state.to,
                value: this.state.value
            })
            this.setState({ isNeedToSave: false })
        } else {
            this.setState({ isErrored: false })
        }
    }
}

const styles = StyleSheet.create({
    view: {
        display: 'flex',

        flexDirection: "row",
        justifyContent: 'space-evenly',

        width: '100%',
        paddingBottom: 10,
    },
    itemView: {
        display: 'flex',

        justifyContent: 'center',
        alignItems: 'center',

        flexDirection: 'row',
    },
    buttonItemView: {
        display: 'flex',

        justifyContent: 'center',
        alignItems: 'center',

        flexDirection: 'row',
    },
    itemViewTitle: {
        paddingBottom: 5,

        fontSize: 17,
    },
    inputPostfix: {
        fontSize: 17
    },
    delete: {
        fontSize: 18,
    },
    deleteItemView: {
        display: 'flex',

        justifyContent: 'center',
        alignItems: 'center',

        width: 30,
        height: 30,
        marginRight: 10,
        marginLeft: 10,
        borderRadius: 50,

        borderColor: 'crimson',
        borderWidth: 1,

        backgroundColor: '#FFFFFF',

        ...shadowOptions
    },
    applyItemView: {
        display: 'flex',

        justifyContent: 'center',
        alignItems: 'center',

        width: 30,
        height: 30,
        marginRight: 10,
        marginLeft: 10,
        borderRadius: 50,

        borderColor: 'green',
        borderWidth: 1,

        backgroundColor: '#FFFFFF',

        ...shadowOptions
    },
    deleteItemViewTouchable: {
        width: '100%',
        height: '100%',

        display: "flex",
        alignItems: 'center',
        justifyContent: 'center'
    }
})