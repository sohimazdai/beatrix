import React from 'react';
import { View, StyleSheet, Text, Button, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ThemeColor } from '../../../constant/ThemeColor';
import { INoteListNote } from '../../../model/INoteList';
import { BottomPopup } from '../../../component/popup/BottomPopup';
import { ChartDotInfoPopupValue } from './ChartDotInfoPopupValue';
import { ChartValueType } from '../../../model/IChart';
import { CloseIcon } from '../../../component/icon/CloseIcon';
import { shadowOptions } from '../../../constant/shadowOptions';
import { EditNoteIcon } from '../../../component/icon/EditNoteIcon';
import { connect } from 'react-redux';
import { IStorage } from '../../../model/IStorage';
import { createChangeInteractive } from '../../../store/modules/interactive/interactive';

export interface ChartDotInfoPopupProps {
    shown?: boolean
    onClose?: () => void
    openEditPopup?: (noteId) => void
    dateTitle?: string
    note?: INoteListNote
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
                    {!!props.note.commentary && <View style={styles.commentValue}>
                        <Text style={styles.commentValueText}>
                            {props.note.commentary}
                        </Text>
                    </View>}
                </>}
                <TouchableOpacity
                    style={styles.closeTouchable}
                    onPress={props.onClose}
                >
                    <CloseIcon />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.editNoteIconTouchable}
                    onPress={() => {
                        props.openEditPopup(props.note.date);
                        props.onClose();
                    }}
                >
                    <EditNoteIcon style={styles.editNoteIcon} />
                </TouchableOpacity>
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

const styles = StyleSheet.create({
    animatedView: {
        width: '100%',
        display: 'flex',

        borderRadius: 25,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        backgroundColor: ThemeColor.WHITE,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden'
    },
    popupGradient: {
        width: '100%',
        display: 'flex',

        padding: 15,
        paddingBottom: 35,

        // borderRadius: 25,
        // borderBottomLeftRadius: 0,
        // borderBottomRightRadius: 0,

        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: ThemeColor.WHITE,
    },
    dateTitleView: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    dateTitle: {
        fontSize: 18,
    },
    upperValues: {
        display: 'flex',
        width: '100%',

        flexDirection: 'row',
        justifyContent: 'center',
    },
    bottomValues: {
        display: 'flex',
        width: '100%',

        flexDirection: 'row',
        justifyContent: 'center',
    },
    commentValue: {
        marginTop: 15,
        width: '100%',
        borderRadius: 10,
        backgroundColor: "white",
        padding: 15
    },
    commentValueText: {
        fontSize: 18,
        color: "#333333"
    },
    closeTouchable: {
        position: 'absolute',
        right: 20,
        top: 20,
        ...shadowOptions
    },
    editNoteIconTouchable: {
        position: 'absolute',
        left: 20,
        top: 20,
        ...shadowOptions,
    },
    editNoteIcon: {
        width: 30,
        height: 30
    }
})