import React from 'react';
import { View, Text, TouchableOpacity, BackHandler } from 'react-native';
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

export class ChartDotInfoPopup extends React.Component<ChartDotInfoPopupProps> {
    componentDidMount() {
        const { closePopup } = this.props;
        BackHandler.addEventListener('hardwareBackPress', function () {
            closePopup();
        });
    }

    componentWillUnmount() {
        const { closePopup } = this.props;
        BackHandler.removeEventListener('hardwareBackPress', function () {
            closePopup();
        });
    }

    getChartPopupTitle = () => {
        const { selectedChartPeriod = ChartPeriodType.DAY, note } = this.props;

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
    render() {
        const {
            selectedChartPeriod = ChartPeriodType.DAY,
            note,
            openEditPopup,
            closePopup,
        } = this.props;

        const editable = selectedChartPeriod == ChartPeriodType.DAY;


        return <BottomPopup hidden={!note}>
            <View style={styles.animatedView}>
                <LinearGradient
                    style={styles.popupGradient}
                    colors={['#DFF2FF', '#F6F8FF']}
                >
                    {note && <>
                        <View style={styles.dateTitleView}>
                            <Text style={styles.dateTitle}>
                                {this.getChartPopupTitle()}
                            </Text>
                        </View>
                        <View style={styles.upperValues}>
                            <ChartDotInfoPopupValue
                                type={ChartValueType.GLUCOSE}
                                value={note[ChartValueType.GLUCOSE]}
                            />
                            <ChartDotInfoPopupValue
                                type={ChartValueType.INSULIN}
                                value={note[ChartValueType.INSULIN]}
                            />
                        </View>
                        <View style={styles.bottomValues}>
                            <ChartDotInfoPopupValue
                                type={ChartValueType.BREAD_UNITS}
                                value={note[ChartValueType.BREAD_UNITS]}
                            />
                            <ChartDotInfoPopupValue
                                type={ChartValueType.LONG_INSULIN}
                                value={note[ChartValueType.LONG_INSULIN]}
                            />
                        </View>
                        {!!note.commentary && <ScrollView style={styles.commentValue}>
                            <View>
                                <Text style={styles.commentValueText}>
                                    {note.commentary}
                                </Text>
                            </View>
                        </ScrollView>}
                    </>}
                    <TouchableOpacity
                        style={styles.closeTouchable}
                        onPress={closePopup}
                    >
                        <CloseIcon />
                    </TouchableOpacity>
                    {editable && (
                        <View style={styles.editNoteIconTouchableView}>
                            <TouchableOpacity
                                style={styles.editNoteIconTouchable}
                                onPress={() => {
                                    openEditPopup(note.id);
                                    closePopup();
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
