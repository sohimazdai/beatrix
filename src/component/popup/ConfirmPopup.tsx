import React, { Component } from 'react'
import { SuperPopup, PopupDirection } from './SuperPopup'
import { connect } from 'react-redux'
import { IStorage } from '../../model/IStorage'
import { IInteractive } from '../../model/IInteractive'
import { View, StyleSheet, Text } from 'react-native'
import { COLOR } from '../../constant/Color'
import { TouchableOpacity } from 'react-native-gesture-handler'

interface Props {
    interactive?: IInteractive;
}

export default class ConfirmPopup extends Component<Props> {
    render() {
        return (
            <SuperPopup
                hidden={!this.props.interactive.confirmPopupShown}
                direction={PopupDirection.BOTTOM_TOP}
            >
                <View style={styles.view}>
                    <Text style={styles.questionText}>
                        {'Вы уверены?'}
                    </Text>
                    <View style={styles.confirmButtons}>
                        <View style={styles.negativeButtonView}>
                            <TouchableOpacity
                                onPress={() => this.props.interactive.confirmPopupRejectCallback()}
                                style={styles.negativeButtonTouchable}
                            >
                                <Text style={styles.negativeButtonText}>
                                    {'Нет'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.positiveButtonView}>
                            <TouchableOpacity
                                onPress={() => this.props.interactive.confirmPopupSuccessCallback()}
                                style={styles.positiveButtonTouchable}
                            >
                                <Text style={styles.positiveButtonText}>
                                    {'Да'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </SuperPopup>
        )
    }
}

export const ConfirmPopupConnect = connect(
    (state: IStorage) => ({
        interactive: state.interactive
    }),
)(ConfirmPopup)

const styles = StyleSheet.create({
    view: {
        width: '100%',
        maxWidth: 500,

        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,

        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: COLOR.LIGHT_PINK_RED,
    },
    questionText: {
        flex: 1,
        width: 234,

        padding: 20,

        fontSize: 18,
        textAlign: 'center',
        color: COLOR.TEXT_DARK_GRAY,
    },
    confirmButtons: {
        width: '100%',

        paddingBottom: 20,

        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignContent: 'center',
    },
    negativeButtonView: {
        width: 100,
        height: 40,

        marginRight: 20,

        borderWidth: 1,
        borderRadius: 10,
        borderColor: COLOR.BUTTON_STROKE_LIGHT_GRAY,
        backgroundColor: 'white',
    },
    negativeButtonTouchable: {
        width: '100%',
        height: '100%',

        display: 'flex',

        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    negativeButtonText: {
        fontSize: 16,
        color: COLOR.DIMGRAY,
    },
    positiveButtonView: {
        width: 100,
        height: 40,

        marginLeft: 20,

        borderWidth: 1,
        borderRadius: 10,
        borderColor: COLOR.INDIAN_RED,
        backgroundColor: 'white',
    },
    positiveButtonTouchable: {
        width: '100%',
        height: '100%',

        display: 'flex',

        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },

    positiveButtonText: {
        fontSize: 16,
        color: COLOR.DIMGRAY,
    }
})
