import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { ProfileTextInput } from '../ProfileTextInput';
import { IUserDiabetesPropertiesDayTimeValue } from '../../../model/IUserDiabetesProperties';
import { styles } from "./Style";
import { BaseDecimalInput } from './BaseDecimalInput';

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

    componentDidUpdate(pP: Props, pS: State) {
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
                    {this.state.isNeedToSave ? (
                        <ProfileTextInput
                            value={String(this.state.since)}
                            onChangeText={value => this.setState({
                                since: Number(value),
                                isNeedToSave: true,
                                isErrored: false
                            })}
                        />
                    ) : (
                            <Text style={styles.savedValue}>
                                {String(this.state.since)}
                            </Text>
                        )}
                </View>
                <View style={styles.itemView}>
                    {this.state.isNeedToSave ? (
                        <ProfileTextInput
                            value={String(this.state.to)}
                            onChangeText={value => this.setState({
                                to: Number(value),
                                isNeedToSave: true,
                                isErrored: false
                            })}
                        />) : (
                            <Text style={styles.savedValue}>
                                {this.state.to}
                            </Text>
                        )}
                </View>
                <View style={styles.itemView}>
                    {this.state.isNeedToSave ? (
                        <BaseDecimalInput
                            value={String(this.state.value)}
                            onChangeText={value => {
                                if (value.split('.').length > 0) {
                                    value = value.split('.')[0] + '.' + value.split('.')[1]
                                }
                                this.setState({
                                    value: Number(value),
                                    isNeedToSave: true,
                                    isErrored: false
                                })
                            }} />
                    ) : (
                            <Text style={styles.savedValue}>
                                {this.state.value}
                            </Text>
                        )}
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

