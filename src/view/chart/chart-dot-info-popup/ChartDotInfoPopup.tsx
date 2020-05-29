import React from 'react';
import { View, StyleSheet, Text, Button, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ThemeColor } from '../../../constant/ThemeColor';
import { INoteListNote } from '../../../model/INoteList';
import { BottomPopup } from '../../../component/popup/BottomPopup';
import { ChartDotInfoPopupValue } from './dot-info-popup-value/ChartDotInfoPopupValue';
import { ChartValueType } from '../../../model/IChart';
import { CloseIcon } from '../../../component/icon/CloseIcon';
import { shadowOptions } from '../../../constant/shadowOptions';
import { EditNoteIcon } from '../../../component/icon/EditNoteIcon';
import { connect } from 'react-redux';
import { IStorage } from '../../../model/IStorage';
import { createChangeInteractive } from '../../../store/modules/interactive/interactive';
import { ScrollView } from 'react-native-gesture-handler';
import { styles } from './Style';

export interface ChartDotInfoPopupProps {
    shown?: boolean
    dateTitle?: string
    note?: INoteListNote
    editable?: boolean

    onClose?: () => void
    //TODO: open popups with real ids not fake date ids
    openEditPopup?: (noteId) => void
}

export function ChartDotInfoPopup(props: ChartDotInfoPopupProps) {
    return <BottomPopup hidden={!props.shown}>
        <View style={styles.animatedView}>
            <LinearGradient
                style={styles.popupGradient}
                colors={['#DFF2FF', '#F6F8FF']}
            >
                {props.note && <>
                    <View style={styles.dateTitleView}>
                        <Text style={styles.dateTitle}>
                            {props.dateTitle}
                        </Text>
                    </View>
                    <View style={styles.upperValues}>
                        <ChartDotInfoPopupValue
                            type={ChartValueType.GLUCOSE}
                            value={props.note[ChartValueType.GLUCOSE]}
                        />
                        <ChartDotInfoPopupValue
                            type={ChartValueType.INSULIN}
                            value={props.note[ChartValueType.INSULIN]}
                        />
                    </View>
                    <View style={styles.bottomValues}>
                        <ChartDotInfoPopupValue
                            type={ChartValueType.BREAD_UNITS}
                            value={props.note[ChartValueType.BREAD_UNITS]}
                        />
                        <ChartDotInfoPopupValue
                            type={ChartValueType.LONG_INSULIN}
                            value={props.note[ChartValueType.LONG_INSULIN]}
                        />
                    </View>
                    {!!props.note.commentary && <ScrollView style={styles.commentValue}>
                        <View>
                            <Text style={styles.commentValueText}>
                                {props.note.commentary}
                            </Text>
                        </View>
                    </ScrollView>}
                </>}
                <TouchableOpacity
                    style={styles.closeTouchable}
                    onPress={props.onClose}
                >
                    <CloseIcon />
                </TouchableOpacity>
                {props.editable && (
                    <View style={styles.editNoteIconTouchableView}>
                        <TouchableOpacity
                            style={styles.editNoteIconTouchable}
                            onPress={() => {
                                props.openEditPopup(props.note.id);
                                props.onClose();
                            }}
                        >
                            <EditNoteIcon style={styles.editNoteIcon} />
                        </TouchableOpacity>
                    </View>
                )}
            </LinearGradient>
        </View>
    </BottomPopup>
}

export const ChartDotInfoPopupConnect = connect(
    (state: IStorage) => ({}),
    (dispatch) => ({ dispatch }),
    (stateProps, { dispatch }, ownProps) => {
        return {
            ...ownProps,
            openEditPopup: (noteId) => {
                dispatch(createChangeInteractive({
                    creatingNoteMode: true,
                    editingNoteId: noteId
                }))
            }
        }
    }
)(ChartDotInfoPopup)
