import React from 'react';
import { Platform, View, DatePickerAndroid, TouchableOpacity, Text, StyleSheet, TimePickerAndroid } from 'react-native';
import { connect } from 'react-redux';
import { Action, Dispatch } from 'redux';
import { createModalChangeAction } from '../../../store/modules/modal/ModalActionCreator';
import { ModalType, IModalPickerType } from '../../../model/IModal';
import { ThemeColor } from '../../../constant/ThemeColor';
import { ClocksIcon } from '../../../component/icon/ClocksIcon';

export interface NoteTimePickerProps {
    date: Date
    onChange: (value) => void
}

export interface DispatchToProps {
    dispatch: Dispatch<Action>
}

export interface FullProps extends DispatchToProps, NoteTimePickerProps { }

export class NoteTimePicker extends React.PureComponent<FullProps> {
    render() {
        const { date } = this.props;
        const displayHours = date.getHours() > 10 ? date.getHours() : ('0' + date.getHours());
        const displayMinutes = date.getMinutes() > 10 ? date.getMinutes() : ('0' + date.getMinutes());

        return (
            <View style={styles.view}>
                <TouchableOpacity
                    style={styles.touchable}
                    onPress={() => Platform.OS === 'android' ?
                        this.displayAndroidTimePicker() :
                        this.displayIOsTimePicker()
                    }
                >
                    <ClocksIcon />
                    <Text style={styles.inputText}>
                        {displayHours + ':' + displayMinutes}
                    </Text>
                </TouchableOpacity>
            </View >
        )
    }
    private displayAndroidTimePicker = async () => {
        try {
            const { date } = this.props;
            const { action, hour, minute } = await (TimePickerAndroid as any).open({
                hour: this.props.date.getHours(),
                minute: this.props.date.getMinutes(),
                is24Hour: true,
            });
            if (action !== TimePickerAndroid.dismissedAction) {
                this.props.onChange(new Date(date.getFullYear(), date.getMonth(), date.getDate(), hour, minute))
            }
        } catch ({ code, message }) {
            console.warn('Cannot open time picker', message);
        }
    }

    private displayIOsTimePicker = () => {
        this.props.dispatch(createModalChangeAction({
            type: ModalType.IOS_DATE_PICKER,
            needToShow: true,
            data: {
                date: this.props.date,
                pickerType: IModalPickerType.TIME,
                positiveButtonText: 'Обновить дату',
                onPositiveClick: this.props.onChange,
            }
        }))
    }
}


export const NoteTimePickerConnect = connect<{}, DispatchToProps>(
    () => ({}),
    (dispatch: Dispatch<Action>) => ({ dispatch })
)(NoteTimePicker)

const styles = StyleSheet.create({
    view: {
        width: 105,
        height: 31,

        borderWidth: 1,

        borderRadius: 5,
        backgroundColor: ThemeColor.WHITE,
        borderColor: ThemeColor.TAN
    },
    touchable: {
        flex: 1,

        paddingLeft: 7,
        paddingRight: 7,
        paddingBottom: 3,
        paddingTop: 3,

        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    inputText: {
        flex: 1,

        marginLeft: 7,

        textAlign: 'center',
        fontSize: 18,
        color: ThemeColor.DIMGRAY,
    }
})
