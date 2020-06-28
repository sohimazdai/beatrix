import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { INoteListNote } from '../../../model/INoteList';
import { BottomPopup } from '../../../component/popup/BottomPopup';
import { ChartDotInfoPopupValue } from './dot-info-popup-value/ChartDotInfoPopupValue';
import { ChartValueType, ChartPeriodType } from '../../../model/IChart';
import { CloseIcon } from '../../../component/icon/CloseIcon';
import { EditNoteIcon } from '../../../component/icon/EditNoteIcon';
import { connect } from 'react-redux';
import { IStorage } from '../../../model/IStorage';
import { createChangeInteractive } from '../../../store/modules/interactive/interactive';
import { ScrollView } from 'react-native-gesture-handler';
import { styles } from './Style';
import { DateHelper } from '../../../utils/DateHelper';
import { i18nGet } from '../../../localisation/Translate';

export interface ChartDotInfoPopupProps {
    note?: INoteListNote
    selectedDotId?: string
    selectedChartPeriod?: string

    openEditPopup?: (noteId) => void
    closePopup?: () => void;
}

export function ChartDotInfoPopup(props: ChartDotInfoPopupProps) {
    const { selectedChartPeriod = ChartPeriodType.DAY, selectedDotId, note } = props;

    const editable = selectedChartPeriod == ChartPeriodType.DAY;

    function getChartPopupTitle() {

        let displayingDate = '';

        switch (selectedChartPeriod) {
            case ChartPeriodType.DAY:
                displayingDate = note && DateHelper.makeTimewithDateWithMonthAsString(new Date(note.date));
                return displayingDate
            case ChartPeriodType.MONTH:
                if (DateHelper.getDiffDate(new Date(note.date), 0) === DateHelper.today()) {
                    return i18nGet('chart_today');
                }
                if (note.date === DateHelper.yesterday()) {
                    return i18nGet('chart_yesterday');
                }
                displayingDate = DateHelper.makeDateWithMonthAsString(new Date(note.date))
                return displayingDate
            case ChartPeriodType.THREE_MONTH:
                displayingDate = DateHelper.makeDateWithMonthAsNumber(new Date(Number(note.date))) +
                    ' - ' + DateHelper.makeDateWithMonthAsNumber(
                        new Date(DateHelper.getDiffDate(new Date(note.date), 6))
                    )
                return displayingDate
        }
    }

    return <BottomPopup hidden={!props.note}>
        <View style={styles.animatedView}>
            <LinearGradient
                style={styles.popupGradient}
                colors={['#DFF2FF', '#F6F8FF']}
            >
                {props.note && <>
                    <View style={styles.dateTitleView}>
                        <Text style={styles.dateTitle}>
                            {getChartPopupTitle()}
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
                    onPress={props.closePopup}
                >
                    <CloseIcon />
                </TouchableOpacity>
                {editable && (
                    <View style={styles.editNoteIconTouchableView}>
                        <TouchableOpacity
                            style={styles.editNoteIconTouchable}
                            onPress={() => {
                                props.openEditPopup(props.note.id);
                                props.closePopup();
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
    (state: IStorage) => ({
        selectedDotId: state.interactive.selectedDotId,
        selectedChartPeriod: state.interactive.selectedChartPeriod,
        note: state.noteList[state.interactive.selectedDotId] || null,
    }),
    (dispatch) => ({ dispatch }),
    (stateProps, { dispatch }, ownProps) => {
        return {
            ...stateProps,
            ...ownProps,
            openEditPopup: (noteId) => {
                dispatch(createChangeInteractive({
                    creatingNoteMode: true,
                    editingNoteId: noteId,
                }));
            },
            closePopup: () => {
                dispatch(createChangeInteractive({
                    selectedDotId: null,
                }));
            },
        }
    }
)(ChartDotInfoPopup)
